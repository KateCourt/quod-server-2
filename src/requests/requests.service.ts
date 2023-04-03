// temporary file to be replaced with a DB of requests

import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Request } from './requests.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

//export type Request = any;

@Injectable()
export class RequestsService {

  public constructor(@InjectRepository(Request)
  private requestsRepository: Repository<Request>
  ) {

  }


  async findAll(): Promise<Request[]> {
    
    let requestsList = await this.requestsRepository.find({relations: ["user"]});
    
    return requestsList;
  }

  async findAllPaginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Request>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.requestsRepository.findAndCount(
      {
        take: take,
        skip: skip,
        relations: ["user"]
      }
    );

    return new Pagination<Request>({
      results,
      total,
      take,
      skip
    });
  }

  async findOne(email: String): Promise<Request | undefined> {
    
    
    let requestObj = await this.requestsRepository.findOneOrFail({ where: { email: email } , relations: ["user"]});
    
    return requestObj;
  }

  // probably won't be used
  async remove(id: string): Promise<void> {
    await this.requestsRepository.delete(id);
  }

  async create(request: Request) {
    
    
    // ----- TODO reject if required fields are missing
 
    // check if request already exists
    const requestInDb = await this.requestsRepository.findOne({ where: { id: request.id }, relations: ["user"] });
    if (requestInDb) {
      throw new HttpException('Request with that id already exists', HttpStatus.BAD_REQUEST);
    }
      // save request in db
      try {
        return await this.requestsRepository.insert(request);
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
      

    async filterRequests(
      options: PaginationOptionsInterface,
    ): Promise<Pagination<Request>> {
      const take = options.take 
      const skip = options.skip 
      const filter = options.filter
      //const keyword = query.keyword || ''
      
      
  
      const [results, total] = await this.requestsRepository.findAndCount(
          {
              where: { email: Like('%' + filter + '%') },  //NOTE: will probably have to order these
              take: take,
              skip: skip,
              relations: ["user"]
          }
      );
  
      return new Pagination<Request>({
        results,
        total,
        take,
        skip
      });
    }


  async update(request: Request) {
    
    // check if request already exists
    const requestInDb = await this.requestsRepository.findOne({ where: { id: request.id}, relations: ["user"] });
    const requestID = requestInDb.id;
    if (!requestInDb) {
      throw new HttpException('Request not found', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.requestsRepository.update(requestID, request);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

}