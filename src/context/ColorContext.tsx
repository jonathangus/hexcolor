import { createContext, PropsWithChildren, useContext } from 'react';
import { getColor } from '../utils/extra';

export const ColorContext = createContext<IColorContext>(null as any);

type ColorMatch = {
  name: string;
  hex: string;
};
type IColorContext = {
  color: string;
  hex: string;
  web?: ColorMatch;
  xkcd?: ColorMatch;
  wiki?: ColorMatch;
  brands?: ColorMatch[];
};

type Props = {
  color: string;
};

export const ColorContextProvider = ({
  children,
  color,
}: PropsWithChildren<Props>) => {
  const match = getColor(`#${color}`) || {};
  return (
    <ColorContext.Provider
      value={{ color, hex: color ? `#${color}` : '', ...match }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
