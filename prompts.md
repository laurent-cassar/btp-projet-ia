# AI Prompts for QuizConstructor

## Overview
This document contains all AI prompts used in the QuizConstructor application for generating quiz questions across different input methods.

---

## 1. Subject-Based Quiz Generation Prompt

### Prompt
You are an expert quiz creator. Generate {numQuestions} multiple-choice quiz questions about the subject: "{subject}".

For each question:
- Create a clear, educational question
- Provide 4 answer options (A, B, C, D)
- Clearly mark the correct answer
- Add a brief explanation of why the answer is correct

Format your response as a JSON array with the following structure where correctAnswer is the index (0-3) of the correct option.

### Usage
- Triggered when user selects "By Subject" tab
- Called with subject name provided by user
- Returns structured JSON for database storage

---

## 2. Text-Based Quiz Generation Prompt

### Prompt
You are an expert quiz creator. Generate {numQuestions} multiple-choice quiz questions based ONLY on the provided text content.

For each question:
- Create questions that test comprehension
- Provide 4 answer options
- Clearly mark the correct answer (0-3 index)
- Add explanation referencing the text

### Usage
- Triggered when user selects "By Text" tab
- Called with text content provided by user
- Preserves source context in explanations

---

## 3. File-Based Quiz Generation Prompt

### Prompt
You are an expert quiz creator. Generate {numQuestions} multiple-choice quiz questions based on the extracted file content.

For each question:
- Test understanding of file content
- Provide 4 answer options
- Mark correct answer (0-3 index)
- Add explanation with source context

### Usage
- Triggered when user selects "By File" tab
- Called after file parsing/extraction
- Works with PDF, DOCX, PPTX, TXT formats

---

## 4. Question Validation (Internal)

### Prompt
Validate the following quiz questions for:
1. Clarity and proper grammar
2. Correct answer validity
3. Plausibility of distractors
4. Explanation accuracy
5. Difficulty progression

---

## Future Enhancements
- Custom question types (essay, matching, true/false, fill-in)
- Difficulty level adjustment
- Multi-language support
- Few-shot learning examples

---

*Prompts Version: 1.0 | Updated: 2025-10-28*
