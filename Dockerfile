FROM node:16

## Create and set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Create empty env file
RUN touch .env

## Copy configuration files
COPY package.json /usr/src/app/
COPY nest-cli.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
COPY tsconfig.build.json /usr/src/app/

## Copy source code
COPY /src /usr/src/app/src

## Install Dependencies and Build
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
