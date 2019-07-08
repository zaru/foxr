"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

var _utils = require("../utils");

const cache = new Map();

class JSHandle extends _events.default {
  constructor(params) {
    super();
    this._handleId = params.id;
    this._elementId = (0, _utils.getElementId)(params.id);

    if (cache.has(this._elementId)) {
      return cache.get(this._elementId);
    }

    cache.set(this._elementId, this);
    params.page.on('close', () => {
      cache.clear();
    });
  }

}

var _default = JSHandle;
exports.default = _default;