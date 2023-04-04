import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getManager, DataSource } from 'typeorm';
import { Organ } from './organs.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { Like } from "typeorm";
import { MetadataService } from '../metadata/metadata.service';
import { CsvParser } from 'nest-csv-parser'
import { table } from 'console';
const { Readable } = require('stream');
//export type User = any;

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


@Injectable()
export class OrgansService {
   @InjectDataSource() 
  private entityManager: DataSource
  filterMetadataValues: any[];

  public constructor(@InjectRepository(Organ)
  private organsRepository: Repository<Organ>,
    private readonly csvParser: CsvParser,
    private readonly metadataService: MetadataService
  ) {
  }

  async findAll(): Promise<Organ[]> {

    let organsList = await this.organsRepository.find({ relations: ["regions", "donor"] });

    return organsList;
  }

  async findOne(organ_id: number): Promise<Organ | undefined> {


    let organObj = await this.organsRepository.findOneOrFail(
      {
        where: {
          organ_id
        },
        relations: ["regions", "donor"]
      }
      );
      
      // format decimal numbers to 2 places
      Object.entries(organObj)
    .forEach(([key,value]) => {
      if (this.isNumber(value)) {
        // convert dates to 2 decimal places if not whole number
        if(Number(value) % 1 !=0) {
          value = Number(value).toFixed(2) 
        } 
      } 
    })
    return organObj;
  }

  isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}


  // pagination code is in place here, however it is not used, take and skip are not populated so it returns all
  // params come in as pagination interface 'filter'

  async filterOrgansByType(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Organ>> {
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    //const keyword = query.keyword || ''

    const [results, total] = await this.organsRepository.findAndCount(
      {
        where: { organ_type: Like('%' + filter + '%') },  //NOTE: will probably have to order these
        relations: ["regions", "donor"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Organ>({
      results,
      total,
      take,
      skip
    });
  }


  async filterOrgans(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Organ>> {

    // get filter list from metadata
    await this.getMetadataFilters()

    const take = options.take
    const skip = options.skip
    const filter = options.filter
    console.log(filter)
    let whereString = '';
    let joinString = 'INNER JOIN region ON organ.organ_id = region.organ_id LEFT JOIN donor ON organ.participant_id = donor.achiever_participant_id';
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
      console.log(filter)
      for (let tabledotcolumn in filter) {
        if (filter.hasOwnProperty(tabledotcolumn)) {
          const filterVal = filter[tabledotcolumn];
          console.log('filterval')
          console.log(filterVal)
          const filterMetaData = await this.getFilterMetadata(tabledotcolumn)
          console.log('filtermetadata')
          console.log(filterMetaData)
            // Check the values in the filters are not null or empty
            if (filterVal && filterVal != 'N/A' && filterVal != '' && filterVal.length !== 0){

              // if it's an array of values check the first item in the array, a numerical filter should always be an array but to avoid hitting an exception, double check
              let tryNum = Array.isArray(filterVal) ? Number(filterVal[0]) : Number(filterVal)

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
                   // is number but not array, the stored value could be an int, float, double or string so handle that
                  console.log('is single number, the stored value could be an int, float, double or string so handle that')
                  console.log(tabledotcolumn)
                  whereString = whereString + " AND ( CAST(" + tabledotcolumn + ' AS int) = ' + filterVal + ')'
                  count++;
                }
              }
            }
          }
        }//end of for loop
      }

      if (take || skip) {
        whereString = whereString + 'LIMIT ' + take + ' OFFSET ' + skip
      }

      let query = '';
      if (whereString != '') {
        query = "SELECT organ.organ_id FROM organ " + joinString + " WHERE " + whereString
      }
      else {
        query = "SELECT organ.organ_id FROM organ " + joinString
      }
      console.log('query')
      console.log(query)
      const rawData = await this.entityManager.query(query);
      let total = rawData.length
      console.log(rawData)
      let organIdList = []
      rawData.forEach(result => {
        if (organIdList.indexOf(result.organ_id) === -1) {
          organIdList.push(result.organ_id)
        }
      });

      let results = await this.findMulti(organIdList);

      return new Pagination<Organ>({
        results,
        total,
        take,
        skip
      });
    }

  async findMulti(idList: number[]): Promise < Organ[] | undefined > {

      let organList = await this.organsRepository.find({
        relations: ["regions", "donor"],
        where: {
          organ_id: In(idList)
        }
      });

      return organList;
    }

  async remove(id: string): Promise < void> {
      await this.organsRepository.delete(id);
    }

    getFilterMetadata(tabledotcolumn: string) {
      for (let filterMetaDataItem of this.filterMetadataValues) {
        if (filterMetaDataItem.table + '.' + filterMetaDataItem.column == tabledotcolumn) {
          return filterMetaDataItem
        }
      }
    }


  async getMetadataFilters(): Promise < any > {
      await this.metadataService.buildFilters().then(result => {
        this.filterMetadataValues = result
      });
    }

    
  }