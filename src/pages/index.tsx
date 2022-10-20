import type { NextPage } from 'next';
import styled from 'styled-components';
import Random from '../components/Random';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Random />
    </Wrapper>
  );
};

export default Home;
