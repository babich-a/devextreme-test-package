/**
 * DevExtreme (events/core/emitter.feedback.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.inactive = exports.active = exports.lock = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _common = require("../../core/utils/common");
var _dom = require("../../core/utils/dom");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _index = require("../utils/index");
var _pointer = _interopRequireDefault(require("../pointer"));
var _emitter = _interopRequireDefault(require("./emitter"));
var _emitter_registrator = _interopRequireDefault(require("./emitter_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ACTIVE_EVENT_NAME = "dxactive";
exports.active = ACTIVE_EVENT_NAME;
var INACTIVE_EVENT_NAME = "dxinactive";
exports.inactive = INACTIVE_EVENT_NAME;
var ACTIVE_TIMEOUT = 30;
var INACTIVE_TIMEOUT = 400;
var FeedbackEvent = _class.default.inherit({
    ctor: function(timeout, fire) {
        this._timeout = timeout;
        this._fire = fire
    },
    start: function() {
        var that = this;
        this._schedule(function() {
            that.force()
        })
    },
    _schedule: function(fn) {
        this.stop();
        this._timer = setTimeout(fn, this._timeout)
    },
    stop: function() {
        clearTimeout(this._timer)
    },
    force: function() {
        if (this._fired) {
            return
        }
        this.stop();
        this._fire();
        this._fired = true
    },
    fired: function() {
        return this._fired
    }
});
var activeFeedback;
var FeedbackEmitter = _emitter.default.inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        this._active = new FeedbackEvent(0, _common.noop);
        this._inactive = new FeedbackEvent(0, _common.noop)
    },
    configure: function(data, eventName) {
        switch (eventName) {
            case ACTIVE_EVENT_NAME:
                data.activeTimeout = data.timeout;
                break;
            case INACTIVE_EVENT_NAME:
                data.inactiveTimeout = data.timeout
        }
        this.callBase(data)
    },
    start: function(e) {
        if (activeFeedback) {
            var activeChildExists = (0, _dom.contains)(this.getElement().get(0), activeFeedback.getElement().get(0));
            var childJustActivated = !activeFeedback._active.fired();
            if (activeChildExists && childJustActivated) {
                this._cancel();
                return
            }
            activeFeedback._inactive.force()
        }
        activeFeedback = this;
        this._initEvents(e);
        this._active.start()
    },
    _initEvents: function(e) {
        var that = this;
        var eventTarget = this._getEmitterTarget(e);
        var mouseEvent = (0, _index.isMouseEvent)(e);
        var isSimulator = _devices.default.isSimulator();
        var deferFeedback = isSimulator || !mouseEvent;
        var activeTimeout = (0, _common.ensureDefined)(this.activeTimeout, ACTIVE_TIMEOUT);
        var inactiveTimeout = (0, _common.ensureDefined)(this.inactiveTimeout, INACTIVE_TIMEOUT);
        this._active = new FeedbackEvent(deferFeedback ? activeTimeout : 0, function() {
            that._fireEvent(ACTIVE_EVENT_NAME, e, {
                target: eventTarget
            })
        });
        this._inactive = new FeedbackEvent(deferFeedback ? inactiveTimeout : 0, function() {
            that._fireEvent(INACTIVE_EVENT_NAME, e, {
                target: eventTarget
            });
            activeFeedback = null
        })
    },
    cancel: function(e) {
        this.end(e)
    },
    end: function(e) {
        var skipTimers = e.type !== _pointer.default.up;
        if (skipTimers) {
            this._active.stop()
        } else {
            this._active.force()
        }
        this._inactive.start();
        if (skipTimers) {
            this._inactive.force()
        }
    },
    dispose: function() {
        this._active.stop();
        this._inactive.stop();
        if (activeFeedback === this) {
            activeFeedback = null
        }
        this.callBase()
    },
    lockInactive: function() {
        this._active.force();
        this._inactive.stop();
        activeFeedback = null;
        this._cancel();
        return this._inactive.force.bind(this._inactive)
    }
});
FeedbackEmitter.lock = function(deferred) {
    var lockInactive = activeFeedback ? activeFeedback.lockInactive() : _common.noop;
    deferred.done(lockInactive)
};
(0, _emitter_registrator.default)({
    emitter: FeedbackEmitter,
    events: [ACTIVE_EVENT_NAME, INACTIVE_EVENT_NAME]
});
var lock = FeedbackEmitter.lock;
exports.lock = lock;
