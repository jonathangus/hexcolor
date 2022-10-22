import type { NextPage } from 'next';
import styled from 'styled-components';
import Random from '../components/Random';
import TopList from '../components/TopList';
import Gradient from '../components/Gradient';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  justify-content: center;
`;

const Inner = styled.div`
  position: relative;
  z-index: 12;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Inner>
        <Random />
      </Inner>
      <TopList />
      <Gradient />
    </Wrapper>
  );
};

export default Home;
