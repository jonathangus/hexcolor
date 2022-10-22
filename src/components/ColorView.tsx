import { ethers } from 'ethers';
import styled from 'styled-components';
import { chain, useAccount, useEnsName } from 'wagmi';
import { useColorContext } from '../context/ColorContext';
import useEnsStats from '../hooks/useEnsStats';
import { getName } from '../utils/extra';
import Random from './Random';
import Upvote from './Upvote';
import UserRelated from './UserRelated';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10vh 0;
  text-align: center;
  color: var(--text-color);
`;

const Inner = styled.div`
  position: relative;
`;

const MatosFooter = styled.div`
  position: fixed;
  bottom: 12px;
  left: 12px;
  color: var(--text-color);
  transition: color 1s ease;
`;

const UpvoteWrap = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  color: var(--text-color);
  transition: color 1s ease;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-transform: uppercase;
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: -100%;
  text-align: center;
  width: 100%;
  font-size: 18px;
`;

const ButtonWrap = styled(motion.div)`
  position: relative;
`;
const infoVariants = {
  show: {
    opacty: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 15,
  },
};
const buttonVariants = {
  show: {
    opacity: 1,
    scale: [0, 1.05, 0.9, 1],
    transition: {
      // type: 'spring',
      // scale: {
      //   delay: 1,
      // },
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
};

const Content = styled.div``;

type Props = {};

const ColorView = ({}: Props) => {
  const { color, hex } = useColorContext();
  const { data, error } = useEnsStats(color);
  const name = getName(color);
  const { data: ensName } = useEnsName({
    address: data?.owner ? ethers.utils.getAddress(data.owner) : '0x',
    enabled: Boolean(data?.owner),
    chainId: chain.mainnet.id,
  });
  return (
    <Wrapper>
      <div>
        {data?.alsoOwns && data.alsoOwns.length > 0 && (
          <UserRelated items={data.alsoOwns} />
        )}
      </div>

      <Inner>
        <Content>
          <Title>{hex}</Title>
          {name && (
            <div>
              ✨✨✨ sweet! the name of this color is <i>{name}</i> and is one
              of the 145{' '}
              <a href="https://www.colorabout.com/list/x11/">x11 colors</a>{' '}
              ✨✨✨
            </div>
          )}
        </Content>
        <Info animate={data ? 'show' : 'hidden'} variants={infoVariants}>
          {data?.available && (
            <div>
              {color}.eth not registered.{' '}
              <a href={`https://app.ens.domains/name/${color}.eth/register`}>
                Register now
              </a>
            </div>
          )}

          {data?.owner && (
            <div>
              {color}.eth is owned by: {ensName || data.ensName || data.owner}
            </div>
          )}
        </Info>
      </Inner>

      <ButtonWrap variants={buttonVariants} animate={data ? 'show' : 'hidden'}>
        <Random />
      </ButtonWrap>

      <UpvoteWrap>
        <Upvote color={color} />
      </UpvoteWrap>
      <MatosFooter>
        by{' '}
        <a
          target="_blank"
          href="https://twitter.com/Matos_DAO"
          rel="noreferrer"
        >
          @Matos_DAO
        </a>
      </MatosFooter>
    </Wrapper>
  );
};

export default ColorView;
