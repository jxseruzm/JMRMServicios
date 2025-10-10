import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.error(`Element with id "${sectionId}" not found`);
      return;
    }
    
    // Para la sección inicio, usar scroll al top
    if (sectionId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // Para todos los títulos, usar scrollIntoView
    // Ahora que cada título tiene su propio ID, va directamente al título
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    
  }, []);

  return { scrollToSection };
};