import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import NextNprogress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
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
  );
}
export default MyApp;
