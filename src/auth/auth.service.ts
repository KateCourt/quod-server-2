import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    // TODO send error back when wrong password or not accepted
    async validateUser(user, pass): Promise<any> {

        
        

        if (user.status === 'Accepted') {
        const comparepasswords = await new Promise((resolve, reject) => {
            bcrypt.compare(pass, user.password, (error, match) => {

                if (!match) {
                    
                    reject ('Incorrect password, please try again' + error);
                    
                } else {
                    
                    const { password, ...result } = user;
                    resolve(result);
                    
                }

            });
        }) 
        return comparepasswords;
            

        }
        else {
            return new HttpException('User access not authorized', HttpStatus.BAD_REQUEST);
        }
    };




    async login(user: any) {
        
        
        const payload = { email: user.email, sub: user.user_id };
        
        
        
        return {
            user_id: user.user_id,
            email: user.email,
            token: this.jwtService.sign(payload),
            role: user.role
        };
    }
}