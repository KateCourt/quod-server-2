import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service'


@Controller()
export class ProjectsController {
    constructor(
        private projectsService: ProjectsService) { }

    @Post('/projects/view/filter')
    async filterProjects(@Request() req) {
        return this.projectsService.filterProjects(req.body);
    }
    

    @Post('/projects/view')
    async pagProjects(@Request() req) {
        return this.projectsService.findAllPaginate(req.body);
    }

    @Post('projects/create')
    async register(@Request() req) {
        
        
        return this.projectsService.create(req.body.project);
    }

    @Post('projects/update')
    async update(@Request() req) {
        
        
        return this.projectsService.update(req.body.project);
    }


/*
    @Post('projects/findall')
    async findall(@Request() req) {
        
        return this.projectsService.findAll();
    }

    @Post('projects/findone')
    async findone(@Request() req) {
        
        
        return this.projectsService.findOne(req.body.email);
    }

   

    
    */
}