import Script from "next/script";
import React from 'react'

export default function AtlasNext() {
  return (
    <Script
      strategy="lazyOnload"
      src="https://unpkg.com/atlas-pay-sdk" />
  )
}
