import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getManager, Like, Unique, MinKey, DataSource } from 'typeorm';
import { Metadata } from './metadata.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';

//export type User = any;

@Injectable()
export class MetadataService {
  
   @InjectDataSource() 
  private entityManager: DataSource

  public constructor(
    @InjectRepository(Metadata) 
    
  private metadataRepository: Repository<Metadata>
  ) {
  }

  async findAll(): Promise<Metadata[]> {
    
    let metadataList = await this.metadataRepository.find();
    
    return metadataList;
  }

  async buildFilters(): Promise<any>{

  let metadataList = await this.metadataRepository.find();
  let filterFields: Metadata[] = [];
  // Find all entries in the metadata table that have values in the filterType column
  for (let metadataEntry of metadataList){
    if (metadataEntry.filterType == 'unique' || metadataEntry.filterType == 'highlow' ){
      filterFields.push(metadataEntry)
    }
  }
  let filterPicklistValues = []
  for (let filterField of filterFields){
    if (filterField.filterType == 'unique'){
      // get all unique values for the relevant column
      // sql query based on table
      let query = 'select distinct ' + filterField.column_name + ' from ' + filterField.table
      const rawData = await this.entityManager.query(query);
      // strip values only out of array of objects each with key of column name
      let uniqueItemsArray = [];
      rawData.forEach(row => {
        uniqueItemsArray.push(row[filterField.column_name])
      });
      // build new object
      filterPicklistValues.push({
        column: filterField.column_name,
        category: filterField.category,
        label: filterField.label,
        table: filterField.table,
        type: 'unique',
        values: uniqueItemsArray,
        min: null,
        max: null
      })
    }
    if (filterField.filterType == 'highlow'){
      // get highest and lowest values for the relevant column
      // build sql querys based on table
      let minAndMax = {
        min: 0,
        max: 0
      };
      let maxQuery = 'select MAX(' + filterField.column_name + ') FROM ' + filterField.table
      let minQuery= 'select MIN(' + filterField.column_name + ') FROM ' + filterField.table
      const rawMin = await this.entityManager.query(minQuery);
      const rawMax = await this.entityManager.query(maxQuery);
      // select will always return an array, so get data out of it
      if( rawMin[0]){
        minAndMax.min = rawMin[0].min
      }
      if( rawMax[0]){
        minAndMax.max = rawMax[0].max
      }
      // build new object
      filterPicklistValues.push({
        column: filterField.column_name,
        category: filterField.category,
        label: filterField.label,
        table: filterField.table,
        type: 'highlow',
        values: [],
        min: minAndMax.min,
        max: minAndMax.max
      })
    }
  }

    return filterPicklistValues
  }

  
/*
  async findOne(email: String): Promise<Metadata | undefined> {
  
  let user_id='1'

  let userObj = await this.donorsRepository.findOneOrFail(1);
  
  return userObj;
  }

  // pagination code is in place here, however it is not yet used, take and skip are not populated so it returns all
  // params come in as pagination interface 'filter'
  async filterDonors(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Metadata>> {
    const take = options.take 
    const skip = options.skip 
    const filter = options.filter
    //const keyword = query.keyword || ''

    //build filters

    const [results, total] = await this.donorsRepository.findAndCount(
        {
            where: { type: Like('%' + 'DCD' + '%'), sex: Like('%' + 'Male' + '%')},  //NOTE: will probably have to order these
            relations:["organs", "organs.samples"],
            take: take,
            skip: skip
        }
    );

    return new Pagination<Metadata>({
      results,
      total,
      take,
      skip
    });
  }


  async remove(id: string): Promise<void> {
    await this.donorsRepository.delete(id);
  }
*/
}