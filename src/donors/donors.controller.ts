import { Controller, Get, Request, Post, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DonorsService } from './donors.service'
import { FileInterceptor } from '@nestjs/platform-express';
import { csvFileFilter } from '../utils/file-uploading.utils';
import { diskStorage } from 'multer';
@Controller()
export class DonorsController {
    constructor(
    private donorsService: DonorsService){}

    @Get('/allDonors')
    async allDonors(@Request() req) {
      
      return this.donorsService.findAll();
    }

    @Get('/oneDonor/:donorachieverID')
    async oneDonor(@Param('donorachieverID') id: string){
      
      return this.donorsService.findOne(id);
    }

    @Post('/filterDonors')
    async filterDonors(@Request() req) {
      
      
        return this.donorsService.filterDonors(req.body);
    }


    @Post('/Donor/upload')
  @UseInterceptors(
    FileInterceptor('donordata', {
      fileFilter: csvFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return this.donorsService.uploadDonors(file)
  }



}