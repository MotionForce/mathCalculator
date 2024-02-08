export function domain() {
  return String.raw`dom(f)=\mathbb{{R}}`;
}

export function image(a: number, k: number) {
  if (a > 0) {
    return String.raw`${String.raw`ima(f)=[${format_decimal(k)},+\infty[`}`
  } else {
    return String.raw`ima(f)=]-\infty,${format_decimal(k)}]`;
  }
}

export function valeur_initiale(a: number, h: number, k: number) {
  return String.raw`f(0)=${format_decimal((-h) ** 2 * a + k)}`;
}

export function zeros(a: number, h: number, k: number, sol_1: number | null, sol_2: number | null) {
  if (k === 0) {
    return String.raw`f(x)=0\space\forall\space x=${format_decimal(h)}`
  } else if (a * k > 0) {
    return String.raw`f(x)=0\space\forall\space x\in \{\}`
  } else {
    return String.raw`f(x)=0\space\forall\space x\in \{${format_decimal(sol_1)}, ${format_decimal(sol_2)}\}`
  }
}

export function croissance(a: number, h: number) {
  if (a > 0) {
    return String.raw`f\nearrow\space\forall\space x\in [${format_decimal(h)},+\infty[`;
  } else {
    return String.raw`f\nearrow\space\forall\space x\in ]-\infty,${format_decimal(h)}]`;
  }
}

export function decroissance(a: number, h: number) {
  if (a > 0) {
    return String.raw`f\searrow\space\forall\space x\in ]-\infty,${format_decimal(h)}]`;
  } else {
    return String.raw`f\searrow\space\forall\space x\in [${format_decimal(h)},+\infty[`;
  }
}

export function signe_positif(a: number, h: number, k: number, sol_1: number | null, sol_2: number | null) {
  if (a >= 0 && k >= 0) {
    return String.raw`f(x) \geq0\space\forall\space x\in\mathbb{R}`;
  } else if (a < 0 && k < 0) {
    return String.raw`f(x) \geq0\space\forall\space x\in\{\}`;
  } else if (a < 0 && k === 0) {
    return String.raw`f(x) \geq0\space\forall\space x=${format_decimal(h)}`;
  } else if (a < 0 && k > 0) {
    return String.raw`f(x) \geq0\space\forall\space x\in [${format_decimal(sol_1)}, ${format_decimal(sol_2)}]`;
  } else if (a > 0 && k < 0) {
    return String.raw`f(x) \geq0\space\forall\space x\in]-\infty, ${format_decimal(sol_1)}]\cup[${format_decimal(sol_2)}, +\infty[`;
  }
}

export function signe_negatif(a: number, h: number, k: number, sol_1: number | null, sol_2: number | null) {
  if (a > 0 && k > 0) {
    return String.raw`f(x) \leq0\space\forall\space x\in\{\}`;
  } else if (a <= 0 && k <= 0) {
    return String.raw`f(x) \leq0\space\forall\space x\in\mathbb{R}`;
  } else if (a > 0 && k === 0) {
    return String.raw`f(x) \leq0\space\forall\space x=${format_decimal(h)}`;
  } else if (a > 0 && k < 0) {
    return String.raw`f(x) \leq0\space\forall\space x\in [${format_decimal(sol_1)}, ${format_decimal(sol_2)}]`;
  } else if (a < 0 && k > 0) {
    return String.raw`f(x) \leq0\space\forall\space x\in]-\infty, ${format_decimal(sol_1)}]\cup[${format_decimal(sol_2)}, +\infty[`;
  }
}

export function format_decimal(x: number | null) {
  if (x === null) {
    return String.raw`null`;
  }
  let w_x: string | undefined;
  let d_x: string | undefined;
  let s_x = x.toString();
  if (s_x.includes(".")) {
    w_x = s_x.split(".")[0];
  }
  if (/(\d+?)\1+$/mg.test(s_x)) {
    let r_d_x = /(\d+?)\1+$/mg.exec(s_x)![1];
    console.log(r_d_x);
    d_x = String.raw`\overline{${r_d_x}}`;
  } else {
    d_x = s_x.split(".")[1];
  }
  return String.raw`${w_x !== undefined ? String.raw`${w_x}.${d_x}` : s_x}`
}