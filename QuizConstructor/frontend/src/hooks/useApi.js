import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const generateQuizFromSubject = async (subject, numQuestions) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes/generate/subject`, {
      subject,
      numQuestions,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const generateQuizFromText = async (text, numQuestions) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes/generate/text`, {
      text,
      numQuestions,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const generateQuizFromFile = async (file, numQuestions) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('numQuestions', numQuestions);

    const response = await axios.post(`${API_BASE_URL}/quizzes/generate/file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const saveQuiz = async (subject, numQuestions, questions) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes`, {
      subject,
      numQuestions,
      questions,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quizzes`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
