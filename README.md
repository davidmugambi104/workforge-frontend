# WorkForge Frontend

> **Blue-collar job marketplace connecting skilled workers with employers in Kenya**

A modern, full-featured React application for the gig economy. Workers can find jobs, build profiles, and get hired. Employers can post jobs, search workers, and manage applications.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan?logo=tailwindcss)

## 🌐 Live Demo

**Production:** [workforge-frontend.vercel.app](https://workforge-frontend.vercel.app)

## ✨ Features

- **Authentication** — JWT-based auth with refresh tokens, password reset
- **Worker Profiles** — Skills, certifications, portfolio, reviews
- **Job Listings** — Search, filter, apply with one click
- **Real-time Messaging** — SocketIO-powered chat between workers and employers
- **Location-based Search** — Find workers/jobs near you with Leaflet maps
- **Payments** — Stripe integration for premium features
- **Responsive Design** — Mobile-first with Tailwind CSS
- **Animations** — Smooth UI with Framer Motion

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19, TypeScript |
| **Build** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **State** | Zustand, TanStack Query |
| **Forms** | React Hook Form + Zod |
| **Real-time** | Socket.IO Client |
| **Maps** | React Leaflet |
| **Charts** | Recharts |
| **Payments** | Stripe |
| **Testing** | Vitest, Testing Library |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages (Home, Dashboard, Profile, etc.)
├── hooks/          # Custom React hooks
├── services/       # API service functions
├── store/          # Zustand state stores
├── types/          # TypeScript type definitions
├── utils/          # Helper functions
├── context/        # React context providers
└── lib/            # Third-party library configs
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/davidmugambi104/workforge-frontend.git
cd workforge-frontend

# Install dependencies
npm install

# Create .env.local with your API URL
echo "VITE_API_URL=http://localhost:5000" > .env.local

# Start dev server
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |
| `VITE_STRIPE_KEY` | Stripe publishable key |

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests with Vitest
```

## 🔗 Related

- **Backend API:** [backend_linkedin_blue_collar](https://github.com/davidmugambi104/backend_linkedin_blue_collar)
- **Live Backend:** Deployed on DigitalOcean

## 📄 License

MIT

---

Built by [David Mugambi](https://github.com/davidmugambi104)