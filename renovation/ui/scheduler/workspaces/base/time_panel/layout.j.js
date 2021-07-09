/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/time_panel/layout.j.js)
 * Version: 20.2.7 (build 21147-0311)
 * Build date: Thu May 27 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../../core/component_registrator"));
var _component = _interopRequireDefault(require("../../../../../preact_wrapper/component"));
var _layout = require("./layout");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var TimePanelTableLayout = function(_BaseComponent) {
    _inheritsLoose(TimePanelTableLayout, _BaseComponent);

    function TimePanelTableLayout() {
        return _BaseComponent.apply(this, arguments) || this
    }
    var _proto = TimePanelTableLayout.prototype;
    _proto.getProps = function() {
        var props = _BaseComponent.prototype.getProps.call(this);
        props.timeCellTemplate = this._createTemplateComponent(props, props.timeCellTemplate);
        props.dataCellTemplate = this._createTemplateComponent(props, props.dataCellTemplate);
        return props
    };
    _createClass(TimePanelTableLayout, [{
        key: "_propsInfo",
        get: function() {
            return {
                twoWay: [],
                allowNull: [],
                elements: []
            }
        }
    }, {
        key: "_viewComponent",
        get: function() {
            return _layout.TimePanelTableLayout
        }
    }]);
    return TimePanelTableLayout
}(_component.default);
exports.default = TimePanelTableLayout;
(0, _component_registrator.default)("dxTimePanelTableLayout", TimePanelTableLayout);
module.exports = exports.default;
