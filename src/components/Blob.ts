import React, { useState } from 'react';
import SimplexNoise from 'simplex-noise';

// import useInterval from './hooks/useInterval';

const Blob = ({ seed, ...props }) => {
  const [path, setPath] = useState([]);
  const [time, setTime] = useState(0);

  const simplex = new SimplexNoise(seed);

  const generatePath = (newPoints) => {
    return newPoints.reduce((string, point, index) => {
      const { x, y } = point;
      string += `
        ${index !== 0 ? 'L' : ''}${x} ${y}
        ${index === newPoints.length - 1 ? `Z` : ','}
      `;
      return string;
    }, `M${newPoints[0].x} ${newPoints[0].y},`);
  };

  const createDots = () => {
    const circleCenter = 50;
    let circles = [];
    for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / 200) {
      const xoff = Math.cos(a) + 1;
      const yoff = Math.sin(a) + 1;
      const radius = simplex.noise2D(xoff + time, yoff + time) * 2 + 20;
      const x = radius * Math.cos(a) + circleCenter;
      const y = radius * Math.sin(a) + circleCenter;
      circles = [...circles, { x, y }];
    }
    setPath(generatePath(circles));
  };

  //   useInterval(() => {
  //     createDots();
  //     setTime(time + 0.015);
  //   }, 1);

  return <path d={path} {...props} />;
};

export default Blob;
