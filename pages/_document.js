/*
 To change the Head tag in all pages, and change attributes like Lang.
 This page is only rendered in server side, so event handlers doesnt work.
*/

import { Html, Head, Main, NextScript } from 'next/document'; //THis imports  are required for the page to be properly rendered..
 
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}