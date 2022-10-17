import Link from 'next/link';
import styled from 'styled-components';
import { getName } from '../utils/extra';

const Box = styled.div`
  width: 150px;
  height: 150px;
`;

type Props = { color: string };

const ColorCard = ({ color }: Props) => {
  const hex = `#${color}`;
  const name = getName(color);

  return (
    <Link as={`/${color}`} href={color + '?color=' + color} shallow>
      <a>
        <Box style={{ background: hex }}>
          <div>{hex}</div>
          {name && <div>✨✨✨ {name} ✨✨✨</div>}
        </Box>
      </a>
    </Link>
  );
};

export default ColorCard;
