import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import './HeroSection.css'

const HeroSection = ({ onCelebrate }) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    })
  }

  const name = "JAMUNA K"
  
  return (
    <section className="hero-section">
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Hero Image */}
          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="image-frame">
              <img
                src="/sister.png"
                alt="Jamuna"
                className="hero-image"
              />
              <div className="image-overlay">
                <motion.div
                  className="sparkle-effect"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Lottie Animation */}
          <motion.div
            className="lottie-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Player
              autoplay
              loop
              src="/Animation - 1751964048207.lottie"
              style={{ height: '200px', width: '200px' }}
            />
          </motion.div>

          {/* Animated Greeting */}
          <motion.div className="greeting-wrapper">
            <motion.h1
              className="greeting-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Happy Birthday
            </motion.h1>

            <div className="name-animation">
              {name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="letter"
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Minimal Decorative Elements */}
          <motion.div
            className="floating-elements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-element"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 6 + i * 1,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${25 + (i % 2) * 20}%`
                }}
              >
                {['✨', '🎈', '💫'][i]}
              </motion.div>
            ))}
          </motion.div>

          {/* Celebration Button */}
          <motion.button
            className="btn btn-primary celebrate-btn"
            onClick={onCelebrate}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 107, 107, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            🎉 Let's Celebrate! 🎉
          </motion.button>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            A special day for a special person ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
