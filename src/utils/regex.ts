export const stringIsHex = (str: string): boolean =>
  str ? Boolean(str.match(/^#([A-F0-9]{3}|[A-F0-9]{6})$/i)) : Boolean(str);
