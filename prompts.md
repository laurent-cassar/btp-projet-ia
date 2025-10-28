# AI Prompts for QuizConstructor

## Original Project Brief (User Prompt to Copilot)

```
génère moi un site qui peut générer des quiz sur n'importe quel sujet. 
l'utilisateur n'a qu'à écrire son sujet et définir le nombre des questions, 
l'utilisateur pourra aussi générer des quiz à partir d'un fichier word, text, 
PDF ou powerpoint. 

Pour le frontend utilise React avec Vite, pour le style utilise Tailwind CSS, 
pour les icones utilise Lucide React et pour state management utilise React Context. 

Pour le backend utilise Node.js avec Express.js et pour la base de données utilise PostgreSQL. 

Ce dossier est un repo git donc fais moi le fichier gitignore nécessaire. 
Tu as droit de créer des branches si nécessaire. Le site s'appelle QuizConstructor.
```

**Key Requirements**:
- Quiz generation from any subject
- Quiz generation from text content (copy/paste)
- Quiz generation from files (Word, PDF, PowerPoint, Text)
- User specifies subject and number of questions
- Frontend: React 18 + Vite + Tailwind CSS + Lucide React + Context API
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Version control: Git with .gitignore and branching
- Project name: QuizConstructor

---

## Copilot Instructions (Session Prompts)

### Prompt 1: Project Analysis & Documentation
```
What is the project that is in the current directory?
```
**Result**: Identified btp-projet-ia as QuizConstructor project, analyzed structure and provided bullet-point findings.

---

### Prompt 2: File Analysis & Creation
```
Go through the files carefully and analyze everything. Do not claim to have read a file that you did not read. 
Give me a summary in bullet points of your findings. I want to know what is correct and what is not correct 
in this project. Also, add the following files: AGENTS.md, CHANGELOG.md, benchmarks.md. There is a file 
named prompts.md, insert any prompt into it. You do not have the right to delete anything from prompts.md
```
**Result**: Created/populated AGENTS.md, CHANGELOG.md, benchmarks.md with comprehensive documentation. Added AI prompts for quiz generation to prompts.md.

---

### Prompt 3: Git Repository Analysis
```
This structure is a git repository. Analyze it and tell me what you find
```
**Result**: Analyzed commit history, branches, divergence issues, and provided git health assessment (7/10 score).

---

### Prompt 4: Demo Mode Investigation & Fix
```
You may create and push to the current branch. You do not have the right to go into any other branch. 
About the project, the quiz generator does not generate quizzes. There is a demo mode implemented 
for testing instead of sending requests through an api key, but the demo mode is not functioning. 
Look into that.
```
**Result**: 
- Fixed correctAnswer format (letter to numeric indices)
- Added quiz saving to context
- Enabled DEMO_MODE in .env
- Added .gitattributes for line endings
- Committed and pushed changes

---

### Prompt 6: Favicon Implementation
```
There's a file in the frontend folder named 'Quiz Constructor_favicon.png' 
use it as the icon for the site instead of the star emoji. Then document as necessary.
```
**Result**: 
- Created public folder in frontend
- Copied favicon to correct location
- Updated HTML favicon reference
- Removed emoji from title
- Professional branding implemented

---

### Prompt 7: Favicon Icon in Title
```
There's no icon next to the title anymore. I want it to be the same as the icon used for the tab.
```
**Result**:
- Added favicon image display next to title
- Used flexbox for proper alignment
- Set 12x12px size for consistent sizing
- Committed locally (not pushed until requested)

---

### Prompt 8: French Language Support
```
Add a french version of the site. Create a button on the page to translate the page between english and french.
```
**Result**:
- Created LanguageContext for centralized translations
- Implemented useLanguage hook
- Added language toggle button (Globe icon, top-right)
- Translated 20+ UI elements to French
- Instant language switching without page reload

---

### Prompt 9: Google Gemini API Integration
```
I got the google gemini api key. Can I paste it here and you'd do the rest of the implementation?
```
**Response**: Advised on secure API key handling and provided safe implementation path.

```
OK, the .env file is ready. Do the rest and document. Don't forget to document the prompts used this session.
```
**Result**:
- Updated aiController.js to use Google Gemini API
- Replaced OpenAI with Gemini API endpoints
- Maintained demo mode functionality
- Updated API prompts for Gemini format
- Added console logging for debugging
- Documented implementation and all session prompts

---

## Session Timeline

