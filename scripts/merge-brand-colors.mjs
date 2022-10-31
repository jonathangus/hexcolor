import oldBrands from '../src/config/brand.json' assert { type: "json" };
import newBrands from '../src/config/bc-brands.json' assert { type: "json" };
import fs from 'fs';

const main = () => {

  const map = new Map();

  Object.entries(oldBrands).forEach(([title, color]) => {
    const [match] = title.match(/-\d+$/g) ?? []
    const normalizedTitle = match ? title.replace(match, "") : title;
    const key = normalizedTitle.replaceAll("-", " ").toLowerCase()

    const colorSet = new Set(map.get(key) ?? []);
    colorSet.add(color.toLowerCase().replace("#", ""))
    map.set(key, colorSet);
  });

  newBrands.forEach(brand => {
    const key = brand.title.toLowerCase()
    const colorSet = new Set(map.get(key) ?? []);
    brand.colors.forEach(color => {
      colorSet.add(color.toLowerCase())
    });
    map.set(key, colorSet);
  })


  const brandList = Array.from(map.entries()).map(([title, colors]) => ({ title, colors: Array.from(colors) }));

  JSON.stringify(brandList, null, 2)  

  fs.writeFileSync(
    'src/config/brands.json',
    JSON.stringify(brandList, null, 4),
    'utf-8'
  );
};

main();