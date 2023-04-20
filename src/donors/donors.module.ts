import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
import { Donor } from './donors.entity';
import { CsvModule } from 'nest-csv-parser'
import { MetadataModule } from '../metadata/metadata.module';


@Module({
  imports: [
  TypeOrmModule.forFeature([Donor]), 
  CsvModule,
  MetadataModule ],
  providers: [DonorsService],
  controllers: [DonorsController],
  exports: [DonorsService, TypeOrmModule]
})
export class DonorsModule {}
