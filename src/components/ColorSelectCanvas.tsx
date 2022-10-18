import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { randomColor } from '../utils/extra';

const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

type Props = {};

const ColorSelectCanvas = ({}: Props) => {
  const el = useRef<HTMLCanvasElement>();
  useEffect(() => {
    var canvas = el.current;
    const { width, height } = canvas;
    const context = canvas.getContext('2d');
    const gradientH = context.createLinearGradient(0, 0, width, 0);
    gradientH.addColorStop(0, 'rgb(255, 0, 0)'); // red
    gradientH.addColorStop(1 / 6, 'rgb(255, 255, 0)'); // yellow
    gradientH.addColorStop(2 / 6, 'rgb(0, 255, 0)'); // green
    gradientH.addColorStop(3 / 6, 'rgb(0, 255, 255)');
    gradientH.addColorStop(4 / 6, 'rgb(0, 0, 255)'); // blue
    gradientH.addColorStop(5 / 6, 'rgb(255, 0, 255)');
    gradientH.addColorStop(1, 'rgb(255, 0, 0)'); // red
    context.fillStyle = gradientH;
    context.fillRect(0, 0, width, height);
    const gradientV = context.createLinearGradient(0, 0, 0, height);
    gradientV.addColorStop(0, 'rgba(255, 255, 255, 1)'); // white
    gradientV.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradientV.addColorStop(0.5, 'rgba(0, 0, 0, 0)'); // transparent
    gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)'); // black
    context.fillStyle = gradientV;
    context.fillRect(0, 0, width, height);

    const onClick = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const ctx = el.current.getContext('2d');

      console.log(event.target);
      const imgData = ctx.getImageData(x, y, 1, 1);
      const [r, g, b] = imgData.data;

      console.log(r, g, b);
    };

    canvas.addEventListener('click', onClick);
    return () => {
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return <Canvas ref={el} />;
};

export default ColorSelectCanvas;
