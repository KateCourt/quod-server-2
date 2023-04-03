import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In, Like, DataSource } from 'typeorm';
import { Region } from './regions.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';

//export type User = any;

@Injectable()
export class RegionsService {
  [x: string]: any;
 
  @InjectDataSource() 
  private entityManager: DataSource

  public constructor(@InjectRepository(Region)
  private regionsRepository: Repository<Region>
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
              if(Number.isNaN(tryNum)){
                
                whereString = '(' + key + ' Like ' + "'" + '%' + element + '%' + "'" + ')'
              } else{
                
                whereString = '(' + key + ' = ' + "'" + element + "'" + ')'
              }
            }
            else {
              if(Number.isNaN(tryNum)){
                whereString = whereString + " AND (" + key + ' Like ' + "'" + '%' + element + '%' + "'" + ')'
              } else{
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
        where: { organ_type: Like('%' + filter + '%') },  //NOTE: will probably have to order these
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
    

    let regionObj = await this.regionsRepository.findOneOrFail(
      {
        where: {
          auto_region_id
        },
        relations: ["organ", "organ.donor"]
      }
        );
    
    return regionObj;
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

}