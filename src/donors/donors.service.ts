import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In, DataSource } from 'typeorm';
import { Donor } from './donors.entity';
import { Pagination, PaginationOptionsInterface } from './../paginate';
import { CsvParser } from 'nest-csv-parser'
import { Like } from "typeorm";
const { Readable } = require('stream');

//export type User = any;

@Injectable()
export class DonorsService {

  @InjectDataSource() 
  private entityManager: DataSource

  public constructor(@InjectRepository(Donor)
  private donorsRepository: Repository<Donor>,
    private readonly csvParser: CsvParser
  ) {
  }

  async findAll(): Promise<Donor[]> {
    
    let donorsList = await this.donorsRepository.find({ relations: ["organs", "organs.regions"] });
    
    return donorsList;
  }
// CHANGE
  async findOne(achiever_participant_id: string): Promise<Donor | undefined> {
    let donorObj = await this.donorsRepository.findOneOrFail(
      {
        where: {
          achiever_participant_id
        },
        relations: ["organs", "organs.regions"] 
      }
      );
    
    return donorObj;
  }

  // pagination code is in place here, however it is not yet used, take and skip are not populated so it returns all
  // params come in as pagination interface 'filter'

  //TODO: needs error handing, what if no filters etc etc
  async filterDonors(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Donor>> {
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    let whereString = '';
    let joinString = 'LEFT JOIN organ ON donor.achiever_participant_id = organ.participant_id';
    if (filter) {
      let count = 0;
      /** Build SQL query string
      get filters that have been completed from the filter object passed from client
      check if filter is numeric to compare using ==
      if not assume string and compare using LIKE
      if filter is not the first in the list, append AND to start of query
       */
      for (let key in filter) {
        if (filter.hasOwnProperty(key)) {
          const element = filter[key];
          if (element && element != 'N/A') {
            
            let tryNum = Number(element);
            
            if (count == 0) {
              if (Number.isNaN(tryNum)) {
                
                whereString = '(' + key + ' Like ' + "'" + '%' + element + '%' + "'" + ')'
              } else {
                
                whereString = '(' + key + ' = ' + "'" + element + "'" + ')'
              }
            }
            else {
              if (Number.isNaN(tryNum)) {
                whereString = whereString + " AND (" + key + ' Like ' + "'" + '%' + element + '%' + "'" + ')'
              } else {
                whereString = whereString + " AND (" + key + ' = ' + "'" + element + "'" + ')'

              }
            }
            count++;
          }
        }
      }
    }

    if (take || skip) {
      whereString = whereString + 'LIMIT ' + take + ' OFFSET ' + skip
    }
    
    let query = '';
    if (whereString != '') {
      query = "SELECT donor.achiever_participant_id FROM donor " + joinString + " WHERE " + whereString
    }
    else {
      query = "SELECT donor.achiever_participant_id FROM donor " + joinString
    }

    
    const rawData = await this.entityManager.query(query);
    let total = rawData.length

    let donorIdList = []
    rawData.forEach(result => {
      if (donorIdList.indexOf(result.achiever_participant_id) === -1) {
        donorIdList.push(result.achiever_participant_id)
      }
    });

    let results = await this.findMulti(donorIdList);

    //format raw data to match typeorm style or do a double query here and fetch in typeorm style to get the data in teh same format

    return new Pagination<Donor>({
      results,
      total,
      take,
      skip
    });
  }

  async uploadDonors(sentFile) {
    const fileBuffer = sentFile.buffer
    const stream = Readable.from(fileBuffer);

    // Create stream from file (or get it from S3)
    //const stream = fs.createReadStream(__dirname + '/some.csv')
    const fromCSV = await this.csvParser.parse(stream, Donor)

    let donorsList: Donor[] = [];
    if (fromCSV.list.length) {
      fromCSV.list.forEach(donorRow => {
        //prep data - empty strings as null so integer values can handle them, remove quotes elsewhere for numbers too
        for (let donorField in donorRow) {
          if (donorRow.hasOwnProperty(donorField)) {
            const value = donorRow[donorField];
            if (value == "") {
              donorRow[donorField] = null
              
            } else {
              donorRow[donorField] = value.replace(/['"]+/g, '');
            }
          }
        }
        donorsList.push(donorRow)
      });
      return this.upsertDonors(donorsList)
    }

    return Error("No donors found in CSV")
  }


  async upsertDonors(donorsList) {

    donorsList.forEach(async donor => {
      //check if id in db, if it is then update, otherwise insert new record
      let findDonor = await this.donorsRepository.findOne(donor.achiever_participant_id);
      if (findDonor != null && findDonor != undefined) {
        //update
        try {
          return await this.donorsRepository.update(donor.achiever_participant_id, donor);
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      }
      else {
        //insert
        try {
          return await this.donorsRepository.insert(donor);
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      }
    });
  }



  async findMulti(idList: number[]): Promise<Donor[] | undefined> {
    
    let donorList = await this.donorsRepository.find({
      relations: ["organs", "organs.regions"],
      where: {
        achiever_participant_id: In(idList)
      }
    });
    
    return donorList;
  }


  async remove(id: string): Promise<void> {
    await this.donorsRepository.delete(id);
  }

}