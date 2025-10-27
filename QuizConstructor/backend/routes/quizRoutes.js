import express from 'express';
import multer from 'multer';
import * as quizController from '../controllers/quizController.js';
import * as aiController from '../controllers/aiController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Quiz CRUD routes
router.post('/', quizController.createQuiz);
router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getQuizById);
router.delete('/:id', quizController.deleteQuiz);

// AI generation routes
router.post('/generate/subject', async (req, res, next) => {
  try {
    const { subject, numQuestions } = req.body;
    const questions = await aiController.generateQuestionsFromSubject(subject, numQuestions);
    res.json({ questions });
  } catch (error) {
    next(error);
  }
});

router.post('/generate/text', async (req, res, next) => {
  try {
    const { text, numQuestions } = req.body;
    const questions = await aiController.generateQuestionsFromText(text, numQuestions);
    res.json({ questions });
  } catch (error) {
    next(error);
  }
});

router.post('/generate/file', upload.single('file'), async (req, res, next) => {
  try {
    const { numQuestions } = req.body;
    // File processing logic will be implemented
    res.json({ message: 'File processing endpoint' });
  } catch (error) {
    next(error);
  }
});

export default router;
