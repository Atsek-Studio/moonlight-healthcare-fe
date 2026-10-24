import { useContext } from 'react';
import { LanguageContext } from '../components/ClinicProvider';
export function useLanguage() {
  return useContext(LanguageContext);
}
