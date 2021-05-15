import Head from "next/head";
import WorkArea from "../components/App/WorkArea/index";
import AppSearchBar from "../components/App/AppSearchBar/index";

// import FooterContainer from './../components/FooterContainer/index';

export default function Home() {
  return (
    <html>
      <Head>
        <title>Dev Utils Web</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Developer utilities" />
        <meta name="keywords" content="json format validate text compare" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js"
        ></script>
      </Head>
      <body>
        <main>
          <AppSearchBar />
          <WorkArea />
        </main>

        {/* <footer>
        <FooterContainer />
      </footer> */}
      </body>
    </html>
  );
}
