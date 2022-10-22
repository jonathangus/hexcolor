import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';
import { randomColor } from '../utils/extra';

type Props = {};

const Button = styled.a`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 240px;
  text-align: center;
  padding: 24px 0;
  border-radius: 30px;
  background: #fff;
  color: black;
  border: none;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  mix-blend-mode: screen;
  text-decoration: none;

  &:before {
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    border-radius: 0.3em;
    content: '';
    mix-blend-mode: color-burn;
  }
`;

const Random = ({}: Props) => {
  const router = useRouter();
  const color = useMemo(() => randomColor(), [router.asPath]);

  return (
    <Link
      prefetch
      as={`/${color}`}
      href={color + '?color=' + color}
      shallow
      passHref
    >
      <Button>Random</Button>
    </Link>
  );
};

export default Random;
