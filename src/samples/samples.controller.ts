import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { SamplesService } from './samples.service'


@Controller()
export class SamplesController {
    constructor(
    private samplesService: SamplesService){}


    @Get('/allSamples')
    async allSamples(@Request() req) {
        
        return this.samplesService.findAll();
    }

    @Get('/oneSample/:sampleID')
    async oneOrgan(@Param('sampleID') id: number){
      
      return this.samplesService.findOne(id);
    }

    @Post('/pageSamples')
    async pageSamples(@Request() req) {
        return this.samplesService.findAllPaginate(req.body);
    }


    @Post('/filterSamples')
    async filterSamples(@Request() req) {
      
        return this.samplesService.filterSamples(req.body);
    }


    @Post('/filterSamplesByRegionID')
    async filterRegionsByID(@Request() req) {
        return this.samplesService.filterSamplesByRegionID(req.body);
    }

    @Post('multiSample')
    async multiSamples(@Request() req) {
        
        
        return this.samplesService.findMulti(req.body.basket);
    }
}