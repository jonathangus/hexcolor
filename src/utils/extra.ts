import colors from './colors.json';

export const colorIsSpecial = (str: string): boolean =>
  colors.some((color) => color.hex === str);

export const getName = (color: string): string | void => {
  const match = colors.find(
    (str) => str.hex.toLowerCase() === color.toLowerCase()
  );

  if (match) {
    return match.name.replace(/([A-Z])/g, ' $1').trim();
  }
};

export const randomColor = (): string => {
  const newColour = ((Math.random() * 0xffffff) << 0).toString(16);
  if (newColour.length < 6) {
    return randomColor();
  }
  return newColour;
};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function pickTextColorBasedOnBgColorAdvanced(
  bgColor,
  lightColor,
  darkColor
): string {
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
