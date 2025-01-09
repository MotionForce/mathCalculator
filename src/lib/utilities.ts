import {
    isFraction,
    type Fraction,
    multiply,
    add,
    subtract,
    pow,
    divide,
    typeOf
} from "mathjs";

export function format_decimal(x: number | null | Fraction): string {
    if (x === null) {
        return String.raw`null`;
    }
    if (isFraction(x)) {
        if (x.n === x.d) {
            return String.raw`1`;
        }
        if (x.d === 1) {
            return String.raw`${x.n}`;
        }
        return String.raw`\frac{${x.s === 1 ? "" : "-"}${x.n}}{${x.d}}`;
    }
    let w_x: string | undefined;
    let d_x: string | undefined;
    let s_x = x.toString();
    if (s_x.includes(".")) {
        w_x = s_x.split(".")[0];
    }
    if (/(\d+?)\1+$/mg.test(s_x)) {
        let r_d_x = /(\d+?)\1+$/mg.exec(s_x)![1];
        d_x = String.raw`\overline{${r_d_x}}`;
    } else {
        d_x = s_x.split(".")[1];
    }
    return String.raw`${w_x !== undefined ? String.raw`${w_x}.${d_x}` : s_x}`
}

export function calc_sols(a: Fraction | null, h: Fraction | null, k: Fraction | null): [Fraction | null, Fraction | null] {
    if (a === null || h === null || k === null || typeOf(a) !== "Fraction" || typeOf(h) !== "Fraction" || typeOf(k) !== "Fraction") {
        return [null, null];
    }
    let root = divide(pow(subtract(pow(multiply(-2, multiply(a, h)), 2), multiply(multiply(4, a), add(multiply(a, pow(h, 2)), k))), 1 / 2), multiply(2, a));

    let x1 = subtract(h, root);
    let x2 = add(h, root);
    // @ts-expect-error
    return [x1, x2];
}