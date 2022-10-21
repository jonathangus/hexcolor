import { ethers } from 'ethers';
import request, { gql } from 'graphql-request';
import { useProvider, useQuery } from 'wagmi';
import { getEns } from '../utils/api';
import { stringIsHex } from '../utils/regex';

const useEnsStats = (color: string) => {
  const query = useQuery(['color', color], () => getEns(color), {
    enabled: Boolean(color),
  });

  return query;
};

export default useEnsStats;
