"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JSHandle = _interopRequireDefault(require("./JSHandle"));

var _utils = require("../utils");

var _keys = _interopRequireDefault(require("../keys"));

class ElementHandle extends _JSHandle.default {
  constructor(params) {
    super(params);
    this._page = params.page;
    this._send = params.send;
    this._actionId = null;
  }

  async _scrollIntoView() {
    await this._page.evaluate(el => {
      el.scrollIntoView();
    }, this._handleId);
  }

  async $(selector) {
    try {
      const id = await this._send('WebDriver:FindElement', {
        element: this._elementId,
        value: selector,
        using: 'css selector'
      }, 'value');
      return new ElementHandle({
        page: this._page,
        id,
        send: this._send
      });
    } catch (err) {
      if (err.message.startsWith('Unable to locate element')) {
        return null;
      }

      throw err;
    }
  }

  async $$(selector) {
    const ids = await this._send('WebDriver:FindElements', {
      element: this._elementId,
      value: selector,
      using: 'css selector'
    });
    return ids.map(id => new ElementHandle({
      page: this._page,
      id,
      send: this._send
    }));
  }

  async click(userOptions) {
    const options = {
      button: 'left',
      clickCount: 1,
      ...userOptions
    };
    const mouseButton = _utils.MOUSE_BUTTON[options.button];
    await this._scrollIntoView();
    const id = await this._send('Marionette:ActionChain', {
      chain: [['click', this._elementId, mouseButton, options.clickCount]],
      nextId: this._actionId
    }, 'value');
    this._actionId = id;
  }

  async focus() {
    await this._send('WebDriver:ExecuteScript', {
      'script': 'arguments[0].focus()',
      args: [this._handleId]
    });
  }

  async hover() {
    await this._scrollIntoView();
    const id = await this._send('Marionette:ActionChain', {
      chain: [['move', this._elementId]],
      nextId: this._actionId
    }, 'value');
    this._actionId = id;
  }

  async press(key) {
    if ((0, _utils.hasKey)(_keys.default, key)) {
      await this._send('WebDriver:ElementSendKeys', {
        id: this._elementId,
        text: _keys.default[key]
      });
      return;
    }

    if (key.length === 1) {
      await this._send('WebDriver:ElementSendKeys', {
        id: this._elementId,
        text: key
      });
      return;
    }

    throw new Error(`Unknown key: ${key}`);
  }

  async screenshot(options = {}) {
    const result = await this._send('WebDriver:TakeScreenshot', {
      id: this._elementId,
      full: false,
      hash: false
    }, 'value');
    const buffer = Buffer.from(result, 'base64');

    if (typeof options.path === 'string') {
      await (0, _utils.pWriteFile)(options.path, buffer);
    }

    return buffer;
  }

  async type(text) {
    await this._send('WebDriver:ElementSendKeys', {
      id: this._elementId,
      text
    });
  }

}

var _default = ElementHandle;
exports.default = _default;