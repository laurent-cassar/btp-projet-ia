import { useQuiz } from '../hooks/useQuiz';
import { useLanguage } from '../hooks/useLanguage';
import { Trash2, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useState } from 'react';
import { QuizPlayer } from './QuizPlayer';

export const QuizList = () => {
  const { quizzes, removeQuiz } = useQuiz();
  const { t } = useLanguage();
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [playingQuiz, setPlayingQuiz] = useState(null);

  if (quizzes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <p className="text-gray-600">{t('noQuizzes')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{t('yourQuizzes')}</h2>
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow p-6">
            {/* Quiz Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{quiz.subject}</h3>
                <p className="text-gray-600">{quiz.num_questions} questions</p>
                <p className="text-sm text-gray-500">
                  {t('createdDate')}: {new Date(quiz.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayingQuiz(quiz)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <Play size={20} />
                  Passer le quiz
                </button>
                <button
                  onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition"
                >
                  {expandedQuiz === quiz.id ? (
                    <ChevronUp size={20} className="text-blue-500" />
                  ) : (
                    <ChevronDown size={20} className="text-blue-500" />
                  )}
                </button>
                <button
                  onClick={() => removeQuiz(quiz.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition"
                >
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
            </div>

            {/* Quiz Questions */}
            {expandedQuiz === quiz.id && (
              <div className="border-t pt-4 space-y-6">
                {quiz.questions && quiz.questions.length > 0 ? (
                  quiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        {qIndex + 1}. {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options && question.options.length > 0 ? (
                          question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-2 rounded border-2 cursor-pointer transition ${
                                question.correctAnswer === oIndex
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <span className="font-semibold text-gray-700">
                                {String.fromCharCode(65 + oIndex)}.
                              </span>{' '}
                              {option}
                              {question.correctAnswer === oIndex && (
                                <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No options available</p>
                        )}
                      </div>
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm text-blue-700">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No questions available</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quiz Player Modal */}
      {playingQuiz && (
        <QuizPlayer 
          quiz={playingQuiz} 
          onClose={() => setPlayingQuiz(null)} 
        />
      )}
    </div>
  );
};
