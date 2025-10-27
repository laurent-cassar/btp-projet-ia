import { useQuiz } from '../hooks/useQuiz';
import { AlertCircle } from 'lucide-react';

export const ErrorAlert = () => {
  const { error, clearError } = useQuiz();

  if (!error) return null;

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
        <button
          onClick={clearError}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
