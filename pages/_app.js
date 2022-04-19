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
        <Nav />
        <div className="app-container d-flex justify-content-center">
            
            <div className="container mx-5 my-5 pb-5 d-flex justify-content-center">
                <Component {...pageProps} />
            </div>
        </div>

    </>
);
}

export default MyApp
