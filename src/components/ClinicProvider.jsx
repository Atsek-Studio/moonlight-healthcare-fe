import { createContext, useState, useEffect, useCallback } from 'react';
export const LanguageContext = createContext(null);
export const DialogContext = createContext(null);
export function ClinicProvider({
  children
}) {
  const [language, setLanguage] = useState('vi');
  const [dialog, setDialog] = useState(null);
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
