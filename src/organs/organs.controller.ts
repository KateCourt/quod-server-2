import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { OrgansService } from './organs.service'


@Controller()
export class OrgansController {
    constructor(
    private organsService: OrgansService){}


    @Get('/allOrgans')
    async allOrgans(@Request() req) {
      
      return this.organsService.findAll();
    }

    @Post('/pageOrgans')
    async pagRegions(@Request() req) {
        return this.organsService.findAllPaginate(req.body);
    }

    @Get('/oneOrgan/:organID')
    async oneOrgan(@Param('organID') id: number){
      
      return this.organsService.findOne(id);
    }

    @Post('/filterOrgans')
    async filterOrgans(@Request() req) {
        return this.organsService.filterOrgans(req.body);
    }

    @Post('/filterOrgansByID')
    async filterOrgansByID(@Request() req) {
      
        return this.organsService.filterOrgans(req.body);
    }
}