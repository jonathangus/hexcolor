import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { randomColor, rgbToHex } from '../utils/extra';
import dynamic from 'next/dynamic';

const ColorPicker = dynamic(async () => {
  const mod = await import('react-canvas-color-picker');
  return mod.ColorPicker;
});

const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

type Props = {};

const ColorSelectCanvas = ({}: Props) => {
  const [color, setColor] = useState({ r: 255, g: 80, b: 255, a: 1 });
  const [formats, setFormats] = useState<any[]>(['rgba']);
  const [spectrum, setSpectrum] = useState<'hsla' | 'hsva'>('hsva');
  const colorPickerRef = useRef<any>();

  const handleSpectrumClick = () => {
    setSpectrum(spectrum === 'hsva' ? 'hsla' : 'hsva');
  };

  const handleChange = useCallback(({ colors }) => {
    console.log(colors);
    setColor({ ...colors.rgba });
  }, []);

  const handleFormatChange = useCallback(
    (event: any) => {
      const { name } = event.target;
      const index = formats.indexOf(name);
      const isChecked = index !== -1;

      let newFormats = [...formats];

      if (isChecked) {
        newFormats.splice(index, 1);
      } else {
        newFormats.push(name);
      }
      setFormats(newFormats);
    },
    [formats]
  );

  console.log(ColorPicker);
  return (
    <ColorPicker
      spectrum={spectrum}
      formats={formats}
      initialColor={color}
      onPanStart={handleChange}
      onPan={handleChange}
      ref={colorPickerRef}
    />
  );
};

export default ColorSelectCanvas;
