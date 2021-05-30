import React from "react";
import Head from "next/head";

export default function HtmlHead(): JSX.Element {
  return (
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
  );
}
