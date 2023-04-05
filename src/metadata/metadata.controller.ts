import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service'

@Controller()
export class MetadataController {

    constructor(
    private metadataService: MetadataService){}

    @Get('/metadata')
    async metadata(@Request() req) {
      
      return this.metadataService.findAll();
    }

    @Get('/buildFilters')
    async buildFilters(@Request() req) {
      
      return this.metadataService.buildFilters();
    }
   
}