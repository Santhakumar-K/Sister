import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Heart, Download, Share2 } from 'lucide-react'
import './PhotoGallery.css'

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedImages, setLikedImages] = useState(new Set())

  // Gallery images
  const galleryImages = [
    {
      id: 1,
      src: '/sister.png',
      title: 'Jamuna K',
      description: 'A wonderful moment captured'
    },
    {
      id: 2,
      src: '/ballon.jpg',
      title: 'Birthday Celebration',
      description: 'Colorful balloons for the special day'
    }
  ]

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(galleryImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setCurrentIndex(prevIndex)
    setSelectedImage(galleryImages[prevIndex])
  }

  const toggleLike = (imageId) => {
    setLikedImages(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId)
      } else {
        newLiked.add(imageId)
      }
      return newLiked
    })
  }

  const downloadImage = (imageSrc, title) => {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = `${title}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareImage = async (title) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Photo: ${title}`,
          text: `Check out this beautiful photo from Jamuna K's birthday!`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.log('Could not copy to clipboard:', error)
      }
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex])

  return (
    <section className="photo-gallery-section">
      <div className="container">
        <motion.div
          className="gallery-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="gallery-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            📸 Memory Gallery 📸
          </motion.h2>

          <motion.p
            className="gallery-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Beautiful moments and memories from Jamuna K's special day ✨
          </motion.p>

          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(image, index)}
              >
                <div className="image-container">
                  <img src={image.src} alt={image.title} />
                  <div className="image-overlay">
                    <div className="image-actions">
                      <motion.button
                        className="action-btn like-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(image.id)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart
                          size={20}
                          className={likedImages.has(image.id) ? 'liked' : ''}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="image-info">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeLightbox}>
                <X size={24} />
              </button>

              <div className="lightbox-image-container">
                <img src={selectedImage.src} alt={selectedImage.title} />
              </div>

              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>

              <div className="lightbox-actions">
                <motion.button
                  className="action-btn"
                  onClick={() => toggleLike(selectedImage.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={20}
                    className={likedImages.has(selectedImage.id) ? 'liked' : ''}
                  />
                </motion.button>

                <motion.button
                  className="action-btn"
                  onClick={() => downloadImage(selectedImage.src, selectedImage.title)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download size={20} />
                </motion.button>

                <motion.button
                  className="action-btn"
                  onClick={() => shareImage(selectedImage.title)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>

              <div className="lightbox-navigation">
                <motion.button
                  className="nav-btn prev-btn"
                  onClick={prevImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>

                <motion.button
                  className="nav-btn next-btn"
                  onClick={nextImage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PhotoGallery
