import { useState, useEffect } from 'react';
export function useNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return {
    menuOpen,
    toggleMenu: () => setMenuOpen(value => !value),
    closeMenu: () => setMenuOpen(false)
  };
}
