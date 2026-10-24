import { useContext } from 'react';
import { LanguageContext } from '../components/ClinicProvider';
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('ClinicProvider is missing.');
  return context;
}
