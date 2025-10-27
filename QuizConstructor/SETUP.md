# QuizConstructor - Quick Start Guide

## 🚀 Project Overview

**QuizConstructor** is a full-stack web application that generates unlimited quiz questions using AI. Users can create quizzes from:
- Any subject/topic
- Text content (paste or upload)
- Files (PDF, Word, PowerPoint, Text)

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS + Lucide React + Context API |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| AI | OpenAI API |

---

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- **PostgreSQL** v12 or higher
- **OpenAI API Key** (get from https://platform.openai.com)

---

## ⚙️ Installation Steps

### 1. Backend Setup

```bash
cd QuizConstructor/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# IMPORTANT: Add your OpenAI API key and PostgreSQL credentials
```

**Update `.env` file:**
```
OPENAI_API_KEY=sk-...your-key-here...
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
NODE_ENV=development
```

### 2. Database Setup

Create the PostgreSQL database and tables:

```bash
# Create database
createdb quizconstructor

# Run schema (from backend directory)
psql -U postgres -d quizconstructor -f schema.sql
```

Or manually create tables:
```sql
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  num_questions INTEGER NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Start Backend Server

```bash
cd QuizConstructor/backend
npm run dev
```

✅ Server running on http://localhost:5000

### 4. Frontend Setup

```bash
cd QuizConstructor/frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env
```

### 5. Start Frontend Server

```bash
cd QuizConstructor/frontend
npm run dev
```

✅ App running on http://localhost:3000

---

## 🎯 Usage

1. Open http://localhost:3000 in your browser
2. Choose quiz generation method:
   - **By Subject**: Enter any topic (e.g., "Machine Learning", "Ancient Rome")
   - **By Text**: Paste content and generate questions
   - **By File**: Upload PDF, Word, PowerPoint, or text files
3. Set number of questions (1-100)
4. Click **Generate Quiz**
5. View and save your quiz

---

## 📁 Project Structure

```
QuizConstructor/
├── backend/
│   ├── src/
│   │   └── index.js              # Main server file
│   ├── config/
│   │   └── database.js           # PostgreSQL connection
│   ├── controllers/              # Business logic
│   │   ├── aiController.js       # AI generation
│   │   └── quizController.js     # Quiz CRUD
│   ├── models/
│   │   └── quiz.js               # Database queries
│   ├── routes/
│   │   └── quizRoutes.js         # API routes
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── schema.sql                # Database schema
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── QuizGenerator.jsx # Main generator form
│   │   │   ├── QuizList.jsx      # Display quizzes
│   │   │   └── ErrorAlert.jsx    # Error display
│   │   ├── pages/
│   │   │   └── HomePage.jsx      # Home page
│   │   ├── context/
│   │   │   └── QuizContext.jsx   # State management
│   │   ├── hooks/
│   │   │   ├── useQuiz.js        # Quiz context hook
│   │   │   └── useApi.js         # API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── .gitignore                    # Git ignore rules
└── README.md                     # Full documentation
```

---

## 🔌 API Endpoints

### Quiz CRUD
- `POST /api/quizzes` - Save quiz
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get specific quiz
- `DELETE /api/quizzes/:id` - Delete quiz

### Quiz Generation
- `POST /api/quizzes/generate/subject` - Generate from subject
- `POST /api/quizzes/generate/text` - Generate from text
- `POST /api/quizzes/generate/file` - Generate from file

### Example Request (Generate from Subject)
```bash
curl -X POST http://localhost:5000/api/quizzes/generate/subject \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "World War II",
    "numQuestions": 5
  }'
```

---

## 🛠️ Development Scripts

### Backend
```bash
npm start      # Production mode
npm run dev    # Development with nodemon
npm test       # Run tests (if configured)
```

### Frontend
```bash
npm run dev    # Development server
npm run build  # Build for production
npm run preview # Preview production build
```

---

## 📝 Git Workflow

### Branch Created
- Feature branch: `feature/quizConstructor`

### To Merge to Main
```bash
git checkout main
git pull origin main
git merge feature/quizConstructor
git push origin main
```

---

## 🔐 Environment Variables

### Backend (`.env`)
```
OPENAI_API_KEY=your_api_key_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=password
PORT=5000
NODE_ENV=development
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
psql --version

# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql

# Or on Linux
sudo systemctl start postgresql
```

### OpenAI API Error
- Verify API key is correct
- Check account has available credits
- Ensure key has proper permissions

### Port Already in Use
```bash
# Change PORT in backend .env or frontend vite.config.js
# Backend: PORT=5001
# Frontend: port: 3001 in vite.config.js
```

### CORS Issues
- Backend already has CORS enabled
- Check API_URL in frontend .env matches backend URL

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [OpenAI API](https://platform.openai.com/docs)

---

## 🎓 Key Features

✅ AI-powered quiz generation  
✅ Multiple input methods (subject, text, file)  
✅ Real-time processing  
✅ Modern responsive UI  
✅ State management with Context API  
✅ RESTful API architecture  
✅ PostgreSQL database  
✅ Error handling  

---

## 🚀 Next Steps

1. Install dependencies for both frontend and backend
2. Configure environment variables
3. Setup PostgreSQL database
4. Start both servers
5. Open http://localhost:3000 and start creating quizzes!

---

## 📞 Support

For issues or questions, check the README.md or create an issue in the repository.

Happy Quiz Creating! 🎉
