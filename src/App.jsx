import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import HeroSection from './components/HeroSection'
import CountdownTimer from './components/CountdownTimer'
import MessageWall from './components/MessageWall'
import BirthdayTimeline from './components/BirthdayTimeline'
import VirtualCake from './components/VirtualCake'
import FloatingBalloons from './components/FloatingBalloons'
import BackgroundMusic from './components/BackgroundMusic'
import PhotoGallery from './components/PhotoGallery'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <ErrorBoundary>
      <div className="App">
        {showConfetti && (
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
        )}

        <FloatingBalloons />
        <BackgroundMusic />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection onCelebrate={triggerConfetti} />
          <CountdownTimer />
          <VirtualCake onCakeClick={triggerConfetti} />
          <PhotoGallery />
          <MessageWall />
          <BirthdayTimeline />
        </motion.main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
