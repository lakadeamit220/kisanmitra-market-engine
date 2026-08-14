# KisanMitra Market Engine

KisanMitra is a Progressive Web Application (PWA) designed to help farmers in Maharashtra make data-driven decisions on where to sell their crops. The application calculates the true "Net Realization" (profit after transport, market fees, commission, and loading charges) across multiple APMC Mandis. By comparing regional prices against exact logistical deductions, it protects farmers from relying solely on headline prices which are often misleading due to hidden local transport costs.

**Live Application**: [https://kisanmitra-market-engine.vercel.app/](https://kisanmitra-market-engine.vercel.app/)

---

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (Custom Light Sage-Green Theme)
- **Artificial Intelligence**: Llama 3 via Groq SDK
- **Deployment**: Vercel
- **Architecture**: Progressive Web App (Offline-capable via Service Worker)

## Application Features

1. **Farmer Profiling**: Users input their specific name, district, crop type, and harvest stage.
2. **Dashboard**: Generates three dynamic, color-coded action plans (e.g., immediate harvest advisories, weather warnings, or warnings to avoid distant markets).
3. **Market Engine**: Iterates over 20+ realistic APMC markets across Maharashtra (Nashik, Kolhapur, Solapur, Pune, etc.) to perform precise net realization mathematics based on the user's base location and quantity.
4. **AI Explanation**: Leverages Groq (Llama 3) to actively interpret the numerical comparison and provide simple, actionable language advising the farmer why a specific mandi is computationally better.
5. **Offline Support**: Includes a strict fallback offline page and custom service worker for weak mobile networks.

## Local Installation Guide

### Prerequisites
- Node.js (Version 18 or higher)
- npm or yarn

### Step 1: Clone the repository, navigate, and install dependencies
```bash
git clone https://github.com/lakadeamit220/kisanmitra-market-engine.git
cd kisanmitra-market-engine
npm install
```

### Step 2: Configure Environment Variables
Create a file named `.env.local` in the root directory and add your Groq API Key.
```
GROQ_API_KEY=your_actual_groq_api_key_here
```

### Step 3: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Production

To build the application for production testing:
```bash
npm run build
npm run start
```
