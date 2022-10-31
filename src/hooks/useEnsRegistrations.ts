import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useBlockNumber } from 'wagmi';
import { getRegistrations } from '../utils/api';

const useEnsRegistrations = () => {
  const [lastBlock, setLastBlock] = useState<number>();
  useBlockNumber({
    onBlock: (_lastBlock) => {
      setLastBlock(_lastBlock);
    },
    watch: false,
  });

  const query = useQuery(
    ['registrations', lastBlock],
    () => getRegistrations(lastBlock - 1),
    {
      refetchInterval: 7000,
      enabled: Boolean(lastBlock),
      onSuccess: (res) => {
        if (res[0]) {
          setLastBlock(res[0].blockNr);
        }
      },
    }
  );

  return query;
};

export default useEnsRegistrations;
