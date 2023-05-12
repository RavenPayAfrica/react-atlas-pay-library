import Script from "next/script";
import React from 'react'

const AtlasNext: React.FC = () => {
  return (
    <Script
      strategy="lazyOnload"
      src="https://unpkg.com/atlas-pay-sdk" />
  )
}

export default AtlasNext;
