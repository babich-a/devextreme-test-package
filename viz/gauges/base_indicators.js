/**
 * DevExtreme (viz/gauges/base_indicators.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.BaseRangeBar = exports.BaseTextCloudMarker = exports.BaseIndicator = exports.BaseElement = void 0;
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _base_gauge = require("./base_gauge");
var _utils = require("../core/utils");
var _extend = require("../../core/utils/extend");
var _class = _interopRequireDefault(require("../../core/class"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _isFinite = isFinite;
var _Number = Number;
var _round = Math.round;
var _formatValue = _base_gauge.formatValue;
var _getSampleText = _base_gauge.getSampleText;
var BaseElement = _class.default.inherit({
    ctor: function(parameters) {
        var that = this;
        (0, _iterator.each)(parameters, function(name, value) {
            that["_" + name] = value
        });
        that._init()
    },
    dispose: function() {
        var that = this;
        that._dispose();
        (0, _iterator.each)(that, function(name) {
            that[name] = null
        });
        return that
    },
    getOffset: function() {
        return _Number(this._options.offset) || 0
    }
});
exports.BaseElement = BaseElement;
var BaseIndicator = BaseElement.inherit({
    _init: function() {
        var that = this;
        that._rootElement = that._createRoot().linkOn(that._owner, {
            name: "value-indicator",
            after: "core"
        });
        that._trackerElement = that._createTracker()
    },
    _dispose: function() {
        this._rootElement.linkOff()
    },
    _setupAnimation: function() {
        var that = this;
        if (that._options.animation) {
            that._animation = {
                step: function(pos) {
                    that._actualValue = that._animation.start + that._animation.delta * pos;
                    that._actualPosition = that._translator.translate(that._actualValue);
                    that._move()
                },
                duration: that._options.animation.duration > 0 ? _Number(that._options.animation.duration) : 0,
                easing: that._options.animation.easing
            }
        }
    },
    _runAnimation: function(value) {
        var that = this;
        var animation = that._animation;
        animation.start = that._actualValue;
        animation.delta = value - that._actualValue;
        that._rootElement.animate({
            _: 0
        }, {
            step: animation.step,
            duration: animation.duration,
            easing: animation.easing
        })
    },
    _createRoot: function() {
        return this._renderer.g().attr({
            "class": this._className
        })
    },
    _createTracker: function() {
        return this._renderer.path([], "area")
    },
    _getTrackerSettings: _common.noop,
    clean: function() {
        var that = this;
        that._animation && that._rootElement.stopAnimation();
        that._rootElement.linkRemove().clear();
        that._clear();
        that._tracker.detach(that._trackerElement);
        that._options = that.enabled = that._animation = null;
        return that
    },
    render: function(options) {
        var that = this;
        that.type = options.type;
        that._options = options;
        that._actualValue = that._currentValue = that._translator.adjust(that._options.currentValue);
        that.enabled = that._isEnabled();
        if (that.enabled) {
            that._setupAnimation();
            that._rootElement.attr({
                fill: that._options.color
            }).linkAppend();
            that._tracker.attach(that._trackerElement, that, that._trackerInfo)
        }
        return that
    },
    resize: function(layout) {
        var that = this;
        that._rootElement.clear();
        that._clear();
        that.visible = that._isVisible(layout);
        if (that.visible) {
            (0, _extend.extend)(that._options, layout);
            that._actualPosition = that._translator.translate(that._actualValue);
            that._render();
            that._trackerElement.attr(that._getTrackerSettings());
            that._move()
        }
        return that
    },
    value: function(arg, _noAnimation) {
        var that = this;
        var val;
        var rootElement = this._rootElement;
        var visibility = null;
        if (void 0 === arg) {
            return that._currentValue
        }
        if (null === arg) {
            visibility = "hidden";
            that._currentValue = arg
        } else {
            val = that._translator.adjust(arg);
            if (that._currentValue !== val && _isFinite(val)) {
                that._currentValue = val;
                if (that.visible) {
                    if (that._animation && !_noAnimation) {
                        that._runAnimation(val)
                    } else {
                        that._actualValue = val;
                        that._actualPosition = that._translator.translate(val);
                        that._move()
                    }
                }
            }
        }
        rootElement.attr({
            visibility: visibility
        });
        return that
    },
    _isEnabled: null,
    _isVisible: null,
    _render: null,
    _clear: null,
    _move: null
});
exports.BaseIndicator = BaseIndicator;
var COEFFICIENTS_MAP = {};
COEFFICIENTS_MAP["right-bottom"] = COEFFICIENTS_MAP.rb = [0, -1, -1, 0, 0, 1, 1, 0];
COEFFICIENTS_MAP["bottom-right"] = COEFFICIENTS_MAP.br = [-1, 0, 0, -1, 1, 0, 0, 1];
COEFFICIENTS_MAP["left-bottom"] = COEFFICIENTS_MAP.lb = [0, -1, 1, 0, 0, 1, -1, 0];
COEFFICIENTS_MAP["bottom-left"] = COEFFICIENTS_MAP.bl = [1, 0, 0, -1, -1, 0, 0, 1];
COEFFICIENTS_MAP["left-top"] = COEFFICIENTS_MAP.lt = [0, 1, 1, 0, 0, -1, -1, 0];
COEFFICIENTS_MAP["top-left"] = COEFFICIENTS_MAP.tl = [1, 0, 0, 1, -1, 0, 0, -1];
COEFFICIENTS_MAP["right-top"] = COEFFICIENTS_MAP.rt = [0, 1, -1, 0, 0, -1, 1, 0];
COEFFICIENTS_MAP["top-right"] = COEFFICIENTS_MAP.tr = [-1, 0, 0, 1, 1, 0, 0, -1];

function getTextCloudInfo(options) {
    var x = options.x;
    var y = options.y;
    var type = COEFFICIENTS_MAP[options.type];
    var cloudWidth = options.cloudWidth;
    var cloudHeight = options.cloudHeight;
    var tailWidth;
    var tailHeight;
    var cx = x;
    var cy = y;
    tailWidth = tailHeight = options.tailLength;
    if (1 & type[0]) {
        tailHeight = Math.min(tailHeight, cloudHeight / 3)
    } else {
        tailWidth = Math.min(tailWidth, cloudWidth / 3)
    }
    return {
        cx: _round(cx + type[0] * tailWidth + (type[0] + type[2]) * cloudWidth / 2),
        cy: _round(cy + type[1] * tailHeight + (type[1] + type[3]) * cloudHeight / 2),
        points: [_round(x), _round(y), _round(x += type[0] * (cloudWidth + tailWidth)), _round(y += type[1] * (cloudHeight + tailHeight)), _round(x += type[2] * cloudWidth), _round(y += type[3] * cloudHeight), _round(x += type[4] * cloudWidth), _round(y += type[5] * cloudHeight), _round(x += type[6] * (cloudWidth - tailWidth)), _round(y += type[7] * (cloudHeight - tailHeight))]
    }
}
var BaseTextCloudMarker = BaseIndicator.inherit({
    _move: function() {
        var that = this;
        var options = that._options;
        var textCloudOptions = that._getTextCloudOptions();
        var text = _formatValue(that._actualValue, options.text);
        that._text.attr({
            text: text
        });
        var bBox = that._text.getBBox();
        var x = textCloudOptions.x;
        var y = textCloudOptions.y;
        var cloudWidth = (bBox.width || text.length * that._textUnitWidth) + 2 * options.horizontalOffset;
        var cloudHeight = (bBox.height || that._textHeight) + 2 * options.verticalOffset;
        var info = getTextCloudInfo({
            x: x,
            y: y,
            cloudWidth: cloudWidth,
            cloudHeight: cloudHeight,
            tailLength: options.arrowLength,
            type: that._correctCloudType(textCloudOptions.type, {
                x: x,
                y: y
            }, {
                width: cloudWidth,
                height: cloudHeight
            })
        });
        that._text.attr({
            x: info.cx,
            y: info.cy + that._textVerticalOffset
        });
        that._cloud.attr({
            points: info.points
        });
        that._trackerElement && that._trackerElement.attr({
            points: info.points
        })
    },
    _measureText: function() {
        var that = this;
        var root;
        var text;
        var bBox;
        var sampleText;
        if (!that._textVerticalOffset) {
            root = that._createRoot().append(that._owner);
            sampleText = _getSampleText(that._translator, that._options.text);
            text = that._renderer.text(sampleText, 0, 0).attr({
                align: "center"
            }).css((0, _utils.patchFontOptions)(that._options.text.font)).append(root);
            bBox = text.getBBox();
            root.remove();
            that._textVerticalOffset = -bBox.y - bBox.height / 2;
            that._textWidth = bBox.width;
            that._textHeight = bBox.height;
            that._textUnitWidth = that._textWidth / sampleText.length;
            that._textFullWidth = that._textWidth + 2 * that._options.horizontalOffset;
            that._textFullHeight = that._textHeight + 2 * that._options.verticalOffset
        }
    },
    _render: function() {
        var that = this;
        that._measureText();
        that._cloud = that._cloud || that._renderer.path([], "area").append(that._rootElement);
        that._text = that._text || that._renderer.text().append(that._rootElement);
        that._text.attr({
            align: "center"
        }).css((0, _utils.patchFontOptions)(that._options.text.font))
    },
    _clear: function() {
        delete this._cloud;
        delete this._text
    },
    getTooltipParameters: function() {
        var position = this._getTextCloudOptions();
        return {
            x: position.x,
            y: position.y,
            value: this._currentValue,
            color: this._options.color
        }
    },
    _correctCloudType: function(type) {
        return type
    }
});
exports.BaseTextCloudMarker = BaseTextCloudMarker;
var BaseRangeBar = BaseIndicator.inherit({
    _measureText: function() {
        var that = this;
        var root;
        var text;
        var bBox;
        that._hasText = that._isTextVisible();
        if (that._hasText && !that._textVerticalOffset) {
            root = that._createRoot().append(that._owner);
            text = that._renderer.text(_getSampleText(that._translator, that._options.text), 0, 0).attr({
                "class": "dxg-text",
                align: "center"
            }).css((0, _utils.patchFontOptions)(that._options.text.font)).append(root);
            bBox = text.getBBox();
            root.remove();
            that._textVerticalOffset = -bBox.y - bBox.height / 2;
            that._textWidth = bBox.width;
            that._textHeight = bBox.height
        }
    },
    _move: function() {
        var that = this;
        that._updateBarItemsPositions();
        if (that._hasText) {
            that._text.attr({
                text: _formatValue(that._actualValue, that._options.text)
            });
            that._updateTextPosition();
            that._updateLinePosition()
        }
    },
    _updateBarItems: function() {
        var that = this;
        var options = that._options;
        var spaceColor;
        var translator = that._translator;
        that._setBarSides();
        that._startPosition = translator.translate(translator.getDomainStart());
        that._endPosition = translator.translate(translator.getDomainEnd());
        that._basePosition = translator.translate(options.baseValue);
        that._space = that._getSpace();
        var backgroundColor = options.backgroundColor || "none";
        if ("none" !== backgroundColor && that._space > 0) {
            spaceColor = options.containerBackgroundColor || "none"
        } else {
            that._space = 0;
            spaceColor = "none"
        }
        that._backItem1.attr({
            fill: backgroundColor
        });
        that._backItem2.attr({
            fill: backgroundColor
        });
        that._spaceItem1.attr({
            fill: spaceColor
        });
        that._spaceItem2.attr({
            fill: spaceColor
        })
    },
    _getSpace: function() {
        return 0
    },
    _updateTextItems: function() {
        var that = this;
        if (that._hasText) {
            that._line = that._line || that._renderer.path([], "line").attr({
                "class": "dxg-main-bar",
                "stroke-linecap": "square"
            }).append(that._rootElement);
            that._text = that._text || that._renderer.text("", 0, 0).attr({
                "class": "dxg-text"
            }).append(that._rootElement);
            that._text.attr({
                align: that._getTextAlign()
            }).css(that._getFontOptions());
            that._setTextItemsSides()
        } else {
            if (that._line) {
                that._line.remove();
                delete that._line
            }
            if (that._text) {
                that._text.remove();
                delete that._text
            }
        }
    },
    _isTextVisible: function() {
        return false
    },
    _getTextAlign: function() {
        return "center"
    },
    _getFontOptions: function() {
        var options = this._options;
        var font = options.text.font;
        if (!font || !font.color) {
            font = (0, _extend.extend)({}, font, {
                color: options.color
            })
        }
        return (0, _utils.patchFontOptions)(font)
    },
    _updateBarItemsPositions: function() {
        var that = this;
        var positions = that._getPositions();
        that._backItem1.attr(that._buildItemSettings(positions.start, positions.back1));
        that._backItem2.attr(that._buildItemSettings(positions.back2, positions.end));
        that._spaceItem1.attr(that._buildItemSettings(positions.back1, positions.main1));
        that._spaceItem2.attr(that._buildItemSettings(positions.main2, positions.back2));
        that._mainItem.attr(that._buildItemSettings(positions.main1, positions.main2));
        that._trackerElement && that._trackerElement.attr(that._buildItemSettings(positions.main1, positions.main2))
    },
    _render: function() {
        var that = this;
        that._measureText();
        if (!that._backItem1) {
            that._backItem1 = that._createBarItem();
            that._backItem1.attr({
                "class": "dxg-back-bar"
            })
        }
        if (!that._backItem2) {
            that._backItem2 = that._createBarItem();
            that._backItem2.attr({
                "class": "dxg-back-bar"
            })
        }
        if (!that._spaceItem1) {
            that._spaceItem1 = that._createBarItem();
            that._spaceItem1.attr({
                "class": "dxg-space-bar"
            })
        }
        if (!that._spaceItem2) {
            that._spaceItem2 = that._createBarItem();
            that._spaceItem2.attr({
                "class": "dxg-space-bar"
            })
        }
        if (!that._mainItem) {
            that._mainItem = that._createBarItem();
            that._mainItem.attr({
                "class": "dxg-main-bar"
            })
        }
        that._updateBarItems();
        that._updateTextItems()
    },
    _clear: function() {
        var that = this;
        delete that._backItem1;
        delete that._backItem2;
        delete that._spaceItem1;
        delete that._spaceItem2;
        delete that._mainItem;
        delete that._hasText;
        delete that._line;
        delete that._text
    },
    getTooltipParameters: function() {
        var position = this._getTooltipPosition();
        return {
            x: position.x,
            y: position.y,
            value: this._currentValue,
            color: this._options.color,
            offset: 0
        }
    }
});
exports.BaseRangeBar = BaseRangeBar;
