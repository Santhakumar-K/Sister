import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import './BackgroundMusic.css'

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.2)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef(null)

  // Birthday background music - will be silent if file doesn't exist
  const musicSrc = "/sounds/birthday-background.mp3"

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
      audio.muted = isMuted
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        // Fade out
        const fadeOut = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1
          } else {
            audio.pause()
            audio.volume = volume
            clearInterval(fadeOut)
          }
        }, 50)
      } else {
        audio.volume = 0
        audio.play().catch(() => {
          // Silently handle audio play errors
        })
        // Fade in
        const fadeIn = setInterval(() => {
          if (audio.volume < volume) {
            audio.volume += 0.05
          } else {
            audio.volume = volume
            clearInterval(fadeIn)
          }
        }, 50)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (audio) {
      if (isMuted) {
        audio.volume = volume
      } else {
        audio.volume = 0
      }
    }
    setIsMuted(!isMuted)
  }

  // Play celebration sound effect
  const playCelebrationSound = () => {
    try {
      const celebrationAudio = new Audio('/sounds/celebration.mp3')
      celebrationAudio.volume = volume
      celebrationAudio.play().catch(() => {
        // Silently handle audio play errors (user interaction required)
      })
    } catch (error) {
      // Silently handle audio creation errors
    }
  }

  // Expose celebration sound to parent components
  useEffect(() => {
    window.playCelebrationSound = playCelebrationSound
  }, [volume, playCelebrationSound])

  return (
    <motion.div
      className="floating-music-orb"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 1 }}
      onHoverStart={() => setShowControls(true)}
      onHoverEnd={() => setShowControls(false)}
    >
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
      />

      {/* Main floating orb */}
      <motion.div
        className="music-orb"
        animate={{
          scale: isPlaying ? [1, 1.1, 1] : 1,
          boxShadow: isPlaying
            ? ["0 0 20px rgba(255, 107, 107, 0.5)", "0 0 30px rgba(255, 107, 107, 0.8)", "0 0 20px rgba(255, 107, 107, 0.5)"]
            : "0 0 10px rgba(255, 255, 255, 0.3)"
        }}
        transition={{
          duration: 2,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut"
        }}
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </motion.div>

      {/* Expanded controls on hover */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="expanded-controls"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="control-btn-small"
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music notes animation */}
      <AnimatePresence>
        {isPlaying && (
          <div className="floating-notes">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-note"
                initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -40, -70],
                  x: [0, Math.random() * 30 - 15, Math.random() * 50 - 25],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
              >
                {['♪', '♫', '♬', '♩'][i]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default BackgroundMusic
