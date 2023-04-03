import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// checks required env variables are set
async function loadEnvVars() {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  // if (process.env.DB_CONNECTION_STRING === undefined) {
  //   
  // }

  // else {
  //   
  // }

  if (process.env.JWT_SECRET === undefined) {
    
  }
  else {
    
    
  }
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}

loadEnvVars().then(() => {
  bootstrap();
});
