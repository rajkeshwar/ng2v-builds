export declare const HEX: RegExp;
export declare const RGB: RegExp;
export declare const HSL: RegExp;
export declare class Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class Hsla {
    h: number;
    s: number;
    l: number;
    a: number;
    constructor(h: number, s: number, l: number, a: number);
}
export declare class Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number);
}
export declare class SliderPosition {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class SliderDimension {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class ColorUtil {
    colors: Array<any>;
    getColor(color: string): string;
    /**
     * Checks whether a color is valid.
     * @param {Color} color
     * @return {boolean} Whether the color is a valid Color.
     */
    isColorValid(color: string): boolean;
    hsla2hsva(hsla: Hsla): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    hsva2hsla(hsva: Hsva): Hsla;
    rgbaToHsva(rgba: Rgba): Hsva;
    hsvaToRgba(hsva: Hsva): Rgba;
    stringToHsva(colorString: string): any;
    outputFormat(hsva: Hsva, outputFormat: string): string;
    hexText(rgba: Rgba): string;
    denormalizeRGBA(rgba: Rgba): Rgba;
}
