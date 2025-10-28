# Project Agents and Configuration

## Overview
This document outlines the AI agents and configurations used in the btp-projet-ia project.

## QuizConstructor Agents

### 1. Backend AI Agent
- **Role**: AI-powered question generation
- **Technology**: OpenAI GPT API
- **Function**: Generates quiz questions from various sources
  - Subject-based generation
  - Text-based generation
  - File-based generation (PDF, DOCX, PPTX, TXT)
- **Location**: QuizConstructor/backend/controllers/aiController.js

### 2. Frontend UI Agent
- **Role**: User interaction and quiz management interface
- **Technology**: React 18 + Vite + Tailwind CSS
- **Function**: 
  - Collects user input
  - Displays generated quizzes
  - Manages quiz operations
- **Location**: QuizConstructor/frontend/src/components

### 3. Database Agent
- **Role**: Data persistence and retrieval
- **Technology**: PostgreSQL
- **Function**:
  - Stores quizzes
  - Manages quiz attempts (future)
  - Maintains data integrity
- **Location**: QuizConstructor/backend/config/database.js

## Configuration

### Environment Variables
- Backend: .env file in /QuizConstructor/backend
- Frontend: .env file in /QuizConstructor/frontend

### API Configuration
- Base URL: http://localhost:5000/api
- CORS: Enabled for cross-origin requests
- Content-Type: application/json

## Future Enhancements
- [ ] User authentication agent
- [ ] Analytics agent for quiz performance tracking
- [ ] Notification agent for quiz sharing
- [ ] Recommendation agent for personalized quiz suggestions
