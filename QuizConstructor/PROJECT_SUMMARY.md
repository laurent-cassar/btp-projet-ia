# QuizConstructor - Project Summary

## 🎯 Project Overview

**QuizConstructor** is a cutting-edge AI-powered quiz generation platform that allows users to create unlimited quizzes instantly from any source:
- **Subject-based generation**: Type any topic
- **Text-based generation**: Paste or upload content
- **File-based generation**: Support for PDF, Word, PowerPoint, and text files

---

## ✨ Key Features Implemented

### 🎨 Frontend
- **Modern UI** with React 18 + Vite
- **Responsive Design** with Tailwind CSS
- **Beautiful Icons** with Lucide React
- **State Management** with React Context API
- **Three Quiz Generation Methods**:
  - Input by subject/topic
  - Paste text content
  - Upload documents (PDF, DOCX, PPTX, TXT)
- **Quiz List Management**: View, save, and delete quizzes
- **Error Handling**: User-friendly error messages

### 🔧 Backend
- **RESTful API** with Express.js
- **AI Integration** with OpenAI GPT API
- **Database Management** with PostgreSQL
- **File Upload Handling** with Multer
- **Validation** with Joi
- **Error Middleware** for proper error handling
- **API Endpoints**:
  - Quiz CRUD operations
  - AI-powered question generation
  - File processing

### 💾 Database
- **PostgreSQL** for reliable data storage
- **Normalized schema** with quiz and attempts tables
- **Indexes** for optimized queries
- **JSONB support** for flexible question storage

### 🔐 Security & Best Practices
- Environment variables for sensitive data
- `.gitignore` configuration to prevent committing secrets
- Error handling throughout the application
- Input validation on both frontend and backend
- CORS enabled for cross-origin requests

---

## 📁 Project Structure

```
QuizConstructor/
├── .gitignore              # Git ignore rules
├── README.md               # Full project documentation
├── SETUP.md                # Quick start guide
│
├── backend/
│   ├── src/
│   │   └── index.js        # Main server file
│   ├── config/
│   │   └── database.js     # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── aiController.js # AI generation logic
│   │   └── quizController.js # Quiz CRUD logic
│   ├── models/
│   │   └── quiz.js         # Database queries
│   ├── routes/
│   │   └── quizRoutes.js   # API endpoints
│   ├── middleware/
│   │   ├── errorHandler.js # Global error handler
│   │   └── validation.js   # Input validation schemas
│   ├── schema.sql          # Database schema
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuizGenerator.jsx  # Main form component
│   │   │   ├── QuizList.jsx       # Display quizzes
│   │   │   └── ErrorAlert.jsx     # Error notifications
│   │   ├── pages/
│   │   │   └── HomePage.jsx       # Main page
│   │   ├── context/
│   │   │   └── QuizContext.jsx    # Global state
│   │   ├── hooks/
│   │   │   ├── useQuiz.js         # Context hook
│   │   │   └── useApi.js          # API calls
│   │   ├── App.jsx                # Root component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Tailwind imports
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
```

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | React 18 | UI components |
| Build Tool | Vite | Fast development server |
| Styling | Tailwind CSS | Utility-first CSS |
| Icons | Lucide React | Icon library |
| State Management | React Context | Global state |
| Backend Framework | Express.js | API server |
| Runtime | Node.js | JavaScript runtime |
| Database | PostgreSQL | Data storage |
| AI | OpenAI API | Question generation |
| File Upload | Multer | File handling |
| Validation | Joi | Input validation |
| HTTP Client | Axios | API requests |

---

## 🚀 Getting Started

### Quick Start (5 minutes)

1. **Clone and navigate**
   ```bash
   cd QuizConstructor
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your OpenAI API key and DB credentials
   createdb quizconstructor
   psql -U postgres -d quizconstructor -f schema.sql
   npm run dev
   ```

