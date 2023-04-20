import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SamplesService } from './samples.service';
import {SamplesController } from './samples.controller';
import { Sample } from './samples.entity';
import { CsvModule } from 'nest-csv-parser'
import { MetadataModule } from '../metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sample]), 
  CsvModule,
  MetadataModule ],
  providers: [SamplesService],
  controllers: [SamplesController],
  exports: [SamplesService, TypeOrmModule]
})
export class SamplesModule {}
