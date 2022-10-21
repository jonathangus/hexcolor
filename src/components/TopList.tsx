import Link from 'next/link';
import styled from 'styled-components';
import useEnsTop from '../hooks/useEnsTop';

const Wrapper = styled.div`
  height: 300px;
  overflow: scroll;
  position: absolute;
  bottom: 12px;
  left: 12px;
`;
const Item = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
`;
const Box = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Checker = styled.div`
  margin-left: 5px;
`;

const TopList = () => {
  const { data, error } = useEnsTop();

  if (!data) {
    return null;
  }

  return (
    <Wrapper>
      {data.map((domain) => (
        <Item key={domain.hex}>
          <Link
            as={`/${domain.hex}`}
            href={domain.hex + '?color=' + domain.hex}
            shallow
          >
            <Item>
              <Box style={{ backgroundColor: '#' + domain.hex }} />
              {domain.name} - {domain.hex}.eth{' '}
              <Checker>{domain.available ? '✅' : '❌'}</Checker>
            </Item>
          </Link>
        </Item>
      ))}
    </Wrapper>
  );
};

export default TopList;
