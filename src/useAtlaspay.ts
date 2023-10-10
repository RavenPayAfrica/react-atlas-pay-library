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

  const loadScript = (src: string, position: HTMLElement) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      position.appendChild(script);
    });
  }

  function pay(config: {
    customer_email?: string,
    description?: string,
    merchant_ref?: string,
    amount?: string | number,
    redirect_url?: string,
    payment_methods?: string,
    secret_key?: string,
    trx_ref?: string,
    shutdown?: boolean
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof window !== 'undefined') {
          window.AtlasPaySdk = window.AtlasPaySdk || {};

          if (!window.AtlasPaySdk.init) {
            const script = {
              src: 'https://unpkg.com/atlas-pay-sdk',
              position: document.body,
            };
            await loadScript(script.src, script.position);
          }

          if (config?.trx_ref) {
            window.AtlasPaySdk.init(config.trx_ref);
          } else if(config.shutdown === true){
            AtlasPay = await window.AtlasPaySdk
            AtlasPay.shutdown();
          } else {
            window.AtlasPaySdk.generate(config);
          }

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
    }
          //listen for onload
          window.AtlasPaySdk.onLoad = async function (data: any) {
            let load;
            await load;
            AtlasPay = window.AtlasPaySdk
            setEvent(data)
            resolve(data)

            // console.log(data)
          }
          // listen for onclose
          window.AtlasPaySdk.onClose = async function (data: any) {
            await window.AtlasPaySdk
            if(window.AtlasPaySdk){
            AtlasPay = await window.AtlasPaySdk
              AtlasPay.shutdown();

            }
            setEvent(data)
            resolve(data)
            // console.log(data)
          }

          // listen for onSuccess
          window.AtlasPaySdk.onSuccess = async function (data: any) {
            let event;
            await event;
            AtlasPay = window.AtlasPaySdk
            setEvent(data)
            // console.log(data)
            resolve(data)
          }
          // ... more of your code ...
        } else {
          reject('Window not available');
        }
      } catch (error) {
        reject(error);
      }
    });
  }




  return [pay, event]
}
export default useAtlasPay
