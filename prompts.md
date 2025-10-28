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

### Prompt 5: Current Prompt
```
Did you remember to add the prompts into prompts.md?
```
**Result**: Documenting this conversation and adding all user prompts to prompts.md (this file).

---

## Session Timeline

| # | Prompt | Status | Key Fixes |
|---|--------|--------|-----------|
| 1 | Project Analysis | ✅ Complete | Identified QuizConstructor structure |
| 2 | File Analysis & Docs | ✅ Complete | Created AGENTS.md, CHANGELOG.md, benchmarks.md |
| 3 | Git Analysis | ✅ Complete | Identified 11 commits, branch divergence |
| 4 | Demo Mode Fix | ✅ Complete | 5 critical fixes + push to origin |
| 5 | Prompt Documentation | ✅ In Progress | Adding all user prompts here |

---

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
