import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Nav } from '../components';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <title>Verly Admin</title>
        </Head>

        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Component {...pageProps} />
            </div>
        </div>

    </>
);
}

export default MyApp
