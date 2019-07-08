"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

var _Page = _interopRequireDefault(require("./Page"));

class Browser extends _events.default {
  constructor(arg) {
    super();
    this._send = arg.send;
  }

  async close() {
    await this._send('Marionette:AcceptConnections', {
      value: false
    });
    await this._send('Marionette:Quit');
    this.emit('disconnected');
  }

  async disconnect() {
    await this._send('WebDriver:DeleteSession');
    this.emit('disconnected');
  }

  async install(path, isTemporary) {
    const {
      value
    } = await this._send('Addon:Install', {
      path,
      temporary: isTemporary
    });
    return value;
  }

  async newPage() {
    await this._send('WebDriver:ExecuteScript', {
      script: 'window.open()'
    });
    const pages = await this._send('WebDriver:GetWindowHandles');
    const newPageId = pages[pages.length - 1];
    await this._send('WebDriver:SwitchToWindow', {
      name: newPageId,
      focus: true
    });
    return new _Page.default({
      browser: this,
      id: newPageId,
      send: this._send
    });
  }

  async pages() {
    const ids = await this._send('WebDriver:GetWindowHandles');
    return ids.map(id => new _Page.default({
      browser: this,
      id,
      send: this._send
    }));
  }

  async uninstall(id) {
    await this._send('Addon:Uninstall', {
      id
    });
  }

}

var _default = Browser;
exports.default = _default;