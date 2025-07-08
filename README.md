# 🎉 Jamuna K Birthday Website

A beautiful, interactive birthday website built with React, featuring real-time messaging, photo galleries, background music, and modern animations.

## ✨ Features

### 🎨 Visual Design & Assets
- **Hero Section** with sister.png as main image
- **Lottie Animations** for enhanced visual appeal
- **Modern Typography** with Google Fonts (Fredoka One, Dancing Script, Poppins, Playfair Display)
- **Whimsical Theme** with soft pastel colors and neon accents
- **Responsive Design** across all devices

### 🎵 Interactive Features
- **Background Music Player** with playlist and controls
- **Sound Effects** for celebrations
- **Photo Gallery** with lightbox and social sharing
- **Virtual Cake** with interactive elements
- **Floating Balloons** animation
- **Confetti Effects** on celebrations

### 💾 Backend Integration (Supabase)
- **Real-time Message Wall** with live updates
- **File Upload** support for photos and videos
- **Persistent Storage** replacing localStorage
- **Database Structure** with proper indexing
- **Media Storage** with public access

### 🚀 Technical Features
- **React 18** with modern hooks
- **Framer Motion** for smooth animations
- **Real-time Subscriptions** via Supabase
- **File Drag & Drop** functionality
- **Responsive Grid Layouts**
- **Performance Optimized** with lazy loading

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ installed
- Supabase account and project

### 1. Clone and Install
```bash
git clone <repository-url>
cd jamuna-k-birthday
npm install
```

### 2. Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL commands from `supabase-setup.sql`
4. Update the credentials in `src/lib/supabase.js` if needed

### 3. Add Media Files
- Place `sister.png` in the `public` folder (main hero image)
- Place `ballon.jpg` in the `public` folder
- Place `Animation - 1751964048207.lottie` in the `public` folder
- Add birthday music files to `public/sounds/` (optional)

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── BackgroundMusic.jsx      # Music player with controls
│   ├── BirthdayTimeline.jsx     # Timeline component
│   ├── CountdownTimer.jsx       # Birthday countdown
│   ├── FloatingBalloons.jsx     # Animated balloons
│   ├── HeroSection.jsx          # Main hero with sister's photo
│   ├── MessageWall.jsx          # Real-time message system
│   ├── PhotoGallery.jsx         # Interactive photo gallery
│   └── VirtualCake.jsx          # Interactive cake
├── lib/
│   └── supabase.js              # Supabase client and services
├── App.jsx                      # Main app component
├── index.css                    # Global styles and variables
└── main.jsx                     # App entry point
```

## 🎨 Design System

### Color Palette
- **Pastel Base**: Pink (#FFE1E6), Blue (#E1F0FF), Purple (#F0E1FF)
- **Neon Accents**: Coral (#FF6B6B), Pink (#FF1493), Cyan (#00FFFF)

### Typography
- **Headings**: Fredoka One (playful)
- **Script**: Dancing Script (elegant)
- **Body**: Poppins (modern, readable)
- **Elegant**: Playfair Display (sophisticated)

### Spacing & Layout
- Consistent spacing scale (0.5rem to 3rem)
- Responsive grid systems
- Mobile-first approach

## 🔧 Configuration

### Supabase Configuration
Update `src/lib/supabase.js` with your credentials:
```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
```

### Audio Files
Add these files to `public/sounds/`:
- `celebration.mp3` - Celebration sound effect
- Background music files (MP3 format recommended)

## 📱 Features in Detail

### Message Wall
- Real-time messaging with Supabase subscriptions
- Photo and video upload support
- Like functionality
- Responsive message cards
- Fallback to localStorage for offline use

### Photo Gallery
- Grid layout with hover effects
- Lightbox with navigation
- Like, download, and share functionality
- Keyboard navigation support
- Mobile-optimized touch interactions

### Background Music
- Playlist support with multiple tracks
- Volume control and mute functionality
- Floating music notes animation
- Celebration sound effects integration

## 🚀 Production Deployment

### Prerequisites for Deployment
1. **Supabase Database Setup**:
   - Run the SQL commands from `supabase-setup.sql` in your Supabase SQL Editor
   - Ensure the `birthday_messages` table and `birthday-media` storage bucket are created
   - Verify RLS policies are properly configured

2. **Environment Variables**:
   - Copy `.env.example` to `.env.local` for local development
   - Set the following environment variables in your hosting platform:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Vercel Deployment (Recommended)
1. **Connect Repository**:
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Production ready deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and import your GitHub repository
   - Set environment variables in Vercel dashboard:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Deploy automatically

3. **Custom Domain** (Optional):
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings as instructed

### Netlify Deployment
1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository for automatic deployments
   - Set environment variables in Netlify dashboard

3. **Configure Redirects**:
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

### Manual Deployment
1. **Build for Production**:
   ```bash
   npm run build
   ```

2. **Upload to Web Server**:
   - Upload the contents of the `dist` folder to your web server
   - Ensure your server is configured to serve the `index.html` for all routes

### Post-Deployment Checklist
- [ ] Website loads without errors
- [ ] Supabase connection is working
- [ ] Message wall accepts new messages
- [ ] File uploads work properly
- [ ] Real-time updates are functioning
- [ ] Audio player works (if audio files are provided)
- [ ] Photo gallery displays correctly
- [ ] All animations and interactions work
- [ ] Mobile responsiveness is maintained
- [ ] Footer attribution is visible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for Jamuna's birthday celebration. Feel free to use as inspiration for your own birthday websites!

## 🎂 Happy Birthday Jamuna! 🎉

Made with ❤️ for a special celebration
# Sister
