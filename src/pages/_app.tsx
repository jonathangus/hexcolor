import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Web3Provider from '../components/Web3Provider';
import ColorBg from '../components/ColorBg';
import Header from '../components/Header';
import QueryClientWrapper from '../providers/QueryClientWrapper';
import { useRouter } from 'next/router';
import NewRegistrations from '../components/NewRegistrations';
import { ToastProvider } from 'react-toast-notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <QueryClientWrapper>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="bottom-right"
        >
          <Header />
          <ColorBg>
            <Component {...pageProps} />
          </ColorBg>
          <NewRegistrations />{' '}
        </ToastProvider>
      </QueryClientWrapper>
    </Web3Provider>
  );
}

export default MyApp;
