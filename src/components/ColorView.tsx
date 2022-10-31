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
import GroupMatch from './GroupMatch';

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
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
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
  padding-top: 20px;
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

const Match = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 24px;
`;

const Content = styled.div``;

type Props = {};

const ColorView = ({}: Props) => {
  const { color, hex, web, xkcd, wiki, brands } = useColorContext();
  const { data } = useEnsStats(color);

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
          <Title id="color-title">{hex}</Title>
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

          <Match>
            {web && <GroupMatch {...web} type="web" />}
            {xkcd && <GroupMatch {...xkcd} type="xkcd" />}
            {wiki && <GroupMatch {...wiki} type="wiki" />}
            {brands?.length > 0 && (
              <GroupMatch
                names={brands.map((brand) => brand.name)}
                type="brands"
              />
            )}
          </Match>
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
