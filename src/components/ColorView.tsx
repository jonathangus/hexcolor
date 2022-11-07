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
import StructuredCard from './StructuredCard';
import MatosLogo from '../../public/matos.svg';

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
  bottom: 60%;
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

const Title = styled(motion.h1)`
  font-size: 4rem;
  text-transform: uppercase;
`;

const Info = styled(motion.div)`
  position: absolute;
  text-align: center;
  bottom: 48px;
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 16px;

  @media (min-width: 500px) {
    bottom: 15%;
  }
`;

const titleVariants = {
  show: {
    opacty: 1,
    y: 0,
  },
  hidden: {
    opacity: 0.25,
    y: 10,
  },
};

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

  const displayName = xkcd ? (
    <GroupMatch {...xkcd} type="xkcd" />
  ) : web ? (
    <GroupMatch {...web} type="web" />
  ) : (
    wiki && <GroupMatch {...wiki} type="wiki" />
  );

  return (
    <Wrapper>
      <Inner>
        <Content>
          <Title
            id="color-title"
            animate={data ? 'show' : 'hidden'}
            variants={titleVariants}
          >
            {hex}
          </Title>
        </Content>
      </Inner>

      <Info animate={data ? 'show' : 'hidden'} variants={titleVariants}>
        <StructuredCard
          color={color}
          owner={data?.owner && (ensName || data.ensName || data.owner)}
          registerUrl={
            data?.available &&
            `https://app.ens.domains/name/${color}.eth/register`
          }
          owns={
            data?.alsoOwns &&
            data.alsoOwns.length > 0 && <UserRelated items={data.alsoOwns} />
          }
          name={displayName}
          brand={
            brands?.length > 0 && (
              <GroupMatch
                names={brands.map((brand) => brand.name)}
                type="brands"
              />
            )
          }
        />
      </Info>

      <UpvoteWrap>
        <Upvote color={color} />
      </UpvoteWrap>

      <MatosFooter>{/* <MatosLogo /> */}</MatosFooter>
    </Wrapper>
  );
};

export default ColorView;
