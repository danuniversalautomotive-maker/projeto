import React, { useState, useEffect } from "react"
import styles from './style.css'
import { motion, AnimatePresence } from "framer-motion"
import { GoogleTranslate } from '../GoogleTranslate'
import { useDevice } from 'vtex.device-detector'

type MessageItem = {
  text: string
  image?: string
}

type PropsTopBar = {
  messages?: MessageItem[]
}

function TopBar({ messages = [] }: PropsTopBar) {
  const [current, setCurrent] = useState(0)
  const { isMobile } = useDevice()

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % messages.length)
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [messages.length])

  const renderSliderMessage = () => {
    const message = messages[current]
    return (
      <div className={styles.mensagem}>
        {/* Se imagem existir, exibe. Se não, não ocupa espaço */}
        {message?.image && (
          <img
            src={message.image}
            alt=""
            className={styles.sliderIcon}
          />
        )}
        {/* O texto SEMPRE aparece */}
        <span className={styles.sliderText}>
          {message?.text || ''}
        </span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {isMobile ? (
        <>
          <div className={styles.content}>
            <GoogleTranslate />
          </div>
          <div className={styles.slider}>
            {messages.length > 0 && (
              <div className={styles.sliderWrapper}>
                <AnimatePresence>
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.sliderItem}
                  >
                    {renderSliderMessage()}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.content}>
          <div className={styles.linksRapidos}>
            <span className={styles.portal}>
              <img
                src="https://universalautomotive.vteximg.com.br/arquivos/icon-portal-topbar.png"
                width="20"
                height="auto"
                alt="portal"
              />
              <a href="#">Portal</a>
            </span>
            <span>|</span>
            <span><a href="https://www.universalautomotive.com.br/login?returnUrl=%2F">Cadastre-se</a></span>
            <span>|</span>
            <span><a href="https://www.universalautomotive.com.br/quickorder">Pedido Rápido</a></span>
          </div>

          <div className={styles.slider}>
            {messages.length > 0 && (
              <div className={styles.sliderWrapper}>
                <AnimatePresence>
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.sliderItem}
                  >
                    {renderSliderMessage()}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className={styles.flags}>
            <GoogleTranslate />
          </div>
        </div>
      )}
    </div>
  )
}

TopBar.schema = {
  title: "Barra de benefícios",
  description: "Exibe uma barra com mensagens editáveis e conteúdo fixo",
  type: "object",
  properties: {
    messages: {
      title: "Mensagens rotativas",
      description: "Mensagens para exibir no slider",
      type: "array",
      items: {
        type: "object",
        title: "Mensagem",
        properties: {
          text: {
            type: "string",
            title: "Texto da mensagem"
          },
          image: {
            type: "string",
            title: "URL da imagem (opcional)",
            widget: {
              "ui:widget": "image-uploader"
            }
          }
        },
        __editorItemTitle: "text"
      },
      default: [
        { text: "5% de desconto no Pix" },
        { text: "Frete grátis acima de R$ 199" }
      ]
    }
  }
}

export default TopBar
