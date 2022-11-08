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
import MatosLogo from './MatosLogo';

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
  bottom: 24px;
  left: 16px;
  color: var(--text-color);
  transition: color 1s ease;
  display: flex;
  font-weight: 500;
  align-items: flex-end;

  span {
    margin-left: 4px;
    margin-right: 8px;
  }
`;

const UpvoteWrap = styled.div`
  position: fixed;
  bottom: 24px;
  right: 16px;
  color: var(--text-color);
  transition: color 1s ease;
`;

const Title = styled(motion.h1)`
  font-size: 6rem;
  text-transform: uppercase;
  font-family: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
    'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;

  @media (max-width: 800px) {
    font-size: 4rem;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  text-align: center;
  bottom: 118px;
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
    opacity: 0,
    y: 10,
  },
};

const Content = styled.div``;
const TwitterLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
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
        <TwitterLink target="_blank" href="https://twitter.com/hexcolor_club">
          @hexcolor_club
        </TwitterLink>
        <span>by</span>
        <a target="_blank" href="https://matos.club/" rel="noreferrer">
          <MatosLogo />
        </a>
      </MatosFooter>
    </Wrapper>
  );
};

export default ColorView;
