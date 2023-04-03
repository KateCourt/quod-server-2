import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { Metadata } from './metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metadata])],
  providers: [MetadataService],
  controllers: [MetadataController],
  exports: [MetadataService, TypeOrmModule]
})
export class MetadataModule {}
