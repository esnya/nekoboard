# Nekoboard
[![Build Status](https://img.shields.io/travis/ukatama/nekoboard/master.svg?style=flat-square)](https://travis-ci.org/ukatama/nekoboard)
[![Coverage Status](https://img.shields.io/coveralls/ukatama/nekoboard.svg?style=flat-square)](https://coveralls.io/github/ukatama/nekoboard)
[![PeerDependencies](https://img.shields.io/david/peer/ukatama/nekoboard.svg?style=flat-square)](https://david-dm.org/ukatama/nekoboard#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/ukatama/nekoboard.svg?style=flat-square)](https://david-dm.org/ukatama/nekoboard)
[![DevDependencies](https://img.shields.io/david/dev/ukatama/nekoboard.svg?style=flat-square)](https://david-dm.org/ukatama/nekoboard#info=devDependencies&view=list)

Online whiteboard made for tabletop role-play games.

## Requirements
* Node.js and npm
* Redis

## Installation
1. Clone

  ```bash
  $ git clone --recursive https://github.com/ukatama/nekoboard.git
  $ cd nekoboard
  ```

2. Install dependencies

  ```bash
  $ npm install
  ```

3. Build

  ```bash
  $ npm run build
  ```

## Usage
You can run Nekoboard as a standalone server.

```bash
$ npm start
```

## Gulp tasks
* `build`: Build with babel and browserify.
* `test`: Test with Jest/Jasmine and ESLint.
* `watch`: Watch changes and runs `build` and `test`.

## Contributing
Open Issue or Pull Request.

## License
MIT License
