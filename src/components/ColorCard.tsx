import Link from 'next/link';
import styled, { css } from 'styled-components';
import { getName } from '../utils/extra';

const Box = styled.div<{ size?: 'sm' | 'l' }>`
  ${(props) =>
    props.size === 'l' &&
    css`
      width: 80px;
      height: 80px;
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
          {size == 'l' && (
            <>
              <div>{hex}</div>
              {name && <div>✨✨✨ {name} ✨✨✨</div>}
            </>
          )}
        </Box>
      </a>
    </Link>
  );
};

export default ColorCard;
