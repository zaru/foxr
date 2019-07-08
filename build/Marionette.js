"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

var _net = require("net");

var _Error = _interopRequireDefault(require("./Error"));

var _jsonProtocol = require("./json-protocol");

const CONNECTION_TIMEOUT = 10000;

class Marionette extends _events.default {
  constructor() {
    super();
    this.globalId = 0;
    this.queue = [];
    this.socket = new _net.Socket();
    this.isManuallyClosed = false;
    this.send = this.send.bind(this);
  }

  async connect(host, port) {
    await new Promise((resolve, reject) => {
      const rejectAndDestroy = error => {
        reject(error);
        this.socket.destroy();
      };

      this.socket.setTimeout(CONNECTION_TIMEOUT).once('connect', () => {
        this.socket.once('data', rawData => {
          const data = (0, _jsonProtocol.parse)(rawData);

          if (data.applicationType === 'gecko') {
            if (data.marionetteProtocol === 3) {
              return resolve();
            }

            return rejectAndDestroy(new _Error.default('Foxr works only with Marionette protocol v3'));
          }

          rejectAndDestroy(new _Error.default('Unsupported Marionette protocol'));
        });
      }).once('timeout', () => rejectAndDestroy(new Error('Socket connection timeout'))).once('error', err => rejectAndDestroy(err)).once('end', () => {
        this.emit('close', {
          isManuallyClosed: this.isManuallyClosed
        });
      }).connect(port, host);
    });
    const parseStream = (0, _jsonProtocol.createParseStream)();
    parseStream.on('data', data => {
      const [type, id, error, result] = data;

      if (type === 1) {
        this.queue = this.queue.filter(item => {
          if (item.id === id) {
            if (error !== null) {
              item.reject(new _Error.default(error.message));
            } else if (typeof item.key === 'string') {
              item.resolve(result[item.key]);
            } else {
              item.resolve(result);
            }

            return false;
          }

          return true;
        });
      }
    });
    this.socket.pipe(parseStream);
  }

  disconnect() {
    this.isManuallyClosed = true;
    this.socket.end();
  }

  async send(name, params = {}, key) {
    return new Promise((resolve, reject) => {
      const data = (0, _jsonProtocol.stringify)([0, this.globalId, name, params]);
      this.socket.write(data, 'utf8', () => {
        this.queue.push({
          id: this.globalId,
          key,
          resolve,
          reject
        });
        this.globalId += 1;
      });
    });
  }

}

var _default = Marionette;
exports.default = _default;