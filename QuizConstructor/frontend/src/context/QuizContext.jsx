import { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
