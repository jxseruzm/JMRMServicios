import { useState, useEffect, useRef, useCallback } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('inicio');
  const rafIdRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    // Lista de secciones en orden de aparición
    const sectionIds = [
      'inicio',
      'titulo-sobre-mi',
      'titulo-servicios',
      'titulo-habilidades',
      'titulo-proyectos',
      'titulo-experiencia',
      'titulo-contacto'
    ];

    // Obtener la posición actual del scroll
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Si estamos en el top de la página (primeros 100px), mostrar inicio
    if (scrollPosition < 100) {
      setActiveSection('inicio');
      return;
    }

    // Buscar qué sección está más visible
    let currentSection = 'inicio';
    let minDistance = Infinity;

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      // Posición del elemento respecto al top de la ventana
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Punto de referencia: justo debajo del header (100px desde el top)
      const referencePoint = 100;

      // Verificar si el elemento está visible en la pantalla
      const isVisible = elementTop < windowHeight && elementBottom > 0;
      
      if (isVisible) {
        // Calcular la distancia del elemento al punto de referencia
        const distance = Math.abs(elementTop - referencePoint);
        
        // Si este elemento está más cerca del punto de referencia, lo marcamos como activo
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = id;
        }
      }
    });

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    // Ejecutar inmediatamente para establecer el estado inicial
    handleScroll();

    // Listener con throttling para mejor performance
    const throttledScroll = () => {
      if (rafIdRef.current !== null) return;
      
      rafIdRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return activeSection;
}
