import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,
    private usersService: UsersService,) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    
    const email = username;
    const user = await this.usersService.findOne(email);
    
    
    const result = await this.authService.validateUser(user, password); //doesn't wait long enough, gets undefined
    
    if (!result) {
      throw new UnauthorizedException('error at validation stage');
    }
    return result;
  }
}