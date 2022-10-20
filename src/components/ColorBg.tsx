import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { pickTextColorBasedOnBgColorAdvanced } from '../utils/extra';

const Wrapper = styled.div`
  height: 100%;
  transition: background 1s ease, color 1s ease;
  background: var(--bg-color);
  color: var(--text-color);
`;

type Props = { children: ReactNode };

const ColorBg = ({ children }: Props) => {
  const router = useRouter();
  const [wantedColor] = router?.query?.color || [];
  const hex = `#${wantedColor}`;
  return (
    <>
      {wantedColor && (
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
