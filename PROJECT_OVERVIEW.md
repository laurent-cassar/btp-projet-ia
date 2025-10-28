# QuizConstructor Project - Complete Overview for Copilot

**Last Updated**: 2025-10-28 12:51:45 UTC  
**Project Status**: ✅ ACTIVE DEVELOPMENT  
**Current Version**: 1.4.0

---

## 🎯 Executive Summary

**QuizConstructor** is a full-stack AI-powered quiz generation application. Users can generate unlimited quizzes from:
- Subjects (e.g., "History", "Biology")
- Text content (copy-paste)
- Uploaded files (PDF, DOCX, PPTX, TXT)

The application uses OpenAI's GPT API for quiz generation, with a demo mode for testing without an API key.

---

## 📋 Quick Facts

| Aspect | Details |
|--------|---------|
| **Repository** | https://github.com/laurent-cassar/btp-projet-ia |
| **Project Name** | btp-projet-ia (QuizConstructor) |
| **Current Branch** | feature/quizConstructor |
| **Current Version** | 1.4.0 |
| **Total Commits** | 22+ (11 initial + 11 improvements) |
| **Last 5 Versions** | 1.4.0 (Gemini), 1.3.0 (multilingual), 1.2.1 (favicon), 1.2.0 (quiz display), 1.1.0 (demo fixes) |
| **Primary Language** | JavaScript/JSX |
| **Deployment Status** | Ready (feature branch, needs merge to main) |

---

## 🏗️ Architecture Overview

### Frontend Stack
- **Framework**: React 18 with Vite (fast build tool)
- **Styling**: Tailwind CSS (utility-first CSS)
- **Icons**: Lucide React (icon library)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Runtime**: Node.js

### Backend Stack
- **Framework**: Express.js (Node.js)
- **Database**: PostgreSQL with JSONB support
- **AI Integration**: OpenAI API (GPT 3.5-turbo)
- **File Upload**: Multer
- **Validation**: Joi
- **CORS**: Enabled for frontend communication

### Project Structure

```
btp-projet-ia/
├── QuizConstructor/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── QuizGenerator.jsx      (Main form - 3 tabs)
│   │   │   │   ├── QuizList.jsx           (Displays quizzes + questions)
│   │   │   │   └── ErrorAlert.jsx         (Error notifications)
│   │   │   ├── pages/
│   │   │   │   └── HomePage.jsx           (Main page)
│   │   │   ├── context/
│   │   │   │   └── QuizContext.jsx        (Global state)
│   │   │   ├── hooks/
│   │   │   │   ├── useQuiz.js             (Context hook)
│   │   │   │   └── useApi.js              (API calls)
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   ├── public/                    (Static assets)
│   │   │   └── favicon.png            (Site icon)
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   ├── backend/
│   │   ├── src/
│   │   │   └── index.js                   (Main server)
│   │   ├── config/
│   │   │   └── database.js                (PostgreSQL connection)
│   │   ├── controllers/
│   │   │   ├── aiController.js            (OpenAI integration)
│   │   │   └── quizController.js          (CRUD operations)
│   │   ├── models/
│   │   │   └── quiz.js                    (Database queries)
│   │   ├── routes/
│   │   │   └── quizRoutes.js              (API endpoints)
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── schema.sql                     (Database schema)
│   │   ├── package.json
│   │   └── .env                           (Configuration)
│   │
│   ├── .gitignore
│   ├── README.md
│   ├── SETUP.md
│   ├── PROJECT_SUMMARY.md
│   ├── COMPLETION_CHECKLIST.md
│   └── prompts.md
│
├── AGENTS.md                              (Project agents documentation)
├── CHANGELOG.md                           (Version history)
├── benchmarks.md                          (Performance metrics)
├── prompts.md                             (AI prompts + user history)
├── SESSION_1_SUMMARY.md                   (Session 1 work)
├── SESSION_2_SUMMARY.md                   (Session 2 work)
└── .gitattributes                         (Line ending config)
```

---

## 🔄 How It Works (Data Flow)

### User Flow for Quiz Generation

