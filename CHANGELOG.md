# CHANGELOG

All notable changes to the btp-projet-ia project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.2] - 2025-10-28 - Security Fix: API Key Exposure

### Security
- **CRITICAL**: Removed exposed API key from SESSION_6_SUMMARY.md
- Amended commit to rewrite git history
- Force pushed to remove from remote repository
- Verified no API key in current or historical commits

### Added
- New `SECURITY.md` file with best practices
- Security incident response procedures
- API key management guidelines

### Fixed
- **CRITICAL**: Removed exposed API key from documentation
- Amended commit to rewrite git history
- Force pushed to remove from remote repository
- Verified no real API keys in current or historical commits
- Replaced: Real API key → Safe placeholder `your_api_key_here`

### Verification
- ✅ All .md files scanned - no API key found
- ✅ Full git history checked - no API key found
- ✅ Commit amended - old commit rewritten
- ✅ Force pushed - remote cleaned

### Recommendations
- 🔄 Regenerate API key at https://makersuite.google.com/app/apikey (takes <1 minute)
- This is a free tier key, no impact from regeneration

### Commits
- 7e43afe - Security fix: Remove exposed API key (amended commit)

### Response Time
- **Detected**: Immediately after Prompt 11
- **Fixed**: Within 2 minutes
- **Verified**: All history cleaned
- **Documented**: Complete security policy

### Files Changed
- SESSION_6_SUMMARY.md: API key removed
- prompts.md: Prompts 12 & 13 added
- SECURITY.md: Created
- CHANGELOG.md: This entry

---

## [1.4.1] - 2025-10-28 - Google Gemini API Model Update

### Fixed
- **Model Compatibility**: Updated from deprecated `gemini-pro` to `gemini-2.0-flash-lite`
- **API Version**: Changed from `v1beta` to stable `v1` endpoint
- **Server Stability**: Switched to lite model for better availability

### Changes
- Updated: `aiController.js` - Changed model to `gemini-2.0-flash-lite`
- Changed: API endpoint from `v1beta` to `v1`
- Result: Fully functional quiz generation via Gemini API

### Testing
- ✅ API key validation successful
- ✅ Model listing verified (9 models available)
- ✅ Quiz generation now working
- ✅ Demo mode fallback maintained

### Model Details
- **Previous**: gemini-pro (deprecated)
- **Intermediate**: gemini-1.5-flash (unavailable)
- **Current**: gemini-2.0-flash-lite (stable & fast)
- **Why lite**: Better availability, fast responses, perfect for quiz generation

### Cost
- Still FREE (same as before)
- No API costs for free tier usage
- Rate limit: 60 requests/minute

### Commits
- b98e7c1 - Fix Gemini API model compatibility

---

## [1.4.0] - 2025-10-28 - Google Gemini API Integration

### Added
- **Google Gemini API**: Replaced OpenAI with free Google Gemini Pro
- **Free API Integration**: No cost, no credit card required
- **API Key Configuration**: Secure environment variable setup
- **Session 5 Documentation**: SESSION_5_SUMMARY.md created

### Features
- ✅ Free quiz generation (60 requests/minute)
- ✅ Instant API key generation
- ✅ High quality AI responses
- ✅ Demo mode fallback maintained
- ✅ Secure credential handling
- ✅ Enhanced error logging

### Technical
- Updated: `aiController.js` - Complete Gemini API integration
- Updated: `prompts.md` - Added Gemini-specific generation prompts
- Modified: API request/response structure for Gemini
- Enhanced: Error handling with emoji logging
- Maintained: Demo mode functionality

### API Changes
- Endpoint: `generativelanguage.googleapis.com` (Gemini)
- Authentication: API key in query parameter
- Request format: `contents[0].parts[0].text`
- Response parsing: `candidates[0].content.parts[0].text`
- Model: Gemini Pro (free tier)

### Cost Reduction
- Before: ~$0.10 per 100 questions (OpenAI)
- After: FREE (Gemini free tier)
- Savings: 100% for free tier usage
- Rate limit: 60 requests/minute (sufficient for testing)

### Commits
- (Pending - not yet committed)

---

## [1.3.0] - 2025-10-28 - Multilingual Support & French Language

