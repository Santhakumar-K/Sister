-- Supabase Database Setup for Jamuna Birthday Website
-- Run this SQL in your Supabase SQL editor

-- Create the birthday_messages table
CREATE TABLE IF NOT EXISTS birthday_messages (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    created_time TIMESTAMPTZ DEFAULT NOW(),
    url TEXT,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on created_time for faster ordering
CREATE INDEX IF NOT EXISTS idx_birthday_messages_created_time 
ON birthday_messages(created_time DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE birthday_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a birthday website)
-- Allow anyone to read messages
CREATE POLICY "Anyone can read messages" ON birthday_messages
    FOR SELECT USING (true);

-- Allow anyone to insert messages
CREATE POLICY "Anyone can insert messages" ON birthday_messages
    FOR INSERT WITH CHECK (true);

-- Allow anyone to update likes (for the like functionality)
CREATE POLICY "Anyone can update likes" ON birthday_messages
    FOR UPDATE USING (true)
    WITH CHECK (true);

-- Create storage bucket for birthday media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('birthday-media', 'birthday-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for storage bucket
CREATE POLICY "Anyone can upload birthday media" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'birthday-media');

CREATE POLICY "Anyone can view birthday media" ON storage.objects
    FOR SELECT USING (bucket_id = 'birthday-media');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_birthday_messages_updated_at 
    BEFORE UPDATE ON birthday_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- No sample data - start with clean message wall

-- Create a view for message statistics (optional)
CREATE OR REPLACE VIEW message_stats AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(CASE WHEN url IS NOT NULL THEN 1 END) as messages_with_media,
    SUM(likes) as total_likes,
    MAX(created_time) as latest_message_time
FROM birthday_messages;
