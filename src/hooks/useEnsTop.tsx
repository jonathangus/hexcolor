import { useQuery } from '@tanstack/react-query';
import { getTopNames } from '../utils/api';

const useEnsTop = () => {
  const query = useQuery(['getTopNames'], () => getTopNames());

  return query;
};

export default useEnsTop;
