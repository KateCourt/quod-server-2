import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getManager } from 'typeorm';
import { Organ } from './organs.entity';
import { Pagination, PaginationOptionsInterface } from './../paginate';
import { Like } from "typeorm";

//export type User = any;

@Injectable()
export class OrgansService {
  entityManager = getManager();

  public constructor(@InjectRepository(Organ)
  private organsRepository: Repository<Organ>
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
    
    return organObj;
  }

  // pagination code is in place here, however it is not yet used, take and skip are not populated so it returns all
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
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    let whereString = '';
    let joinString = 'INNER JOIN region ON organ.organ_id = region.organ_id LEFT JOIN donor ON organ.participant_id = donor.achiever_participant_id';
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
      query = "SELECT organ.organ_id FROM organ " + joinString + " WHERE " + whereString
    }
    else{
      query = "SELECT organ.organ_id FROM organ " + joinString
    }
    
    const rawData = await this.entityManager.query(query);
    let total = rawData.length
    let organIdList = []
    rawData.forEach(result => {
      if(organIdList.indexOf(result.organ_id) === -1){
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

  async findMulti(idList: number[]): Promise<Organ[] | undefined> {
    
    let organList = await this.organsRepository.find({
      relations: ["regions", "donor"],
      where: {
        organ_id: In(idList)
      }
    });
    
    return organList;
  }

  async remove(id: string): Promise<void> {
    await this.organsRepository.delete(id);
  }

}