import { Plus, FileText } from 'lucide-react';
import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { generateQuizFromSubject, generateQuizFromText, generateQuizFromFile } from '../hooks/useApi';

export const QuizGenerator = () => {
  const [tab, setTab] = useState('subject');
  const [subject, setSubject] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const { setLoading, setError, addQuiz } = useQuiz();

  const handleGenerateFromSubject = async () => {
    if (!subject.trim()) {
      setError('Please enter a subject');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuizFromSubject(subject, numQuestions);
      console.log('Quiz generated:', result);
      // Add the generated quiz to the context
      const quiz = {
        id: Date.now(),
        subject,
        num_questions: numQuestions,
        questions: result.questions,
        created_at: new Date().toISOString()
      };
      addQuiz(quiz);
      setSubject('');
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromText = async () => {
    if (!text.trim()) {
      setError('Please enter text');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuizFromText(text, numQuestions);
      console.log('Quiz generated:', result);
      // Add the generated quiz to the context
      const quiz = {
        id: Date.now(),
        subject: 'Text Content',
        num_questions: numQuestions,
        questions: result.questions,
        created_at: new Date().toISOString()
      };
      addQuiz(quiz);
      setText('');
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromFile = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuizFromFile(file, numQuestions);
      console.log('Quiz generated:', result);
      // Add the generated quiz to the context
      const quiz = {
        id: Date.now(),
        subject: file.name,
        num_questions: numQuestions,
        questions: result.questions,
        created_at: new Date().toISOString()
      };
      addQuiz(quiz);
      setFile(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Quiz</h2>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setTab('subject')}
          className={`pb-2 px-4 font-semibold ${
            tab === 'subject'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Plus className="inline mr-2" size={20} /> By Subject
        </button>
        <button
          onClick={() => setTab('text')}
          className={`pb-2 px-4 font-semibold ${
            tab === 'text'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="inline mr-2" size={20} /> By Text
        </button>
        <button
          onClick={() => setTab('file')}
          className={`pb-2 px-4 font-semibold ${
            tab === 'file'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="inline mr-2" size={20} /> By File
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Questions
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {tab === 'subject' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter a subject (e.g., History, Biology, Python Programming)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          <button
            onClick={handleGenerateFromSubject}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Generate Quiz
          </button>
        </div>
      )}

      {tab === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Content
          </label>
          <textarea
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          <button
            onClick={handleGenerateFromText}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Generate Quiz
          </button>
        </div>
      )}

      {tab === 'file' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File (PDF, Word, Text, PowerPoint)
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.txt,.pptx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          {file && <p className="text-sm text-gray-600 mb-4">Selected: {file.name}</p>}
          <button
            onClick={handleGenerateFromFile}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Generate Quiz
          </button>
        </div>
      )}
    </div>
  );
};
