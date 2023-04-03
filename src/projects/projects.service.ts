// temporary file to be replaced with a DB of projects

import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Project } from './projects.entity';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

//export type Project = any;

@Injectable()
export class ProjectsService {

  public constructor(@InjectRepository(Project)
  private projectsRepository: Repository<Project>
  ) {

  }


  async findAll(): Promise<Project[]> {
    
    let projectList = await this.projectsRepository.find();
    
    return projectList;
  }

  async findAllPaginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Project>> {
    const take = options.take
    const skip = options.skip
    //const keyword = query.keyword || ''

    const [results, total] = await this.projectsRepository.findAndCount(
      {
        take: take,
        skip: skip,
        
      }
    );

    return new Pagination<Project>({
      results,
      total,
      take,
      skip
    });
  }
// CHANGE - does not appear to be in use - email does not exist on projects
  // async findOne(email: String): Promise<Project | undefined> {
    
    
  //   let projectObj = await this.projectsRepository.findOneOrFail({ where: { email: email } });
    
  //   return projectObj;
  // }

  // probably won't be used
  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }

  async create(project: Project) {
    
    
    // ----- TODO reject if required fields are missing
 
    // check if project already exists
    const projectInDb = await this.projectsRepository.findOne({ where: { name: project.name } });
    if (projectInDb) {
      throw new HttpException('Project with that name already exists', HttpStatus.BAD_REQUEST);
    }
      // save project in db
      try {
        return await this.projectsRepository.insert(project);
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
      

    async filterProjects(
      options: PaginationOptionsInterface,
    ): Promise<Pagination<Project>> {
      const take = options.take 
      const skip = options.skip 
      const filter = options.filter
      //const keyword = query.keyword || ''
      
      
  
      const [results, total] = await this.projectsRepository.findAndCount(
          {
              where: { owner: Like('%' + filter + '%') },  //NOTE: will probably have to order these
              take: take,
              skip: skip
          }
      );
  
      return new Pagination<Project>({
        results,
        total,
        take,
        skip
      });
    }


  async update(project: Project) {
    
    // check if project already exists
    const projectInDb = await this.projectsRepository.findOne({ where: { name: project.name} });
    const projectID = projectInDb.project_id;
    if (!projectInDb) {
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.projectsRepository.update(projectID, project);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

}