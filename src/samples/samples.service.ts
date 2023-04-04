import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In } from 'typeorm';
import { Sample } from './samples.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { CsvParser } from 'nest-csv-parser'
import { Like } from "typeorm";

import { Metadata } from '../metadata/metadata.entity';
import { MetadataService } from '../metadata/metadata.service';
const { Readable } = require('stream');
//export type User = any;

@Injectable()
export class SamplesService {
  [x: string]: any;
  entityManager = getManager();
  filterMetadataValues: any[];

  public constructor(@InjectRepository(Sample)
  private samplesRepository: Repository<Sample>,
    private readonly csvParser: CsvParser,
    private readonly metadataService: MetadataService
  ) {
  }

  async findAll(): Promise<Sample[]> {
    
    let samplesList = await this.samplesRepository.find({ relations: ["region", "region.organ", "region.organ.donor"] });
    
    return samplesList;
  }

  async findAllPaginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Sample>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.samplesRepository.findAndCount(
      {
        //  where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },  NOTE: will probably have to order these
        relations: ["region", "region.organ", "region.organ.donor"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Sample>({
      results,
      total,
      take,
      skip
    });
  }

  async filterSamples(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Sample>> {

    // get filter list from metadata
    await this.getMetadataFilters()
    
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    console.log('filter')
    console.log(options.filter)
    let whereString = '';
    let limitOffsetString = '';
    let joinString = 'LEFT JOIN region ON sample.region_id = region.region_id LEFT JOIN organ ON region.organ_id = organ.organ_id LEFT JOIN donor ON organ.participant_id = donor.achiever_participant_id';
    
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
    if(whereString != ''){
      query = "SELECT sample.auto_sample_id FROM sample " + joinString + " WHERE " + whereString
    } else{
      query = "SELECT sample.auto_sample_id FROM sample " + joinString
    }

    let filterOptions;
    if (take || skip) {
      filterOptions = {
        take: take,
        skip: skip
      }
    }
    
    console.log(query)
      
    const rawData = await this.entityManager.query(query);
    let total = rawData.length
    let sampleIdList = []
    console.log('total '  + total)
    rawData.forEach(result => {
      if(sampleIdList.indexOf(result.auto_sample_id) === -1){
        sampleIdList.push(result.auto_sample_id)
      }
    });

    return await this.sampleFilterPaginate(sampleIdList, filterOptions);


  }



  //unsure if used or not
  async sampleFilterPaginate( sampleIdList,
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Sample>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.samplesRepository.findAndCount(
      {
        where: {
          auto_sample_id: In(sampleIdList)
        
       },
        relations: ["region", "region.organ", "region.organ.donor"],
        take: take,
        skip: skip
      }
    );

    return new Pagination<Sample>({
      results,
      total,
      take,
      skip
    });
  }

    // Function just to get all regions for one donor
    async filterSamplesByRegionID(
      options: PaginationOptionsInterface,
    ): Promise<Pagination<Sample>> {
      const take = options.take
      const skip = options.skip
      const filter = options.filter
      console.log('filter')
      console.log(filter)
      //const keyword = query.keyword || ''
      console.log('samples service sample by region id')
      let query =  "SELECT sample.auto_sample_id FROM sample LEFT JOIN region ON sample.region_id = region.region_id LEFT JOIN organ ON region.organ_id = organ.organ_id LEFT JOIN donor ON organ.participant_id = donor.achiever_participant_id WHERE region.auto_region_id = " + filter 
     
  
      let filterOptions;
      if (take || skip) {
        filterOptions = {
          take: take,
          skip: skip
        }
      }
      
      console.log(query)
        
      const rawData = await this.entityManager.query(query);
      let total = rawData.length
      let sampleIdList = []
      console.log('total '  + total)
      rawData.forEach(result => {
        if(sampleIdList.indexOf(result.auto_sample_id) === -1){
          sampleIdList.push(result.auto_sample_id)
        }
      });
  
      return await this.sampleFilterPaginate(sampleIdList, filterOptions);
  
    }


  async findOne(auto_sample_id: number): Promise<Sample | undefined> {
    

    let sampleObj = await this.samplesRepository.findOneOrFail(
      {
        where:
        {
          auto_sample_id
        },
        relations: ["region", "region.organ", "region.organ.donor"]
      }
      );
    
    return sampleObj;
  }

  // needs pagination
  async findMulti(idList: number[]): Promise<Sample[] | undefined> {
    
    let sampleList = await this.samplesRepository.find({
      relations: ["region", "region.organ", "region.organ.donor"],
      where: {
        auto_sample_id: In(idList)
      
     }});
    
    return sampleList;
  }

  async remove(id: string): Promise<void> {
    await this.samplesRepository.delete(id);
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