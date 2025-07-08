import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ohupispumiwtromkcscy.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odXBpc3B1bWl3dHJvbWtjc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODY5NTMsImV4cCI6MjA2NzU2Mjk1M30.q5iMaHTcltwCW8q-PKr5eNqZnlYHfEUTxGCV53RhDEo'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database operations for messages
export const messageService = {
  // Get all messages
  async getMessages() {
    const { data, error } = await supabase
      .from('birthday_messages')
      .select('*')
      .order('created_time', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add a new message
  async addMessage(message) {
    try {
      const { data, error } = await supabase
        .from('birthday_messages')
        .insert([{
          username: message.username,
          message: message.message,
          created_time: new Date().toISOString(),
          url: message.url || null
        }])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error adding message:', error)
      throw error
    }
  },

  // Subscribe to real-time changes
  subscribeToMessages(callback) {
    return supabase
      .channel('birthday_messages')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'birthday_messages' },
        callback
      )
      .subscribe()
  },

  // Upload file to Supabase storage
  async uploadFile(file, bucket = 'birthday-media') {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file)

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }
}