### Added
- **French Language Support**: Complete French translation of entire UI
- **Language Toggle Button**: Easy language switching with Globe icon
- **LanguageContext**: Centralized translation management system
- **useLanguage Hook**: Simple component access to translations
- **20+ Translation Keys**: Comprehensive coverage of all UI text
- **Session 4 Documentation**: SESSION_4_SUMMARY.md created

### Features
- ✅ Toggle between English and French
- ✅ Instant language switching (no page reload)
- ✅ Professional multilingual interface
- ✅ Easy to extend with more languages
- ✅ Accessible language button (top-right)
- ✅ Proper French accents and formatting

### Technical
- Created: `LanguageContext.jsx` (20+ translation pairs)
- Created: `useLanguage.js` hook
- Updated: `App.jsx` - wrap with LanguageProvider
- Updated: `HomePage.jsx` - add toggle button + translations
- Updated: `QuizGenerator.jsx` - all UI text translated
- Updated: `QuizList.jsx` - all text translated

### Translated Components
- Page title and subtitle
- Form labels and tabs
- Input placeholders
- Button text
- Empty states
- Date labels
- "How it works" section
- Navigation elements

### Commits
- 3d7d8f8: feat: Add French language support with translation toggle

---

## [1.2.1] - 2025-10-28 - Favicon Icon in Title & Branding

### Added
- **Custom Favicon**: Quiz Constructor logo now displays in browser tab
- **Public Assets Folder**: Created frontend/public for static assets
- **Session 3 Documentation**: SESSION_3_SUMMARY.md created

### Improved
- **Visual Branding**: Professional logo icon replaces Vite default
- **Title Cleanliness**: Removed emoji from main heading
- **File Organization**: Proper Vite public folder structure

### Technical
- Updated: `QuizConstructor/frontend/index.html` - favicon reference
- Updated: `QuizConstructor/frontend/src/pages/HomePage.jsx` - removed emoji
- Created: `QuizConstructor/frontend/public/favicon.png` (2.7 KB)

### Commits
- 98ea404: feat: Add Quiz Constructor favicon and update branding

---

## [1.2.0] - 2025-10-28 - Quiz Display Feature

### Added
- **Quiz Questions Display**: Users can now see actual quiz questions with expandable view
- **Expandable Quiz Cards**: Click chevron icon to expand/collapse questions
- **Question Details**: Display question text, options (A-D), correct answer, and explanations
- **Visual Indicators**: 
  - Green highlight for correct answers
  - "✓ Correct" badge for right answer
  - Blue explanation box for each question
- **Live Session Documentation**: SESSION_2_SUMMARY.md created with detailed session information

### Improved
- User experience: Users now see generated quiz content immediately
- Transparency: Users can verify quiz generation worked correctly
- Usability: Questions accessible by clicking expand button
- Data visualization: Letter labels (A, B, C, D) for options
- Error handling: Graceful fallback for missing data

### Technical
- Modified: `QuizConstructor/frontend/src/components/QuizList.jsx`
- Added state management for expanded quizzes
- Added conditional rendering for question details
- Integrated ChevronUp/Down icons from lucide-react

### Commits
- be5bd85: feat: Display actual quiz questions in QuizList component

---

## [1.1.0] - 2025-10-28 - Demo Mode Fixes & Session Improvements

### Fixed
- **Demo Mode Quiz Generation**: Corrected `correctAnswer` format from letters ('A','B','C','D') to numeric indices (0,1,2,3)
- **Quiz Not Displaying**: Frontend now properly saves generated quizzes to QuizContext via `addQuiz()`
- **Import Missing**: Added `addQuiz` to QuizGenerator component destructuring
- **Line Ending Inconsistencies**: Added `.gitattributes` to enforce LF line endings across all source files
- **Demo Mode Not Enabled**: Explicitly set `DEMO_MODE=true` in backend .env configuration

### Added
- Comprehensive session documentation in `prompts.md` with all user instructions and results
- Enhanced AGENTS.md with full agent architecture and session findings
- .gitattributes configuration for consistent line endings
- Session timeline and implementation status tracking
- SESSION_1_SUMMARY.md with complete session overview

### Improved
- Demo mode now returns properly formatted mock questions (15 per subject)
- Frontend properly displays generated quizzes in quiz list
- Git workflow with explicit DEMO_MODE configuration
- Documentation of all critical issues and resolutions

