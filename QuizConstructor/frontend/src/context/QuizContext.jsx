import { createContext, useState, useEffect } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load shared quiz from URL hash if present
  useEffect(() => {
    try {
      const hash = window.location.hash || '';
      if (hash.startsWith('#quiz=')) {
        const payload = hash.replace('#quiz=', '');
        const json = decodeURIComponent(atob(payload));
        const quiz = JSON.parse(json);
        // Ensure ID exists
        if (quiz && quiz.id) {
          setQuizzes(prev => [...prev, quiz]);
        }
      }
    } catch (e) {
      console.error('Failed to load shared quiz', e);
    }
  }, []);

  const addQuiz = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const removeQuiz = (id) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    quizzes,
    setQuizzes,
    currentQuiz,
    setCurrentQuiz,
    loading,
    setLoading,
    error,
    setError,
    addQuiz,
    removeQuiz,
    clearError,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
