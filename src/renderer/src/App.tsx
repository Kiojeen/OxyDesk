import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className="dark h-screen w-screen bg-gray-900 text-gray-100 flex items-center justify-center"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} // Switch direction for Arabic
    >
      <div className="max-w-md w-full p-8 rounded-2xl bg-gray-800 shadow-lg text-center border border-gray-700 animate-fade-in">
        
        {/* Language Switch Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {t('languageToggle')}
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">{t('title')}</h1>
        <p className="text-gray-400 mb-8">
          {t('description')}
        </p>

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl text-lg font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-300"
          onClick={() => alert(t('alert'))}
        >
          {t('getStarted')}
        </button>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          {t('footer')}
        </div>
      </div>
    </div>
  );
}
