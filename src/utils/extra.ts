import webColors from '../config/webcolors.json';
import wikiColors from '../config/wikicolors.json';
import xkcd from '../config/xkcd.json';
import brand from '../config/brand.json';

const brandColors = Object.entries(brand).map(([name, hex]) => ({
  hex,
  name,
}));

export const allColors = [
  ...new Set(
    [...webColors, ...wikiColors, ...xkcd, ...brandColors].map((color) =>
      color.hex.toUpperCase()
    )
  ),
];

export const colors = allColors.map((color) => ({
  hex: color,
  color: color.replace('#', ''),
  web: webColors.find((c) => c.hex.toUpperCase() === color),
  xkcd: xkcd.find((c) => c.hex.toUpperCase() === color),
  wiki: wikiColors.find((c) => c.hex.toUpperCase() === color),
  brand: brandColors.find((c) => c.hex.toUpperCase() === color),
}));

export const colorIsSpecial = (str: string): boolean =>
  colors.some((color) => color.hex === str);

export const getColor = (str: string) => {
  return colors.find((color) => color.hex.toLowerCase() === str.toLowerCase());
};

export const getName = (name: string): string | void => {
  return name.replace(/([A-Z])/g, ' $1').trim();
};

const getRandomColorValue = () => {
  return allColors[Math.floor(Math.random() * allColors.length)].replace(
    '#',
    ''
  );
};

export const randomColor = (useRandom = true, force = false): string => {
  if (force) {
    return getRandomColorValue();
  }

  if (Math.random() * 100 < 20 && useRandom) {
    return getRandomColorValue();
  }

  const newColour = ((Math.random() * 0xffffff) << 0).toString(16);
  if (newColour.length < 6) {
    return randomColor(false);
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
