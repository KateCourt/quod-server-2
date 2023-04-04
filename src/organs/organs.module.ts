import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgansService } from './organs.service';
import { OrgansController } from './organs.controller';
import { Organ } from './organs.entity';
import { CsvModule } from 'nest-csv-parser';
import { MetadataModule } from 'src/metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([Organ]),
  CsvModule,
  MetadataModule ],
  providers: [OrgansService],
  controllers: [OrgansController],
  exports: [OrgansService, TypeOrmModule]
})
export class OrgansModule {}
