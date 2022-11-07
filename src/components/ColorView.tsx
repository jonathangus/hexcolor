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

      <MatosFooter>
        <svg
          width="100"
          height="24"
          viewBox="0 0 536 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9998 48.5181C10.9997 4.57352 75.52 3.57479 75.52 48.5181"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M10.9998 48.4391L10.9998 122.982"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M75.5181 48.5561C75.5181 4.56142 140.038 3.56155 140.038 48.5561"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M176.717 48.5942C176.717 4.5493 241.238 3.54829 241.238 48.5942"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M241.417 90.5729C241.417 74.1532 226.974 60.8423 209.157 60.8423C191.34 60.8423 176.897 74.1532 176.897 90.5729"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M524.734 81.4838C524.734 124.172 465.039 124.887 460.488 86.262"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M460.213 44.9153C460.213 2.16112 520.186 -1.85086 524.314 42.5082"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M460.213 44.9159C460.213 56.9762 524.734 68.2251 524.734 82.5458"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M269.688 44.9142C269.688 0.820636 334.208 -0.181486 334.208 44.9142"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M301.908 11.3024L301.908 122.983"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M176.57 48.4391L176.57 122.982"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M241.045 48.4391L241.045 122.982"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M139.951 48.4391L139.951 122.982"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M364.035 44.9142C364.035 0.820634 428.555 -0.181488 428.555 44.9142"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M364.035 82.5452C364.035 125.939 428.555 126.925 428.555 82.5452"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M364.035 39.0759V82.5457"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M428.554 39.0759V82.5457"
            stroke="white"
            stroke-width="21.0987"
          />
          <path
            d="M75.4746 48.4391L75.4746 122.982"
            stroke="white"
            stroke-width="21.0987"
          />
        </svg>
      </MatosFooter>
    </Wrapper>
  );
};

export default ColorView;
