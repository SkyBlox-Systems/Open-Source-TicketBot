"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getType_1 = require("./getType");
/**
 * Convert Human readable time to milliseconds.
 * @param {String} string The human readable time string.
 * @returns {Number} The time in milliseconds.
 */
function default_1(string) {
    var _a, _b;
    var strings = (_b = (_a = string.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split(/ +/g);
    var number = 0, fails = 0, trials = 0;
    strings.forEach(function (v, i) {
        var _a, _b, _c, _d;
        trials++;
        // Value is a number
        if (typeof (v) === "number") {
            if (typeof (strings[i + 1]) === "number") {
                number += Math.floor(v);
                fails--;
            } // Next value is also a number
            else {
                var value = (0, getType_1.default)((_a = strings[i + 1].trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase());
                if (value)
                    number += value * Math.floor(v);
                else
                    fails++;
            }
        }
        else {
            var no = parseInt(v), str = (_d = (_c = v.substring((_b = no.toString()) === null || _b === void 0 ? void 0 : _b.length)) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.toLowerCase();
            var value = (0, getType_1.default)(str);
            if (value && no)
                number += no * value;
            else
                fails++;
        }
    });
    return fails === strings.length ? undefined : number;
}
exports.default = default_1;
