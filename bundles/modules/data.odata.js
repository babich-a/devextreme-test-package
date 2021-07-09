/**
 * DevExtreme (bundles/modules/data.odata.js)
 * Version: 20.2.7 (build 21147-0311)
 * Build date: Thu May 27 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
require("./data");
DevExpress.data.ODataStore = require("../../data/odata/store");
DevExpress.data.ODataContext = require("../../data/odata/context");
DevExpress.data.utils = DevExpress.data.utils || {};
DevExpress.data.utils.odata = {};
DevExpress.data.utils.odata.keyConverters = require("../../data/odata/utils").keyConverters;
DevExpress.data.EdmLiteral = require("../../data/odata/utils").EdmLiteral;
var ODataUtilsModule = require("../../data/odata/utils");
DevExpress.data.utils.odata.serializePropName = ODataUtilsModule.serializePropName;
DevExpress.data.utils.odata.serializeValue = ODataUtilsModule.serializeValue;
DevExpress.data.utils.odata.serializeKey = ODataUtilsModule.serializeKey;
DevExpress.data.utils.odata.sendRequest = ODataUtilsModule.sendRequest;
DevExpress.data.queryAdapters = DevExpress.data.queryAdapters || {};
DevExpress.data.queryAdapters.odata = require("../../data/odata/query_adapter").odata;
