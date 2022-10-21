import { useQuery } from '@tanstack/react-query';
import { getEns } from '../utils/api';

const useEnsStats = (color: string) => {
  const query = useQuery(['color', color], () => getEns(color), {
    enabled: Boolean(color),
  });

  return query;
};

export default useEnsStats;
