import { ConnectKitButton } from 'connectkit';
import styled from 'styled-components';
import MyHoldings from './MyHoldings';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  padding: 12px;
  justify-content: flex-end;
`;

const Acc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

type Props = {};

const Header = ({}: Props) => {
  return (
    <Wrapper>
      <Acc>
        <ConnectKitButton />
        <MyHoldings />
      </Acc>
    </Wrapper>
  );
};

export default Header;
