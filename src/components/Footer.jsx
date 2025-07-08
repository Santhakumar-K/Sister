import { motion } from 'framer-motion'
import { Heart, Code, Star } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-section">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main Footer Content */}
          <div className="footer-main">
            <motion.div 
              className="footer-brand"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="brand-title">🎉 Jamuna K's Birthday</h3>
              <p className="brand-subtitle">A special celebration website</p>
            </motion.div>

            <motion.div 
              className="footer-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="link-group">
                <h4>Celebration</h4>
                <ul>
                  <li><a href="#hero">Birthday Wishes</a></li>
                  <li><a href="#gallery">Photo Gallery</a></li>
                  <li><a href="#messages">Message Wall</a></li>
                  <li><a href="#cake">Virtual Cake</a></li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            className="footer-divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          />

          {/* Footer Bottom */}
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="footer-credits">
              <motion.div 
                className="made-with-love"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    color: ["#FF6B6B", "#FF1493", "#FF6B6B"]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart size={16} fill="currentColor" />
                </motion.div>
                <span>by</span>
                <strong className="developer-name">Santhakumar K</strong>
              </motion.div>
            </div>

            <div className="footer-tech">
              <motion.div 
                className="tech-stack"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Code size={16} />
                <span>Built with React & Supabase</span>
              </motion.div>
            </div>

            <div className="footer-year">
              <motion.div 
                className="copyright"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Star size={16} />
                <span>© {currentYear} Birthday Celebration</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Minimal Decorative Elements */}
          <div className="footer-decorations">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="decoration-star"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${30 + i * 40}%`,
                  top: `${10 + i * 5}px`
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
