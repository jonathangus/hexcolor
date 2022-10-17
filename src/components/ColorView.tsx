import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { useColorContext } from '../context/ColorContext';
import useEnsStats from '../hooks/useEnsStats';
import { getName } from '../utils/extra';
import Random from './Random';
import Upvote from './Upvote';
import UserRelated from './UserRelated';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10vh 0;
  text-align: center;
`;

const Inner = styled.div``;

const MatosFooter = styled.div`
  position: fixed;
  bottom: 12px;
  left: 12px;
  color: white;
`;

const UpvoteWrap = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  color: white;
`;

type Props = {};

const ColorView = ({}: Props) => {
  const { color, hex } = useColorContext();
  const { data, error } = useEnsStats(color);
  const name = getName(color);
  const { address } = useAccount();

  return (
    <Wrapper>
      <div>
        {data?.alsoOwns && data.alsoOwns.length > 0 && (
          <UserRelated items={data.alsoOwns} />
        )}
      </div>

      <Inner>
        <h1>{hex}</h1>
        {name && (
          <div>
            ✨✨✨ sweet you got one of the 145{' '}
            <a href="https://www.colorabout.com/list/x11/">x11 colors</a> ✨✨✨
          </div>
        )}

        {data?.available && (
          <div>
            <div>
              {color}.eth not registered.{' '}
              <a href={`https://app.ens.domains/name/${color}.eth/register`}>
                Register now
              </a>
            </div>
          </div>
        )}

        {data?.owner && (
          <div>
            {color}.eth is owned by: {data.ensName || data.owner}
          </div>
        )}
      </Inner>

      <Random />

      <UpvoteWrap>
        <Upvote color={color} />
      </UpvoteWrap>
      <MatosFooter>by @matoslabs</MatosFooter>
    </Wrapper>
  );
};

export default ColorView;
