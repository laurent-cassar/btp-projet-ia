import Joi from 'joi';

export const createQuizSchema = Joi.object({
  subject: Joi.string().required().min(1).max(255),
  numQuestions: Joi.number().required().integer().min(1).max(100),
});

export const fileQuizSchema = Joi.object({
  numQuestions: Joi.number().required().integer().min(1).max(100),
  fileType: Joi.string().required().valid('pdf', 'text', 'docx', 'pptx'),
});
