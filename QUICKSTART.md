# 🚀 Quick Start Guide

## One-Command Setup (for developers)

### Windows
```bash
# Clone and setup (requires Node.js and Python installed)
git clone https://github.com/ragini117/multidisease-tracker.git
cd multidisease-tracker

# Install frontend dependencies
npm install

# Build frontend
npm run build

# For backend services, follow section below
```

### macOS / Linux
```bash
# Same as Windows
git clone https://github.com/ragini117/multidisease-tracker.git
cd multidisease-tracker
npm install
npm run build
```

---

## 📚 Backend Setup by Module

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Option 1: Setup Individual Backend Module

Example: Disease Detection Module

```bash
# Navigate to backend module
cd backend/detection

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Create virtual environment (macOS/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the service
python main.py
```

### Option 2: Setup All Backend Modules

```bash
# Windows
cd backend/detection && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt
cd ../Lungs && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt
cd ../rag_chatbot && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt
cd ../scraping_backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt
cd ../hospital_backend && python -m venv env && env\Scripts\activate && pip install -r requirements.txt

# macOS/Linux (adjust activate commands to source)
```

---

## 🔧 Configuration

### Frontend Configuration

Create `.env.local` in project root:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=MultiDisease Tracker
```

### Backend Configuration

Create `.env` in each backend module:
```env
# For rag_chatbot module:
OPENAI_API_KEY=your_key_here
PINECONE_API_KEY=your_key_here

# For hospital_backend module:
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=multidisease_db
```

---

## 🏃 Running Services

### Development Server (Frontend)

```bash
npm run dev
```

Visit: http://localhost:8080

### Running Specific Backend Modules

```bash
# Detection
npm run backend:detection

# Lungs
npm run backend:lungs

# RAG Chatbot
npm run backend:chatbot

# Scraping
npm run backend:scraping

# Hospital
npm run backend:hospital
```

### Running All Services at Once

```bash
npm run start:all
```

(Requires `concurrently` package - already in package.json)

---

## 📦 Production Build

```bash
# Build frontend for production
npm run build

# Output in 'dist' folder
# Can be deployed to Vercel, Netlify, GitHub Pages, etc.
```

---

## 🧪 Troubleshooting

### Issue: `node_modules not found`
**Solution**: Run `npm install` in project root

### Issue: Python virtual environment activation fails
**Solution**: Ensure Python is in PATH, try: `python -m venv venv` then activate

### Issue: Port already in use (Port 8080, 5000, 5001, etc.)
**Solution**: 
- Windows: `netstat -ano | findstr :8080` then `taskkill /PID <PID> /F`
- macOS/Linux: `lsof -i :8080` then `kill -9 <PID>`

### Issue: Module not found errors
**Solution**: Ensure all requirements are installed:
```bash
pip install -r requirements.txt
```

### Issue: CORS errors between frontend and backend
**Solution**: Verify backend CORS configuration allows localhost:8080

---

## 📚 Project Architecture

```
User Browser (React App)
    ↓↑ (HTTP/AJAX)
Frontend Server (Vite - localhost:8080)
    ↓↑ (API calls)
Python Backend Services
├── Detection API (localhost:5001) - TensorFlow models
├── Lungs API (localhost:5002) - Keras models
├── Chatbot API (localhost:5003) - LangChain + OpenAI
├── Scraping API (localhost:5004) - BeautifulSoup
└── Hospital API (localhost:5005) - MySQL DB
```

---

## 🎯 Key Directories

- **src/** - React components and pages
- **backend/detection/** - Brain & multi-disease detection
- **backend/Lungs/** - Lung disease detection
- **backend/rag_chatbot/** - AI chatbot with vector DB
- **backend/hospital_backend/** - Hospital & insurance info
- **backend/scraping_backend/** - Health news scraper
- **public/** - Static assets

---

## 📝 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend base URL | http://localhost:5000 |
| `OPENAI_API_KEY` | OpenAI API key | sk-xxx... |
| `PINECONE_API_KEY` | Pinecone vector DB | xxx... |
| `MYSQL_HOST` | Database host | localhost |
| `MYSQL_USER` | DB username | root |
| `MYSQL_PASSWORD` | DB password | password |
| `MYSQL_DATABASE` | DB name | multidisease_db |

See `.env.example` for complete list.

---

## 🆘 Need Help?

1. Check README.md for detailed documentation


