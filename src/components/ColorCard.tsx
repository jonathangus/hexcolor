import Link from 'next/link';
import styled, { css } from 'styled-components';
import { getName } from '../utils/extra';

const Box = styled.div<{ size?: 'sm' | 'l' }>`
  ${(props) =>
    props.size === 'l' &&
    css`
      width: 80px;
      height: 80px;

      @media (max-width: 800px) {
        width: 40px;
        height: 40px;
      }
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      width: 50px;
      height: 50px;
    `}
`;

type Props = { color: string; size?: 'sm' | 'l' };

const ColorCard = ({ color, size = 'l' }: Props) => {
  const hex = `#${color}`;
  const name = getName(color);

  return (
    <Link as={`/${color}`} href={color + '?color=' + color} shallow>
      <a>
        <Box style={{ background: hex }} size={size}>
          {size == 'l' && <></>}
        </Box>
      </a>
    </Link>
  );
};

export default ColorCard;
