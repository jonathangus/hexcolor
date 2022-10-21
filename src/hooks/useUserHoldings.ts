import { useQuery } from '@tanstack/react-query';
import { getUserHoldings } from '../utils/api';

const useUserHoldings = (address: string) => {
  const query = useQuery(
    ['holdings', address],
    () => getUserHoldings(address),
    {
      enabled: Boolean(address),
    }
  );

  return query;
};

export default useUserHoldings;
