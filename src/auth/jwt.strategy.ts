import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,
    private usersService: UsersService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // FG TODO don't think this is working
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(username: string, password: string): Promise<any> {
    
    const email = username;
    const user = await this.usersService.findOne(email);
    
    console.log('in jwt strategy validate on server')
    const result = await this.authService.validateUser(user, password); //doesn't wait long enough, gets undefined
    console.log('authservice')
    console.log(result)

    if (!result) {
      throw new UnauthorizedException('error at validation stage');
    }
    return result;
  }
}