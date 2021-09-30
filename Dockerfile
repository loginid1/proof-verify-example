FROM node:16-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install json -g
RUN json -I -f package.json -e 'this.proxy="http://server:3001"'
RUN npm uninstall json -g
