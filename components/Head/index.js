import React from 'react';
import Head from 'next/head';

export default ({ children }) => (
  <Head>
    <title>Onsdgasm&auml;ssan | kl 19.30 | St Andrew&apos;s Church</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="Accept-CH" content="DPR, Width" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin:400,400i,500,500i|EB+Garamond" />
    {children}
  </Head>
);