import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, TrendingUp, Database, Zap, ChevronDown, ChevronUp, Heart, X, Users, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
// Using standard img tag instead of Figma component
import { useNavigation } from '../hooks/useNavigation';

export default function ProjectsSection() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProjectDemo, setSelectedProjectDemo] = useState(null);
  const { navigateToSection } = useNavigation();
  const projects = [
    {
      title: "Predicción de Ventas",
      description: "Sistema de machine learning para pronóstico de ventas que analiza patrones históricos, estacionalidad y factores externos para predecir demanda futura con 95% de precisión, optimizando inventario y planificación comercial.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTkyNjk0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib", "SQL Server"],
      metrics: [
        { icon: TrendingUp, label: "95%", value: "Precisión del modelo" },
        { icon: Database, label: "25%", value: "Reducción inventario" }
      ],
      category: "Machine Learning",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      demoDescription: "Demostración del modelo de predicción de ventas mostrando análisis de tendencias, forecasting automatizado y dashboard ejecutivo con insights de negocio."
    },
    {
      title: "Chat Bot de WhatsApp",
      description: "Bot inteligente de WhatsApp Business API que automatiza atención al cliente, procesa consultas frecuentes, gestiona pedidos y deriva casos complejos a agentes humanos, mejorando la experiencia del cliente 24/7.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwd2hhdHNhcHAlMjBtZXNzYWdpbmd8ZW58MXx8fHwxNzU5MjY5NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "WhatsApp Business API", "Flask", "NLP", "DialogFlow", "PostgreSQL"],
      metrics: [
        { icon: Zap, label: "80%", value: "Consultas automatizadas" },
        { icon: TrendingUp, label: "40%", value: "Mejora satisfacción" }
      ],
      category: "Automatización",
      videoUrl: "https://www.youtube.com/embed/X7Z1HFMDVA8",
      demoDescription: "Demo del chatbot en acción: procesamiento de consultas, manejo de intenciones, integración con sistemas de pedidos y escalado inteligente a agentes humanos."
    },
    {
      title: "Web Scraping Precios Competencia Semanal",
      description: "Sistema automatizado de monitoreo competitivo que extrae y analiza precios de productos de la competencia semanalmente, generando reportes de inteligencia de mercado y alertas de cambios significativos.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBzY3JhcGluZyUyMGRhdGElMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5MjY5NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "Scrapy", "BeautifulSoup", "Selenium", "PostgreSQL", "Airflow"],
      metrics: [
        { icon: Database, label: "500+", value: "Productos monitoreados" },
        { icon: Zap, label: "100%", value: "Automatización semanal" }
      ],
      category: "Web Scraping",
      videoUrl: "https://www.youtube.com/embed/ng2o98k983k",
      demoDescription: "Visualización del sistema de scraping: extracción automática de datos, limpieza y validación, análisis de tendencias de precios y generación de reportes ejecutivos."
    },
    {
      title: "Creación Automática de Contenido en RRSS",
      description: "Sistema automatizado de generación y publicación de contenido para redes sociales que utiliza IA para crear posts personalizados, programar publicaciones y analizar engagement, optimizando la presencia digital de marcas.",
      image: "https://images.unsplash.com/photo-1676276375742-9e3d10e39d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBhdXRvbWF0aW9uJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1OTYwNTcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "OpenAI API", "Facebook API", "Instagram API", "Twitter API", "MongoDB", "Celery", "Redis"],
      metrics: [
        { icon: Calendar, label: "90%", value: "Automatización posts" },
        { icon: Users, label: "3x", value: "Aumento engagement" }
      ],
      category: "IA & Automatización",
      videoUrl: "https://www.youtube.com/embed/kGn_wXm_UD8",
      demoDescription: "Demo del sistema de contenido automático: generación de posts con IA, programación inteligente, análisis de rendimiento y optimización automática de estrategias de contenido."
    },
    {
      title: "Sistema de Recordatorio de Pagos Mensual",
      description: "Plataforma automatizada que gestiona recordatorios de pagos recurrentes, envía notificaciones multicanal (email, SMS, WhatsApp), rastrea estados de pago y genera reportes de cumplimiento, reduciendo la morosidad y mejorando el flujo de caja empresarial.",
      image: "https://images.unsplash.com/photo-1523759724146-4ce060fff7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb250aGx5JTIwcGF5bWVudCUyMHJlbWluZGVyJTIwbm90aWZpY2F0aW9uJTIwYXBwfGVufDF8fHx8MTc1OTYwODk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Python", "Flask", "Celery", "Redis", "PostgreSQL", "Twilio API", "WhatsApp API", "SendGrid"],
      metrics: [
        { icon: TrendingUp, label: "75%", value: "Reducción morosidad" },
        { icon: Zap, label: "100%", value: "Automatización recordatorios" }
      ],
      category: "Automatización Financiera",
      videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
      demoDescription: "Demostración del sistema de recordatorios: configuración de pagos recurrentes, envío automático de notificaciones multicanal, seguimiento de estados y generación de reportes de cobranza."
    }
  ];

  return (
    <section id="proyectos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="titulo-proyectos" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proyectos Destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Algunos de los proyectos más impactantes que he desarrollado, 
            demostrando mi experiencia en diferentes aspectos de la ingeniería de datos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.slice(0, showAllProjects ? projects.length : 1).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 min-h-[500px] lg:h-[400px]">
                <div className="grid lg:grid-cols-2 gap-0 h-full">
                  <div className="relative h-[200px] lg:h-full lg:min-h-[400px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-image"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 lg:p-8 flex flex-col justify-between min-h-[300px] lg:h-full">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-lg lg:text-xl mb-2 line-clamp-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm lg:text-base line-clamp-3 lg:line-clamp-3 mb-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-xs lg:text-sm mb-2">Tecnologías Utilizadas</h4>
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 5 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 5}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-xs lg:text-sm mb-2">Resultados Clave</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {project.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <metric.icon className="h-3 w-3 lg:h-4 lg:w-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs lg:text-sm">
                                <span className="font-medium">{metric.label}</span>
                                <span className="text-muted-foreground ml-1">{metric.value}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 mt-auto pt-4 border-t border-border/50">
                      <Button 
                        size="sm" 
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs lg:text-sm px-4 py-2 flex-1 sm:flex-none"
                        onClick={() => setSelectedProjectDemo(project)}
                      >
                        <Play className="h-4 w-4" />
                        Ver Demo
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:border-transparent text-xs lg:text-sm px-4 py-2 flex-1 sm:flex-none"
                        onClick={() => navigateToSection('titulo-contacto')}
                      >
                        <Heart className="h-4 w-4" />
                        Quiero el mío
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {projects.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setShowAllProjects(!showAllProjects);
                // Si se está cerrando (mostrando menos), navegar al título de proyectos
                if (showAllProjects) {
                  navigateToSection('titulo-proyectos');
                }
              }}
              className="px-8 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
            >
              {showAllProjects ? (
                <>
                  Ver Menos Proyectos
                  <ChevronUp className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Ver Todos los Proyectos ({projects.length - 1} más)
                  <ChevronDown className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Project Demo Modal - Con Video */}
      <Dialog open={!!selectedProjectDemo} onOpenChange={() => setSelectedProjectDemo(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden">
          {selectedProjectDemo && (
            <>
              <DialogHeader className="p-4 pb-3 text-center">
                <DialogTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
                  {selectedProjectDemo.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Proyecto de {selectedProjectDemo.category}
                </DialogDescription>
              </DialogHeader>

              {/* Video Container - Más grande con autoplay */}
              <div className="relative w-full h-0 pb-[56.25%] bg-black">
                <iframe
                  src={`${selectedProjectDemo.videoUrl}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                  title={`Demo de ${selectedProjectDemo.title}`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Tecnologías - Sutiles y compactas */}
              <div className="px-6 py-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedProjectDemo.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 opacity-75 hover:opacity-100 transition-opacity"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Botones para solicitar el proyecto */}
              <div className="px-6 pb-6 pt-4 border-t border-border/50">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    ¿Te interesa una solución similar para tu empresa?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3"
                      onClick={() => {
                        setSelectedProjectDemo(null);
                        navigateToSection('titulo-contacto');
                      }}
                    >
                      Solicitar Consulta Gratuita
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white hover:border-transparent px-6 py-3"
                      onClick={() => {
                        setSelectedProjectDemo(null);
                        navigateToSection('titulo-contacto');
                      }}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Quiero el mío
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}