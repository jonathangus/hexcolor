import { useRouter } from 'next/router';
import { stringIsHex } from '../utils/regex';

const useColorMatch = () => {
  const router = useRouter();
  let hex;
  let [wantedColor] = router?.query?.color || [];
  if (wantedColor) {
    hex = `#${wantedColor}`;
  }

  if (!wantedColor && typeof window !== 'undefined') {
    const match = '#' + window.location.pathname.replace('/', '');
    if (stringIsHex(match)) {
      hex = match;
    }
  }

  return {
    hex,
  };
};

export default useColorMatch;
