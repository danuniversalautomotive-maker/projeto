import React from 'react'
import { useDevice } from 'vtex.device-detector'

export function PortugueseFlag() {
  const { isMobile } = useDevice()
  return (
    <>
      {isMobile ? 
        <img src="https://universalautomotive.vteximg.com.br/arquivos/pt-br.png" width={30} height={30} />
      : 
        <img src="https://universalautomotive.vteximg.com.br/arquivos/pt-br.png" width={25} height={25} />
      }
      
    </>
  )
}
