import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgansService } from './organs.service';
import { OrgansController } from './organs.controller';
import { Organ } from './organs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organ])],
  providers: [OrgansService],
  controllers: [OrgansController],
  exports: [OrgansService, TypeOrmModule]
})
export class OrgansModule {}
