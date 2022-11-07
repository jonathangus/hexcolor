import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';
import { randomColor } from '../utils/extra';

type Props = { force?: boolean };

const Button = styled.a`
  font-weight: 500;
  padding: 8px;
  text-align: center;
  width: 100%;
  border-radius: 8px;
  background: #f6f7f9;
  color: #111111;
  border: 1px solid #111111;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 1px solid #0029ff;
    color: #0029ff;
  }
`;

const Random = ({ force }: Props) => {
  const router = useRouter();
  const color = useMemo(() => randomColor(true, force), [router.asPath, force]);

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
