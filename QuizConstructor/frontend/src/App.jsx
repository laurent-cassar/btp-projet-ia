import { HomePage } from './pages/HomePage';
import { QuizProvider } from './context/QuizContext';
import './index.css';

export default function App() {
  return (
    <QuizProvider>
      <HomePage />
    </QuizProvider>
  );
}
