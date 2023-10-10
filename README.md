# React Atlas Pay Library by Raven

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
[![npm-typescript]][npm-typescript]
[![github-license]][github-license]

React Atlas Pay by Raven bank allows you recieve payments and build powerful checkout experience on your react web apps, to use this you will need to create an account on raven atlas, visit, ["Raven bank"](https://getravenbank.com/raven-atlas) for more.

[**Live Demo**](https://getravenbank.com/)

## ✨ Features

- Card Payments. (Visa, MasterCard)
- USSD Payment.
- Bank Transfers.
- NQR Payments.
- Pay with Raven.

## Installation:

````bash
npm install react-atlas-pay

or

```bash
yarn add react-atlas-pay
````

## Usage :

React Atlas Pay Uses normal react Conventions and Exposes for you a `useAtlasPay` Hook, below is an example usage

```js
import { useEffect, useState } from 'react'
import useAtlasPay from 'react-atlas-pay'

export default function App() {
  const [pay, atlasEvent] = useAtlasPay()

  // The useAtlasPay hook works similar to react useState, you can call the pay or atlasEvent handler anything you wish

  const config = {
    customer_email: 'john@example.com',
    description: 'test payment',
    merchant_ref: 'your_merchant_reference',
    amount: 100,
    redirect_url: '',
    payment_methods: 'card,bank_transfer,ussd,raven',
    public_key: 'your_atlas_public_key'
  }

  /**
   *  The atlasPayEvent returns and changes value based on actions carried on , on your payment window.
   *  i.e onSuccess, onLoad and onClose - this are the events you can watch for using the atlasEvent hook
   * */

  // you might want to wrap it in a useEffect to carry out action anytime the event fires

  useEffect(() => {
    if (atlasEvent.type === 'onClose') {
      // do something here if user closes the window
    }

    if (atlasEvent.type === 'onLoad') {
      // do something here if the payment window gets loaded
    }

    if (atlasEvent.type === 'onSuccess') {
      // do something here if the payment was successful i.e you can forcefully shutdown the payment window on successful payment, by default the payment window remains open on successful payment

      pay({ shutdown: true })
    }
  }, [atlasEvent])

  return (
    <div
      onClick={() => {
        pay(config)
      }}
      className=""
    >
      Pay Button
      {/* Clicking on this button will generate a payment request and initializes the payment window */}
    </div>
  )
}
```

If you don't need to generate a new payment request, 'i.e already have a payment reference', you can initialize the payment window directly py parsing the `trx_ref` as shown below.

```js
<div
  onClick={() => {
    pay({ trx_ref: 'your_payment_reference' })
  }}
  className=""
>
  {/* Clicking on this button will generate a payment request and initializes the payment window */}
</div>
```

React Atlas Pay Library can also be used in a NextJS Environment but requires extra configuration, AtlasPay offers `AtlasNext` which is NextJS Wrapper for AtlasPay to make use of this you need to call it either within your `_app.tsx` or `_document.tsx` this can be found in your nextjs `src` folder, below is an example usage;

```js

import { Manrope } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import {AtlasNext} from "react-atlas-pay";

const manrope = Manrope({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

            <main className={manrope.className}>
              <Component {...props.pageProps} />
            </main>

      <AtlasNext/>  {/* Here we instantiate the AtlasNext Wrapper */}
  );
}

```

## License

AtlasPay by Raven bank is licensed under the [**MIT**](http://opensource.org/licenses/MIT)

[npm-url]: https://www.npmjs.com/package/raven-bank-ui
[npm-image]: https://img.shields.io/npm/v/my-react-typescript-package
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/gapon2401/my-react-typescript-package/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package
