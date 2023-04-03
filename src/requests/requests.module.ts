import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from './requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestsService],
  controllers: [RequestsController],
  exports: [RequestsService, TypeOrmModule]
})
export class RequestsModule {}
