import convert from './getType';

/**
 * Convert Human readable time to milliseconds.
 * @param {String} string The human readable time string.
 * @returns {Number} The time in milliseconds.
 */
export default function (string: string): number {
    const strings = string.toLowerCase()?.trim()?.split(/ +/g);
    let number = 0, fails = 0, trials = 0;

    strings.forEach((v, i) => {
        trials++;

        // Value is a number
        if (typeof (v) === "number") {
            if (typeof (strings[i + 1]) === "number") { number += Math.floor(v); fails-- } // Next value is also a number
            else {
                let value = convert(strings[i + 1].trim()?.toLowerCase());
                if (value) number += value * Math.floor(v);
                else fails++
            }
        } else {
            let no = parseInt(v), str = v.substring(no.toString()?.length)?.trim()?.toLowerCase();
            let value = convert(str);

            if (value && no) number += no * value;
            else fails++;
        }
    });

    return fails === strings.length ? undefined : number;
}