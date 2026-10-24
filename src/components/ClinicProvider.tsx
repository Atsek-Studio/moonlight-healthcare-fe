import type { ClinicDialog, ChildrenProps } from '../types';
import { createContext, useState, useEffect, useCallback } from 'react';
export const LanguageContext = createContext<{language:string;toggleLanguage:()=>void} | null>(null);
export const DialogContext = createContext<{dialog:ClinicDialog|null;openDialog:(dialog:ClinicDialog)=>void;closeDialog:()=>void} | null>(null);
export function ClinicProvider({
  children
}: ChildrenProps) {
  const [language, setLanguage] = useState('vi');
  const [dialog, setDialog] = useState<ClinicDialog|null>(null);
  const toggleLanguage = useCallback(() => setLanguage(value => value === 'vi' ? 'en' : 'vi'), []);
  const closeDialog = useCallback(() => setDialog(null), []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return <LanguageContext.Provider value={{
    language,
    toggleLanguage
  }}>
    <DialogContext.Provider value={{
      dialog,
      openDialog: setDialog,
      closeDialog
    }}>{children}</DialogContext.Provider>
  </LanguageContext.Provider>;
}
