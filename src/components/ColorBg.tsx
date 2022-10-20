import { useRouter } from 'next/router';
import { type } from 'os';
import { ReactNode } from 'react';
import styled from 'styled-components';
import useColorMatch from '../hooks/useColorMatch';
import { pickTextColorBasedOnBgColorAdvanced } from '../utils/extra';
import { stringIsHex } from '../utils/regex';

const Wrapper = styled.div`
  height: 100%;
  transition: background 1s ease, color 1s ease;
  background: var(--bg-color);
  color: var(--text-color);
`;

type Props = { children: ReactNode };

const ColorBg = ({ children }: Props) => {
  const { hex } = useColorMatch();

  return (
    <>
      {hex && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg-color: ${hex};
                --text-color: ${pickTextColorBasedOnBgColorAdvanced(
                  hex,
                  '#ffffff',
                  '#000000'
                )}
              }
      `,
          }}
        />
      )}

      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default ColorBg;
