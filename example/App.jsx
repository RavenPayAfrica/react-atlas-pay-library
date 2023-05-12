import { useEffect, useState } from 'react'
import useAtlasPay from '../src/useAtlaspay'

export default function App () {
  const [pay, atlasEvent] = useAtlasPay()

  // The useAtlasPay hook works similar to react useState, you can call the pay or atlasEvent handler anything you wish

  const config = {
    customer_email: 'john@example.com',
    description: 'test payment',
    merchant_ref: 'your_merchant_reference',
    amount: 100,
    redirect_url: '',
    payment_methods: 'card,bank_transfer,ussd,raven',
    secret_key: 'your_atlas_secret_key'
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
      // do something here if the payment was successful
    }
  }, [atlasEvent])

  return (
    <div onClick={() => { pay(config) }} className="">
      Pay Button
      {/* Clicking on this button initializes the payment window */}
    </div>
  )
}
