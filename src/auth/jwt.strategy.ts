import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // FG TODO don't think this is working
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    return { user_id: payload.sub, username: payload.username };
  }
}