"use strict";

class Logger {
  static log(message) {
    console.log([LOG] );
  }

  static error(message) {
    console.error([ERROR] );
  }
}

module.exports = Logger;