```
1. USER OPENS APP
   ↓
2. CHOOSE GENERATION METHOD
   ├─ By Subject: Enter topic (e.g., "History")
   ├─ By Text: Paste content
   └─ By File: Upload PDF/DOCX/PPTX/TXT
   ↓
3. SET NUMBER OF QUESTIONS (1-100)
   ↓
4. CLICK "GENERATE QUIZ"
   ↓
5. FRONTEND CALLS BACKEND API
   POST /api/quizzes/generate/{subject|text|file}
   ↓
6. BACKEND PROCESSES
   ├─ Check DEMO_MODE environment variable
   ├─ If DEMO_MODE=true:
   │  └─ Return mock questions (15 from hard-coded database)
   └─ If DEMO_MODE=false (has API key):
      └─ Call OpenAI API for question generation
   ↓
7. BACKEND RETURNS
   {
     questions: [
       {
         question: "...",
         options: ["A", "B", "C", "D"],
         correctAnswer: 0-3,
         explanation: "..."
       },
       ...
     ]
   }
   ↓
8. FRONTEND RECEIVES DATA
   ├─ Create quiz object
   ├─ Save to QuizContext
   └─ Display in "Your Quizzes" list
   ↓
9. USER SEES QUIZ
   ├─ Expandable card with metadata
   ├─ Click chevron to expand
   └─ See all questions with options, correct answers, explanations
   ↓
10. USER CAN
    ├─ Delete quiz (trash button)
    └─ Expand/collapse to see questions
```

---

## 🧠 Key Components Explained

### Frontend Components

#### QuizGenerator.jsx
- **Purpose**: Main form for quiz creation
- **Features**: 3 tabs (Subject, Text, File)
- **Functionality**: 
  - Collects user input
  - Sends to backend API
  - Saves result to context
  - Displays errors
- **State**: subject, text, file, numQuestions, tab selection

#### QuizList.jsx (Recently Updated - Session 2)
- **Purpose**: Display all generated quizzes
- **Features**: Expandable question view
- **Functionality**:
  - Show quiz metadata (subject, count, date)
  - Expand/collapse with chevron button
  - Display all questions with options
  - Highlight correct answer (green)
  - Show explanations (blue box)
  - Delete button (trash)
- **State**: expandedQuiz (tracks which quiz is open)

#### QuizContext.jsx
- **Purpose**: Global state management
- **Data Stored**:
  - quizzes (array of quiz objects)
  - currentQuiz (selected quiz)
  - loading (API call status)
  - error (error messages)
- **Methods**: addQuiz, removeQuiz, setLoading, setError

#### useApi.js Hook
- **Purpose**: Handles all API communication
- **Functions**:
  - generateQuizFromSubject(subject, numQuestions)
  - generateQuizFromText(text, numQuestions)
  - generateQuizFromFile(file, numQuestions)
  - saveQuiz(subject, numQuestions, questions)
  - getQuizzes()
  - deleteQuiz(id)

### Backend Components

#### aiController.js
- **Purpose**: AI quiz generation
- **Key Function**: generateMockQuestions(subject, numQuestions)
  - Has 15 mock questions per subject (history, biology, programming)
  - Returns questions in proper format
  - Uses numeric indices (0-3) for correctAnswer
- **Export Functions**:
  - generateQuestionsFromSubject(subject, numQuestions)
  - generateQuestionsFromText(text, numQuestions)
  - Both check DEMO_MODE first, then call OpenAI if needed

#### quizController.js
- **Purpose**: CRUD operations
- **Functions**:
  - createQuiz(subject, numQuestions, questions)
  - getQuizzes()
  - getQuizById(id)
  - deleteQuiz(id)

#### quizRoutes.js
- **Purpose**: API endpoint definitions
- **Endpoints**:
  - POST /generate/subject - AI generation from subject
  - POST /generate/text - AI generation from text
  - POST /generate/file - AI generation from file (placeholder)
  - POST / - Save quiz to database
  - GET / - Get all quizzes
  - GET /:id - Get specific quiz
  - DELETE /:id - Delete quiz
  - GET /health - Server health check

---

## 🔐 Configuration & Environment

### Backend .env Configuration

