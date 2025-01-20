import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleChangeLanguage = (lang: string) => {
    router.push(router.asPath, undefined, { locale: lang });
  };

  return (
    <div className="absolute top-4 right-4">
      <select
        value={i18n.language}
        onChange={(e) => handleChangeLanguage(e.target.value)}
        className="bg-white border rounded p-2"
      >
        <option value="en">English</option>
        <option value="ur">Urdu</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
