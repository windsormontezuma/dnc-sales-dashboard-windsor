/**
 * Convert pixels to rem
 * @param pixels - Pixel value to be converted
 * @returns The convertes rem value
 */
export function pxToRem(pixels: number): string {
    return `${pixels / 16}rem`
}