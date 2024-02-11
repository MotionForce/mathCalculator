import { format_decimal } from "$lib/utilities";
import { larger, type Fraction, evaluate, largerEq, smaller, smallerEq, equal, fraction, create, all } from "mathjs";

const math = create(all);

math.config({
  epsilon: 1e-12,
  matrix: "Matrix",
  number: "Fraction",
  precision: 64,
  predictable: false,
  randomSeed: null
});

export function domain() {
  return String.raw`dom(f)=\mathbb{{R}}`;
}

export function image(a: Fraction, k: Fraction) {
  if (larger(a, 0)) {
    return String.raw`${String.raw`ima(f)=[${format_decimal(fraction(k))},+\infty[`}`
  } else {
    return String.raw`ima(f)=]-\infty,${format_decimal(fraction(k))}]`;
  }
}

export function valeur_initiale(a: Fraction, h: Fraction, k: Fraction) {
  return String.raw`f(0)=${format_decimal(fraction(evaluate(`(-${h}) ^ 2 * ${a} + ${k}`)))}`;
}

export function zeros(a: Fraction, h: Fraction, k: Fraction, sols: [Fraction | null, Fraction | null]) {
  if (sols[0] === null || sols[1] === null) {
    return String.raw`Erreur de calcul`;
  }
  if (equal(k, 0)) {
    return String.raw`f(x)=0\space\forall\space x=${format_decimal(fraction(h))}`
  } else if (larger(evaluate(`${a}*${k}`), 0)) {
    return String.raw`f(x)=0\space\forall\space x\in \{\}`
  } else {
    return String.raw`f(x)=0\space\forall\space x\in \{${format_decimal(fraction(sols[0]))}, ${format_decimal(fraction(sols[1]))}\}`
  }
}

export function croissance(a: Fraction, h: Fraction) {
  if (larger(a, 0)) {
    return String.raw`f\nearrow\space\forall\space x\in [${format_decimal(fraction(h))},+\infty[`;
  } else {
    return String.raw`f\nearrow\space\forall\space x\in ]-\infty,${format_decimal(fraction(h))}]`;
  }
}

export function decroissance(a: Fraction, h: Fraction) {
  if (larger(a, 0)) {
    return String.raw`f\searrow\space\forall\space x\in ]-\infty,${format_decimal(fraction(h))}]`;
  } else {
    return String.raw`f\searrow\space\forall\space x\in [${format_decimal(fraction(h))},+\infty[`;
  }
}

export function signe_positif(a: Fraction, h: Fraction, k: Fraction, sols: [Fraction | null, Fraction | null]) {
  if (largerEq(a, 0) && largerEq(k, 0)) {
    return String.raw`f(x) \geq0\space\forall\space x\in\mathbb{R}`;
  } else if (smaller(a, 0) && smaller(k, 0)) {
    return String.raw`f(x) \geq0\space\forall\space x\in\{\}`;
  } else if (smaller(a, 0) && equal(k, 0)) {
    return String.raw`f(x) \geq0\space\forall\space x=${format_decimal(fraction(h))}`;
  } else if (smaller(a, 0) && larger(k, 0)) {
    if (sols[0] === null || sols[1] === null) {
      return String.raw`Erreur de calcul`;
    }
    return String.raw`f(x) \geq0\space\forall\space x\in [${format_decimal(fraction(sols[0]))}, ${format_decimal(fraction(sols[1]))}]`;
  } else if (larger(a, 0) && smaller(k, 0)) {
    if (sols[0] === null || sols[1] === null) {
      return String.raw`Erreur de calcul`;
    }
    return String.raw`f(x) \geq0\space\forall\space x\in]-\infty, ${format_decimal(fraction(sols[0]))}]\cup[${format_decimal(fraction(sols[1]))}, +\infty[`;
  }
}

export function signe_negatif(a: Fraction, h: Fraction, k: Fraction, sols: [Fraction | null, Fraction | null]) {
  if (larger(a, 0) && larger(k, 0)) {
    return String.raw`f(x) \leq0\space\forall\space x\in\{\}`;
  } else if (smallerEq(a, 0) && smallerEq(k, 0)) {
    return String.raw`f(x) \leq0\space\forall\space x\in\mathbb{R}`;
  } else if (larger(a, 0) && equal(k, 0)) {
    return String.raw`f(x) \leq0\space\forall\space x=${format_decimal(h)}`;
  } else if (larger(a, 0) && smaller(k, 0)) {
    if (sols[0] === null || sols[1] === null) {
      return String.raw`Erreur de calcul`;
    }
    return String.raw`f(x) \leq0\space\forall\space x\in [${format_decimal(fraction(sols[0]))}, ${format_decimal(fraction(sols[1]))}]`;
  } else if (smaller(a, 0) && larger(k, 0)) {
    if (sols[0] === null || sols[1] === null) {
      return String.raw`Erreur de calcul`;
    }
    return String.raw`f(x) \leq0\space\forall\space x\in]-\infty, ${format_decimal(fraction(sols[0]))}]\cup[${format_decimal(fraction(sols[1]))}, +\infty[`;
  }
}