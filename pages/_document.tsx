import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import icons from '!raw-loader!@trutoo/ui-icons/dist/symbols.svg';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700|Open+Sans:400,400i,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <link href="/variables.css" rel="stylesheet" />
          <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: icons }}></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
