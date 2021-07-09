/**
 * DevExtreme (core/utils/date.js)
 * Version: 20.2.7 (build 21146-1035)
 * Build date: Wed May 26 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("./type");
var _math = require("./math");
var _iterator = require("./iterator");
var _inflector = require("./inflector");
var _browser = _interopRequireDefault(require("./browser"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct
    } else {
        _construct = function(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor;
            if (Class) {
                _setPrototypeOf(instance, Class.prototype)
            }
            return instance
        }
    }
    return _construct.apply(null, arguments)
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var isIE11 = _browser.default.msie && parseInt(_browser.default.version) <= 11;
var dateUnitIntervals = ["millisecond", "second", "minute", "hour", "day", "week", "month", "quarter", "year"];
var toMilliseconds = function toMilliseconds(value) {
    switch (value) {
        case "millisecond":
            return 1;
        case "second":
            return 1e3 * toMilliseconds("millisecond");
        case "minute":
            return 60 * toMilliseconds("second");
        case "hour":
            return 60 * toMilliseconds("minute");
        case "day":
            return 24 * toMilliseconds("hour");
        case "week":
            return 7 * toMilliseconds("day");
        case "month":
            return 30 * toMilliseconds("day");
        case "quarter":
            return 3 * toMilliseconds("month");
        case "year":
            return 365 * toMilliseconds("day");
        default:
            return 0
    }
};
var getDatesInterval = function(startDate, endDate, intervalUnit) {
    var delta = endDate.getTime() - startDate.getTime();
    var millisecondCount = toMilliseconds(intervalUnit) || 1;
    return Math.floor(delta / millisecondCount)
};
var getNextDateUnit = function(unit, withWeeks) {
    var interval = getDateUnitInterval(unit);
    switch (interval) {
        case "millisecond":
            return "second";
        case "second":
            return "minute";
        case "minute":
            return "hour";
        case "hour":
            return "day";
        case "day":
            return withWeeks ? "week" : "month";
        case "week":
            return "month";
        case "month":
            return "quarter";
        case "quarter":
            return "year";
        case "year":
            return "year";
        default:
            return 0
    }
};
var convertMillisecondsToDateUnits = function(value) {
    var i;
    var dateUnitCount;
    var dateUnitInterval;
    var dateUnitIntervals = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
    var result = {};
    for (i = dateUnitIntervals.length - 1; i >= 0; i--) {
        dateUnitInterval = dateUnitIntervals[i];
        dateUnitCount = Math.floor(value / toMilliseconds(dateUnitInterval));
        if (dateUnitCount > 0) {
            result[dateUnitInterval + "s"] = dateUnitCount;
            value -= convertDateUnitToMilliseconds(dateUnitInterval, dateUnitCount)
        }
    }
    return result
};
var dateToMilliseconds = function(tickInterval) {
    var milliseconds = 0;
    if ((0, _type.isObject)(tickInterval)) {
        (0, _iterator.each)(tickInterval, function(key, value) {
            milliseconds += convertDateUnitToMilliseconds(key.substr(0, key.length - 1), value)
        })
    }
    if ((0, _type.isString)(tickInterval)) {
        milliseconds = convertDateUnitToMilliseconds(tickInterval, 1)
    }
    return milliseconds
};

function convertDateUnitToMilliseconds(dateUnit, count) {
    return toMilliseconds(dateUnit) * count
}

function getDateUnitInterval(tickInterval) {
    var maxInterval = -1;
    var i;
    if ((0, _type.isString)(tickInterval)) {
        return tickInterval
    }
    if ((0, _type.isObject)(tickInterval)) {
        (0, _iterator.each)(tickInterval, function(key, value) {
            for (i = 0; i < dateUnitIntervals.length; i++) {
                if (value && (key === dateUnitIntervals[i] + "s" || key === dateUnitIntervals[i]) && maxInterval < i) {
                    maxInterval = i
                }
            }
        });
        return dateUnitIntervals[maxInterval]
    }
    return ""
}
var tickIntervalToFormatMap = {
    millisecond: "millisecond",
    second: "longtime",
    minute: "shorttime",
    hour: "shorttime",
    day: "day",
    week: "day",
    month: "month",
    quarter: "quarter",
    year: "year"
};

function getDateFormatByTickInterval(tickInterval) {
    return tickIntervalToFormatMap[getDateUnitInterval(tickInterval)] || ""
}
var getQuarter = function(month) {
    return Math.floor(month / 3)
};
var getFirstQuarterMonth = function(month) {
    return 3 * getQuarter(month)
};

function correctDateWithUnitBeginning(date, dateInterval, withCorrection, firstDayOfWeek) {
    date = new Date(date.getTime());
    var oldDate = new Date(date.getTime());
    var firstQuarterMonth;
    var month;
    var dateUnitInterval = getDateUnitInterval(dateInterval);
    switch (dateUnitInterval) {
        case "second":
            date = new Date(1e3 * Math.floor(oldDate.getTime() / 1e3));
            break;
        case "minute":
            date = new Date(6e4 * Math.floor(oldDate.getTime() / 6e4));
            break;
        case "hour":
            date = new Date(36e5 * Math.floor(oldDate.getTime() / 36e5));
            break;
        case "year":
            date.setMonth(0);
        case "month":
            date.setDate(1);
        case "day":
            date.setHours(0, 0, 0, 0);
            break;
        case "week":
            date = getFirstWeekDate(date, firstDayOfWeek || 0);
            date.setHours(0, 0, 0, 0);
            break;
        case "quarter":
            firstQuarterMonth = getFirstQuarterMonth(date.getMonth());
            month = date.getMonth();
            date.setDate(1);
            date.setHours(0, 0, 0, 0);
            if (month !== firstQuarterMonth) {
                date.setMonth(firstQuarterMonth)
            }
    }
    if (withCorrection && "hour" !== dateUnitInterval && "minute" !== dateUnitInterval && "second" !== dateUnitInterval) {
        fixTimezoneGap(oldDate, date)
    }
    return date
}

function trimTime(date) {
    return correctDateWithUnitBeginning(date, "day")
}
var setToDayEnd = function(date) {
    var result = trimTime(date);
    result.setDate(result.getDate() + 1);
    return new Date(result.getTime() - 1)
};
var getDatesDifferences = function(date1, date2) {
    var counter = 0;
    var differences = {
        year: date1.getFullYear() !== date2.getFullYear(),
        month: date1.getMonth() !== date2.getMonth(),
        day: date1.getDate() !== date2.getDate(),
        hour: date1.getHours() !== date2.getHours(),
        minute: date1.getMinutes() !== date2.getMinutes(),
        second: date1.getSeconds() !== date2.getSeconds(),
        millisecond: date1.getMilliseconds() !== date2.getMilliseconds()
    };
    (0, _iterator.each)(differences, function(key, value) {
        if (value) {
            counter++
        }
    });
    if (0 === counter && 0 !== getTimezonesDifference(date1, date2)) {
        differences.hour = true;
        counter++
    }
    differences.count = counter;
    return differences
};

function addDateInterval(value, interval, dir) {
    var result = new Date(value.getTime());
    var intervalObject = (0, _type.isString)(interval) ? getDateIntervalByString(interval.toLowerCase()) : (0, _type.isNumeric)(interval) ? convertMillisecondsToDateUnits(interval) : interval;
    if (intervalObject.years) {
        result.setFullYear(result.getFullYear() + intervalObject.years * dir)
    }
    if (intervalObject.quarters) {
        result.setMonth(result.getMonth() + 3 * intervalObject.quarters * dir)
    }
    if (intervalObject.months) {
        result.setMonth(result.getMonth() + intervalObject.months * dir)
    }
    if (intervalObject.weeks) {
        result.setDate(result.getDate() + 7 * intervalObject.weeks * dir)
    }
    if (intervalObject.days) {
        result.setDate(result.getDate() + intervalObject.days * dir)
    }
    if (intervalObject.hours) {
        result.setTime(result.getTime() + 36e5 * intervalObject.hours * dir)
    }
    if (intervalObject.minutes) {
        result.setTime(result.getTime() + 6e4 * intervalObject.minutes * dir)
    }
    if (intervalObject.seconds) {
        result.setTime(result.getTime() + 1e3 * intervalObject.seconds * dir)
    }
    if (intervalObject.milliseconds) {
        result.setTime(result.getTime() + intervalObject.milliseconds * dir)
    }
    return result
}
var addInterval = function(value, interval, isNegative) {
    var dir = isNegative ? -1 : 1;
    return (0, _type.isDate)(value) ? addDateInterval(value, interval, dir) : (0, _math.adjust)(value + interval * dir, interval)
};
var getSequenceByInterval = function(min, max, interval) {
    var intervals = [];
    var cur;
    intervals.push((0, _type.isDate)(min) ? new Date(min.getTime()) : min);
    cur = min;
    while (cur < max) {
        cur = addInterval(cur, interval);
        intervals.push(cur)
    }
    return intervals
};
var getViewFirstCellDate = function(viewType, date) {
    if ("month" === viewType) {
        return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1)
    }
    if ("year" === viewType) {
        return createDateWithFullYear(date.getFullYear(), 0, date.getDate())
    }
    if ("decade" === viewType) {
        return createDateWithFullYear(getFirstYearInDecade(date), date.getMonth(), date.getDate())
    }
    if ("century" === viewType) {
        return createDateWithFullYear(getFirstDecadeInCentury(date), date.getMonth(), date.getDate())
    }
};
var getViewLastCellDate = function(viewType, date) {
    if ("month" === viewType) {
        return createDateWithFullYear(date.getFullYear(), date.getMonth(), getLastMonthDay(date))
    }
    if ("year" === viewType) {
        return createDateWithFullYear(date.getFullYear(), 11, date.getDate())
    }
    if ("decade" === viewType) {
        return createDateWithFullYear(getFirstYearInDecade(date) + 9, date.getMonth(), date.getDate())
    }
    if ("century" === viewType) {
        return createDateWithFullYear(getFirstDecadeInCentury(date) + 90, date.getMonth(), date.getDate())
    }
};
var getViewMinBoundaryDate = function(viewType, date) {
    var resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
    if ("month" === viewType) {
        return resultDate
    }
    resultDate.setMonth(0);
    if ("year" === viewType) {
        return resultDate
    }
    if ("decade" === viewType) {
        resultDate.setFullYear(getFirstYearInDecade(date))
    }
    if ("century" === viewType) {
        resultDate.setFullYear(getFirstDecadeInCentury(date))
    }
    return resultDate
};
var getViewMaxBoundaryDate = function(viewType, date) {
    var resultDate = new Date(date);
    resultDate.setDate(getLastMonthDay(date));
    if ("month" === viewType) {
        return resultDate
    }
    resultDate.setMonth(11);
    resultDate.setDate(getLastMonthDay(resultDate));
    if ("year" === viewType) {
        return resultDate
    }
    if ("decade" === viewType) {
        resultDate.setFullYear(getFirstYearInDecade(date) + 9)
    }
    if ("century" === viewType) {
        resultDate.setFullYear(getFirstDecadeInCentury(date) + 99)
    }
    return resultDate
};

function getLastMonthDay(date) {
    var resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0);
    return resultDate.getDate()
}
var getViewUp = function(typeView) {
    switch (typeView) {
        case "month":
            return "year";
        case "year":
            return "decade";
        case "decade":
            return "century"
    }
};
var getViewDown = function(typeView) {
    switch (typeView) {
        case "century":
            return "decade";
        case "decade":
            return "year";
        case "year":
            return "month"
    }
};
var getDifferenceInMonth = function(typeView) {
    var difference = 1;
    if ("year" === typeView) {
        difference = 12
    }
    if ("decade" === typeView) {
        difference = 120
    }
    if ("century" === typeView) {
        difference = 1200
    }
    return difference
};
var getDifferenceInMonthForCells = function(typeView) {
    var difference = 1;
    if ("decade" === typeView) {
        difference = 12
    }
    if ("century" === typeView) {
        difference = 120
    }
    return difference
};

function getDateIntervalByString(intervalString) {
    var result = {};
    switch (intervalString) {
        case "year":
            result.years = 1;
            break;
        case "month":
            result.months = 1;
            break;
        case "quarter":
            result.months = 3;
            break;
        case "week":
            result.weeks = 1;
            break;
        case "day":
            result.days = 1;
            break;
        case "hour":
            result.hours = 1;
            break;
        case "minute":
            result.minutes = 1;
            break;
        case "second":
            result.seconds = 1;
            break;
        case "millisecond":
            result.milliseconds = 1
    }
    return result
}

function sameDate(date1, date2) {
    return sameMonthAndYear(date1, date2) && date1.getDate() === date2.getDate()
}

function sameMonthAndYear(date1, date2) {
    return sameYear(date1, date2) && date1.getMonth() === date2.getMonth()
}

function sameYear(date1, date2) {
    return date1 && date2 && date1.getFullYear() === date2.getFullYear()
}
var sameDecade = function(date1, date2) {
    if (!(0, _type.isDefined)(date1) || !(0, _type.isDefined)(date2)) {
        return
    }
    var startDecadeDate1 = date1.getFullYear() - date1.getFullYear() % 10;
    var startDecadeDate2 = date2.getFullYear() - date2.getFullYear() % 10;
    return date1 && date2 && startDecadeDate1 === startDecadeDate2
};
var sameCentury = function(date1, date2) {
    if (!(0, _type.isDefined)(date1) || !(0, _type.isDefined)(date2)) {
        return
    }
    var startCenturyDate1 = date1.getFullYear() - date1.getFullYear() % 100;
    var startCenturyDate2 = date2.getFullYear() - date2.getFullYear() % 100;
    return date1 && date2 && startCenturyDate1 === startCenturyDate2
};

function getFirstDecadeInCentury(date) {
    return date && date.getFullYear() - date.getFullYear() % 100
}

function getFirstYearInDecade(date) {
    return date && date.getFullYear() - date.getFullYear() % 10
}
var getShortDateFormat = function() {
    return "yyyy/MM/dd"
};
var getFirstMonthDate = function(date) {
    if (!(0, _type.isDefined)(date)) {
        return
    }
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1)
};
var getLastMonthDate = function(date) {
    if (!(0, _type.isDefined)(date)) {
        return
    }
    return createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0)
};

function getFirstWeekDate(date, firstDayOfWeek) {
    var delta = (date.getDay() - firstDayOfWeek + 7) % 7;
    var result = new Date(date);
    result.setDate(date.getDate() - delta);
    return result
}
var normalizeDateByWeek = function(date, currentDate) {
    var differenceInDays = dateUtils.getDatesInterval(date, currentDate, "day");
    var resultDate = new Date(date);
    if (differenceInDays >= 6) {
        resultDate = new Date(resultDate.setDate(resultDate.getDate() + 7))
    }
    return resultDate
};
var dateInRange = function(date, min, max, format) {
    if ("date" === format) {
        min = min && dateUtils.correctDateWithUnitBeginning(min, "day");
        max = max && dateUtils.correctDateWithUnitBeginning(max, "day");
        date = date && dateUtils.correctDateWithUnitBeginning(date, "day")
    }
    return normalizeDate(date, min, max) === date
};
var dateTimeFromDecimal = function(number) {
    var hours = Math.floor(number);
    var minutes = number % 1 * 60;
    return {
        hours: hours,
        minutes: minutes
    }
};
var roundDateByStartDayHour = function(date, startDayHour) {
    var startTime = this.dateTimeFromDecimal(startDayHour);
    var result = new Date(date);
    if (date.getHours() === startTime.hours && date.getMinutes() < startTime.minutes || date.getHours() < startTime.hours) {
        result.setHours(startTime.hours, startTime.minutes, 0, 0)
    }
    return result
};

function normalizeDate(date, min, max) {
    var normalizedDate = date;
    if (!(0, _type.isDefined)(date)) {
        return date
    }
    if ((0, _type.isDefined)(min) && date < min) {
        normalizedDate = min
    }
    if ((0, _type.isDefined)(max) && date > max) {
        normalizedDate = max
    }
    return normalizedDate
}

function fixTimezoneGap(oldDate, newDate) {
    if (!(0, _type.isDefined)(oldDate)) {
        return
    }
    var diff = newDate.getHours() - oldDate.getHours();
    if (0 === diff) {
        return
    }
    var sign = 1 === diff || diff === -23 ? -1 : 1;
    var trial = new Date(newDate.getTime() + 36e5 * sign);
    if (sign > 0 || trial.getDate() === newDate.getDate()) {
        newDate.setTime(trial.getTime())
    }
}
var roundToHour = function(date) {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
    return date
};

function getTimezonesDifference(min, max) {
    return 60 * (max.getTimezoneOffset() - min.getTimezoneOffset()) * 1e3
}
var makeDate = function(date) {
    return new Date(date)
};
var getDatesOfInterval = function(startDate, endDate, step) {
    var result = [];
    var currentDate = new Date(startDate.getTime());
    while (currentDate < endDate) {
        result.push(new Date(currentDate.getTime()));
        currentDate = this.addInterval(currentDate, step)
    }
    return result
};
var createDate = function(date) {
    return new Date(isIE11 && (0, _type.isDate)(date) ? date.getTime() : date)
};
var createDateWithFullYear = function(year) {
    var result = _construct(Date, Array.prototype.slice.call(arguments));
    result.setFullYear(year);
    return result
};
var dateUtils = {
    dateUnitIntervals: dateUnitIntervals,
    convertMillisecondsToDateUnits: convertMillisecondsToDateUnits,
    dateToMilliseconds: dateToMilliseconds,
    getNextDateUnit: getNextDateUnit,
    convertDateUnitToMilliseconds: convertDateUnitToMilliseconds,
    getDateUnitInterval: getDateUnitInterval,
    getDateFormatByTickInterval: getDateFormatByTickInterval,
    getDatesDifferences: getDatesDifferences,
    correctDateWithUnitBeginning: correctDateWithUnitBeginning,
    trimTime: trimTime,
    setToDayEnd: setToDayEnd,
    roundDateByStartDayHour: roundDateByStartDayHour,
    dateTimeFromDecimal: dateTimeFromDecimal,
    addDateInterval: addDateInterval,
    addInterval: addInterval,
    getSequenceByInterval: getSequenceByInterval,
    getDateIntervalByString: getDateIntervalByString,
    sameDate: sameDate,
    sameMonthAndYear: sameMonthAndYear,
    sameMonth: sameMonthAndYear,
    sameYear: sameYear,
    sameDecade: sameDecade,
    sameCentury: sameCentury,
    getDifferenceInMonth: getDifferenceInMonth,
    getDifferenceInMonthForCells: getDifferenceInMonthForCells,
    getFirstYearInDecade: getFirstYearInDecade,
    getFirstDecadeInCentury: getFirstDecadeInCentury,
    getShortDateFormat: getShortDateFormat,
    getViewFirstCellDate: getViewFirstCellDate,
    getViewLastCellDate: getViewLastCellDate,
    getViewDown: getViewDown,
    getViewUp: getViewUp,
    getLastMonthDay: getLastMonthDay,
    getLastMonthDate: getLastMonthDate,
    getFirstMonthDate: getFirstMonthDate,
    getFirstWeekDate: getFirstWeekDate,
    normalizeDateByWeek: normalizeDateByWeek,
    getQuarter: getQuarter,
    getFirstQuarterMonth: getFirstQuarterMonth,
    dateInRange: dateInRange,
    roundToHour: roundToHour,
    normalizeDate: normalizeDate,
    getViewMinBoundaryDate: getViewMinBoundaryDate,
    getViewMaxBoundaryDate: getViewMaxBoundaryDate,
    fixTimezoneGap: fixTimezoneGap,
    getTimezonesDifference: getTimezonesDifference,
    makeDate: makeDate,
    getDatesInterval: getDatesInterval,
    getDatesOfInterval: getDatesOfInterval,
    createDate: createDate,
    createDateWithFullYear: createDateWithFullYear
};
dateUtils.sameView = function(view, date1, date2) {
    return dateUtils[(0, _inflector.camelize)("same " + view)](date1, date2)
};
var _default = dateUtils;
exports.default = _default;
module.exports = exports.default;
