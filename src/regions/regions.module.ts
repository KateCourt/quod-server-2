import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { Region } from './regions.entity';
import { CsvModule } from 'nest-csv-parser';
import { MetadataModule } from 'src/metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([Region]),
  CsvModule,
  MetadataModule ],
  providers: [RegionsService],
  controllers: [RegionsController],
  exports: [RegionsService, TypeOrmModule]
})
export class RegionsModule {}
