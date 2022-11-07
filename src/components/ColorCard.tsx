import Link from 'next/link';
import styled, { css } from 'styled-components';
import { getName } from '../utils/extra';

const Box = styled.div<{ size?: 'sm' | 'l' }>`
  ${(props) =>
    props.size === 'l' &&
    css`
      width: 24px;
      height: 24px;
      border-radius: 36px;
      border: 2px solid #ffffff;
      margin: 4px 2px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25),
        inset 0px 0px 8px rgba(0, 0, 0, 0.25);
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      width: 18px;
      height: 18px;
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
