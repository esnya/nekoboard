FROM node:6.2
MAINTAINER ukatama dev.ukatama@gmail.com

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app
RUN npm run production

EXPOSE 80
CMD ["npm", "start"]
