import { useQuiz } from '../hooks/useQuiz';
import { Trash2 } from 'lucide-react';

export const QuizList = () => {
  const { quizzes, removeQuiz } = useQuiz();

  if (quizzes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <p className="text-gray-600">No quizzes yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Quizzes</h2>
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{quiz.subject}</h3>
                <p className="text-gray-600">{quiz.num_questions} questions</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(quiz.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => removeQuiz(quiz.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
