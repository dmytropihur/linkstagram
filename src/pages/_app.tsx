import '../ui/styles/globals.scss';
import '../ui/styles/swiper.scss';
import '../ui/styles/uppy.scss';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '@/core/store';
import Layout from '@/ui/components/layout';
import Snackbar from '@/ui/components/snackbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <Snackbar />
      </Layout>
    </Provider>
  );
};

export default MyApp;
