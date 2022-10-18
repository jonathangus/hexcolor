import type { NextPage } from 'next';
import styled from 'styled-components';
import ColorSelectCanvas from '../components/ColorSelectCanvas';
import Random from '../components/Random';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <ColorSelectCanvas />
      <Random />
    </Wrapper>
  );
};

export default Home;
