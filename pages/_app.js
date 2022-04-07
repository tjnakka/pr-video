import Head from 'next/head';

// Global CSS files
import('../styles/app.scss');
import('bootstrap-icons/font/bootstrap-icons.css');

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>PropReturns</title>
				<link rel='icon' href='/favicon.ico' />
				<meta content='PropReturns App.' name='description'></meta>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
