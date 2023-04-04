import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service'
import { DonorsService } from './donors/donors.service'
import { OrgansService } from './organs/organs.service'
import { RegionsService } from './regions/regions.service';
import { SamplesService } from './samples/samples.service'
import * as Sentry from "@sentry/node";
// Importing @sentry/tracing patches the global hub for tracing to work.
import "@sentry/tracing";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService, 
    private usersService: UsersService,
    private donorsService: DonorsService,
    private organsService: OrgansService,
    private regionsService: RegionsService,
    private samplesService: SamplesService
    ) {

      Sentry.init({
        dsn:  "https://147838f5b9cd46f2a914266f91a62e6d@o362620.ingest.sentry.io/6691090",
      
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
      });
    }



  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    
    
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('users/forgot')
  async forgot(@Request() req) {
      return this.authService.forgot(req.body.email);
  }

  @Post('/variedBasket')
    async variedBasket(@Request() req) {
        
        
        const basketList = {
            sampleList: await this.samplesService.findMulti(req.body.basket.samples),
            regionList: await this.regionsService.findMulti(req.body.basket.regions),
            organList: await this.organsService.findMulti(req.body.basket.organs),
        }
        
        
        return basketList
    }

}