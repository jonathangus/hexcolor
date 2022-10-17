export const stringIsHex = (str: string): boolean =>
  Boolean(str.match(/^#([A-F0-9]{3}|[A-F0-9]{6})$/i));
