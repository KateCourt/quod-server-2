import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service'


@Controller()
export class RequestsController {
    constructor(
        private requestsService: RequestsService) { }

    @Post('/requests/view/filter')
    async filterRequests(@Request() req) {
        return this.requestsService.filterRequests(req.body);
    }
    

    @Post('/requests/view')
    async pagRequests(@Request() req) {
        return this.requestsService.findAllPaginate(req.body);
    }

    @Post('requests/create')
    async createRequest(@Request() req) {
        
        
        return this.requestsService.create(req.body.request);
    }

    @Post('requests/update')
    async update(@Request() req) {
        
        
        return this.requestsService.update(req.body.request);
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