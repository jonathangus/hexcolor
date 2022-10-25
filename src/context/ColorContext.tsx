import { createContext, PropsWithChildren, useContext } from 'react';

export const ColorContext = createContext<IColorContext>(null as any);

type IColorContext = {
  color: string;
  hex: string;
};

type Props = {
  color: string;
};

export const ColorContextProvider = ({
  children,
  color,
}: PropsWithChildren<Props>) => {
  return (
    <ColorContext.Provider value={{ color, hex: color ? `#${color}` : '' }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
