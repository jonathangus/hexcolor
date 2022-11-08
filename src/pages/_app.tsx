import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Web3Provider from '../components/Web3Provider';
import ColorBg from '../components/ColorBg';
import Header from '../components/Header';
import QueryClientWrapper from '../providers/QueryClientWrapper';
import NewRegistrations from '../components/NewRegistrations';
import { ToastProvider } from 'react-toast-notifications';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Web3Provider>
      <QueryClientWrapper>
        <ToastProvider placement="bottom-right">
          <Header />
          <ColorBg mounted={mounted} color={(pageProps as any).color}>
            <Component {...pageProps} mounted={mounted} />
          </ColorBg>
          <NewRegistrations />
        </ToastProvider>
      </QueryClientWrapper>
    </Web3Provider>
  );
}

export default MyApp;
