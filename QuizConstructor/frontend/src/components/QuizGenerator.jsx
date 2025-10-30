import { Plus, FileText, Globe } from 'lucide-react';
import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useLanguage } from '../hooks/useLanguage';
import { generateQuizFromSubject, generateQuizFromText, generateQuizFromFile, generateQuizFromWebSearch } from '../hooks/useApi';

const AVAILABLE_MODELS = [
  { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash (Lite)', description: 'Fast & reliable' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Balanced performance' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Alternative model' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Advanced model' },
];

export const QuizGenerator = () => {
  const [tab, setTab] = useState('subject');
  const [subject, setSubject] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash-lite');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sources, setSources] = useState([]);
  const { setLoading, setError, addQuiz } = useQuiz();
  const { t } = useLanguage();

  const handleGenerateFromSubject = async () => {
    if (!subject.trim()) {
      setError('Please enter a subject');
      return;
    }
    setLoading(true);
    try {
      const result = await generateQuizFromSubject(subject, numQuestions, selectedModel);
      console.log('Quiz generated:', result);
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
      const result = await generateQuizFromText(text, numQuestions, selectedModel);
      console.log('Quiz generated:', result);
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
      const result = await generateQuizFromFile(file, numQuestions, selectedModel);
      console.log('Quiz generated:', result);
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

  const handleGenerateFromWebSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }
    setLoading(true);
    setSources([]);
    try {
      const result = await generateQuizFromWebSearch(searchQuery, numQuestions);
      console.log('Quiz generated from web search:', result);
      const quiz = {
        id: Date.now(),
        subject: `Web: ${searchQuery}`,
        num_questions: numQuestions,
        questions: result.questions,
        sources: result.sources || [],
        created_at: new Date().toISOString()
      };
      addQuiz(quiz);
      setSources(result.sources || []);
      setSearchQuery('');
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to generate quiz from web search');
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
          <Plus className="inline mr-2" size={20} /> {t('subject')}
        </button>
        <button
          onClick={() => setTab('text')}
          className={`pb-2 px-4 font-semibold ${
            tab === 'text'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="inline mr-2" size={20} /> {t('text')}
        </button>
        <button
          onClick={() => setTab('file')}
          className={`pb-2 px-4 font-semibold ${
            tab === 'file'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="inline mr-2" size={20} /> {t('file')}
        </button>
        <button
          onClick={() => setTab('websearch')}
          className={`pb-2 px-4 font-semibold ${
            tab === 'websearch'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Globe className="inline mr-2" size={20} /> Web Search
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('numQuestions')}
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          AI Model
        </label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {AVAILABLE_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} - {model.description}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          If one model is overloaded, try switching to another
        </p>
      </div>

      {tab === 'subject' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('subject')}
          </label>
          <input
            type="text"
            placeholder={t('enterSubject')}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          <button
            onClick={handleGenerateFromSubject}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {t('generateButton')}
          </button>
        </div>
      )}

      {tab === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('text')}
          </label>
          <textarea
            placeholder={t('enterText')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />
          <button
            onClick={handleGenerateFromText}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {t('generateButton')}
          </button>
        </div>
      )}

      {tab === 'file' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('uploadFile')}
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
            {t('generateButton')}
          </button>
        </div>
      )}

      {tab === 'websearch' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Query
          </label>
          <input
            type="text"
            placeholder="e.g., Artificial Intelligence, Climate Change, World War II..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          />
          <p className="text-xs text-gray-500 mb-4">
            🌐 Powered by Perplexity.ai - Searches the web for accurate, up-to-date information
          </p>
          <button
            onClick={handleGenerateFromWebSearch}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            🔍 Search & Generate Quiz
          </button>
          {sources.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">📚 Sources Used:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {sources.slice(0, 5).map((source, idx) => (
                  <li key={idx} className="truncate">
                    <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
