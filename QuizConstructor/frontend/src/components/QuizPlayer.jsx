import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizPlayer = ({ quiz, onClose }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (submitted) return;
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const allQuestionsAnswered = quiz.questions.every((_, index) => 
    userAnswers[index] !== undefined
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{quiz.subject}</h2>
            <p className="text-gray-600">{quiz.questions.length} questions</p>
          </div>
          {submitted && (
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
              <Award className="text-blue-600" />
              <span className="font-bold text-blue-800">
                Score: {score}/{quiz.questions.length} ({Math.round((score / quiz.questions.length) * 100)}%)
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Questions */}
        <div className="p-6 space-y-6">
          {quiz.questions.map((question, qIndex) => {
            const userAnswer = userAnswers[qIndex];
            const isCorrect = userAnswer === question.correctAnswer;
            const isAnswered = userAnswer !== undefined;

            return (
              <div 
                key={qIndex} 
                className={`border-2 rounded-lg p-5 ${
                  submitted
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isAnswered
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                    : 'border-gray-300'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  {submitted && (
                    isCorrect ? (
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                    ) : isAnswered ? (
                      <XCircle className="text-red-600 mt-1 flex-shrink-0" size={24} />
                    ) : null
                  )}
                  <h3 className="font-semibold text-lg text-gray-800">
                    {qIndex + 1}. {question.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2 ml-9">
                  {question.options.map((option, oIndex) => {
                    const isSelected = userAnswer === oIndex;
                    const isCorrectOption = question.correctAnswer === oIndex;
                    
                    let optionClass = 'p-3 rounded-lg border-2 cursor-pointer transition ';
                    
                    if (submitted) {
                      if (isCorrectOption) {
                        optionClass += 'border-green-500 bg-green-100 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionClass += 'border-red-500 bg-red-100';
                      } else {
                        optionClass += 'border-gray-300 bg-gray-50';
                      }
                    } else {
                      if (isSelected) {
                        optionClass += 'border-blue-500 bg-blue-100';
                      } else {
                        optionClass += 'border-gray-300 hover:border-blue-400 hover:bg-blue-50';
                      }
                    }

                    return (
                      <div
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        className={optionClass}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-700">
                            {String.fromCharCode(65 + oIndex)}.
                          </span>
                          <span className="flex-1">{option}</span>
                          {submitted && isCorrectOption && (
                            <CheckCircle className="text-green-600" size={20} />
                          )}
                          {submitted && isSelected && !isCorrect && (
                            <XCircle className="text-red-600" size={20} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation (shown after submission) */}
                {submitted && question.explanation && (
                  <div className="mt-4 ml-9 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-1">💡 Explication:</p>
                    <p className="text-sm text-blue-700">{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {submitted ? (
              <span>Quiz terminé! {score}/{quiz.questions.length} bonnes réponses</span>
            ) : (
              <span>
                {Object.keys(userAnswers).length}/{quiz.questions.length} questions répondues
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {submitted ? (
              <>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  <RotateCcw size={20} />
                  Recommencer
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Fermer
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className={`px-6 py-2 rounded-lg transition ${
                    allQuestionsAnswered
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Valider les réponses
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
