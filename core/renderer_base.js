/**
 * DevExtreme (core/renderer_base.js)
 * Version: 20.2.7 (build 21147-0311)
 * Build date: Thu May 27 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _element_data = require("./element_data");
var _dom_adapter = _interopRequireDefault(require("./dom_adapter"));
var _window = require("./utils/window");
var _type = require("./utils/type");
var _style = require("./utils/style");
var _size = require("./utils/size");
var _html_parser = require("./utils/html_parser");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var renderer;
var initRender = function(selector, context) {
    if (!selector) {
        this.length = 0;
        return this
    }
    if ("string" === typeof selector) {
        if ("body" === selector) {
            this[0] = context ? context.body : _dom_adapter.default.getBody();
            this.length = 1;
            return this
        }
        context = context || _dom_adapter.default.getDocument();
        if ("<" === selector[0]) {
            this[0] = _dom_adapter.default.createElement(selector.slice(1, -1), context);
            this.length = 1;
            return this
        } [].push.apply(this, _dom_adapter.default.querySelectorAll(context, selector));
        return this
    } else {
        if (_dom_adapter.default.isNode(selector) || (0, _type.isWindow)(selector)) {
            this[0] = selector;
            this.length = 1;
            return this
        } else {
            if (Array.isArray(selector)) {
                [].push.apply(this, selector);
                return this
            }
        }
    }
    return renderer(selector.toArray ? selector.toArray() : [selector])
};
renderer = function(selector, context) {
    return new initRender(selector, context)
};
renderer.fn = {
    dxRenderer: true
};
initRender.prototype = renderer.fn;
var repeatMethod = function(methodName, args) {
    for (var i = 0; i < this.length; i++) {
        var item = renderer(this[i]);
        item[methodName].apply(item, args)
    }
    return this
};
var setAttributeValue = function(element, attrName, value) {
    if (void 0 !== value && null !== value) {
        _dom_adapter.default.setAttribute(element, attrName, value)
    } else {
        _dom_adapter.default.removeAttribute(element, attrName)
    }
};
initRender.prototype.show = function() {
    return this.toggle(true)
};
initRender.prototype.hide = function() {
    return this.toggle(false)
};
initRender.prototype.toggle = function(value) {
    if (this[0]) {
        this.toggleClass("dx-state-invisible", !value)
    }
    return this
};
initRender.prototype.attr = function(attrName, value) {
    if (this.length > 1 && arguments.length > 1) {
        return repeatMethod.call(this, "attr", arguments)
    }
    if (!this[0]) {
        if ((0, _type.isObject)(attrName) || void 0 !== value) {
            return this
        } else {
            return
        }
    }
    if (!this[0].getAttribute) {
        return this.prop(attrName, value)
    }
    if ("string" === typeof attrName && 1 === arguments.length) {
        var result = this[0].getAttribute(attrName);
        return null == result ? void 0 : result
    } else {
        if ((0, _type.isPlainObject)(attrName)) {
            for (var key in attrName) {
                this.attr(key, attrName[key])
            }
        } else {
            setAttributeValue(this[0], attrName, value)
        }
    }
    return this
};
initRender.prototype.removeAttr = function(attrName) {
    this[0] && _dom_adapter.default.removeAttribute(this[0], attrName);
    return this
};
initRender.prototype.prop = function(propName, value) {
    if (!this[0]) {
        return this
    }
    if ("string" === typeof propName && 1 === arguments.length) {
        return this[0][propName]
    } else {
        if ((0, _type.isPlainObject)(propName)) {
            for (var key in propName) {
                this.prop(key, propName[key])
            }
        } else {
            _dom_adapter.default.setProperty(this[0], propName, value)
        }
    }
    return this
};
initRender.prototype.addClass = function(className) {
    return this.toggleClass(className, true)
};
initRender.prototype.removeClass = function(className) {
    return this.toggleClass(className, false)
};
initRender.prototype.hasClass = function(className) {
    if (!this[0] || void 0 === this[0].className) {
        return false
    }
    var classNames = className.split(" ");
    for (var i = 0; i < classNames.length; i++) {
        if (this[0].classList) {
            if (this[0].classList.contains(classNames[i])) {
                return true
            }
        } else {
            var _className = (0, _type.isString)(this[0].className) ? this[0].className : _dom_adapter.default.getAttribute(this[0], "class");
            if ((_className || "").split(" ").indexOf(classNames[i]) >= 0) {
                return true
            }
        }
    }
    return false
};
initRender.prototype.toggleClass = function(className, value) {
    if (this.length > 1) {
        return repeatMethod.call(this, "toggleClass", arguments)
    }
    if (!this[0] || !className) {
        return this
    }
    value = void 0 === value ? !this.hasClass(className) : value;
    var classNames = className.split(" ");
    for (var i = 0; i < classNames.length; i++) {
        _dom_adapter.default.setClass(this[0], classNames[i], value)
    }
    return this
};
["width", "height", "outerWidth", "outerHeight", "innerWidth", "innerHeight"].forEach(function(methodName) {
    var partialName = methodName.toLowerCase().indexOf("width") >= 0 ? "Width" : "Height";
    var propName = partialName.toLowerCase();
    var isOuter = 0 === methodName.indexOf("outer");
    var isInner = 0 === methodName.indexOf("inner");
    initRender.prototype[methodName] = function(value) {
        if (this.length > 1 && arguments.length > 0) {
            return repeatMethod.call(this, methodName, arguments)
        }
        var element = this[0];
        if (!element) {
            return
        }
        if ((0, _type.isWindow)(element)) {
            return isOuter ? element["inner" + partialName] : _dom_adapter.default.getDocumentElement()["client" + partialName]
        }
        if (_dom_adapter.default.isDocument(element)) {
            var documentElement = _dom_adapter.default.getDocumentElement();
            var body = _dom_adapter.default.getBody();
            return Math.max(body["scroll" + partialName], body["offset" + partialName], documentElement["scroll" + partialName], documentElement["offset" + partialName], documentElement["client" + partialName])
        }
        if (0 === arguments.length || "boolean" === typeof value) {
            var include = {
                paddings: isInner || isOuter,
                borders: isOuter,
                margins: value
            };
            return (0, _size.getSize)(element, propName, include)
        }
        if (void 0 === value || null === value) {
            return this
        }
        if ((0, _type.isNumeric)(value)) {
            var elementStyles = window.getComputedStyle(element);
            var sizeAdjustment = (0, _size.getElementBoxParams)(propName, elementStyles);
            var isBorderBox = "border-box" === elementStyles.boxSizing;
            value = Number(value);
            if (isOuter) {
                value -= isBorderBox ? 0 : sizeAdjustment.border + sizeAdjustment.padding
            } else {
                if (isInner) {
                    value += isBorderBox ? sizeAdjustment.border : -sizeAdjustment.padding
                } else {
                    if (isBorderBox) {
                        value += sizeAdjustment.border + sizeAdjustment.padding
                    }
                }
            }
        }
        value += (0, _type.isNumeric)(value) ? "px" : "";
        _dom_adapter.default.setStyle(element, propName, value);
        return this
    }
});
initRender.prototype.html = function(value) {
    if (!arguments.length) {
        return this[0].innerHTML
    }
    this.empty();
    if ("string" === typeof value && !(0, _html_parser.isTablePart)(value) || "number" === typeof value) {
        this[0].innerHTML = value;
        return this
    }
    return this.append((0, _html_parser.parseHTML)(value))
};
var appendElements = function(element, nextSibling) {
    if (!this[0] || !element) {
        return
    }
    if ("string" === typeof element) {
        element = (0, _html_parser.parseHTML)(element)
    } else {
        if (element.nodeType) {
            element = [element]
        } else {
            if ((0, _type.isNumeric)(element)) {
                element = [_dom_adapter.default.createTextNode(element)]
            }
        }
    }
    for (var i = 0; i < element.length; i++) {
        var item = element[i];
        var container = this[0];
        var wrapTR = "TABLE" === container.tagName && "TR" === item.tagName;
        if (wrapTR && container.tBodies && container.tBodies.length) {
            container = container.tBodies[0]
        }
        _dom_adapter.default.insertElement(container, item.nodeType ? item : item[0], nextSibling)
    }
};
var setCss = function(name, value) {
    if (!this[0] || !this[0].style) {
        return
    }
    if (null === value || "number" === typeof value && isNaN(value)) {
        return
    }
    name = (0, _style.styleProp)(name);
    for (var i = 0; i < this.length; i++) {
        this[i].style[name] = (0, _style.normalizeStyleProp)(name, value)
    }
};
initRender.prototype.css = function(name, value) {
    if ((0, _type.isString)(name)) {
        if (2 === arguments.length) {
            setCss.call(this, name, value)
        } else {
            if (!this[0]) {
                return
            }
            name = (0, _style.styleProp)(name);
            var result = window.getComputedStyle(this[0])[name] || this[0].style[name];
            return (0, _type.isNumeric)(result) ? result.toString() : result
        }
    } else {
        if ((0, _type.isPlainObject)(name)) {
            for (var key in name) {
                setCss.call(this, key, name[key])
            }
        }
    }
    return this
};
initRender.prototype.prepend = function(element) {
    if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            this.prepend(arguments[i])
        }
        return this
    }
    appendElements.apply(this, [element, this[0].firstChild]);
    return this
};
initRender.prototype.append = function(element) {
    if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            this.append(arguments[i])
        }
        return this
    }
    appendElements.apply(this, [element]);
    return this
};
initRender.prototype.prependTo = function(element) {
    if (this.length > 1) {
        for (var i = this.length - 1; i >= 0; i--) {
            renderer(this[i]).prependTo(element)
        }
        return this
    }
    element = renderer(element);
    if (element[0]) {
        _dom_adapter.default.insertElement(element[0], this[0], element[0].firstChild)
    }
    return this
};
initRender.prototype.appendTo = function(element) {
    if (this.length > 1) {
        return repeatMethod.call(this, "appendTo", arguments)
    }
    _dom_adapter.default.insertElement(renderer(element)[0], this[0]);
    return this
};
initRender.prototype.insertBefore = function(element) {
    if (element && element[0]) {
        _dom_adapter.default.insertElement(element[0].parentNode, this[0], element[0])
    }
    return this
};
initRender.prototype.insertAfter = function(element) {
    if (element && element[0]) {
        _dom_adapter.default.insertElement(element[0].parentNode, this[0], element[0].nextSibling)
    }
    return this
};
initRender.prototype.before = function(element) {
    if (this[0]) {
        _dom_adapter.default.insertElement(this[0].parentNode, element[0], this[0])
    }
    return this
};
initRender.prototype.after = function(element) {
    if (this[0]) {
        _dom_adapter.default.insertElement(this[0].parentNode, element[0], this[0].nextSibling)
    }
    return this
};
initRender.prototype.wrap = function(wrapper) {
    if (this[0]) {
        var wrap = renderer(wrapper);
        wrap.insertBefore(this);
        wrap.append(this)
    }
    return this
};
initRender.prototype.wrapInner = function(wrapper) {
    var contents = this.contents();
    if (contents.length) {
        contents.wrap(wrapper)
    } else {
        this.append(wrapper)
    }
    return this
};
initRender.prototype.replaceWith = function(element) {
    if (!(element && element[0])) {
        return
    }
    if (element.is(this)) {
        return this
    }
    element.insertBefore(this);
    this.remove();
    return element
};
initRender.prototype.remove = function() {
    if (this.length > 1) {
        return repeatMethod.call(this, "remove", arguments)
    }(0, _element_data.cleanDataRecursive)(this[0], true);
    _dom_adapter.default.removeElement(this[0]);
    return this
};
initRender.prototype.detach = function() {
    if (this.length > 1) {
        return repeatMethod.call(this, "detach", arguments)
    }
    _dom_adapter.default.removeElement(this[0]);
    return this
};
initRender.prototype.empty = function() {
    if (this.length > 1) {
        return repeatMethod.call(this, "empty", arguments)
    }(0, _element_data.cleanDataRecursive)(this[0]);
    _dom_adapter.default.setText(this[0], "");
    return this
};
initRender.prototype.clone = function() {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(this[i].cloneNode(true))
    }
    return renderer(result)
};
initRender.prototype.text = function(value) {
    if (!arguments.length) {
        var result = "";
        for (var i = 0; i < this.length; i++) {
            result += this[i] && this[i].textContent || ""
        }
        return result
    }
    var text = (0, _type.isFunction)(value) ? value() : value;
    (0, _element_data.cleanDataRecursive)(this[0], false);
    _dom_adapter.default.setText(this[0], (0, _type.isDefined)(text) ? text : "");
    return this
};
initRender.prototype.val = function(value) {
    if (1 === arguments.length) {
        return this.prop("value", (0, _type.isDefined)(value) ? value : "")
    }
    return this.prop("value")
};
initRender.prototype.contents = function() {
    if (!this[0]) {
        return renderer()
    }
    var result = [];
    result.push.apply(result, this[0].childNodes);
    return renderer(result)
};
initRender.prototype.find = function(selector) {
    var result = renderer();
    if (!selector) {
        return result
    }
    var nodes = [];
    var i;
    if ("string" === typeof selector) {
        selector = selector.trim();
        for (i = 0; i < this.length; i++) {
            var element = this[i];
            if (_dom_adapter.default.isElementNode(element)) {
                var elementId = element.getAttribute("id");
                var queryId = elementId || "dx-query-children";
                if (!elementId) {
                    setAttributeValue(element, "id", queryId)
                }
                queryId = "[id='" + queryId + "'] ";
                var querySelector = queryId + selector.replace(/([^\\])(,)/g, "$1, " + queryId);
                nodes.push.apply(nodes, _dom_adapter.default.querySelectorAll(element, querySelector));
                setAttributeValue(element, "id", elementId)
            } else {
                if (_dom_adapter.default.isDocument(element)) {
                    nodes.push.apply(nodes, _dom_adapter.default.querySelectorAll(element, selector))
                }
            }
        }
    } else {
        for (i = 0; i < this.length; i++) {
            selector = _dom_adapter.default.isNode(selector) ? selector : selector[0];
            if (this[i] !== selector && this[i].contains(selector)) {
                nodes.push(selector)
            }
        }
    }
    return result.add(nodes)
};
var isVisible = function(_, element) {
    if (!element.nodeType) {
        return true
    }
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
};
initRender.prototype.filter = function(selector) {
    if (!selector) {
        return renderer()
    }
    if (":visible" === selector) {
        return this.filter(isVisible)
    } else {
        if (":hidden" === selector) {
            return this.filter(function(_, element) {
                return !isVisible(_, element)
            })
        }
    }
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (_dom_adapter.default.isElementNode(item) && "string" === (0, _type.type)(selector)) {
            _dom_adapter.default.elementMatches(item, selector) && result.push(item)
        } else {
            if (_dom_adapter.default.isNode(selector) || (0, _type.isWindow)(selector)) {
                selector === item && result.push(item)
            } else {
                if ((0, _type.isFunction)(selector)) {
                    selector.call(item, i, item) && result.push(item)
                } else {
                    for (var j = 0; j < selector.length; j++) {
                        selector[j] === item && result.push(item)
                    }
                }
            }
        }
    }
    return renderer(result)
};
initRender.prototype.not = function(selector) {
    var result = [];
    var nodes = this.filter(selector).toArray();
    for (var i = 0; i < this.length; i++) {
        if (nodes.indexOf(this[i]) === -1) {
            result.push(this[i])
        }
    }
    return renderer(result)
};
initRender.prototype.is = function(selector) {
    return !!this.filter(selector).length
};
initRender.prototype.children = function(selector) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var nodes = this[i] ? this[i].childNodes : [];
        for (var j = 0; j < nodes.length; j++) {
            if (_dom_adapter.default.isElementNode(nodes[j])) {
                result.push(nodes[j])
            }
        }
    }
    result = renderer(result);
    return selector ? result.filter(selector) : result
};
initRender.prototype.siblings = function() {
    var element = this[0];
    if (!element || !element.parentNode) {
        return renderer()
    }
    var result = [];
    var parentChildNodes = element.parentNode.childNodes || [];
    for (var i = 0; i < parentChildNodes.length; i++) {
        var node = parentChildNodes[i];
        if (_dom_adapter.default.isElementNode(node) && node !== element) {
            result.push(node)
        }
    }
    return renderer(result)
};
initRender.prototype.each = function(callback) {
    for (var i = 0; i < this.length; i++) {
        if (false === callback.call(this[i], i, this[i])) {
            break
        }
    }
};
initRender.prototype.index = function(element) {
    if (!element) {
        return this.parent().children().index(this)
    }
    element = renderer(element);
    return this.toArray().indexOf(element[0])
};
initRender.prototype.get = function(index) {
    return this[index < 0 ? this.length + index : index]
};
initRender.prototype.eq = function(index) {
    index = index < 0 ? this.length + index : index;
    return renderer(this[index])
};
initRender.prototype.first = function() {
    return this.eq(0)
};
initRender.prototype.last = function() {
    return this.eq(-1)
};
initRender.prototype.parent = function(selector) {
    if (!this[0]) {
        return renderer()
    }
    var result = renderer(this[0].parentNode);
    return !selector || result.is(selector) ? result : renderer()
};
initRender.prototype.parents = function(selector) {
    var result = [];
    var parent = this.parent();
    while (parent && parent[0] && !_dom_adapter.default.isDocument(parent[0])) {
        if (_dom_adapter.default.isElementNode(parent[0])) {
            if (!selector || selector && parent.is(selector)) {
                result.push(parent.get(0))
            }
        }
        parent = parent.parent()
    }
    return renderer(result)
};
initRender.prototype.closest = function(selector) {
    if (this.is(selector)) {
        return this
    }
    var parent = this.parent();
    while (parent && parent.length) {
        if (parent.is(selector)) {
            return parent
        }
        parent = parent.parent()
    }
    return renderer()
};
initRender.prototype.next = function(selector) {
    if (!this[0]) {
        return renderer()
    }
    var next = renderer(this[0].nextSibling);
    if (!arguments.length) {
        return next
    }
    while (next && next.length) {
        if (next.is(selector)) {
            return next
        }
        next = next.next()
    }
    return renderer()
};
initRender.prototype.prev = function() {
    if (!this[0]) {
        return renderer()
    }
    return renderer(this[0].previousSibling)
};
initRender.prototype.add = function(selector) {
    var targets = renderer(selector);
    var result = this.toArray();
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (result.indexOf(target) === -1) {
            result.push(target)
        }
    }
    return renderer(result)
};
var emptyArray = [];
initRender.prototype.splice = function() {
    return renderer(emptyArray.splice.apply(this, arguments))
};
initRender.prototype.slice = function() {
    return renderer(emptyArray.slice.apply(this, arguments))
};
initRender.prototype.toArray = function() {
    return emptyArray.slice.call(this)
};
var getWindowByElement = function(element) {
    return (0, _type.isWindow)(element) ? element : element.defaultView
};
initRender.prototype.offset = function() {
    if (!this[0]) {
        return
    }
    if (!this[0].getClientRects().length) {
        return {
            top: 0,
            left: 0
        }
    }
    var rect = this[0].getBoundingClientRect();
    var win = getWindowByElement(this[0].ownerDocument);
    var docElem = this[0].ownerDocument.documentElement;
    return {
        top: rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
    }
};
initRender.prototype.offsetParent = function() {
    if (!this[0]) {
        return renderer()
    }
    var offsetParent = renderer(this[0].offsetParent);
    while (offsetParent[0] && "static" === offsetParent.css("position")) {
        offsetParent = renderer(offsetParent[0].offsetParent)
    }
    offsetParent = offsetParent[0] ? offsetParent : renderer(_dom_adapter.default.getDocumentElement());
    return offsetParent
};
initRender.prototype.position = function() {
    if (!this[0]) {
        return
    }
    var offset;
    var marginTop = parseFloat(this.css("marginTop"));
    var marginLeft = parseFloat(this.css("marginLeft"));
    if ("fixed" === this.css("position")) {
        offset = this[0].getBoundingClientRect();
        return {
            top: offset.top - marginTop,
            left: offset.left - marginLeft
        }
    }
    offset = this.offset();
    var offsetParent = this.offsetParent();
    var parentOffset = {
        top: 0,
        left: 0
    };
    if ("HTML" !== offsetParent[0].nodeName) {
        parentOffset = offsetParent.offset()
    }
    parentOffset = {
        top: parentOffset.top + parseFloat(offsetParent.css("borderTopWidth")),
        left: parentOffset.left + parseFloat(offsetParent.css("borderLeftWidth"))
    };
    return {
        top: offset.top - parentOffset.top - marginTop,
        left: offset.left - parentOffset.left - marginLeft
    }
};
[{
    name: "scrollLeft",
    offsetProp: "pageXOffset",
    scrollWindow: function(win, value) {
        win.scrollTo(value, win.pageYOffset)
    }
}, {
    name: "scrollTop",
    offsetProp: "pageYOffset",
    scrollWindow: function(win, value) {
        win.scrollTo(win.pageXOffset, value)
    }
}].forEach(function(directionStrategy) {
    var propName = directionStrategy.name;
    initRender.prototype[propName] = function(value) {
        if (!this[0]) {
            return
        }
        var window = getWindowByElement(this[0]);
        if (void 0 === value) {
            return window ? window[directionStrategy.offsetProp] : this[0][propName]
        }
        if (window) {
            directionStrategy.scrollWindow(window, value)
        } else {
            this[0][propName] = value
        }
        return this
    }
});
initRender.prototype.data = function(key, value) {
    if (!this[0]) {
        return
    }
    if (arguments.length < 2) {
        return _element_data.data.call(renderer, this[0], key)
    }
    _element_data.data.call(renderer, this[0], key, value);
    return this
};
initRender.prototype.removeData = function(key) {
    this[0] && (0, _element_data.removeData)(this[0], key);
    return this
};
var rendererWrapper = function() {
    return renderer.apply(this, arguments)
};
Object.defineProperty(rendererWrapper, "fn", {
    enumerable: true,
    configurable: true,
    get: function() {
        return renderer.fn
    },
    set: function(value) {
        renderer.fn = value
    }
});
var _default = {
    set: function(strategy) {
        renderer = strategy
    },
    get: function() {
        return rendererWrapper
    }
};
exports.default = _default;
module.exports = exports.default;
