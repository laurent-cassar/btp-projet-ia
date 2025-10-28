import { createContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    title: 'QuizConstructor',
    subtitle: 'Generate unlimited quizzes from any subject, text, or file',
    howItWorks: 'How it works',
    chooseSubject: '✓ Choose a subject or upload content',
    setQuestions: '✓ Set the number of questions',
    aiGenerates: '✓ AI generates instant quizzes',
    saveManage: '✓ Save and manage your quizzes',
    exportShare: '✓ Export and share results',
    generateButton: 'Generate Quiz',
    subject: 'Subject',
    text: 'Text',
    file: 'File',
    enterSubject: 'Enter a subject (e.g., History, Biology)',
    enterText: 'Paste your text here',
    uploadFile: 'Upload a file (PDF, DOCX, PPTX, TXT)',
    numQuestions: 'Number of questions',
    yourQuizzes: 'Your Quizzes',
    noQuizzes: 'No quizzes yet. Create one to get started!',
    createdDate: 'Created',
    languageToggle: 'FR',
  },
  fr: {
    title: 'QuizConstructor',
    subtitle: 'Générez des quiz illimités à partir de n\'importe quel sujet, texte ou fichier',
    howItWorks: 'Comment ça marche',
    chooseSubject: '✓ Choisissez un sujet ou téléchargez du contenu',
    setQuestions: '✓ Définissez le nombre de questions',
    aiGenerates: '✓ L\'IA génère des quiz instantanément',
    saveManage: '✓ Enregistrez et gérez vos quiz',
    exportShare: '✓ Exportez et partagez les résultats',
    generateButton: 'Générer un quiz',
    subject: 'Sujet',
    text: 'Texte',
    file: 'Fichier',
    enterSubject: 'Entrez un sujet (ex : Histoire, Biologie)',
    enterText: 'Collez votre texte ici',
    uploadFile: 'Téléchargez un fichier (PDF, DOCX, PPTX, TXT)',
    numQuestions: 'Nombre de questions',
    yourQuizzes: 'Vos quiz',
    noQuizzes: 'Aucun quiz pour le moment. Créez-en un pour commencer!',
    createdDate: 'Créé',
    languageToggle: 'EN',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
