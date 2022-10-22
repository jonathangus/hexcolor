import { ReactNode } from 'react';
import styled from 'styled-components';
import useColorMatch from '../hooks/useColorMatch';
import { pickTextColorBasedOnBgColorAdvanced } from '../utils/extra';
import { createGlobalStyle } from 'styled-components';
const Wrapper = styled.div`
  height: 100%;
  transition: background 1s ease, color 1s ease;
  background: var(--bg-color);
  color: var(--text-color);
`;

const GlobalStyle = createGlobalStyle<{ hex: string }>`
  :root {
        --bg-color: ${(props) => props.hex};
        --text-color: ${(props) =>
          pickTextColorBasedOnBgColorAdvanced(props.hex, '#ffffff', '#000000')}
      }
`;

type Props = { children: ReactNode; mounted: boolean };

const ColorBg = ({ children, mounted }: Props) => {
  const { hex } = useColorMatch();

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
        {mounted && hex && <GlobalStyle hex={hex} />}
      </>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default ColorBg;
