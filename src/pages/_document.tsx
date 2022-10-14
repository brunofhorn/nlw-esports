import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='pt' className='h-full bg-[#121214]'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <meta httpEquiv='x-ua-compatible' content='IE=edge,chrome=1' />
          <meta name='MobileOptimized' content='320' />
          <meta name='HandheldFriendly' content='True' />
          <meta name='theme-color' content='#fff' />
          <meta name='msapplication-TileColor' content='#fff' />
          <meta name='referrer' content='no-referrer-when-downgrade' />
          <meta name='google' content='notranslate' />
          <link rel='shortcut icon' href='/images/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&display=swap'
            rel='stylesheet'
          />
          <link
            rel='icon'
            type='image/png'
            href='/images/favicon-16x16.png'
            sizes='16x16'
          />
          <link
            rel='icon'
            type='image/png'
            href='/images/favicon-32x32.png'
            sizes='32x32'
          />
          <link
            rel='icon'
            type='image/png'
            href='/images/android-192x192.png'
            sizes='192x192'
          />
          <link
            rel='apple-touch-icon'
            href='/images/apple-touch-icon-180x180.png'
            sizes='180x180'
          />
          <meta name='msapplication-config' content='/browserconfig.xml' />
          <title>DUO eSports - Ignite</title>
        </Head>
        <body className='h-full bg-galaxy bg-cover bg-no-repeat'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
