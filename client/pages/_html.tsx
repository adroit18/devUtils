import React from "react";
import WorkArea from "../components/App/WorkArea/index";
import AppSearchBar from "../components/App/AppSearchBar/index";
import HtmlHead from "./_htmlHead";

// import FooterContainer from './../components/FooterContainer/index';

export default function HTML(props: { url: string }): JSX.Element {
  const { url } = props;
  return (
    <html lang="en">
      <HtmlHead />
      <body>
        <main>
          <AppSearchBar />
          <WorkArea selectedUtility={url} />
        </main>

        {/* <footer>
        <FooterContainer />
      </footer> */}
      </body>
    </html>
  );
}
