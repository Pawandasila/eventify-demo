# 🎉 Mosomaau - Event Services Platform

A modern, responsive event services platform built with Next.js 15, featuring a complete transformation from grocery delivery to professional event management services.

## 🌟 Features

### 🎯 Core Functionality
- **Event Service Marketplace** - Browse and book various event services
- **Professional Product Pages** - Detailed service descriptions with inquiry system
- **Smart Search & Filtering** - Find services by category, price, or keywords
- **Interactive Cart System** - Add/remove services with real-time updates
- **Question & Inquiry Modal** - Professional contact system for service inquiries

### 📱 Mobile-First Design
- **Fully Responsive** - Optimized for all device sizes
- **Mobile Navigation** - Hamburger menu with smooth animations
- **Touch-Friendly UI** - Designed for mobile interactions
- **Progressive Web App Ready** - Fast loading and app-like experience

### 🎨 Modern UI/UX
- **TailwindCSS v4** - Latest styling with CSS variables theming
- **shadcn/ui Components** - Professional, accessible UI components
- **Sonner Toast Notifications** - Beautiful toast messages with rich colors
- **Smooth Animations** - Polished user interactions
- **Professional Typography** - Consistent and readable text hierarchy

### 🛠️ Technical Excellence
- **Next.js 15 App Router** - Latest React features with server components
- **TypeScript** - Full type safety and better developer experience
- **ESLint & Production Ready** - Clean, maintainable code
- **Optimized Build** - Static generation and code splitting
- **Context API** - Efficient state management

## 🚀 Live Demo

Visit the live application: [Deploy on Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 🏗️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **UI Components:** shadcn/ui
- **Notifications:** Sonner
- **Icons:** Lucide React
- **State Management:** React Context API
- **Build Tool:** Turbopack
- **Deployment:** Ready for Vercel/Netlify

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pawandasila/eventify-demo.git
   cd eventify-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── category/[slug]/   # Dynamic category pages
│   ├── product/[id]/      # Dynamic product pages
│   ├── search/            # Search functionality
│   └── globals.css        # Global styles
├── components/
│   ├── domain/            # Business logic components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── context/               # React Context providers
├── data/                  # Mock data and types
├── lib/                   # Utility functions
└── types/                 # TypeScript definitions
```

## 🎯 Key Components

### Product Page Features
- **4:3 Aspect Ratio Images** - Consistent, professional display
- **Tabbed Information** - Description, Reviews, Related services
- **Question Modal System** - Category-based inquiry forms
- **Toast Notifications** - Instant feedback for user actions

### Mobile Responsiveness
- **Hamburger Menu** - Smooth slide-in navigation
- **Touch Gestures** - Mobile-optimized interactions
- **Responsive Grid** - Adaptive layouts for all screen sizes
- **Fast Loading** - Optimized images and code splitting

### Search & Discovery
- **Real-time Search** - Instant results as you type
- **Category Filtering** - Browse by service categories
- **Breadcrumb Navigation** - Clear page hierarchy
- **Empty States** - Helpful guidance when no results found

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
```

## 🎨 Design System

### Color Palette
- **Primary:** Blue tones for trust and professionalism
- **Secondary:** Complementary accent colors
- **Neutral:** Gray scale for text and backgrounds
- **Success/Error:** Semantic colors for feedback

### Typography
- **Headings:** Bold, clear hierarchy
- **Body Text:** Readable and accessible
- **Interactive Elements:** Clear hover and focus states

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 768px
- **Tablet:** 769px - 1024px
- **Desktop:** 1025px+

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Next.js)
3. Deploy with automatic SSL and CDN

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pawan Dasila**
- GitHub: [@Pawandasila](https://github.com/Pawandasila)
- Portfolio: [Your Portfolio Website]

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For excellent deployment platform
- **shadcn/ui** - For beautiful UI components
- **TailwindCSS** - For utility-first CSS framework

---

<p align="center">
  <strong>🎉 Transform your events with Mosomaau - Where every celebration matters! 🎉</strong>
</p>
