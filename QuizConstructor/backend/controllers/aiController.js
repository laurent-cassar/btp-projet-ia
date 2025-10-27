import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateQuestionsFromSubject = async (subject, numQuestions) => {
  const prompt = `Generate ${numQuestions} multiple choice quiz questions about "${subject}". 
  For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
  Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (A, B, C, or D).`;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

export const generateQuestionsFromText = async (text, numQuestions) => {
  const prompt = `Based on the following text, generate ${numQuestions} multiple choice quiz questions.
  Text: "${text}"
  
  For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
  Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (A, B, C, or D).`;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error generating questions from text:', error);
    throw error;
  }
};
