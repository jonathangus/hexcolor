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

type Props = { children: ReactNode; mounted: boolean };

const ColorBg = ({ children, mounted }: Props) => {
  const { hex } = useColorMatch();
  console.log({ mounted });

  const styles = hex
    ? `
           :root {
                --bg-color: ${hex};
                --text-color: ${pickTextColorBasedOnBgColorAdvanced(
                  hex,
                  '#ffffff',
                  '#000000'
                )}
              }
  `
    : '';
  return (
    <>
      <>
        {!mounted && (
          <style
            dangerouslySetInnerHTML={{
              __html: styles,
            }}
          />
        )}
        {mounted && (
          <style jsx global>
            {`
              ${styles}

              body {
                opacity: 1;
              }
            `}
          </style>
        )}
      </>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default ColorBg;
