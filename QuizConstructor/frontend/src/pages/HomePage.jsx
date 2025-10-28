import { QuizGenerator } from '../components/QuizGenerator';
import { QuizList } from '../components/QuizList';
import { ErrorAlert } from '../components/ErrorAlert';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/favicon.png" alt="Quiz Constructor" className="w-12 h-12" />
            <h1 className="text-5xl font-bold text-gray-800">
              QuizConstructor
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Generate unlimited quizzes from any subject, text, or file
          </p>
        </div>

        <ErrorAlert />

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <QuizGenerator />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4">How it works</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Choose a subject or upload content</li>
              <li>✓ Set the number of questions</li>
              <li>✓ AI generates instant quizzes</li>
              <li>✓ Save and manage your quizzes</li>
              <li>✓ Export and share results</li>
            </ul>
          </div>
        </div>

        <QuizList />
      </div>
    </div>
  );
};
