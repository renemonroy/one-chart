import { ISvgRect, ISvgLine, ISvgCircle } from "./svg.types";

/**
 * convertBorderRadius
 * -----------------------------------------------------------------------
 */
export function convertBorderRadius(value: string | number) {
  if (typeof value === "string")
    return value.split(" ").map((n) => parseInt(n, 10));
  return [value, value, value, value];
}

/**
 * drawRect
 * -----------------------------------------------------------------------
 */
export function drawRect({ x, y, w, h, r }: ISvgRect): string {
  const [r0, r1, r2, r3] = convertBorderRadius(r);
  const xw = x + w;
  const yh = y - h;
  return `
    M ${x} ${y - r0}
    L ${x} ${yh + r0}
    A ${r0} ${r0} 0 0 1 ${x + r0} ${yh}
    L ${xw - r1} ${yh}
    A ${r1} ${r1} 0 0 1 ${xw} ${yh + r1}
    L ${xw} ${y - r2}
    A ${r2} ${r2} 0 0 1 ${xw - r2} ${y}
    L ${x + r3} ${y}
    A ${r3} ${r3} 0 0 1 ${x} ${y - r3}
    Z
  `;
}

export function drawNegativeRect({ x, y, w, h, r }: ISvgRect): string {
  const [r0, r1, r2, r3] = convertBorderRadius(r);
  const xw = x + w;
  const yh = y - h;
  return `
    M ${x + r0} ${y}
    L ${xw - r1} ${y}
    A ${r1} ${r1} 0 0 1 ${xw} ${y + r1}
    L ${xw} ${yh - r2}
    A ${r2} ${r2} 0 0 1 ${xw - r2} ${yh}
    L ${x + r3} ${yh}
    A ${r3} ${r3} 0 0 1 ${x} ${yh - r3}
    L ${x} ${y + r0}
    A ${r0} ${r0} 0 0 1 ${x + r0} ${y}
    Z
  `;
}

/**
 * drawVerticalLine
 * -----------------------------------------------------------------------
 */
export function drawVerticalLine({ x, y, w, h }: ISvgLine): string {
  const xw = x + w / 2;
  return `
    M ${xw} ${y}
    L ${xw} ${h}
  `;
}

/**
 * drawCircle
 * -----------------------------------------------------------------------
 */
export function drawCircle({ x, y, r }: ISvgCircle): string {
  return `
    M ${x}, ${y}
    a ${r},${r} 0 1,0 ${r * 2},0
    a ${r},${r} 0,1,0 -${r * 2}, 0
  `;
}
