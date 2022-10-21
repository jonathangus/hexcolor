import { useRouter } from 'next/router';
import styled from 'styled-components';
import { randomColor } from '../utils/extra';

type Props = {};

const Button = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 240px;
  height: 60px;
  border-radius: 30px;
  background: #fff;
  color: black;
  border: none;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  mix-blend-mode: screen;

  &:before {
    position: absolute;
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
  const handleClick = () => {
    const color = `/${randomColor()}`;
    router.push(color + '?color=' + color, color, {
      shallow: true,
    });
  };
  return <Button onClick={handleClick}>Random</Button>;
};

export default Random;
