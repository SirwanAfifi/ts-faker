import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Generate Fake Data</title>
        <meta name="description" content="Generate Fake Data" />
        <meta name="viewport" content="width=1024" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
