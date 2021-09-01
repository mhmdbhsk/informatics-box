import '../styles/globals.css';
import type { AppProps as BaseAppProps } from 'next/app';
import Layout from '../components/Layout';
import NextNprogress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';
import fetcher from '../utils/fetcher';

type AppProps = BaseAppProps & SWRConfiguration;

function MyApp({ Component, pageProps, fallback }: AppProps) {
  function useIsMounted() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
    return isMounted;
  }

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <NextNprogress
          color='#000'
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
export default MyApp;
