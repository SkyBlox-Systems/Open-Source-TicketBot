"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMS_1 = require("./getMS");
function default_1(number, max, expanded, obj, till) {
    var _a, _b, _c, _d, _e, _f;
    let time = "", data = {};
    while (number > 0 && max > 0) {
        let ms = (0, getMS_1.default)(number);
        data[ms.type] = ms.value;
        number = ms.time;
        time += ms.string;
        max--;
        if (till === ms.type)
            number = 0;
    }
    if (!expanded)
        time = (_f = (_e = (_d = (_c = (_b = (_a = time.replace(/year+s?/, "y")) === null || _a === void 0 ? void 0 : _a.replace(/week+s?/, "w")) === null || _b === void 0 ? void 0 : _b.replace(/day+s?/, "d")) === null || _c === void 0 ? void 0 : _c.replace(/hour+s?/, "h")) === null || _d === void 0 ? void 0 : _d.replace(/minute+s?/, "m")) === null || _e === void 0 ? void 0 : _e.replace(/second+s?/, "s")) === null || _f === void 0 ? void 0 : _f.replace(/millisecond+s?/, "ms");
    return obj ? data : time;
}
exports.default = default_1;
