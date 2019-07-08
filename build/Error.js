"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FoxrError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, FoxrError);
    this.name = 'FoxrError';
  }

}

exports.default = FoxrError;