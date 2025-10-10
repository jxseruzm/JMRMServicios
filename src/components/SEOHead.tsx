import { useEffect } from 'react';
import jmrmLogo from '../assets/JMRMLogo.png';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  noindex = false
}: SEOHeadProps) {
  const defaultTitle = "José Ruz - Data Engineer | Especialista en Automatización y Data";
  const defaultDescription = "Ingeniero de Datos experimentado especializado en soluciones de big data, pipelines ETL y analytics. Experto en Python, Spark, AWS y arquitecturas de datos modernas.";
  const defaultKeywords = "ingeniero de datos, big data, ETL, analytics, python, spark, aws, arquitectura de datos, machine learning, ciencia de datos";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonical = canonical || "https://joseruz-portfolio.com/";
  const finalOgImage = ogImage || "https://joseruz-portfolio.com/og-image.jpg";

  useEffect(() => {
    // Solo operaciones esenciales para mejor rendimiento
    document.title = finalTitle;
    document.documentElement.setAttribute('lang', 'es');

    // Establecer el favicon usando la imagen JMRM directamente
    const setFavicon = () => {
      // Remover cualquier favicon existente
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(favicon => favicon.remove());
      
      // Crear nuevo favicon con la imagen JMRM
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = jmrmLogo;
      document.head.appendChild(favicon);
      
      // También crear favicon para diferentes tamaños
      const favicon32 = document.createElement('link');
      favicon32.rel = 'icon';
      favicon32.type = 'image/png';
      favicon32.sizes = '32x32';
      favicon32.href = jmrmLogo;
      document.head.appendChild(favicon32);
      
      const favicon16 = document.createElement('link');
      favicon16.rel = 'icon';
      favicon16.type = 'image/png';
      favicon16.sizes = '16x16';
      favicon16.href = jmrmLogo;
      document.head.appendChild(favicon16);
      
      // Apple touch icon
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.sizes = '180x180';
      appleTouchIcon.href = jmrmLogo;
      document.head.appendChild(appleTouchIcon);
    };
    
    // Establecer favicon inmediatamente
    setFavicon();

    // Preload critical resources
    const preloadFont = document.createElement('link');
    preloadFont.rel = 'preload';
    preloadFont.as = 'style';
    preloadFont.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap';
    preloadFont.crossOrigin = 'anonymous';
    
    if (!document.querySelector(`link[href="${preloadFont.href}"]`)) {
      document.head.appendChild(preloadFont);
    }

    // Generar favicon dinámicamente desde la imagen JMRM
    const generateFavicon = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 32;
      canvas.height = 32;
      
      img.onload = () => {
        ctx.clearRect(0, 0, 32, 32);
        // Dibujar la imagen del logo JMRM escalada a 32x32
        ctx.drawImage(img, 0, 0, 32, 32);
        
        // Actualizar el favicon dinámicamente
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.type = 'image/png';
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = canvas.toDataURL('image/png');
      };
      
      img.crossOrigin = 'anonymous';
      img.src = jmrmLogo;
    };

    // Batch DOM updates using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Generate favicon first
      generateFavicon();

      // Update essential meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', finalDescription);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', finalKeywords);
      }

      // Update robots meta tag
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    });
  }, [finalTitle, finalDescription, finalKeywords, noindex]);

  return null; // This component doesn't render anything
}

// Hook to dynamically update SEO for different sections
export function useSEO() {
  const updateSEOForSection = (sectionId: string) => {
    // Simplificado para mejor rendimiento - solo título
    const sectionTitles = {
      'inicio': 'José Ruz - Data Engineer | Especialista en Automatización y Data',
      'sobre-mi': 'Sobre Mí - José Ruz | Data Engineer',
      'servicios': 'Servicios de Ingeniería de Datos | José Ruz',
      'habilidades': 'Habilidades Técnicas | José Ruz Data Engineer',
      'proyectos': 'Proyectos de Automatización y Data | José Ruz Portfolio',
      'experiencia': 'Experiencia Profesional | José Ruz',
      'contacto': 'Contacto - José Ruz Data Engineer'
    };

    const title = sectionTitles[sectionId];
    if (title) {
      document.title = title;
    }
  };

  return { updateSEOForSection };
}