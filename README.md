# Nekoboard
[![Build Status](https://img.shields.io/travis/ukatama/nekoboard/master.svg?style=flat-square)](https://travis-ci.org/ukatama/nekoboard)
[![Coverage Status](https://img.shields.io/coveralls/ukatama/nekoboard.svg?style=flat-square)](https://coveralls.io/github/ukatama/nekoboard)
[![PeerDependencies](https://img.shields.io/david/peer/ukatama/nekoboard.svg?style=flat-square)](https://david-dm.org/ukatama/nekoboard#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/ukatama/nekoboard.svg?style=flat-square)](https://david-dm.org/ukatama/nekoboard)
[![DevDependencies](https://img.shields.io/david/dev/ukatama/nekoboard.svg?style=flat-square)](https://david-dm.org/ukatama/nekoboard#info=devDependencies&view=list)

Online whiteboard made for tabletop role-play games.

![Screenshot](https://rawgit.com/ukatama/nekoboard/master/docs/img/ss01.png)

## Requirements
* Node.js and npm
* Redis

## As a Docker container

```
$ docker run -d --name redis redis
$ docker run -d \
    --name nekoboard \
    -p 80:80 \
    --env NODE_ENV=production \
    --link redis:redis \
    -v /path/to/nekoboard/config.yml:/usr/src/app/config/local.yml:ro \
    nekorpg/nekoboard
```

## As a Node.js application

1. Clone

  ```bash
  $ git clone https://github.com/ukatama/nekoboard.git
  $ cd nekoboard
  ```

2. Install dependencies

  ```bash
  $ npm install
  ```

3. Build

  ```bash
  $ npm run production
  ```

4. Run

  ```bash
  $ NODE_ENV=production npm start
  ```

## Contributing
Open Issue or Pull Request.

## License
MIT License
