import { Suspense, lazy } from 'react';
import SEOHead from './components/SEOHead';
import { NavigationProvider } from './hooks/useNavigation';

// Componentes críticos - carga inmediata
import Header from './components/Header';
import HeroSection from './components/HeroSection';

// Componentes lazy-loaded para optimizar bundle size
const AboutSection = lazy(() => import('./components/AboutSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const SocialFloatingButtons = lazy(() => import('./components/SocialFloatingButtons'));
const FAQAssistant = lazy(() => import('./components/FAQAssistant'));

// Componente de loading optimizado
const SectionSkeleton = () => (
  <div className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FloatingButtonsSkeleton = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
  </div>
);



export default function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-background">
        {/* SEO Head */}
        <SEOHead />
        
        {/* Skip Link para accesibilidad */}
        <a 
          href="#inicio" 
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-[100]"
        >
          Ir al contenido principal
        </a>

        {/* Header - Solo componente crítico */}
        <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section - Carga inmediata */}
        <HeroSection />

        {/* About Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        {/* Services Section - Lazy loaded 
        <Suspense fallback={<SectionSkeleton />}>
          <ServicesSection />
        </Suspense>*/}

        {/* Skills Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <SkillsSection />
        </Suspense>

        {/* Projects Section - Lazy loaded 
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>*/}

        {/* Experience Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceSection />
        </Suspense>

        {/* Contact Section - Lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer - Lazy loaded */}
      <Suspense fallback={<div className="h-20 bg-muted animate-pulse"></div>}>
        <Footer />
      </Suspense>

      {/* Social Floating Buttons - Lazy loaded */}
      <Suspense fallback={<FloatingButtonsSkeleton />}>
        <SocialFloatingButtons />
      </Suspense>

      {/* FAQ Assistant - Lazy loaded */}
      <Suspense fallback={<div className="fixed bottom-6 left-6 w-12 h-12 bg-muted rounded-full animate-pulse"></div>}>
        <FAQAssistant />
      </Suspense>
      </div>
    </NavigationProvider>
  );
}