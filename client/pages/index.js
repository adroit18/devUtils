import React from "react";
import Head from "next/head";
import WorkArea from "../components/App/WorkArea/index";
import AppSearchBar from "../components/App/AppSearchBar/index";
import { UNIQUE_UTILITIES } from "../constants/index";

// import FooterContainer from './../components/FooterContainer/index';

const initialState = {
  selectedUtility: UNIQUE_UTILITIES.JSON_FORMAT_OR_VALIDATE,
};

function whichUtilityReducer(state, action) {
  switch (action.type) {
    case "setUtility":
      return { selectedUtility: action.payload };
    default:
      throw new Error();
  }
}

export default function Home() {
  const [state, showUtilityDispatch] = React.useReducer(
    whichUtilityReducer,
    initialState
  );
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
          <AppSearchBar
            state={state}
            showUtilityDispatch={showUtilityDispatch}
          />
          <WorkArea state={state} showUtilityDispatch={showUtilityDispatch} />
        </main>

        {/* <footer>
        <FooterContainer />
      </footer> */}
      </body>
    </html>
  );
}
