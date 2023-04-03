import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service'
import { DonorsService } from './donors/donors.service'
import { OrgansService } from './organs/organs.service'
import { RegionsService } from './regions/regions.service';
import { SamplesService } from './samples/samples.service'

@Controller()
export class AppController {
  constructor(
    private authService: AuthService, 
    private usersService: UsersService,
    private donorsService: DonorsService,
    private organsService: OrgansService,
    private regionsService: RegionsService,
    private samplesService: SamplesService
    ) {}

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