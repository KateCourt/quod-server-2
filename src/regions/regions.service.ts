import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In, Like, DataSource } from 'typeorm';
import { Region } from './regions.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { MetadataService } from '../metadata/metadata.service';
import { CsvParser } from 'nest-csv-parser'
//export type User = any;

@Injectable()
export class RegionsService {
  [x: string]: any;
   @InjectDataSource() 
  private entityManager: DataSource
  filterMetadataValues: any[];

  public constructor(@InjectRepository(Region)
  private regionsRepository: Repository<Region>,
  private readonly csvParser: CsvParser,
  private readonly metadataService: MetadataService
  ) {
  }

  async findAll(): Promise<Region[]> {
    
    let regionsList = await this.regionsRepository.find({ relations: ["organ", "organ.donor"] });
    
    return regionsList;
  }

  async findAllPaginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Region>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.regionsRepository.findAndCount(
      {
        order: {
            region_id: 'ASC'
        },
        //  where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },  NOTE: will probably have to order these
        relations: ["samples", "organ", "organ.donor"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Region>({
      results,
      total,
      take,
      skip
    });
  }

  async filterRegions(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Region>> {

      // get filter list from metadata
    await this.getMetadataFilters()
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    console.log(filter)
    let whereString = '';
    let joinString = 'LEFT JOIN organ ON region.organ_id = organ.organ_id LEFT JOIN donor ON organ.participant_id = donor.achiever_participant_id';
    console.log('in filter regions')
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
              console.log(tabledotcolumn)
              console.log(filterVal)
              // if it's an array of values check the first item in the array, a numerical filter should always be an array but to avoid hitting an exception, double check
              let tryNum = Array.isArray(filterVal) ? Number(filterVal[0]) : Number(filterVal)
              console.log(filterVal)
              console.log(Array.isArray(filterVal))
              console.log('tryNum' + tryNum)
              console.log(Number.isNaN(tryNum))
              console.log(count)
              console.log(filterMetaData)
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
            console.log('skipped' + tabledotcolumn)
          }

      }
    }

    if (take || skip) {
      whereString = whereString + 'LIMIT ' + take + ' OFFSET ' + skip
    }
    
    let query = '';
    if(whereString != ''){
      query = "SELECT region.auto_region_id FROM region " + joinString + " WHERE " + whereString
    } else{
      query = "SELECT region.auto_region_id FROM region " + joinString
    }
    
   console.log(query);   
    const rawData = await this.entityManager.query(query);
    let total = rawData.length
    let regionIdList = []
    
    rawData.forEach(result => {
      if(regionIdList.indexOf(result.auto_region_id) === -1){
        regionIdList.push(result.auto_region_id)
      }
    });
    console.log(regionIdList);
    let results = await this.findMulti(regionIdList);

    return new Pagination<Region>({
      results,
      total,
      take,
      skip
    });
  }

// pagination code is in place here, however it is not yet used, take and skip are not populated so it returns all
  // params come in as pagination interface 'filter'

  async filterRegionsByType(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Region>> {
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    //const keyword = query.keyword || ''

    const [results, total] = await this.organsRepository.findAndCount(
      {
        order: {
          region_id: 'ASC'
        },
        where: { organ_type: Like('%' + filter.idParam + '%') },  //NOTE: will probably have to order these
        relations: ["samples", "organ", "organ.donor"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Region>({
      results,
      total,
      take,
      skip
    });
  }



  // Function just to get all regions for one donor
  async filterRegionsByDonorID(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Region>> {
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    console.log('filter')
    console.log(filter)
    //const keyword = query.keyword || ''
    console.log('regions service regions by donor id')
    const [results, total] = await this.regionsRepository.findAndCount(
      {
        order: {
          region_id: 'ASC'
        },
        where: { participant_id: Like('%' + filter.idParam + '%') }, 
        relations: ["samples", "organ", "organ.donor"],
        take: take,
        skip: skip
      }
    );
      console.log(total)
    return new Pagination<Region>({
      results,
      total,
      take,
      skip
    });
  }



  //unsure if used or not
  async regionFilterPaginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Region>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.regionsRepository.findAndCount(
      {
        //  where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },  NOTE: will probably have to order these
        relations: ["organ", "organ.donor"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Region>({
      results,
      total,
      take,
      skip
    });
  }

  async findOne(auto_region_id: number): Promise<Region | undefined> {
    

    let regionObj = await this.regionsRepository.findOneOrFail({
     where: {
      auto_region_id
     },
      relations: ["organ", "organ.donor"]
    }
     );
      // format decimal numbers to 2 places
      Object.entries(regionObj.organ.donor)
    .forEach(([key,value]) => {
      if (this.isNumber(value)) {
        // convert dates to 2 decimal places if not whole number
        if(Number(value) % 1 !=0) {
          regionObj.organ.donor[key] = Number(value).toFixed(2) 
        } 
      } else if (value instanceof Date) {
        // convert timestamps to date only
   
        regionObj.organ.donor[key] = value.getDate() + '/' + (value.getMonth() +1) + '/' + value.getFullYear()
      }
    })
     
    
    return regionObj;
  }

  isNumber(value: string | number): boolean
  {
     return ((value != null) &&
             (value !== '') &&
             !isNaN(Number(value.toString())));
  }
  

  // needs pagination
  async findMulti(idList: number[]): Promise<Region[] | undefined> {
    
    let regionList = await this.regionsRepository.find({
      relations: ["organ", "organ.donor"],
      where: {
        auto_region_id: In(idList)
      
     }});
    
    return regionList;
  }

  async remove(id: string): Promise<void> {
    await this.regionsRepository.delete(id);
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