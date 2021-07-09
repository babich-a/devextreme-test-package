/**
 * DevExtreme (ui/html_editor/quill_importer.js)
 * Version: 20.2.7 (build 21147-0311)
 * Build date: Thu May 27 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getQuill = getQuill;
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function getQuill() {
    if (!_devextremeQuill.default) {
        throw _ui.default.Error("E1041", "Quill")
    }
    return _devextremeQuill.default
}
