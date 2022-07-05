"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toMS_1 = require("./utility/toMS");
var toTimeString_1 = require("./utility/toTimeString");
function convertor(time, options) {
    if (options === void 0) { options = {}; }
    if (typeof (time) !== "number" && typeof (time) !== "string")
        throw new TypeError("Inavlid time was provided, It should be either a number or human readable time string");
    var _a = options.max, max = _a === void 0 ? 7 : _a, _b = options.expanded, expanded = _b === void 0 ? true : _b, _c = options.returnObject, returnObject = _c === void 0 ? false : _c, _d = options.till, till = _d === void 0 ? "millisecond" : _d;
    var type = ["year", "week", "day", "hour", "minute", "second", "millisecond"];
    if (typeof (max) !== "number" || max < 1)
        throw new TypeError("Invalid max was provided, it should be a number and at least 1");
    if (typeof (expanded) !== "boolean")
        throw new TypeError("Expanded should be a boolean type");
    if (typeof (returnObject) !== "boolean")
        throw new TypeError("Expanded should be a boolean type");
    if (!type.some(function (v) { return v === till; }))
        throw new Error("Till should be one of these values : " + type.join(", ") + " but we got " + JSON.stringify(till));
    if (typeof (time) === "string")
        return (0, toMS_1.default)(time);
    else
        return (0, toTimeString_1.default)(time, max, expanded, returnObject, till);
}
exports.default = convertor;