3. **Frontend Setup** (in another terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to http://localhost:3000
   - Start creating quizzes!

### Full Setup Instructions
See `SETUP.md` for detailed installation and troubleshooting.

---

## 📊 Database Schema

### Quizzes Table
```sql
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  num_questions INTEGER NOT NULL CHECK (num_questions > 0 AND num_questions <= 100),
  questions JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Quiz Attempts Table (for future analytics)
```sql
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_answer JSONB NOT NULL,
  score DECIMAL(5, 2),
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Generate Quiz from Subject
```http
POST /quizzes/generate/subject
Content-Type: application/json

{
  "subject": "World War II",
  "numQuestions": 5
}
```

#### Generate Quiz from Text
```http
POST /quizzes/generate/text
Content-Type: application/json

{
  "text": "Albert Einstein was a theoretical physicist...",
  "numQuestions": 5
}
```

#### Generate Quiz from File
```http
POST /quizzes/generate/file
Content-Type: multipart/form-data

file: [PDF/DOCX/PPTX/TXT file]
numQuestions: 5
```

#### Save Quiz
```http
POST /quizzes
Content-Type: application/json

{
  "subject": "History",
  "numQuestions": 10,
  "questions": [...]
}
```

#### Get All Quizzes
```http
GET /quizzes
```

#### Get Single Quiz
```http
GET /quizzes/:id
```

#### Delete Quiz
```http
DELETE /quizzes/:id
```

---

## 🌳 Git Branch Structure

```
main (production)
└── feature/quizConstructor (current development branch)
    ├── Initial setup commit
    └── SETUP guide commit
```

**To merge to main:**
```bash
git checkout main
git merge feature/quizConstructor
git push origin main
```

---

## 📝 Environment Configuration

### Backend `.env`
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

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🎓 Component Hierarchy

```
App
├── QuizProvider (Context)
│   └── HomePage
│       ├── QuizGenerator
│       │   ├── Subject Input Tab
│       │   ├── Text Input Tab
│       │   └── File Upload Tab
│       ├── QuizList
│       │   └── Quiz Cards (with delete)
│       ├── ErrorAlert
│       └── How it Works Sidebar
```

---

## 🔄 Data Flow

1. **User Input** → QuizGenerator component
2. **Validation** → Frontend validation + Context API
3. **API Call** → useApi hooks send to backend
4. **Processing** → Express routes → Controllers → AI API
5. **Database** → Save to PostgreSQL
6. **Response** → Display in QuizList component

---

## 📦 Dependencies

### Frontend
- `react` - UI library
- `react-dom` - DOM rendering
- `axios` - HTTP client
- `lucide-react` - Icon library
- `vite` - Build tool
- `tailwindcss` - CSS framework

### Backend
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment management
- `pg` - PostgreSQL client
- `multer` - File upload
- `axios` - HTTP client
- `joi` - Input validation

---

## ✅ Completed Deliverables

- ✅ Full-stack application architecture
- ✅ React frontend with Vite and Tailwind CSS
- ✅ Express backend with Node.js
- ✅ PostgreSQL database with schema
- ✅ OpenAI API integration
- ✅ File upload support (PDF, Word, PowerPoint, Text)
- ✅ React Context for state management
- ✅ Lucide React icons
- ✅ Comprehensive error handling
- ✅ `.gitignore` configuration
- ✅ Feature branch with commits
- ✅ Complete documentation

---

## 🚀 Future Enhancements

- User authentication and accounts
- Quiz sharing and collaboration
- Advanced analytics and performance tracking
- Custom question types (essay, matching, drag-drop)
- Mobile app (React Native)
- Multi-language support
- Export quizzes to PDF, DOCX
- Question bank management
- Timed quizzes
- Real-time multiplayer quizzes

---

## 📚 Key Files to Review

1. **Frontend**: 
   - `frontend/src/components/QuizGenerator.jsx` - Main form
   - `frontend/src/context/QuizContext.jsx` - State management

2. **Backend**:
   - `backend/src/index.js` - Server setup
   - `backend/controllers/aiController.js` - AI integration
   - `backend/routes/quizRoutes.js` - API endpoints

3. **Database**:
   - `backend/schema.sql` - Database schema

4. **Documentation**:
   - `README.md` - Full documentation
   - `SETUP.md` - Quick start guide

---

## 🎉 Project Ready!

QuizConstructor is fully set up and ready for:
- Development
- Testing
- Deployment
- Feature additions

Start by following the `SETUP.md` guide to get everything running!

---

*Created: October 27, 2025*  
*Status: Ready for Development* ✅
