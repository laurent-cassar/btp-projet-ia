# Project Agents and Configuration

## Overview
This document outlines the AI agents and configurations used in the btp-projet-ia project, including analysis and improvements from the development session.

---

## QuizConstructor Agents

### 1. Backend AI Agent
- **Role**: AI-powered question generation
- **Technology**: Google Gemini API + Perplexity.ai API (with demo mode fallback)
- **Function**: Generates quiz questions from various sources
  - Subject-based generation (Gemini)
  - Text-based generation (Gemini)
  - File-based generation (PDF, DOCX, PPTX, TXT - partially implemented)
  - **Web Search generation (Perplexity.ai) ✨ NEW**
- **Location**: `QuizConstructor/backend/controllers/aiController.js`
- **Demo Mode**: Enabled with `DEMO_MODE=true` in .env (includes 15 mock questions across 3 subjects)
- **Perplexity Integration**: Uses `llama-3.1-sonar-large-128k-online` model with web search
- **Status**: ✅ Operational (web search added 2025-10-29)

### 2. Frontend UI Agent
- **Role**: User interaction and quiz management interface
- **Technology**: React 18 + Vite + Tailwind CSS + Lucide React + Context API
- **Function**: 
  - Collects user input (subject, text, file, **web search ✨**)
  - Displays generated quizzes
  - Manages quiz operations (add, remove, delete)
  - Real-time state management
  - **Shows web sources and citations ✨**
- **Location**: `QuizConstructor/frontend/src/components`
- **Key Components**:
  - QuizGenerator.jsx - Main form with **4 tabs** (Subject, Text, File, **Web Search ✨**)
  - QuizList.jsx - Displays generated quizzes
  - ErrorAlert.jsx - Error notifications
- **Status**: ✅ Operational (web search tab added 2025-10-29)

### 3. Database Agent
- **Role**: Data persistence and retrieval
- **Technology**: PostgreSQL with JSONB support
- **Function**:
  - Stores quiz metadata (subject, number_of_questions, timestamp)
  - Stores questions as JSONB for flexibility
  - Manages quiz attempts (future)
  - Maintains data integrity with constraints
- **Location**: `QuizConstructor/backend/config/database.js`
- **Schema**: Defined in `QuizConstructor/backend/schema.sql`
- **Status**: ⚠️ Configured but not actively used (in-memory context used for demo)

### 4. HTTP Client Agent (New Identification)
- **Role**: Communication between frontend and backend
- **Technology**: Axios
- **Function**: 
  - Sends quiz generation requests to backend
  - Handles API responses
  - Error handling and timeout management
- **Location**: `QuizConstructor/frontend/src/hooks/useApi.js`
- **Status**: ✅ Operational

### 5. State Management Agent
- **Role**: Global state management
- **Technology**: React Context API
- **Function**:
  - Manages quiz list state
  - Tracks loading and error states
  - Persists generated quizzes across components
- **Location**: `QuizConstructor/frontend/src/context/QuizContext.jsx`
- **Status**: ✅ Operational

---

## Configuration

### Environment Variables
**Backend** (`.env`):
```
GOOGLE_GEMINI_API_KEY=       # Google Gemini API key
PERPLEXITY_API_KEY=          # Perplexity.ai API key (Pro account) ✨ NEW
DEMO_MODE=true               # Enable demo mode (default if no API key)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=password
PORT=5000
NODE_ENV=development
```

**Frontend** (`.env.example`):
```
VITE_API_URL=http://localhost:5000/api
```

### API Configuration
- Base URL: `http://localhost:5000/api`
- CORS: Enabled for cross-origin requests
- Content-Type: `application/json`
- Health Check: `GET /health` returns server status

---

## Session Analysis & Findings

### Critical Issues Identified
1. **Answer Format Mismatch** ❌
   - Mock questions used letter format ('A', 'B', 'C', 'D')
   - Should use numeric indices (0, 1, 2, 3)
   - Fixed in commit cb0a22c

