import getMS from './getMS';
import { ReturnObject,indexable } from '../interfaces';

export default function (number: number, max: number, expanded: boolean, obj: boolean, till: "year" | "week" | "day" | "hour" | "minute" | "second" | "millisecond"): string | ReturnObject {
    let time = "", data: indexable = {};

    while (number > 0 && max > 0) {
        let ms = getMS(number);
        data[ms.type] = ms.value;
        number = ms.time;
        time += ms.string;
        max--;
        if (till === ms.type) number = 0;
    }

    if (!expanded) time = time.replace(/year+s?/, "y")?.replace(/week+s?/, "w")?.replace(/day+s?/, "d")?.replace(/hour+s?/, "h")?.replace(/minute+s?/, "m")?.replace(/second+s?/, "s")?.replace(/millisecond+s?/, "ms")

    return obj ? data : time;
}