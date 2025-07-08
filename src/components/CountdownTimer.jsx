import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar } from 'lucide-react'
import './CountdownTimer.css'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isToday, setIsToday] = useState(false)

  useEffect(() => {
    // Set target date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0) // Set to midnight

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const targetTime = tomorrow.getTime()
      const difference = targetTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsToday(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsToday(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'var(--neon-coral)' },
    { label: 'Hours', value: timeLeft.hours, color: 'var(--neon-yellow)' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'var(--neon-lime)' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'var(--neon-cyan)' }
  ]

  if (isToday) {
    return (
      <section className="countdown-section">
        <div className="container">
          <motion.div 
            className="birthday-celebration"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            <motion.h2 
              className="celebration-title"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎉 IT'S JAMUNA K'S BIRTHDAY! 🎉
            </motion.h2>
            <motion.p 
              className="celebration-message"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              The special day is finally here! ✨
            </motion.p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="countdown-section">
      <div className="container">
        <motion.div 
          className="countdown-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="countdown-header">
            <Calendar className="countdown-icon" />
            <h2 className="countdown-title">Birthday Countdown</h2>
            <Clock className="countdown-icon" />
          </div>

          <motion.div 
            className="countdown-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                className="time-unit"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 30px ${unit.color}`
                }}
              >
                <motion.div 
                  className="time-value"
                  style={{ color: unit.color }}
                  animate={{ 
                    textShadow: [
                      `0 0 10px ${unit.color}`,
                      `0 0 20px ${unit.color}`,
                      `0 0 10px ${unit.color}`
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>
                <div className="time-label">{unit.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            className="countdown-message"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Get ready for an amazing celebration! 🎂
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default CountdownTimer
