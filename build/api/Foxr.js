"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _execa = _interopRequireDefault(require("execa"));

var _signalExit = _interopRequireDefault(require("signal-exit"));

var _Marionette = _interopRequireDefault(require("../Marionette"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _utils = require("../utils");

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 2828;

class Foxr {
  async _setViewport(send, {
    width,
    height
  }) {
    const {
      value: result
    } = await send('WebDriver:ExecuteScript', {
      script: `return {
        widthDelta: window.outerWidth - window.innerWidth,
        heightDelta: window.outerHeight - window.innerHeight
      }`
    });
    await send('WebDriver:SetWindowRect', {
      width: width + result.widthDelta,
      height: height + result.heightDelta
    });
  }

  async connect(options) {
    const {
      host,
      port,
      defaultViewport: {
        width,
        height
      }
    } = {
      host: DEFAULT_HOST,
      port: DEFAULT_PORT,
      ...options,
      defaultViewport: {
        width: 800,
        height: 600,
        ...(options && options.defaultViewport)
      }
    };
    const marionette = new _Marionette.default();
    await marionette.connect(host, port);
    await marionette.send('WebDriver:NewSession', {
      capabilities: {}
    });
    await this._setViewport(marionette.send, {
      width,
      height
    });
    const browser = new _Browser.default({
      send: marionette.send
    });
    marionette.once('close', async ({
      isManuallyClosed
    }) => {
      if (!isManuallyClosed) {
        browser.emit('disconnected');
      }
    });
    browser.once('disconnected', () => {
      marionette.disconnect();
    });
    return browser;
  }

  async launch(userOptions) {
    const options = {
      headless: true,
      dumpio: false,
      ...userOptions
    };

    if (typeof options.executablePath !== 'string') {
      throw new Error('`executablePath` option is required, Foxr doesn\'t download Firefox automatically');
    }

    const args = ['-headless'];

    if (Array.isArray(options.args)) {
      args.push(...options.args);
    }

    const firefoxProcess = (0, _execa.default)(options.executablePath, args, {
      detached: true,
      stdio: options.dumpio ? 'inherit' : 'ignore'
    });
    (0, _signalExit.default)(() => {
      firefoxProcess.kill();
    });
    firefoxProcess.unref();
    await (0, _utils.waitForPort)(DEFAULT_HOST, DEFAULT_PORT);
    return this.connect(options);
  }

}

var _default = Foxr;
exports.default = _default;