import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import ColorCard from './ColorCard';

const Rows = styled(motion.div)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 100;
  max-width: 1800px;
  padding: 0 30px;
  max-height: 220px;
  overflow: auto;
  overflow: auto;
  max-width: 70%;

  @media (max-width: 800px) {
    max-width: 100%;
    max-height: 180px;
  }
`;

const Pointer = styled(motion.div)`
  width: 70%;
  font-size: 22px;
  padding-top: 20px;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 18px;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const Hand = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

const variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};
type Props = { items: string[] };

const UserRelated = ({ items }: Props) => {
  const [completed, setCompleted] = useState(false);
  return (
    <Wrapper>
      <Rows
        initial="hidden"
        animate="show"
        onAnimationComplete={() => setCompleted(true)}
        variants={{
          show: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.5,
              type: 'spring',
            },
          },
        }}
      >
        {items.map((item) => (
          <motion.div variants={variants} key={item}>
            <ColorCard color={item} />
          </motion.div>
        ))}
      </Rows>
      {completed && (
        <Pointer>
          Same user also owns these badboys
          <Hand
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            👆
          </Hand>
        </Pointer>
      )}
    </Wrapper>
  );
};

export default UserRelated;