```
# API Key (leave empty for demo mode)
OPENAI_API_KEY=

# Enable demo mode explicitly
DEMO_MODE=true

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Frontend .env.example

```
VITE_API_URL=http://localhost:5000/api
```

### Git Configuration

```
.gitattributes  - Enforces LF line endings
.gitignore      - Excludes node_modules, .env, build artifacts
```

---

## 🔧 Current Features & Status

### ✅ Fully Implemented

| Feature | Status | Details |
|---------|--------|---------|
| Quiz generation from subject | ✅ Working | Uses mock data in demo mode |
| Quiz generation from text | ✅ Working | Uses mock data in demo mode |
| Demo mode | ✅ Operational | 15 questions per subject (history, biology, programming) |
| Quiz list display | ✅ Working | Shows subject, count, date, delete button |
| Quiz questions display | ✅ Working | Expandable view with options and explanations |
| Quiz deletion | ✅ Working | Delete button removes from context |
| Frontend UI | ✅ Complete | React + Vite + Tailwind CSS |
| Backend API | ✅ Complete | Express.js with proper routing |
| Error handling | ✅ Implemented | Frontend error display, backend validation |
| State management | ✅ Complete | React Context API with hooks |

### ⚠️ Partially Implemented

| Feature | Status | Details |
|---------|--------|---------|
| Database persistence | ⚠️ Configured | PostgreSQL connection exists but not used (in-memory only) |
| File upload endpoint | ⚠️ Placeholder | Route exists but only returns placeholder message |
| Question marking | ⚠️ Not ready | No interactive question selection |
| Scoring system | ⚠️ Not ready | No grade calculation |

### ❌ Not Yet Implemented

| Feature | Status | Details |
|---------|--------|---------|
| User authentication | ❌ Not started | No login/signup system |
| Quiz sharing | ❌ Not started | No sharing functionality |
| PDF export | ❌ Not started | No export capability |
| Quiz search/filter | ❌ Not started | No search functionality |
| Analytics | ❌ Not started | No tracking/statistics |

---

## 📊 Demo Mode Data

### Mock Questions (15 per subject)

#### History Subject (5 questions example)
1. In what year did World War II end? → 1945 (index 2)
2. Who was the first President of the United States? → George Washington (index 1)
3. What was the main cause of the French Revolution? → Economic crisis (index 0)
4. Which ancient wonder of the world still stands today? → Great Pyramid of Giza (index 1)
5. In what year did the Titanic sink? → 1912 (index 2)

#### Biology Subject (5 questions example)
1. What is the powerhouse of the cell? → Mitochondria (index 1)
2. How many chromosomes do humans have? → 46 (index 1)
3. What is the process by which plants make their own food? → Photosynthesis (index 1)
4. Which blood type is the universal donor? → O (index 3)
5. What is the largest organ in the human body? → Skin (index 3)

#### Programming Subject (5 questions example)
1. What does HTML stand for? → Hyper Text Markup Language (index 0)
2. Which of these is a server-side language? → All of the above (index 3)
3. What does CSS stand for? → Cascading Style Sheets (index 1)
4. Which data structure uses LIFO? → Stack (index 1)
5. What is the time complexity of binary search? → O(log n) (index 2)

**Format**: `correctAnswer` uses numeric indices (0-3), not letter indices ('A'-'D')

---

## 📈 Development Sessions

### Session 1: Analysis & Demo Mode Fixes (2025-10-28)
**Objective**: Analyze project and fix demo mode  
**Issues Found**: 5 critical issues  
**Fixes Applied**:
1. Corrected `correctAnswer` format (letters → numeric indices)
2. Added quiz saving to context via `addQuiz()`
3. Added missing `addQuiz` import
4. Explicitly enabled `DEMO_MODE=true` in .env
5. Added `.gitattributes` for line ending consistency

**Commits**: 
- cb0a22c: Demo mode fixes
- 3d28d49: Prompt documentation
- 934171c: Session analysis documentation
- 28d6cd5: Session 1 summary

**Result**: Demo mode fully operational ✅

### Session 2: Quiz Display Feature (2025-10-28)
**Objective**: Show actual quiz questions in frontend  
**Problem Identified**: QuizList only showed metadata  
**Solution Implemented**: Expandable quiz cards with full question details  
**Changes**:
- Added expandable view with chevron icons
- Display question text, options (A-D), explanations
- Highlight correct answer (green background)
- Show "✓ Correct" badge

**Commits**:
- be5bd85: Quiz display feature
- b0010b1: Session 2 documentation

**Result**: Quiz questions now visible and interactive ✅

### Session 3: Favicon & Branding (2025-10-28)
**Objective**: Use custom favicon and remove emoji branding  
**Problem Identified**: Default Vite icon with emoji in title  
**Solution Implemented**: Custom Quiz Constructor logo favicon  
**Changes**:
- Created public folder in frontend
- Copied favicon.png from project root
- Updated HTML favicon reference
- Removed emoji from main title

**Commits**:
- 98ea404: Favicon and branding implementation

**Result**: Professional branding with custom icon ✅

### Session 4: Multilingual Support & French Language (2025-10-28)
**Objective**: Add French language support with translation toggle  
**Problem Identified**: English-only interface, not accessible to French speakers  
**Solution Implemented**: Complete French translation with language toggle button  
**Changes**:
- Created LanguageContext for centralized translations
- Created useLanguage hook for easy component access
- Added language toggle button (Globe icon, top-right)
- Translated all UI text (20+ keys)
- Instant language switching without page reload

**Commits**:
- 3d7d8f8: Multilingual support implementation

**Result**: Professional bilingual interface (EN/FR) ✅

### Session 5: Google Gemini API Integration (2025-10-28)
**Objective**: Replace OpenAI with free Google Gemini API  
**Problem Identified**: OpenAI requires payment, limited free credits  
**Solution Implemented**: Google Gemini Pro with free tier (60 req/min)  
**Changes**:
- Updated aiController.js with Gemini API endpoints
- Changed request/response structure for Gemini format
- Maintained demo mode as fallback
- Enhanced error logging with emoji indicators
- Updated prompts for Gemini-specific format

**Features**:
- ✅ Free API (no credit card needed)
- ✅ 60 requests per minute
- ✅ High quality responses
- ✅ Instant API key generation
- ✅ Secure credential handling

**Status**: Complete, ready for integration

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js v16+
- npm or yarn
- PostgreSQL v12+ (optional - demo mode works without database)
- OpenAI API key (optional - demo mode works without it)

### Backend Setup

```bash
cd QuizConstructor/backend

