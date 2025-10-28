import { useQuiz } from '../hooks/useQuiz';
import { AlertCircle } from 'lucide-react';

export const ErrorAlert = () => {
  const { error, clearError } = useQuiz();

  if (!error) return null;

  // Parse error to extract code, message, and status if available
  const parseError = (errorMsg) => {
    try {
      // Try to extract JSON error from string
      const jsonMatch = errorMsg.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const errorObj = JSON.parse(jsonMatch[0]);
        if (errorObj.error) {
          return {
            code: errorObj.error.code || 'N/A',
            message: errorObj.error.message || errorObj.message || errorMsg,
            status: errorObj.error.status || 'Unknown'
          };
        }
      }
    } catch (e) {
      // Not JSON, return as plain message
    }
    
    return {
      code: 'Error',
      message: errorMsg,
      status: 'Unknown'
    };
  };

  const { code, message, status } = parseError(error);
  const formattedError = `${code} | ${message} | ${status}`;

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm font-mono break-words">{formattedError}</p>
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
