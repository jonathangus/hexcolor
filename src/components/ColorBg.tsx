import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  transition: background 1s ease;
`;

type Props = { children: ReactNode };

const ColorBg = ({ children }: Props) => {
  const router = useRouter();
  const [wantedColor] = router?.query?.color || [];

  return (
    <Wrapper style={{ backgroundColor: `#${wantedColor}` }}>{children}</Wrapper>
  );
};

export default ColorBg;
