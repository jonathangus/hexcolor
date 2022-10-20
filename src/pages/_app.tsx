import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Web3Provider from '../components/Web3Provider';
import ColorBg from '../components/ColorBg';
import Header from '../components/Header';
import QueryClientWrapper from '../providers/QueryClientWrapper';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <QueryClientWrapper>
        <Header />
        <ColorBg>
          <Component {...pageProps} />
        </ColorBg>
      </QueryClientWrapper>
    </Web3Provider>
  );
}

export default MyApp;
