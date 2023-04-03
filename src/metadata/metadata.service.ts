import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metadata } from './metadata.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import {Like} from "typeorm";

//export type User = any;

@Injectable()
export class MetadataService {
  
  public constructor(@InjectRepository(Metadata)
  private metadataRepository: Repository<Metadata>
  ) {
  }

  async findAll(): Promise<Metadata[]> {
    
    let metadataList = await this.metadataRepository.find();
    
    return metadataList;
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