import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SamplesService } from './samples.service';
import {SamplesController } from './samples.controller';
import { Sample } from './samples.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [SamplesService],
  controllers: [SamplesController],
  exports: [SamplesService, TypeOrmModule]
})
export class SamplesModule {}
