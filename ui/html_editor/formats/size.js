/**
 * DevExtreme (ui/html_editor/formats/size.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SizeStyle = {};
if (_devextremeQuill.default) {
    SizeStyle = _devextremeQuill.default.import("attributors/style/size");
    SizeStyle.whitelist = null
}
var _default = SizeStyle;
exports.default = _default;
module.exports = exports.default;
