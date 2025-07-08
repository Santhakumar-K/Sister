import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Send, Image, Video, Upload, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { messageService } from '../lib/supabase'
import './MessageWall.css'

const MessageWall = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load messages from Supabase on component mount
  useEffect(() => {
    loadMessages()

    // Subscribe to real-time changes
    const subscription = messageService.subscribeToMessages((payload) => {
      if (payload.eventType === 'INSERT') {
        setMessages(prev => [payload.new, ...prev])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadMessages = async () => {
    try {
      const data = await messageService.getMessages()
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
      // Fallback to localStorage for offline functionality
      const savedMessages = localStorage.getItem('birthdayMessages')
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      }
    }
  }

  const handleSubmitMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim() && userName.trim()) {
      setIsSubmitting(true)

      try {
        let mediaUrl = null

        // Upload files if any
        if (uploadedFiles.length > 0) {
          setIsUploading(true)
          const file = uploadedFiles[0]
          mediaUrl = await messageService.uploadFile(file)
        }

        const messageData = {
          username: userName,
          message: newMessage,
          url: mediaUrl
        }

        await messageService.addMessage(messageData)

        // Reset form
        setNewMessage('')
        setUserName('')
        setUploadedFiles([])
        setShowForm(false)

        // Play celebration sound
        if (window.playCelebrationSound) {
          window.playCelebrationSound()
        }

      } catch (error) {
        console.error('Error submitting message:', error)
        // Fallback to localStorage
        const message = {
          id: Date.now(),
          username: userName,
          message: newMessage,
          created_time: new Date().toISOString(),
          url: null
        }
        setMessages(prev => [message, ...prev])
        localStorage.setItem('birthdayMessages', JSON.stringify([message, ...messages]))

        setNewMessage('')
        setUserName('')
        setUploadedFiles([])
        setShowForm(false)
      } finally {
        setIsSubmitting(false)
        setIsUploading(false)
      }
    }
  }

  const handleLikeMessage = (messageId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, likes: (msg.likes || 0) + 1 }
          : msg
      )
    )
  }

  // File upload handlers
  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const removeUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="message-wall-section">
      <div className="container">
        <motion.div 
          className="message-wall-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="wall-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            💌 Birthday Wishes Wall 💌
          </motion.h2>

          <motion.p 
            className="wall-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Leave a special birthday message for Jamuna K! ✨
          </motion.p>

          {/* Add Message Button */}
          <motion.button
            className="btn btn-primary add-message-btn"
            onClick={() => setShowForm(!showForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {showForm ? '❌ Cancel' : '✍️ Write a Message'}
          </motion.button>

          {/* Message Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                className="message-form"
                onSubmit={handleSubmitMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your name..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Write your birthday message for Jamuna K..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div className="form-group">
                  <div
                    {...getRootProps()}
                    className={`file-upload-zone ${isDragActive ? 'active' : ''}`}
                  >
                    <input {...getInputProps()} />
                    <div className="upload-content">
                      <Upload size={24} />
                      <p>
                        {isDragActive
                          ? 'Drop files here...'
                          : 'Drag & drop photos/videos or click to select'
                        }
                      </p>
                      <span className="upload-hint">Max 10MB • JPG, PNG, GIF, MP4</span>
                    </div>
                  </div>

                  {/* Uploaded Files Preview */}
                  {uploadedFiles.length > 0 && (
                    <div className="uploaded-files">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <div className="file-info">
                            {file.type.startsWith('image/') ? (
                              <Image size={16} />
                            ) : (
                              <Video size={16} />
                            )}
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeUploadedFile(index)}
                            className="remove-file-btn"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={isSubmitting || isUploading}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        {isUploading ? 'Uploading...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Messages Display */}
          <div className="messages-container">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  className="no-messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <p>Be the first to leave a birthday message! 🎉</p>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className="message-card"
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <div className="message-header">
                      <span className="message-author">
                        {message.username || message.author}
                      </span>
                      <span className="message-timestamp">
                        {message.created_time
                          ? new Date(message.created_time).toLocaleString()
                          : message.timestamp
                        }
                      </span>
                    </div>

                    <div className="message-text">
                      {message.message || message.text}
                    </div>

                    {/* Media Display */}
                    {message.url && (
                      <div className="message-media">
                        {message.url.includes('.mp4') || message.url.includes('.mov') || message.url.includes('.avi') ? (
                          <video
                            src={message.url}
                            controls
                            className="message-video"
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={message.url}
                            alt="Uploaded content"
                            className="message-image"
                            loading="lazy"
                          />
                        )}
                      </div>
                    )}

                    <div className="message-actions">
                      <motion.button
                        className="like-button"
                        onClick={() => handleLikeMessage(message.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart
                          size={16}
                          className={(message.likes || 0) > 0 ? 'liked' : ''}
                        />
                        <span>{message.likes || 0}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MessageWall
