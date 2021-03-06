/**
 * DevExtreme (viz/tree_map/tiling.rotated_slice_and_dice.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _tiling = require("./tiling");
var sliceAndDiceAlgorithm = (0, _tiling.getAlgorithm)("sliceanddice");

function rotatedSliceAndDice(data) {
    data.isRotated = !data.isRotated;
    return sliceAndDiceAlgorithm.call(this, data)
}(0, _tiling.addAlgorithm)("rotatedsliceanddice", rotatedSliceAndDice);
