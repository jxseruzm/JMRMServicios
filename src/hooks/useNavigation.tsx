import { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react';

interface NavigationContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  navigateToSection: (sectionId: string) => void;
  isNavigating: boolean;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const navigateToSection = useCallback((sectionId: string) => {
    // Establecer inmediatamente la sección como activa
    setActiveSection(sectionId);
    
    // Marcar que estamos navegando
    setIsNavigating(true);
    
    // Limpiar timeout anterior si existe
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    
    // Después de 1 segundo, volver a habilitar la detección automática
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
    
    // Hacer el scroll
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    if (sectionId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  // Detección automática de sección cuando NO estamos navegando
  useEffect(() => {
    const sectionIds = [
      'inicio',
      'titulo-sobre-mi',
      'titulo-servicios',
      'titulo-habilidades',
      'titulo-proyectos',
      'titulo-experiencia',
      'titulo-contacto'
    ];

    const handleScroll = () => {
      // Si estamos navegando, no hacer nada
      if (isNavigating) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition < 100) {
        setActiveSection('inicio');
        return;
      }

      let currentSection = 'inicio';
      let minDistance = Infinity;

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const referencePoint = 100;
        const isVisible = elementTop < windowHeight && elementBottom > 0;
        
        if (isVisible) {
          const distance = Math.abs(elementTop - referencePoint);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    const throttledScroll = () => {
      if (rafIdRef.current !== null) return;
      
      rafIdRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [isNavigating]);

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection, navigateToSection, isNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
