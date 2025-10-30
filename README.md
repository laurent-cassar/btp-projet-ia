# btp-projet-ia - QuizConstructor

> "When it comes to computers, what hackers are doing now, everyone will be doing in ten years." — Paul Graham

---

## 🎯 QuizConstructor

An AI-powered quiz generation platform that instantly creates quiz questions from any subject, text, or uploaded file.

### ✨ Key Features

- **AI-Powered Quiz Generation**: Uses Google Gemini & Perplexity.ai to generate intelligent quiz questions
- **Multiple Input Methods**: Generate from subjects, text content, uploaded files (PDF, DOCX, PPTX, TXT), or **web searches ✨**
- **Web Search Integration**: Search the web with Perplexity.ai for real-time, verified information
- **Source Citations**: View sources used to generate questions (web search mode)
- **Demo Mode**: Test without an API key using pre-configured mock questions
- **Expandable Interface**: View all questions, options, and explanations with one click
- **Responsive Design**: Built with React and Tailwind CSS for modern, mobile-friendly experience
- **Full-Stack Architecture**: Complete backend API with Express.js and PostgreSQL

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn
- PostgreSQL v12+ (optional - demo mode works without it)

### Installation

\\\ash
# Backend
cd QuizConstructor/backend
npm install
npm run dev

# Frontend (in new terminal)
cd QuizConstructor/frontend
npm install
npm run dev
\\\

Visit \http://localhost:3000\ and start generating quizzes!

---

## 📋 How It Works

1. **Choose Input Method**: Subject, text, file, or **web search ✨**
2. **Set Question Count**: 1-100 questions
3. **Generate Quiz**: AI creates questions instantly
4. **View Results**: See all questions with options and explanations
5. **Delete if Needed**: Remove quizzes from your list

---

## 🏗️ Project Structure

\\\
QuizConstructor/
├── frontend/          # React 18 + Vite UI
├── backend/           # Express.js API
└── [documentation]    # Comprehensive guides
\\\

---

## 📚 Documentation

- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Complete project guide (start here!)
- **[SETUP.md](./QuizConstructor/SETUP.md)** - Detailed installation instructions
- **[PROJECT_SUMMARY.md](./QuizConstructor/PROJECT_SUMMARY.md)** - Architecture deep dive
- **[AGENTS.md](./AGENTS.md)** - System components and configuration
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[benchmarks.md](./benchmarks.md)** - Performance metrics
- **[SESSION_1_SUMMARY.md](./SESSION_1_SUMMARY.md)** - First development session
- **[SESSION_2_SUMMARY.md](./SESSION_2_SUMMARY.md)** - Second development session

---

## 🔧 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Lucide React Icons
- React Context API
- Axios

### Backend
- Express.js
- Node.js
- PostgreSQL
- OpenAI API
- Multer (file uploads)

---

## ✅ Current Status

**Version**: 1.2.0  
**Status**: ✅ Active Development  
**Demo Mode**: ✅ Fully Functional  
**Database**: ⚠️ Configured (not actively used)  
**File Upload**: ⚠️ Endpoint placeholder  

---

## 🎓 Features

### ✅ Implemented
- Quiz generation from subject (with demo data)
- Quiz generation from text (with demo data)
- Quiz list with expandable details
- Question display with options and explanations
- Quiz deletion
- Error handling and notifications
- Responsive UI design

### ⚠️ In Progress
- Database persistence
- File upload processing

### 🔮 Planned
- User authentication
- Quiz sharing
- PDF export
- Analytics

---

## 📝 Environment Setup

### Backend .env
\\\
OPENAI_API_KEY=              # Leave empty for demo
DEMO_MODE=true
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=password
PORT=5000
NODE_ENV=development
\\\

### Frontend .env
\\\
VITE_API_URL=http://localhost:5000/api
\\\

---

## 🤝 Development

This project uses a feature branch workflow:
- **Main branch**: Production-ready code
- **feature/quizConstructor**: Active development

All changes are documented in \SESSION_X_SUMMARY.md\ files.

---

## 📞 Support

For detailed information, refer to [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) which contains:
- Complete architecture overview
- Component explanations
- Debugging guides
- Next priorities
- Git commands

---

## 📄 License

MIT

---

**Current Version**: 1.2.0 (Quiz Display Feature)  
**Last Updated**: 2025-10-28  
**Repository**: https://github.com/laurent-cassar/btp-projet-ia
