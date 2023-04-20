import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CsvModule } from 'nest-csv-parser'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { DonorsModule } from './donors/donors.module';
import { Donor } from './donors/donors.entity';
import { OrgansModule } from './organs/organs.module';
import { Organ } from './organs/organs.entity';
import { RegionsModule } from './regions/regions.module';
import { Region } from './regions/regions.entity';
import { SamplesModule } from './samples/samples.module';
import { Sample } from './samples/samples.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/projects.entity';
import { RequestsModule } from './requests/requests.module';
import { Request } from './requests/requests.entity';
import { MetadataModule } from './metadata/metadata.module';
import { Metadata } from './metadata/metadata.entity';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Donor, Organ, Region, Sample, Project, Request, Metadata],
      synchronize: true, /*shouldn't be used in prod*/
      ssl: true   /*for live only*/
      }), 
      MulterModule.register({
        dest: './QuOD-Server',
      }),
      CsvModule, AuthModule, UsersModule, DonorsModule, OrgansModule, RegionsModule, SamplesModule, ProjectsModule, RequestsModule, MetadataModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
