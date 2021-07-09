/**
 * DevExtreme (integration/knockout/utils.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getClosestNodeWithContext = void 0;
var _knockout = _interopRequireDefault(require("knockout"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getClosestNodeWithContext = function getClosestNodeWithContext(node) {
    var context = _knockout.default.contextFor(node);
    if (!context && node.parentNode) {
        return getClosestNodeWithContext(node.parentNode)
    }
    return node
};
exports.getClosestNodeWithContext = getClosestNodeWithContext;
