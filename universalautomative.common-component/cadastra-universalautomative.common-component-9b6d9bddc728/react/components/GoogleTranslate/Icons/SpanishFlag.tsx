import React from 'react'
import { useDevice } from 'vtex.device-detector'

export function SpanishFlag() {
  const { isMobile } = useDevice()
  return (
    <>
      {isMobile ? 
        <img src='https://universalautomotive.vteximg.com.br/arquivos/es.png' width={30} height={30} />
      : 
        <img src='https://universalautomotive.vteximg.com.br/arquivos/es.png' width={25} height={25} />
      }
      
    </>
  )
}
