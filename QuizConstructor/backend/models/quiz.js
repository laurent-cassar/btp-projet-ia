import pool from '../config/database.js';

export const createQuiz = async (subject, numQuestions, questions) => {
  const query = `
    INSERT INTO quizzes (subject, num_questions, questions, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *
  `;
  const result = await pool.query(query, [subject, numQuestions, JSON.stringify(questions)]);
  return result.rows[0];
};

export const getQuizzes = async () => {
  const query = 'SELECT * FROM quizzes ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows;
};

export const getQuizById = async (id) => {
  const query = 'SELECT * FROM quizzes WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const deleteQuiz = async (id) => {
  const query = 'DELETE FROM quizzes WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
