import { motion } from 'framer-motion'
import './FloatingBalloons.css'

const FloatingBalloons = () => {
  const balloons = [
    { id: 1, color: 'var(--neon-coral)', size: 50, delay: 0 },
    { id: 2, color: 'var(--neon-yellow)', size: 45, delay: 3 },
    { id: 3, color: 'var(--neon-cyan)', size: 40, delay: 6 }
  ]

  return (
    <div className="floating-balloons">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="balloon"
          style={{
            backgroundColor: balloon.color,
            width: balloon.size,
            height: balloon.size * 1.2,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
          initial={{ 
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            y: [
              window.innerHeight + 100,
              -100,
              window.innerHeight + 100
            ],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360, 720],
            x: [0, 50, -30, 20, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            boxShadow: `0 0 20px ${balloon.color}`
          }}
        >
          <div className="balloon-string"></div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingBalloons
