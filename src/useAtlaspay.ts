import { useEffect, useState } from 'react'

declare global {
  interface Window {
    AtlasPaySdk: any; // 👈️ turn off type checking
    onload: any
  }
}

interface Script {
  src: string;
  position: HTMLElement
}


const loadScript = (src: string, position: HTMLElement) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  position.appendChild(script);
};

export interface Atlas {
  onClose: () => any
  onResponse: () => any
  init: (ref: string) => any
  onSuccess: () => any
  shutdown: () => any
  onLoad: () => any
}
let AtlasPay: Atlas;


function useAtlasPay(tref?: string) {

  // let ref: any = tref;

  useEffect(() => {
    AtlasPay = window.AtlasPaySdk

    if (AtlasPay) {
      setEvent(null)
    }
  }, [])

  const [event, setEvent] = useState<any>(null)
  const [ref, setRef] = useState<any>(tref ? tref : null)

  async function pay(config: {
    customer_email: string,
    description: string,
    merchant_ref: string,
    amount: string | number,
    redirect_url?: string,
    payment_methods?: string,
    secret_key: string
  }) {

    if (typeof window !== undefined) {
      AtlasPay = window.AtlasPaySdk
      const script: Script = {
        src: 'https://unpkg.com/atlas-pay-sdk',
        position: document.body
      };
      loadScript(script.src, script.position);
    }
    console.log(ref)

    // if (ref) {
    //   //listen for response;
    //   AtlasPay.init(ref)
    //   const trigger = async (data?: any) => {
    //     setRef(data?.data?.trx_ref)
    //     await ref;
    //     AtlasPay = window.AtlasPaySdk
    //     const e = {
    //       type: 'onLoad',
    //       message: 'Atlas Pay loaded'
    //     }
    //     setEvent(e)

    //     //listen for onload
    //     window.AtlasPaySdk.onLoad = async function (data: any) {
    //       let load;
    //       await load;
    //       AtlasPay = window.AtlasPaySdk
    //       setEvent(data)
    //       // console.log(data)
    //     }
    //     // listen for onclose
    //     window.AtlasPaySdk.onClose = async function (data: any) {
    //       let close;
    //       await close;
    //       AtlasPay.shutdown()
    //       AtlasPay = window.AtlasPaySdk
    //       setEvent(data)
    //       // console.log(data)
    //     }

    //     // listen for onSuccess
    //     window.AtlasPaySdk.onSuccess = async function (data: any) {
    //       let event;
    //       await event;
    //       AtlasPay = window.AtlasPaySdk
    //       setEvent(data)
    //       // console.log(data)
    //     }
    //   }

    //   trigger();

    // } else {
    // }

    window.AtlasPaySdk.generate(config)

    //listen for response;
    window.AtlasPaySdk.onResponse = async function (data: any) {
      setRef(data?.data?.trx_ref)
      let ref2 = (data?.data?.trx_ref)
      await ref;
      AtlasPay = window.AtlasPaySdk
      const e = {
        type: 'onLoad',
        message: 'Atlas Pay loaded'
      }
      if (ref || ref2) {
        AtlasPay.init(ref2)
      }
      setEvent(e)

      //listen for onload
      window.AtlasPaySdk.onLoad = async function (data: any) {
        let load;
        await load;
        AtlasPay = window.AtlasPaySdk
        setEvent(data)
        // console.log(data)
      }
      // listen for onclose
      window.AtlasPaySdk.onClose = async function (data: any) {
        let close;
        await close;
        AtlasPay.shutdown()
        AtlasPay = window.AtlasPaySdk
        setEvent(data)
        // console.log(data)
      }

      // listen for onSuccess
      window.AtlasPaySdk.onSuccess = async function (data: any) {
        let event;
        await event;
        AtlasPay = window.AtlasPaySdk
        setEvent(data)
        // console.log(data)
      }
    }


  }

  return [pay, event]
}
export default useAtlasPay
