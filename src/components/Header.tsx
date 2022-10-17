import { ConnectKitButton } from 'connectkit';
import styled from 'styled-components';

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

type Props = {};

const Header = ({}: Props) => {
  return (
    <Wrapper>
      <ConnectKitButton />
    </Wrapper>
  );
};

export default Header;
