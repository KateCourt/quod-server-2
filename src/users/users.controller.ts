import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'


@Controller()
export class UsersController {
    constructor(
        private usersService: UsersService) { }

    /* 
       @Get('/allSamples')
        async allSamples(@Request() req) {
            
            return this.samplesService.findAll();
        }
    
        @Get('/oneSample/:sampleID')
        async oneOrgan(@Param('sampleID') id: number){
          
          return this.samplesService.findOne(id);
        }*/

    @Post('/users/view')
    async pagUsers(@Request() req) {
        return this.usersService.findAllPaginate(req.body);
    }

    @Post('users/findall')
    async findall(@Request() req) {
        
        return this.usersService.findAll();
    }

    @Post('users/findone')
    async findone(@Request() req) {
        
        
        return this.usersService.findOne(req.body.email);
    }

    @Post('users/update/status')
    async updatestatus(@Request() req) {
        
        
        return this.usersService.updateStatus(req.body.id, req.body.status);
    }

    @Post('users/update/role')
    async updaterole(@Request() req) {
        
        
        return this.usersService.updateRole(req.body.id, req.body.role);
    }

    @Post('users/create')
    async register(@Request() req) {
        
        
        return this.usersService.create(req.body.user);
    }

    @Post('users/update')
    async update(@Request() req) {
        
        
        return this.usersService.update(req.body.user);
    }
}