import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
import { Donor } from './donors.entity';
import { CsvModule } from 'nest-csv-parser'

@Module({
  imports: [TypeOrmModule.forFeature([Donor]),
  CsvModule ],
  providers: [DonorsService],
  controllers: [DonorsController],
  exports: [DonorsService, TypeOrmModule]
})
export class DonorsModule {}
