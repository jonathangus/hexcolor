import { useRouter } from 'next/router';
import { stringIsHex } from '../utils/regex';

const useColorMatch = (predefined?: string) => {
  const router = useRouter();
  let wantedColor;
  let hex;

  if (!predefined) {
    let [_wantedColor] = router?.query?.color || [];
    if (_wantedColor) {
      hex = `#${_wantedColor}`;
    }

    if (
      !wantedColor &&
      typeof window !== 'undefined' &&
      process.env.NODE_ENV == 'production'
    ) {
      const match = '#' + window.location.pathname.replace('/', '');
      if (stringIsHex(match)) {
        hex = match;
      }
    }
    wantedColor = _wantedColor;
  } else {
    wantedColor = predefined;
    hex = `#${predefined}`;
  }

  return {
    hex,
    wantedColor,
  };
};

export default useColorMatch;
