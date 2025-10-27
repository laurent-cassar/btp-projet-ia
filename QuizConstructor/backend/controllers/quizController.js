import * as quizModel from '../models/quiz.js';

export const createQuiz = async (req, res, next) => {
  try {
    const { subject, numQuestions, questions } = req.body;
    const quiz = await quizModel.createQuiz(subject, numQuestions, questions);
    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await quizModel.getQuizzes();
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

export const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await quizModel.getQuizById(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await quizModel.deleteQuiz(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    next(error);
  }
};
