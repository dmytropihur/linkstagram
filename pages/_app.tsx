/* eslint-disable react/jsx-props-no-spreading */
import '../ui/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../core/store';
import Layout from '../ui/components/Layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
