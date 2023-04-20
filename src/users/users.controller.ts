import { Controller, Get, Request, Post, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class UsersController {
    constructor(
        private usersService: UsersService) { }

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



    @Post('users/reset')
    async reset(@Request() req) {
        
        
        return this.usersService.reset(req.body.resetUser);
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