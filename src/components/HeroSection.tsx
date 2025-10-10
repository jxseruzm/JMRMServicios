import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Linkedin, Mail, Coffee, Code2, Database, Sparkles, ChevronRight, MapPin, Calendar, Zap, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { useNavigation } from '../hooks/useNavigation';
import { useEffect, useState } from 'react';
import JMRMLogo from './JMRMLogo';

export default function HeroSection() {
  const { navigateToSection } = useNavigation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Estado para la animación de texto dinámico
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const roles = [
    'Data Engineer 🚀',
    'Data Engineer ⚡',
    'Data Engineer ☁️',
    'Data Engineer 🛠️'
  ];
  
  const personalityFacts = [
    { icon: <Zap className="h-4 w-4" />, text: "Automatización completa" },
    { icon: <Database className="h-4 w-4" />, text: "Revaloriza tus datos" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Ahorro garantizado" },
    { icon: <Sparkles className="h-4 w-4" />, text: "Soluciones innovadoras" }
  ];

  // Cambiar roles cada 3 segundos - optimizado
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // Partículas flotantes optimizadas
  const particles = Array.from({ length: 4 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
      animate={{
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6 + i * 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.8,
      }}
      style={{
        left: `${15 + i * 20}%`,
        top: `${25 + i * 15}%`,
        willChange: 'transform',
      }}
    />
  ));

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background con parallax optimizado */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y,
          willChange: 'transform'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format&q=75"
          alt="José Ruz Data Engineer workspace"
          className="w-full h-full object-cover opacity-5"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </motion.div>

      {/* Partículas animadas */}
      <div className="absolute inset-0 z-1">
        {particles}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenido de texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Información de ubicación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Barcelona, España</span>
                <Badge variant="secondary" className="ml-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Disponible para proyectos
                </Badge>
              </div>
            </motion.div>

            {/* Título principal con animación de tipeo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="leading-relaxed">
                <span className="hero-name text-foreground text-3xl md:text-4xl lg:text-5xl block">Jose Ruz</span>
                <motion.span 
                  className="hero-subtitle-bold inline-block text-3xl md:text-4xl lg:text-5xl"
                  animate={{ 
                    opacity: isTyping ? 1 : 0.7,
                    scale: isTyping ? 1 : 0.98 
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontVariantEmoji: 'normal',
                    lineHeight: '1.4'
                  }}
                >
                  {roles[currentRole]}
                </motion.span>
              </h1>
              
              <p className="hero-description text-lg md:text-xl max-w-lg leading-relaxed">
                Mejoro tu empresa convirtiendo tus datos en <strong>oro</strong> y creando <em>sistemas inteligentes</em> que trabajan <strong>24/7</strong> para <em>multiplicar</em> tus <em>ingresos</em> y <strong>eliminar</strong> tareas repetitivas.
              </p>
            </motion.div>

            {/* Facts personales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {personalityFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -3, 0] // Animación de flotación sutil
                  }}
                  transition={{ 
                    opacity: { delay: 0.8 + index * 0.1, duration: 0.4 },
                    scale: { delay: 0.8 + index * 0.1, duration: 0.4 },
                    y: { 
                      duration: 3 + index * 0.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-card/80 to-card/40 border border-border/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-blue-600">
                    {fact.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    {fact.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="hero-cta-button group"
                onClick={() => navigateToSection('titulo-servicios')}
              >
                Ver Servicios
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 hover:bg-muted/50 transition-all duration-300"
                onClick={() => navigateToSection('titulo-contacto')}
              >
                Contactar
              </Button>
            </motion.div>

            {/* Social links con estilo personal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="text-sm text-muted-foreground">Conecta conmigo:</span>
              <div className="flex gap-3">

                <motion.a 
                  href="https://www.linkedin.com/in/joseruz/" 
                  className="p-2 rounded-full bg-card/50 border border-border/50 text-muted-foreground hover:text-blue-600 hover:bg-card transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  href="mailto:contact@jmrmservices.es" 
                  className="p-2 rounded-full bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Imagen personal y métricas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Imagen principal */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-[440px] h-[440px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-20 blur-2xl transform rotate-6"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border/20 bg-card/30 backdrop-blur-sm">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <JMRMLogo size="xl" className="drop-shadow-2xl" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Badges flotantes con métricas - Más cerca de la imagen circular */}
              <motion.div
                className="absolute -top-2 -right-2 bg-card border border-border/50 rounded-xl p-3 shadow-lg backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-center">
                  <div className="text-2xl">+3</div>
                  <div className="text-xs text-muted-foreground">Años exp.</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 bg-card border border-border/50 rounded-xl p-3 shadow-lg backdrop-blur-sm"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="text-center">
                  <div className="text-2xl">+7</div>
                  <div className="text-xs text-muted-foreground">Proyectos</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-3 shadow-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <div className="text-xs">+1000h</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator mejorado - Oculto en móvil */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-muted-foreground">Descubre más</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-full blur-xl"></div>
    </section>
  );
}