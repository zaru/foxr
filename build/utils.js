"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasKey = hasKey;
exports.waitForPort = exports.sleep = exports.checkPort = exports.getElementId = exports.mapEvaluateArgs = exports.MOUSE_BUTTON = exports.pWriteFile = void 0;

var _fs = require("fs");

var _util = require("util");

var _net = require("net");

var _JSHandle = _interopRequireDefault(require("./api/JSHandle"));

const pWriteFile = (0, _util.promisify)(_fs.writeFile);
exports.pWriteFile = pWriteFile;
const MOUSE_BUTTON = {
  left: 0,
  middle: 1,
  right: 2
};
exports.MOUSE_BUTTON = MOUSE_BUTTON;

const mapEvaluateArgs = args => args.map(arg => {
  if (arg instanceof _JSHandle.default) {
    return arg._handleId;
  }

  return arg;
});

exports.mapEvaluateArgs = mapEvaluateArgs;

const getElementId = JSHandleId => Object.values(JSHandleId)[0];

exports.getElementId = getElementId;

function hasKey(obj, key) {
  return key in obj;
}

const CHECK_PORT_TIMEOUT = 200;

const checkPort = (host, port) => {
  return new Promise(resolve => {
    const socket = new _net.Socket();
    let isAvailablePort = false;
    socket.setTimeout(CHECK_PORT_TIMEOUT).once('connect', () => {
      isAvailablePort = true;
      socket.destroy();
    }).once('timeout', () => {
      socket.destroy();
    }).once('error', () => {
      resolve(false);
    }).once('close', () => {
      if (isAvailablePort) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).connect(port, host);
  });
};

exports.checkPort = checkPort;

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

exports.sleep = sleep;

const waitForPort = async (host, port) => {
  while (!(await checkPort(host, port))) {
    await sleep(CHECK_PORT_TIMEOUT);
  }
};

exports.waitForPort = waitForPort;