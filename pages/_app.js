import "../styles/globals.css";
import Layout from "../components/Layout";
import withData from "../lib/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default withData(MyApp);
