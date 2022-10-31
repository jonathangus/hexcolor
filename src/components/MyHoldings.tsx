import { useAccount } from 'wagmi';
import useUserHoldings from '../hooks/useUserHoldings';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ColorCard from './ColorCard';

const Rows = styled(motion.div)`
  display: grid;
  gap: 20px;
  justify-content: flex-end;
  grid-template-columns: repeat(3, 50px);
  margin-top: 12px;
  position: absolute;
  top: 100%;
  right: 0;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Pointer = styled(motion.div)`
  position: absolute;
  bottom: -100px;
  width: 100%;
  font-size: 22px;
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

const MyHoldings = () => {
  const { address } = useAccount();
  const { data = [] } = useUserHoldings(address);

  if (data.length === 0) {
    return null;
  }

  return (
    <Rows
      initial="hidden"
      animate="show"
      variants={{
        show: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5,
            type: 'spring',
          },
        },
      }}
    >
      {data.map((item) => (
        <motion.div variants={variants} key={item}>
          <ColorCard size="sm" color={item} />
        </motion.div>
      ))}
    </Rows>
  );
};

export default MyHoldings;
