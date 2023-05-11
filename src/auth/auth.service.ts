import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import sgMail = require('@sendgrid/mail');
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    // TODO send error back when wrong password or not accepted
    async validateUser(user, pass): Promise<any> {

        const comparepasswords = await new Promise((resolve, reject) => {
            bcrypt.compare(pass, user.password, (error, match) => {

                if (!match) {

                    reject('Incorrect password, please try again' + error);

                } else {

                    const { password, ...result } = user;
                    resolve(result);

                }

            });
        })
        console.log('comapre passwords')
        console.log(comparepasswords)
        return comparepasswords;

    };

    async forgot(email) {
        // check if user already exists
        const userInDb = await this.usersService.findOne(email);
        const userID = userInDb.user_id;
        if (!userInDb) {
          throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
    
        // generate token
        const token = await this.generateNewPasswordToken(email, userID)
        // save it as password
        userInDb.password = token
    
        try {
          let result = await this.usersService.update(userInDb);
    
          // send it via email
          // using Twilio SendGrid's v3 Node.js Library
          // https://github.com/sendgrid/sendgrid-nodejs
    console.log(userInDb)
          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          const msg = {
            to: userInDb.email, // Change to your recipient
            from: 'rseteam.ncl@gmail.com', // change to the @newcastle one soon
            subject: 'Password Reset Request',
            html: '<p>Please copy token into linked form. Token :</p> ' + token + '<p>Link:</p><a href=quodstorage.z33.web.core.windows.net/#/reset>quodstorage.z33.web.core.windows.net/#/reset</a>',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
    
    
          return result
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    
      }

    async generateNewPasswordToken(email, user_id){
        const payload = { email: email, sub: user_id };

        return this.jwtService.sign(payload)
    }

    async login(user: any) {


        const payload = { email: user.email, sub: user.user_id };



        return {
            user_id: user.user_id,
            email: user.email,
            token: this.jwtService.sign(payload),
            role: user.role,
            status: user.status
        };
    }
}