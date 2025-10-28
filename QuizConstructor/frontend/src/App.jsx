import { HomePage } from './pages/HomePage';
import { QuizProvider } from './context/QuizContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

export default function App() {
  return (
    <LanguageProvider>
      <QuizProvider>
        <HomePage />
      </QuizProvider>
    </LanguageProvider>
  );
}
