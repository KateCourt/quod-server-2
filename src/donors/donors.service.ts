import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In, DataSource } from 'typeorm';
import { Donor } from './donors.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { CsvParser } from 'nest-csv-parser'
import { Like } from "typeorm";

import { Metadata } from '../metadata/metadata.entity';
import { MetadataService } from '../metadata/metadata.service';
const { Readable } = require('stream');

interface FilterMetadataType {
  column: string,
  category: string,
  label: string,
  table: string,
  type: string,
  values: [],
  min: number,
  max: number
}

//export type User = any;

@Injectable()
export class DonorsService {

   @InjectDataSource() 
  private entityManager: DataSource
  filterMetadataValues: any[];

  public constructor(@InjectRepository(Donor)
  private donorsRepository: Repository<Donor>,
    private readonly csvParser: CsvParser,
    private readonly metadataService: MetadataService
  ) {
  }

  async findAll(): Promise<Donor[]> {
    let donorsList = await this.donorsRepository.find({ relations: ["organs", "organs.regions"] });
    return donorsList;
  }

  async findOne(achiever_participant_id: string): Promise<Donor | undefined> {
    let donorObj = await this.donorsRepository.findOneOrFail({
      where: {
        achiever_participant_id
      },
      relations: ["organs", "organs.regions"]
    }
      );
     
  Object.entries(donorObj)
    .forEach(([key,value]) => {
      
       // convert timestamps to date only
      if (value instanceof Date) {
        donorObj[key] = value.getDate() + '/' + (value.getMonth() +1) + '/' + value.getFullYear()
       
      }  else if (this.isNumber(value)) {
       
        // convert dates to 2 decimal places if not whole number
        if(Number(value) % 1 !=0) {
          console.log(value)
          donorObj[key] = Number(value).toFixed(2) 
        } 
      } 
    })
    return donorObj;
  }

  isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}


  async findAllPaginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Donor>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.donorsRepository.findAndCount(
      {
        relations: ["organs", "organs.regions"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Donor>({
      results,
      total,
      take,
      skip
    });
  }

  // pagination code is in place here, however it is not yet used, take and skip are not populated so it returns all
  // params come in as pagination interface 'filter'

  //TODO: needs error handing, what if no filters etc etc
  async filterDonors(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Donor>> {
    // get filter list from metadata
    await this.getMetadataFilters()

    console.log(this.filterMetadataValues)
    const take = options.take
    const skip = options.skip
    console.log('take')
    console.log(options.take)
    console.log(options.filter)
    const filter = options.filter
    let whereString = '';
    let joinString = 'LEFT JOIN organ ON donor.achiever_participant_id = organ.participant_id';
    console.log('test isnan0')
    console.log(Number.isNaN(0))
    if (filter) {
      let count = 0;
      /** Build SQL query string
      get filters that have been completed from the filter object passed from client
      includes all filters irrelevant of table or completion
      incomplete numerical filters will show values that equate to the min/max of the column which causes fail if the col contains null values
      check if filter is numeric to compare using ==
      if not assume string and compare using LIKE
      if filter is not the first in the list, append AND to start of query
       */
      for (let tabledotcolumn in filter) {
        if (filter.hasOwnProperty(tabledotcolumn)) {
          const filterVal = filter[tabledotcolumn];
          const filterMetaData = await this.getFilterMetadata(tabledotcolumn)
            // Check the values in the filters are not null or empty
            if (filterVal && filterVal != 'N/A' && filterVal != '' && filterVal.length !== 0){
              console.log('through if checks')
              console.log(filterVal)
              // if it's an array of values check the first item in the array, a numerical filter should always be an array but to avoid hitting an exception, double check
              let tryNum = Array.isArray(filterVal) ? Number(filterVal[0]) : Number(filterVal)
              console.log(filterVal)
              console.log(Array.isArray(filterVal))
              console.log('tryNum' + tryNum)
              console.log(Number.isNaN(tryNum))
              console.log(count)
              if (count == 0) {
                if (filterMetaData.type == 'unique' && Number.isNaN(tryNum)) {
                  // unique values and not number
                  console.log('not number')
                  whereString = '(' + tabledotcolumn + ' Like ' + "'" + '%' + filterVal + '%' + "'" + ')'
                  count++;
                } else if (filterMetaData.type == 'highlow' && Array.isArray(filterVal) && (filterVal[0] != null && filterVal[1] != null) && ((filterVal[0] !== filterMetaData.min) || (filterVal[1] !== filterMetaData.max))) {
                  // number and array
                  console.log('is number array')
                  whereString = '(' + tabledotcolumn + ' BETWEEN ' + filterVal[0] + ' AND ' + filterVal[1] + ')'
                  count++;
                }
                else if (filterMetaData.type == 'unique' && !Number.isNaN(tryNum)) {
                  console.log('unique and number')
                  // is number but not array, the stored value could be an int, float, double or string so handle that
                  whereString = '( CAST(' + tabledotcolumn + ' AS int) = ' + filterVal + ')'
                  count++;
                }
              }

              else {
                if (filterMetaData.type == 'unique' && Number.isNaN(tryNum)) {
                  console.log('not number')
                  console.log(tabledotcolumn)
                  whereString = whereString + " AND (" + tabledotcolumn + ' Like ' + "'" + '%' + filterVal + '%' + "'" + ')'
                  count++;
                } else if (filterMetaData.type == 'highlow' && Array.isArray(filterVal) && (filterVal[0] != null && filterVal[1] != null) && ((filterVal[0] !== filterMetaData.min) || (filterVal[1] !== filterMetaData.max))) {
                  // number and array
                  console.log('is number array')
                  console.log(tabledotcolumn)
                  whereString = whereString + " AND (" + tabledotcolumn + ' BETWEEN ' + filterVal[0] + ' AND ' + filterVal[1] + ')'
                  count++;
                }  else if (filterMetaData.type == 'unique' && !Number.isNaN(tryNum)) {
                  console.log('is single number, the stored value could be an int, float, double or string so handle that')
                  console.log(tabledotcolumn)
                  whereString = whereString + " AND ( CAST(" + tabledotcolumn + ' AS int) = ' + filterVal + ')'
                  count++;
                }
              }
            }
            console.log('skipped' + tabledotcolumn)
          }
        }//end of for loop
      }


    let query = '';
    if (whereString != '') {
      query = "SELECT donor.achiever_participant_id FROM donor " + joinString + " WHERE " + whereString
    }
    else {
      query = "SELECT donor.achiever_participant_id FROM donor " + joinString
    }

    let filterOptions;
    if (take || skip) {
      filterOptions = {
        take: take,
        skip: skip
      }
    }

    console.log('query')
    console.log(query)
    const rawData = await this.entityManager.query(query);
    let total = rawData.length

    let donorIdList = []
    rawData.forEach(result => {
      if (donorIdList.indexOf(result.achiever_participant_id) === -1) {
        donorIdList.push(result.achiever_participant_id)
      }
    });

    return await this.donorFilterPaginate(donorIdList, filterOptions);

  }

  async uploadDonors(sentFile) {
    const fileBuffer = sentFile.buffer
    const filestream = Readable.from(fileBuffer);

    // Create stream from file
    const fromCSV = await this.csvParser.parse(filestream, Donor, null, 1, { separator: ';' })
    console.log('from csv')
    console.log(fromCSV)
    let donorsList: Donor[] = [];
    console.log('fromcsvlength')
    console.log(fromCSV.list.length)
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
      console.log('submitted')
      console.log(donor)
      console.log('find')
      console.log(findDonor)
      console.log('id')
      console.log(donor.achiever_participant_id)
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

  async donorFilterPaginate( donorIdList,
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Donor>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.donorsRepository.findAndCount(
      {
        where: {
          achiever_participant_id: In(donorIdList)
        
       },
        relations: ["organs", "organs.regions"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Donor>({
      results,
      total,
      take,
      skip
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

  getFilterMetadata(tabledotcolumn: string) {
    for (let filterMetaDataItem of this.filterMetadataValues) {
      if (filterMetaDataItem.table + '.' + filterMetaDataItem.column == tabledotcolumn) {
        return filterMetaDataItem
      }
    }
  }


  async getMetadataFilters(): Promise<any> {
    await this.metadataService.buildFilters().then(result => {
      this.filterMetadataValues = result
    });
  }

}


