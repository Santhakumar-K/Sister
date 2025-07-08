import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VirtualCake.css'

const VirtualCake = ({ onCakeClick }) => {
  const [isSliced, setIsSliced] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)

  const handleCakeClick = () => {
    if (!isSliced) {
      setIsSliced(true)
      setShowSurprise(true)
      onCakeClick()

      // Reset after 8 seconds
      setTimeout(() => {
        setIsSliced(false)
        setShowSurprise(false)
      }, 8000)
    }
  }



  return (
    <section className="virtual-cake-section">
      <div className="container">
        <motion.div 
          className="cake-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="cake-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            🎂 Virtual Birthday Cake 🎂
          </motion.h2>

          <motion.p 
            className="cake-instruction"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Click the cake to cut it and reveal a special surprise! ✨
          </motion.p>

          <div className="cake-container">
            <motion.div
              className={`birthday-cake ${isSliced ? 'sliced' : ''}`}
              onClick={handleCakeClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.7
              }}
              viewport={{ once: true }}
            >
              {/* Cake Base */}
              <div className="cake-layer cake-bottom">
                <div className="cake-decoration"></div>
              </div>
              
              {/* Cake Middle */}
              <div className="cake-layer cake-middle">
                <div className="cake-decoration"></div>
              </div>
              
              {/* Cake Top */}
              <div className="cake-layer cake-top">
                <div className="cake-decoration"></div>
              </div>

              {/* Candles */}
              <div className="candles">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="candle"
                    initial={{ height: 0 }}
                    whileInView={{ height: 40 }}
                    transition={{ 
                      delay: 1 + index * 0.1,
                      duration: 0.3
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flame"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Slice Effect */}
              <AnimatePresence>
                {isSliced && (
                  <motion.div
                    className="slice-line"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Surprise Message */}
            <AnimatePresence>
              {showSurprise && (
                <motion.div
                  className="surprise-message"
                  initial={{ 
                    scale: 0,
                    rotate: -180,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: 1,
                    rotate: 0,
                    opacity: 1
                  }}
                  exit={{ 
                    scale: 0,
                    rotate: 180,
                    opacity: 0
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                >
                  <h3>🎉 Surprise! 🎉</h3>
                  <p>You're the sweetest person we know, Jamuna K!</p>
                  <p>Hope your birthday is as amazing as you are! 💖</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.p 
            className="cake-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Made with love and lots of virtual frosting! 🧁
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default VirtualCake
