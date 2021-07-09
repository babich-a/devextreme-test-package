/**
 * DevExtreme (core/element.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getPublicElement = getPublicElement;
exports.setPublicElementWrapper = setPublicElementWrapper;
var strategy = function(element) {
    return element && element.get(0)
};

function getPublicElement(element) {
    return strategy(element)
}

function setPublicElementWrapper(newStrategy) {
    strategy = newStrategy
}