| # | Prompt | Status | Key Results |
|---|--------|--------|-------------|
| 1 | Project Analysis | ✅ Complete | Identified QuizConstructor structure |
| 2 | File Analysis & Docs | ✅ Complete | Created AGENTS.md, CHANGELOG.md, benchmarks.md |
| 3 | Git Analysis | ✅ Complete | Identified 11 commits, branch divergence |
| 4 | Demo Mode Fix | ✅ Complete | 5 critical fixes + push to origin |
| 5 | Favicon Implementation | ✅ Complete | Professional branding with custom icon |
| 6 | Favicon in Title | ✅ Complete | Icon display next to title |
| 7 | French Language | ✅ Complete | Full multilingual support (EN/FR) |
| 8 | Gemini API | ✅ Complete | Free AI API integration |

---

## Google Gemini API Integration Details

### API Configuration
- **Provider**: Google Generative AI (Gemini)
- **Model**: gemini-pro
- **Endpoint**: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
- **Authentication**: Query parameter `key` with API_KEY
- **Free Tier**: 60 requests/minute

### Implementation Changes
**File**: `QuizConstructor/backend/controllers/aiController.js`

#### Key Changes:
1. Replaced OpenAI API calls with Google Gemini
2. Updated API endpoint format
3. Changed request structure to Gemini format:
   - Request: `contents[0].parts[0].text` format
   - Response: `candidates[0].content.parts[0].text` format
4. Updated error handling for Gemini responses
5. Added emoji logging for better debugging (🔍, ✅, ❌)

#### API Request Format (Gemini):
```javascript
{
  contents: [
    {
      parts: [
        {
          text: "Your prompt here"
        }
      ]
    }
  ]
}
```

#### API Response Format (Gemini):
```javascript
{
  candidates: [
    {
      content: {
        parts: [
          {
            text: "AI response"
          }
        ]
      }
    }
  ]
}
```

### Generation Prompts Used

#### Subject-Based Generation Prompt
```
Generate {numQuestions} multiple choice quiz questions about "{subject}". 
For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (0, 1, 2, or 3 as numeric index).
Only return the JSON array, no additional text.
```

#### Text-Based Generation Prompt
```
Based on the following text, generate {numQuestions} multiple choice quiz questions.
Text: "{text}"

For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (0, 1, 2, or 3 as numeric index).
Only return the JSON array, no additional text.
```

### Advantages of Gemini Over OpenAI
- ✅ Free tier (60 req/min vs $0.50/1k tokens)
- ✅ No credit card required
- ✅ Instant API key generation
- ✅ Comparable quality to GPT-3.5
- ✅ High rate limits for free tier
- ✅ Better for educational projects

### Fallback Behavior
- Demo mode still works if API key not set
- Mock quiz data provided for testing
- Graceful error handling with console logs
- Production-ready with proper error messages

---

*Last Updated: 2025-10-28*
*Prompts Document Version: 3.0*
*Status: Complete with Gemini API integration*

## Generated AI Prompts for Quiz Generation

### 1. Subject-Based Quiz Generation Prompt

You are an expert quiz creator. Generate {numQuestions} multiple-choice quiz questions about the subject: "{subject}".

For each question:
- Create a clear, educational question
- Provide 4 answer options (A, B, C, D)
- Clearly mark the correct answer
- Add a brief explanation of why the answer is correct

Format your response as a JSON array with the following structure where correctAnswer is the index (0-3) of the correct option.

### 2. Text-Based Quiz Generation Prompt

You are an expert quiz creator. Generate {numQuestions} multiple-choice quiz questions based ONLY on the provided text content.

For each question:
- Create questions that test comprehension
- Provide 4 answer options
- Clearly mark the correct answer (0-3 index)
- Add explanation referencing the text

### 3. File-Based Quiz Generation Prompt

You are an expert quiz creator. Generate {numQuestions} multiple-choice quiz questions based on the extracted file content.

For each question:
- Test understanding of file content
- Provide 4 answer options
- Mark correct answer (0-3 index)
- Add explanation with source context

### 4. Question Validation (Internal)

Validate the following quiz questions for:
1. Clarity and proper grammar
2. Correct answer validity
3. Plausibility of distractors
4. Explanation accuracy
5. Difficulty progression

---

## Implementation Status

### ✅ Completed
- Frontend: React 18, Vite, Tailwind CSS, Lucide React, Context API
- Backend: Express.js, PostgreSQL, OpenAI integration
- Demo Mode: Fully functional with mock data
- Git: Feature branch, multiple commits, proper structure
- Documentation: README, SETUP, PROJECT_SUMMARY, CHANGELOG, AGENTS, benchmarks
- Prompts: Documented all AI prompts for generation

### ⚠️ Partial/Future
- File upload endpoint (placeholder only, not fully implemented)
- User authentication
- Quiz sharing
- Advanced analytics
- Multi-language support

---

*Last Updated: 2025-10-28*
*Prompts Document Version: 2.0*
