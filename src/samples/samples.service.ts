import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, In } from 'typeorm';
import { Sample } from './samples.entity';
import { Pagination, PaginationOptionsInterface } from './../paginate';

//export type User = any;

@Injectable()
export class SamplesService {
  [x: string]: any;
  entityManager = getManager();

  public constructor(@InjectRepository(Sample)
  private samplesRepository: Repository<Sample>
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
    const take = options.take
    const skip = options.skip
    const filter = options.filter
    let whereString = '';
    let joinString = 'LEFT JOIN organ ON sample.organ_id = organ.organ_id LEFT JOIN donor ON organ.participant_id = donor.achiever_participant_id';
    
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
      query = "SELECT sample.auto_sample_id FROM sample " + joinString + " WHERE " + whereString
    } else{
      query = "SELECT sample.auto_sample_id FROM sample " + joinString
    }
    
      
    const rawData = await this.entityManager.query(query);
    let total = rawData.length
    let sampleIdList = []
    
    rawData.forEach(result => {
      if(sampleIdList.indexOf(result.auto_sample_id) === -1){
        sampleIdList.push(result.auto_sample_id)
      }
    });

    let results = await this.findMulti(sampleIdList);

    return new Pagination<Sample>({
      results,
      total,
      take,
      skip
    });
  }



  //unsure if used or not
  async sampleFilterPaginate(
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

  async findOne(id: number): Promise<Sample | undefined> {
    

    let sampleObj = await this.samplesRepository.findOneOrFail(id, { relations: ["region", "region.organ", "region.organ.donor"]});
    
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

}