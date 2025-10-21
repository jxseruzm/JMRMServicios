import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useNavigation } from '../hooks/useNavigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, navigateToSection } = useNavigation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#inicio', label: 'Inicio', id: 'inicio' },
    { href: '#titulo-sobre-mi', label: 'Sobre Mí', id: 'titulo-sobre-mi' },
    {/* href: '#titulo-servicios', label: 'Servicios', id: 'titulo-servicios' */},
    { href: '#titulo-habilidades', label: 'Habilidades', id: 'titulo-habilidades' },
    {/* href: '#titulo-proyectos', label: 'Proyectos', id: 'titulo-proyectos' */},
    { href: '#titulo-experiencia', label: 'Experiencia', id: 'titulo-experiencia' },
    { href: '#titulo-contacto', label: 'Contacto', id: 'titulo-contacto' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          
          {/* Logo - Pendiente (posicionado absolutamente a la izquierda) */}
          <div className="absolute left-0 flex items-center">
            {/* Logo se implementará más tarde */}
          </div>

          {/* Desktop Navigation - Centrada */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button 
                  key={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(link.id);
                  }}
                  className={`nav-link px-3 py-2 transition-colors duration-200 relative ${
                    isActive 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  style={{ fontWeight: isActive ? 600 : 500 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="absolute right-0 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-10 w-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - simplificado */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu */}
          <div className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg z-40 md:hidden
                       transform transition-all duration-200 ease-out">
            <nav className="px-4 py-6">
              <div className="space-y-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToSection(link.id);
                        closeMobileMenu();
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium relative ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50/70 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}