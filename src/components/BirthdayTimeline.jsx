import { motion } from 'framer-motion'
import { Star, Heart, Camera, Gift, Sparkles } from 'lucide-react'
import './BirthdayTimeline.css'

const BirthdayTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      year: "Childhood",
      title: "Sweet Beginnings",
      description: "The world became brighter when Jamuna K was born! 🌟",
      icon: Star,
      color: "var(--neon-yellow)"
    },
    {
      id: 2,
      year: "Growing Up",
      title: "Making Memories",
      description: "Creating beautiful memories and touching hearts everywhere! 💖",
      icon: Heart,
      color: "var(--neon-coral)"
    },
    {
      id: 3,
      year: "School Days",
      title: "Learning & Laughing",
      description: "Spreading joy and kindness to everyone around! ✨",
      icon: Sparkles,
      color: "var(--neon-lime)"
    },
    {
      id: 4,
      year: "Adventures",
      title: "Exploring Life",
      description: "Every adventure is better with Jamuna K's amazing spirit! 📸",
      icon: Camera,
      color: "var(--neon-cyan)"
    },
    {
      id: 5,
      year: "Today",
      title: "Celebrating You!",
      description: "Today we celebrate the wonderful person you are! 🎁",
      icon: Gift,
      color: "var(--neon-pink)"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section className="timeline-section">
      <div className="container">
        <motion.div 
          className="timeline-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="timeline-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            🌟 Jamuna K's Amazing Journey 🌟
          </motion.h2>

          <motion.p 
            className="timeline-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            A celebration of all the wonderful moments that make you special! ✨
          </motion.p>

          <motion.div 
            className="timeline"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={event.id}
                  className={`timeline-item ${isEven ? 'left' : 'right'}`}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 10px 30px ${event.color}40`
                  }}
                >
                  <div className="timeline-content-wrapper">
                    <motion.div 
                      className="timeline-icon"
                      style={{ backgroundColor: event.color }}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <IconComponent size={24} color="white" />
                    </motion.div>

                    <div className="timeline-card">
                      <div className="timeline-year">{event.year}</div>
                      <h3 className="timeline-event-title">{event.title}</h3>
                      <p className="timeline-event-description">{event.description}</p>
                    </div>
                  </div>

                  <motion.div 
                    className="timeline-line"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div 
            className="timeline-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>And the best is yet to come! 🎉</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BirthdayTimeline
