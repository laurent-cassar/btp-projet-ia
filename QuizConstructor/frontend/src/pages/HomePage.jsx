import { QuizGenerator } from '../components/QuizGenerator';
import { QuizList } from '../components/QuizList';
import { ErrorAlert } from '../components/ErrorAlert';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

export const HomePage = () => {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-gray-50 transition text-gray-700 font-medium"
            title="Toggle language"
          >
            <Globe size={18} />
            {t('languageToggle')}
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/favicon.png" alt="Quiz Constructor" className="w-12 h-12" />
            <h1 className="text-5xl font-bold text-gray-800">
              {t('title')}
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <ErrorAlert />

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <QuizGenerator />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('howItWorks')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{t('chooseSubject')}</li>
              <li>{t('setQuestions')}</li>
              <li>{t('aiGenerates')}</li>
              <li>{t('saveManage')}</li>
              <li>{t('exportShare')}</li>
            </ul>
          </div>
        </div>

        <QuizList />
      </div>
    </div>
  );
};