# Install dependencies
npm install

# Create/verify .env file with DEMO_MODE=true
# (already configured)

# Start server
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd QuizConstructor/frontend

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:3000
```

### Verify It's Working

1. Open http://localhost:3000
2. Enter "History" as subject
3. Set 5 questions
4. Click "Generate Quiz"
5. Quiz appears in "Your Quizzes" list
6. Click chevron to expand and see questions

---

## 📊 Current Git Status

### Branch Structure
```
main (production, not updated yet)
  └─ 456b27d - chore: add .md files

feature/quizConstructor (current development)
  └─ b0010b1 - docs: Add session 2 documentation (HEAD)
     ├─ be5bd85 - feat: Display quiz questions
     ├── (earlier commits from Session 1)
```

### Latest Commits (6 most recent)
```
b0010b1 - docs: Add session 2 documentation and update changelog
be5bd85 - feat: Display actual quiz questions in QuizList component
28d6cd5 - docs: Add session 1 complete summary
934171c - docs: Update AGENTS, CHANGELOG, benchmarks with session 1 details
3d28d49 - docs: Add user prompts and session history to prompts.md
cb0a22c - fix: Correct demo mode quiz generation and frontend quiz saving
```

**Status**: All changes committed and pushed to origin/feature/quizConstructor ✅

---

## 📚 Documentation Files

| File | Purpose | Size | Key Content |
|------|---------|------|------------|
| README.md | Main overview | 131 bytes | Title + quote (minimal) |
| SETUP.md | Installation guide | ~7KB | Step-by-step setup instructions |
| PROJECT_SUMMARY.md | Detailed architecture | ~10KB | Full technical overview |
| COMPLETION_CHECKLIST.md | Project tracking | ~12KB | What's completed/planned |
| AGENTS.md | System components | ~6KB | All agents and config |
| CHANGELOG.md | Version history | ~6KB | All releases and changes |
| benchmarks.md | Performance data | ~12KB | Metrics and load testing |
| prompts.md | AI prompts + history | ~5KB | All prompts and user inputs |
| SESSION_1_SUMMARY.md | Session 1 details | ~8KB | First session work |
| SESSION_2_SUMMARY.md | Session 2 details | ~10KB | Second session work |

---

## 🎓 Important Notes for Future Development

### Do's ✅
- ✅ Always run `npm install` after pulling changes
- ✅ Set `DEMO_MODE=true` in backend .env for testing
- ✅ Check QuizContext for state management
- ✅ Use Tailwind CSS classes for styling
- ✅ Document changes in SESSION_X_SUMMARY.md files
- ✅ Commit to feature/quizConstructor branch only
- ✅ Push commits to origin after testing
- ✅ Update CHANGELOG.md with version changes
- ✅ Use semantic versioning (v1.2.0 format)

### Don'ts ❌
- ❌ Don't modify main branch (reserved for production)
- ❌ Don't delete any existing documentation
- ❌ Don't commit sensitive data (.env files)
- ❌ Don't change DEMO_MODE to false without API key
- ❌ Don't ignore git line ending warnings (.gitattributes handles this)
- ❌ Don't modify PostgreSQL without updating schema.sql
- ❌ Don't create new state management outside QuizContext

### Known Limitations
- ⚠️ Database not actively used (in-memory context only)
- ⚠️ File upload endpoint is placeholder
- ⚠️ OpenAI rate limited (3 requests per minute)
- ⚠️ No authentication system
- ⚠️ Demo mode limited to 15 questions per subject

---

## 🔍 Quick Debugging Guide

### Quiz not showing up?
1. Check `setLoading(false)` called in useApi
2. Verify `addQuiz(quiz)` called in QuizGenerator
3. Check QuizContext.quizzes contains data
4. Open browser DevTools console for errors

### API call failing?
1. Verify backend running: http://localhost:5000/health
2. Check CORS enabled in backend
3. Verify VITE_API_URL correct in frontend .env
4. Check backend .env has DEMO_MODE=true

### Questions not showing?
1. Verify `quiz.questions` array not empty
2. Check correctAnswer is numeric (0-3), not letter
3. Verify options array has 4 items
4. Click chevron icon to expand quiz

### Build errors?
1. Delete node_modules and package-lock.json
2. Run `npm install` fresh
3. Check Node.js version (v16+)
4. Clear .vite/tsconfig.tsbuildinfo cache

---

## 🎯 Next Session Priorities

### High Priority (Blocking Features)
1. [ ] Implement file upload endpoint (currently placeholder)
2. [ ] Connect to PostgreSQL for persistence
3. [ ] Implement user scoring system
4. [ ] Add question selection/interaction

### Medium Priority (Nice to Have)
1. [ ] Add user authentication (JWT)
2. [ ] Implement quiz export to PDF
3. [ ] Add search/filter for quizzes
4. [ ] Implement quiz sharing

### Low Priority (Future)
1. [ ] Mobile app (React Native)
2. [ ] Real-time multiplayer
3. [ ] Advanced analytics
4. [ ] Multi-language support

---

## 📞 Contact & References

### Repository
- **URL**: https://github.com/laurent-cassar/btp-projet-ia
- **Owner**: laurent-cassar
- **Branch**: feature/quizConstructor

### Key Files to Review First
1. `QuizConstructor/frontend/src/components/QuizGenerator.jsx` - Main form
2. `QuizConstructor/frontend/src/components/QuizList.jsx` - Question display
3. `QuizConstructor/backend/controllers/aiController.js` - AI integration
4. `SESSION_1_SUMMARY.md` - Session 1 work
5. `SESSION_2_SUMMARY.md` - Session 2 work

### Commands for Next Copilot
```bash
# Check status
git status

# See latest changes
git log --oneline -10

# Create new branch (if needed)
git checkout -b feature/your-feature

# After changes
git add .
git commit -m "feat: Your feature description"
git push origin feature/quizConstructor
```

---

## 🎉 Project Summary

**QuizConstructor** is a functional quiz generation app with:
- ✅ Full-stack architecture (React + Express + PostgreSQL)
- ✅ Demo mode working without API key
- ✅ Questions visible and organized
- ✅ Clean, expandable UI
- ✅ Comprehensive documentation
- ✅ Ready for next features

**Current Version**: 1.2.0 (Quiz Display)  
**Status**: Active Development  
**Next Steps**: File upload, database persistence, scoring system

---

*This document is the single source of truth for understanding QuizConstructor. It should be updated after each development session with new SESSION_X_SUMMARY.md files and CHANGELOG.md entries.*

**Last Updated**: 2025-10-28 08:41:33 UTC  
**Next Update**: After next development session  
**Maintainer Notes**: Keep this file up to date for future Copilot sessions
