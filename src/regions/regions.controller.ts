import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { RegionsService } from './regions.service'


@Controller()
export class RegionsController {
    constructor(
    private regionsService: RegionsService){}


    @Get('/allRegions')
    async allRegions(@Request() req) {
        
        return this.regionsService.findAll();
    }

    @Get('/oneRegion/:regionID')
    async oneOrgan(@Param('regionID') id: number){
      
      return this.regionsService.findOne(id);
    }

    @Post('/pagRegions')
    async pagRegions(@Request() req) {
        return this.regionsService.findAllPaginate(req.body);
    }


    @Post('/filterRegions')
    async filterRegions(@Request() req) {
      
        return this.regionsService.filterRegions(req.body);
    }

    @Post('/filterRegionsByID')
    async filterRegionsByID(@Request() req) {
        return this.regionsService.filterRegionsByDonorID(req.body);
    }
    
    


    @Post('multiRegion')
    async multiRegions(@Request() req) {
        
        
        return this.regionsService.findMulti(req.body.basket);
    }
}