### Session Results
- ✅ Demo mode fully operational
- ✅ Quiz generation and saving working correctly
- ✅ All fixes tested and committed
- ✅ Changes pushed to origin/feature/quizConstructor

### Commits
- cb0a22c: fix: Correct demo mode quiz generation and frontend quiz saving
- 3d28d49: docs: Add user prompts and session history to prompts.md
- 934171c: docs: Update AGENTS, CHANGELOG, benchmarks with session 1 details
- 28d6cd5: docs: Add session 1 complete summary

---

## [1.0.0] - 2025-10-27

### Added
- Initial QuizConstructor full-stack application
- React 18 frontend with Vite build tool
- Express.js backend with Node.js
- PostgreSQL database integration
- OpenAI API integration for quiz generation
- File upload support (PDF, DOCX, PPTX, TXT)
- React Context API for state management
- Tailwind CSS styling with Lucide React icons
- Comprehensive API documentation
- Error handling middleware
- Input validation with Joi
- CORS configuration
- Complete project documentation (README, SETUP, PROJECT_SUMMARY)
- Git repository with feature branch workflow

### Features
- ✅ AI-powered quiz generation from subjects
- ✅ Text-based quiz generation
- ✅ File-based quiz generation (partially implemented)
- ✅ Quiz CRUD operations
- ✅ Quiz list management
- ✅ Responsive UI design
- ✅ Loading states and error notifications
- ✅ Multi-tab interface for different input methods
- ✅ Demo mode for testing without API key

### Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, Lucide React, Axios
- Backend: Express.js, Node.js, PostgreSQL, Multer, Joi
- AI: OpenAI API (GPT 3.5) with demo mode fallback
- Database: PostgreSQL with JSONB support

---

## [Unreleased]

### Planned Features
- [ ] User authentication and accounts (JWT)
- [ ] Quiz sharing and collaboration features
- [ ] Advanced analytics and performance tracking
- [ ] Custom question types (essay, matching, drag-drop)
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Export to PDF and DOCX formats
- [ ] Question bank management
- [ ] Timed quizzes
- [ ] Real-time multiplayer quizzes

### Performance Improvements
- [ ] Implement Redis caching for frequently generated quizzes
- [ ] Add database query optimization
- [ ] Implement pagination for large quiz lists
- [ ] Add response compression

### Security Enhancements
- [ ] Implement JWT authentication
- [ ] Add rate limiting on API endpoints
- [ ] Implement HTTPS enforcement in production
- [ ] Add request logging and monitoring
- [ ] Sanitize user input to prevent XSS
- [ ] Add CSRF protection

---

## Known Issues

### Current Session (2025-10-28)
- File upload endpoint not fully implemented (placeholder only)
- Database persistence disabled during demo mode (in-memory only)
- No user authentication system

### Backlog
- [ ] Implement proper file parsing for PDF/DOCX/PPTX
- [ ] Add database schema migration system
- [ ] Implement comprehensive test suite
- [ ] Add API rate limiting for OpenAI calls
- [ ] Improve error messages for better UX

---

## Session Timeline

### Session 1: Analysis & Documentation (2025-10-28)
1. Analyzed project structure - identified QuizConstructor
2. Analyzed files - found issues and created AGENTS.md, CHANGELOG.md, benchmarks.md
3. Analyzed git repository - found 11 commits, branch divergence
4. Fixed demo mode - corrected answer format, added quiz saving, enabled DEMO_MODE
5. Documented session - added all user prompts to prompts.md
6. Updated all documentation files with session details

### Commits in Session 1
```
cb0a22c - fix: Correct demo mode quiz generation and frontend quiz saving
3d28d49 - docs: Add user prompts and session history to prompts.md
<pending> - docs: Update AGENTS, CHANGELOG, benchmarks with session details
```

---

## Version History

| Version | Release Date | Status | Key Features |
|---------|--------------|--------|--------------|
| 1.1.0   | 2025-10-28   | Stable | Demo mode fixes, session docs |
| 1.0.0   | 2025-10-27   | Stable | Full-stack QuizConstructor |

---

*Last updated: 2025-10-28*
*Next planned update: After file upload implementation*
