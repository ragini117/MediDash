# 🏥 MultiDisease Tracker

## Project Description

MultiDisease Tracker is an AI-powered web application that uses machine learning models to detect and diagnose multiple diseases. The platform provides disease detection through image analysis, symptom-based guidance, real-time health news, insurance information, and an intelligent RAG-based chatbot for health queries.

This project combines a modern React frontend with Python-based ML backends to deliver a comprehensive health monitoring and diagnostic solution suitable for patients and healthcare professionals.

## ✨ Key Features

- **🧠 Disease Detection**: 
  - Brain disease detection from medical images
  - Lung disease detection (X-ray analysis)
  - Multi-disease detection using deep learning models
  
- **📊 Dashboard**: 
  - Personalized health dashboard
  - Disease statistics and analytics
  - Symptom tracking and results
  
- **🤖 AI Chatbot**: 
  - RAG-based (Retrieval Augmented Generation) chatbot
  - Health guidance and Q&A
  - Context-aware responses using medical knowledge base
  
- **📰 Health News**: 
  - Real-time health and medical news
  - Web scraping for latest health information
  - Stay informed about health trends
  
- **💼 Insurance Info**: 
  - Insurance policy recommendations
  - Health coverage guidance
  - Hospital information database
  
- **🎯 Symptom Analysis**: 
  - Symptom-based disease prediction
  - Health guidance cards
  - Personalized recommendations
  
- **🌙 Dark/Light Mode**: 
  - Responsive UI with theme switching
  - Mobile-friendly design
  - Accessibility features

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Language**: Python 3.x
- **Web Frameworks**: Flask, FastAPI
- **ML/DL**: TensorFlow, Keras
- **NLP**: LangChain, Sentence Transformers
- **Database**: MySQL
- **Web Scraping**: BeautifulSoup4
- **Vector DB**: Pinecone
- **Task Scheduling**: APScheduler

### Machine Learning Models
- TensorFlow/Keras (.h5 format)
- Convolutional Neural Networks (CNN) for image classification
- Pre-trained models for disease detection

## 📁 Project Structure

```
multidisease-tracker/
├── frontend/                          # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── layout/              # Header, Footer components
│   │   │   └── ui/                  # UI components (buttons, cards, etc.)
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   ├── Brain.tsx            # Brain disease detection
│   │   │   ├── Lungs.tsx            # Lung disease detection
│   │   │   ├── DiseaseDetection.tsx # Disease detection interface
│   │   │   ├── Chatbot.tsx          # AI Chatbot
│   │   │   ├── HealthNews.tsx       # News feed
│   │   │   ├── Insurance.tsx        # Insurance info
│   │   │   ├── Guidance.tsx         # Health guidance
│   │   │   └── WellBeing.tsx        # Well-being tracking
│   │   ├── hooks/                   # Custom React hooks
│   │   └── lib/                     # Utilities and helpers
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/
│   ├── detection/                   # Multi-disease detection module
│   │   ├── main.py                 # Detection service
│   │   ├── requirements.txt
│   │   ├── models/                 # Pre-trained models
│   │   │   ├── brain_model.h5
│   │   │   └── model.h5
│   │   └── uploads/                # Uploaded images for analysis
│   │
│   ├── Lungs/                       # Lung disease detection
│   │   ├── main.py
│   │   ├── lung_model.h5           # Lung disease model
│   │   ├── requirements.txt
│   │   └── uploads/
│   │
│   ├── rag_chatbot/                 # RAG-based Health Chatbot
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   ├── src/
│   │   │   ├── helper.py           # Helper functions
│   │   │   ├── prompt.py           # LLM prompts
│   │   │   └── store_index.py      # Vector store indexing
│   │   └── Data/                   # Training data
│   │
│   ├── hospital_backend/            # Hospital & Insurance module
│   │   ├── hospital_backend.py
│   │   ├── requirements.txt
│   │   └── database/               # MySQL integration
│   │
│   └── scraping_backend/            # Web scraping service
│       ├── app.py
│       ├── scheduler.py            # Task scheduling
│       ├── scraper.py              # Web scraper
│       └── requirements.txt
│
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── eslint.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **Git**

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/multidisease-tracker.git
   cd multidisease-tracker
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (if needed)
   ```bash
   cp .env.example .env.local
   ```

### Backend Setup

Each backend module requires its own Python virtual environment:

#### 1. Detection Module
```bash
cd backend/detection
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

#### 2. Lungs Module
```bash
cd backend/Lungs
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### 3. RAG Chatbot
```bash
cd backend/rag_chatbot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

#### 4. Scraping Backend
```bash
cd backend/scraping_backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### 5. Hospital Backend
```bash
cd backend/hospital_backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

## 🏃 Running the Project

### Development Mode

**Run frontend only:**
```bash
npm run dev
```
The app will be available at `http://localhost:8080`

**Run individual backend modules:**
```bash
# In separate terminal windows
npm run backend:detection
npm run backend:lungs
npm run backend:chatbot
npm run backend:scraping
npm run backend:hospital
```

**Run all services concurrently** (requires concurrently package):
```bash
npm run start:all
```

### Production Build

**Build frontend:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📸 Screenshots

(Add screenshots here showing):
- Dashboard overview
- Brain disease detection interface
- Lung disease detection results
- Chatbot interface
- Health news feed
- Insurance information page
- Responsive mobile view

_Note: Add 4-6 high-quality screenshots showcasing main features_

## 🔮 Future Improvements

- [ ] **Multi-language Support**: Add internationalization (i18n)
- [ ] **Real-time Notifications**: Push notifications for health alerts
- [ ] **Integration with Wearables**: Support for fitness trackers and smartwatches
- [ ] **Advanced Analytics**: Machine learning-based trend analysis
- [ ] **Telemedicine**: Video consultation feature with healthcare providers
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **API Documentation**: Swagger/OpenAPI documentation
- [ ] **Unit Testing**: Comprehensive test suite for frontend and backend
- [ ] **Performance Optimization**: Code splitting and lazy loading
- [ ] **Security Enhancements**: Two-factor authentication, encryption
- [ ] **Data Export**: PDF and CSV export functionality
- [ ] **Cloud Deployment**: AWS/GCP/Azure integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Developed for AI/ML Healthcare Portfolio**

- **Purpose**: Showcase AI/ML expertise in healthcare domain
- **Fresher Developer**: Designed to demonstrate full-stack capabilities
- **Portfolio Project**: Highlights React, Python, ML, and DevOps skills

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful React components
- **TensorFlow/Keras** - Deep learning framework
- **LangChain** - LLM framework
- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Animation library

## 📞 Contact & Support

For questions or support:
- Open an issue on GitHub
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

**⭐ If you find this project helpful, please give it a star on GitHub!**