2. **Quiz Not Saved to Context** ❌
   - Generated quizzes weren't stored in state
   - Frontend wasn't calling `addQuiz()`
   - Fixed in commit cb0a22c

3. **Line Ending Inconsistencies** ⚠️
   - CRLF vs LF conflicts on Windows
   - Added `.gitattributes` to enforce LF
   - Fixed in commit cb0a22c

4. **Demo Mode Not Explicitly Enabled** ⚠️
   - Relied on fallback logic when API key missing
   - Added explicit `DEMO_MODE=true` setting
   - Fixed in commit cb0a22c

### Issues Resolved
✅ Commit cb0a22c: Corrected demo mode and quiz generation
✅ Commit 3d28d49: Documented all user prompts and session history

---

## Performance Notes

### Demo Mode Performance
- Response time: < 100ms (no external API calls)
- Mock data: 15 questions pre-generated per subject
- Subjects supported: history, biology, programming
- Fallback: Returns programming questions for unknown subjects

### Database Performance (When Connected)
- Query time: 5-50ms for standard operations
- Connection pooling: Configured (min 2, max 10)
- JSONB indexes: Not currently implemented (future optimization)

---

## Integration Architecture

```
User Input (Subject/Text/File/Web Search ✨)
    ↓
QuizGenerator Component
    ↓
useApi Hook (Axios)
    ↓
Backend API Endpoint
    ↓
aiController.generateQuestions*()
    ↓
Check DEMO_MODE
    ├─ TRUE → generateMockQuestions() → Mock data (15 questions)
    └─ FALSE → AI API Call
        ├─ Subject/Text/File → Google Gemini API
        └─ Web Search → Perplexity.ai API ✨
            ├─ Step 1: Search web for information
            ├─ Step 2: Gather sources and citations
            └─ Step 3: Generate questions from research
    ↓
Format Response { questions: [...], sources: [...] ✨ }
    ↓
Frontend: Create quiz object (with sources ✨)
    ↓
QuizContext: addQuiz() → Update state
    ↓
QuizList Component: Render quiz (with citations ✨)
```

---

## Recent Enhancements (2025-10-29)

### ✅ Web Search Integration with Perplexity.ai
- **NEW FEATURE**: Generate quizzes from web searches
- **Technology**: Perplexity.ai Pro API with `llama-3.1-sonar-large-128k-online`
- **Benefits**:
  - Real-time web information
  - Verified sources and citations
  - Multi-source aggregation
  - Academic-quality references
- **User Account**: laurent.cassar@laplateforme.io (Student Pro)
- **Documentation**: See `PERPLEXITY_SETUP.md`

## Future Enhancements

### High Priority
- [ ] User authentication agent (JWT)
- [ ] Database persistence layer (currently in-memory)
- [ ] File upload processing agent (PDF/DOCX parsing)
- [ ] Error recovery agent (retry logic, fallbacks)
- [x] **Web search agent (Perplexity.ai) ✅ COMPLETED**

### Medium Priority
- [ ] Analytics agent (quiz performance tracking)
- [ ] Notification agent (quiz sharing, reminders)
- [ ] Caching agent (Redis for frequently accessed quizzes)
- [ ] Rate limiting agent (API call throttling)

### Low Priority
- [ ] Recommendation agent (personalized quiz suggestions)
- [ ] Multi-language support agent
- [ ] Export agent (PDF, DOCX generation)
- [ ] Offline mode agent (service workers)

---

## Session Commits

| Commit | Message | Fixes |
|--------|---------|-------|
| cb0a22c | fix: Correct demo mode quiz generation | Answer format, quiz saving, DEMO_MODE, line endings |
| 3d28d49 | docs: Add user prompts and session history | Full session documentation |

---

*Last Updated: 2025-10-28*
*Session Version: 1.0*
*Status: Demo mode fully operational ✅*
