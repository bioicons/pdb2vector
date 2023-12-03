const HSL2RGB = ({ h, s, l }) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
};

const RGB2HSL = ({r, g, b}) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        l: (100 * (2 * l - s)) / 2,
    };
};

export {
    HSL2RGB,
    RGB2HSL
}