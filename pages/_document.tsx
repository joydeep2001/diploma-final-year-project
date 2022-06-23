import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Russo+One"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          ></link>

          <link href="https://fonts.googleapis.com/css2?family=Secular+One&display=swap" rel="stylesheet"> 
          </link>

          <link href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap" rel="stylesheet">
            </link>


            <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet">
          </link>


        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
