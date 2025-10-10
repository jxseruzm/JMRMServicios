import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Workflow, 
  Brain, 
  Database, 
  Cloud, 
  BarChart3, 
  Settings, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Search,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Calendar,
  Clock,
  Star,
  Users,
  Award,
  DollarSign
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
// Using standard img tag instead of Figma component
import { useNavigation } from '../hooks/useNavigation';
import WorkMethodologySection from './WorkMethodologySection';

export default function ServicesSection() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [selectedService, setSelectedService] = useState(null);
  const { navigateToSection } = useNavigation();
  const services = [
    {
      icon: Workflow,
      title: "Automatización de Pipelines",
      description: "Diseño e implementación de pipelines de datos automatizados que procesan, transforman y cargan datos de manera eficiente y confiable.",
      features: [
        "ETL/ELT automatizados",
        "Orquestación con Airflow",
        "Monitoreo y alertas",
        "Recovery automático"
      ],
      technologies: ["Apache Airflow", "Python", "Docker", "Kubernetes"],
      priceFrom: "2.500€",
      deliveryTime: "4-6 semanas",
      category: "automation",
      detailedDescription: "Implementación completa de pipelines automatizados para procesamiento de datos. Incluye diseño de arquitectura, desarrollo de código, testing, deployment y documentación técnica completa.",
      deliverables: [
        "Arquitectura completa del pipeline",
        "Código fuente documentado",
        "Scripts de deployment",
        "Monitoreo y alertas configuradas",
        "Documentación técnica",
        "Training al equipo técnico"
      ],
      methodologies: ["Agile/Scrum", "DevOps", "CI/CD"],
      supportIncluded: "3 meses de soporte post-implementación"
    },
    {
      icon: Search,
      title: "Web Scraping & Data Mining",
      description: "Desarrollo de sistemas automatizados de extracción de datos web para obtener información valiosa de fuentes públicas online.",
      features: [
        "Scraping automatizado",
        "APIs personalizadas",
        "Datos estructurados",
        "Monitoreo continuo"
      ],
      technologies: ["Python", "Scrapy", "Selenium", "BeautifulSoup"],
      priceFrom: "1.800€",
      deliveryTime: "3-5 semanas",
      category: "automation",
      detailedDescription: "Sistema automatizado de extracción de datos web con respeto a robots.txt y límites de velocidad. Incluye limpieza, estructuración y API de acceso a datos.",
      deliverables: [
        "Scripts de scraping robustos",
        "API de datos estructurados",
        "Base de datos optimizada",
        "Sistema de monitoreo",
        "Documentación completa",
        "Manual de uso"
      ],
      methodologies: ["Ethical Scraping", "API Development", "Data Processing"],
      supportIncluded: "3 meses de soporte y mantenimiento"
    },
    {
      icon: MessageCircle,
      title: "ChatBot WhatsApp",
      description: "Desarrollo de chatbots inteligentes para WhatsApp Business con integración a sistemas CRM y automatización de procesos.",
      features: [
        "Respuestas automáticas",
        "Integración CRM",
        "Procesamiento NLP",
        "Analytics detallado"
      ],
      technologies: ["WhatsApp API", "Python", "NLP", "OpenAI"],
      priceFrom: "2.200€",
      deliveryTime: "4-6 semanas",
      category: "ai-ml",
      detailedDescription: "Chatbot inteligente para WhatsApp Business con capacidades de NLP avanzadas. Incluye integración con CRM, automatización de respuestas y analytics detallado.",
      deliverables: [
        "Chatbot configurado y desplegado",
        "Integración con WhatsApp Business",
        "Panel de administración",
        "Analytics y reportes",
        "Documentación de uso",
        "Training para operadores"
      ],
      methodologies: ["Conversational AI", "NLP", "Integration Patterns"],
      supportIncluded: "6 meses de soporte y actualizaciones"
    },
    {
      icon: BarChart3,
      title: "Analytics en Tiempo Real",
      description: "Implementación de sistemas de analytics en tiempo real para decisiones inmediatas basadas en datos streaming.",
      features: [
        "Dashboards en tiempo real",
        "Alertas automáticas",
        "Procesamiento de eventos",
        "Baja latencia"
      ],
      technologies: ["Kafka Streams", "Redis", "InfluxDB", "Grafana"],
      priceFrom: "3.500€",
      deliveryTime: "6-8 semanas",
      category: "data-engineering",
      detailedDescription: "Sistema completo de analytics en tiempo real con latencias sub-segundo. Ideal para monitoreo de KPIs críticos y toma de decisiones inmediatas.",
      deliverables: [
        "Stream processing pipeline",
        "Dashboards en tiempo real",
        "Sistema de alertas",
        "APIs de consulta",
        "Documentación de uso",
        "Capacitación operativa"
      ],
      methodologies: ["Event-Driven Architecture", "Real-time Analytics", "DevOps"],
      supportIncluded: "4 meses de soporte técnico"
    },
    {
      icon: Database,
      title: "Procesamiento Big Data",
      description: "Soluciones escalables para el procesamiento de grandes volúmenes de datos usando tecnologías distribuidas de última generación.",
      features: [
        "Procesamiento distribuido",
        "Stream processing",
        "Batch processing optimizado",
        "Escalabilidad automática"
      ],
      technologies: ["Apache Spark", "Kafka", "Hadoop", "Databricks"],
      priceFrom: "4.200€",
      deliveryTime: "5-7 semanas",
      category: "data-engineering",
      detailedDescription: "Implementación de arquitecturas de big data escalables usando tecnologías distribuidas. Optimizado para procesar petabytes de datos con alta disponibilidad y rendimiento.",
      deliverables: [
        "Arquitectura de procesamiento distribuido",
        "Configuración de clusters",
        "Pipelines optimizados",
        "Monitoreo y alertas",
        "Documentación técnica",
        "Capacitación del equipo"
      ],
      methodologies: ["DataOps", "DevOps", "Agile"],
      supportIncluded: "3 meses de soporte técnico"
    },
    {
      icon: Cloud,
      title: "Arquitectura Data Lake",
      description: "Diseño y construcción de data lakes modernos en la nube para almacenar y procesar datos estructurados y no estructurados.",
      features: [
        "Arquitectura medallion",
        "Data cataloging",
        "Particionado inteligente",
        "Optimización de costos"
      ],
      technologies: ["AWS S3", "Delta Lake", "Glue", "Athena"],
      priceFrom: "5.800€",
      deliveryTime: "8-10 semanas",
      category: "data-engineering",
      detailedDescription: "Diseño e implementación de data lakes modernos con arquitectura medallion (bronze, silver, gold). Incluye governance, cataloging y optimización de costos.",
      deliverables: [
        "Arquitectura completa del data lake",
        "Configuración de almacenamiento",
        "Data catalog configurado",
        "Políticas de governance",
        "Scripts de automatización",
        "Training operacional"
      ],
      methodologies: ["Data Mesh", "DataOps", "Cloud-First"],
      supportIncluded: "6 meses de soporte especializado"
    },
    {
      icon: Settings,
      title: "Migración a la Nube",
      description: "Migración completa de infraestructuras de datos on-premise hacia soluciones cloud modernas y escalables.",
      features: [
        "Assessment completo",
        "Migración sin downtime",
        "Optimización de costos",
        "Training del equipo"
      ],
      technologies: ["AWS", "Azure", "GCP", "Terraform"],
      priceFrom: "6.500€",
      deliveryTime: "10-12 semanas",
      category: "data-engineering",
      detailedDescription: "Migración completa de infraestructura on-premise a cloud con cero downtime. Incluye assessment, planificación detallada y ejecución en fases.",
      deliverables: [
        "Assessment de infraestructura actual",
        "Plan de migración detallado",
        "Infraestructura cloud configurada",
        "Migración de datos",
        "Testing y validación",
        "Documentación y training"
      ],
      methodologies: ["Cloud Migration Framework", "Infrastructure as Code", "DevOps"],
      supportIncluded: "12 meses de soporte post-migración"
    },
    {
      icon: Brain,
      title: "MLOps & Machine Learning",
      description: "Operacionalización de modelos de ML desde el desarrollo hasta producción, incluyendo automatización de entrenamientos y deployments.",
      features: [
        "Pipeline ML automatizado",
        "Model versioning",
        "A/B testing de modelos",
        "Monitoreo de drift"
      ],
      technologies: ["MLflow", "Kubeflow", "TensorFlow", "PyTorch"],
      priceFrom: "3.800€",
      deliveryTime: "6-8 semanas",
      category: "ai-ml",
      detailedDescription: "Sistema completo de MLOps que automatiza el ciclo de vida de modelos ML desde desarrollo hasta producción. Incluye versionado de modelos, testing automatizado y deployment escalable.",
      deliverables: [
        "Pipeline ML automatizado",
        "Sistema de versionado de modelos",
        "Testing y validación automatizada",
        "Deployment en producción",
        "Monitoreo de model drift",
        "Dashboard de métricas ML"
      ],
      methodologies: ["MLOps", "DataOps", "DevOps"],
      supportIncluded: "6 meses de soporte especializado"
    },
    {
      icon: DollarSign,
      title: "Sistema de Recordatorio de Pagos Mensual",
      description: "Plataforma automatizada que gestiona recordatorios de pagos recurrentes, envía notificaciones multicanal y rastrea estados de pago para mejorar el flujo de caja empresarial.",
      features: [
        "Recordatorios automáticos",
        "Notificaciones multicanal",
        "Seguimiento de estados",
        "Reportes de cobranza"
      ],
      technologies: ["Python", "Flask", "Celery", "Twilio API"],
      priceFrom: "1.900€",
      deliveryTime: "4-5 semanas",
      category: "automation",
      detailedDescription: "Sistema completo de gestión de recordatorios de pagos que automatiza el proceso de cobranza mediante notificaciones inteligentes por email, SMS y WhatsApp. Incluye seguimiento de estados, reportes de morosidad y mejora significativa del flujo de caja.",
      deliverables: [
        "Sistema de recordatorios automatizado",
        "Integración multicanal (Email, SMS, WhatsApp)",
        "Panel de control de pagos",
        "Reportes de cobranza y morosidad",
        "API de integración",
        "Capacitación operativa"
      ],
      methodologies: ["Automation", "Financial Technology", "API Integration"],
      supportIncluded: "4 meses de soporte y mantenimiento"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'Todos', count: services.length },
    { id: 'data-engineering', label: 'Data Engineering', count: services.filter(s => s.category === 'data-engineering').length },
    { id: 'automation', label: 'Automatización', count: services.filter(s => s.category === 'automation').length },
    { id: 'ai-ml', label: 'AI/ML', count: services.filter(s => s.category === 'ai-ml').length },
  ];

  // Filter and search logic
  const filteredServices = useMemo(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    return filtered;
  }, [services, searchTerm, selectedCategory]);

  // Determine how many services to show
  const servicesToShow = showAllServices ? filteredServices : filteredServices.slice(0, 3);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowAllServices(false);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all';

  return (
    <section id="servicios" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="titulo-servicios" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Servicios Profesionales
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Servicios especializados en ingeniería de datos para transformar tu infraestructura 
            y <span className="text-blue-600 font-semibold">potenciar el valor</span> de tus datos.
          </p>
        </motion.div>

        {/* Strategic Hook - Time & Organization Value */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden bg-gradient-to-r from-blue-600/5 to-purple-600/5 border border-blue-200">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <Badge className="mb-4 bg-orange-600 hover:bg-orange-700 text-white">Realidad Empresarial</Badge>
                <h3 className="text-2xl mb-4">¿Cuántas horas pierdes cada semana organizando datos y creando reportes manualmente?</h3>
                <p className="text-muted-foreground mb-6">
                  <strong>La mayoría de empresas dedican entre 8-15 horas semanales</strong> a tareas que se pueden automatizar completamente. 
                  Te ayudo a identificar estos procesos y convertir el caos en un sistema organizado que funciona solo.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Análisis gratuito 30 min", "Identificar procesos manuales", "Plan de automatización", "Implementación paso a paso"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => navigateToSection('titulo-contacto')}
                  >
                    Optimiza tu tiempo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    30 min gratuitos
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <div className="text-center space-y-3 sm:space-y-4 w-full">
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-1">12h</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">promedio semanal perdidas</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">en tareas manuales</div>
                  </div>
                  <div className="text-xl sm:text-2xl">↓</div>
                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-1">2h</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">después de</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">automatización</div>
                  </div>
                  <div className="text-xs sm:text-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full px-3 sm:px-4 py-2 font-semibold mx-auto max-w-max">
                    10 horas liberadas cada semana
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="p-6 bg-muted/30">
            {/* Main Layout: Search Left, Filters Right */}
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
              {/* Search Bar - Left Side */}
              <div className="flex-1 lg:max-w-md flex lg:items-center lg:justify-start">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar servicios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </div>

              {/* Filters - Right Side (Stacked) */}
              <div className="flex-1 lg:max-w-md space-y-4">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-xs px-3 py-1 h-8 ${selectedCategory === category.id ? 
                        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : 
                        ""
                      }`}
                    >
                      {category.label}
                      {category.id !== 'all' && (
                        <span className="ml-1 text-xs opacity-70">
                          {category.count}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>

              </div>
            </div>

            {/* Active Filters & Clear - Compact */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-xs text-muted-foreground">
                  {filteredServices.length} resultado{filteredServices.length !== 1 ? 's' : ''}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  Limpiar
                </Button>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Services Grid */}
        {servicesToShow.length > 0 ? (
          <div className={`grid gap-6 ${
            servicesToShow.length === 3 
              ? "md:grid-cols-3" 
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {servicesToShow.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 group relative overflow-hidden bg-gradient-to-br from-background to-blue-50/30">
                {/* Subtle hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="p-3 rounded-lg bg-blue-600/10 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <service.icon className="h-6 w-6" />
                    </motion.div>
                    
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(cat => cat.id === service.category)?.label || 'Premium'}
                    </Badge>
                  </div>

                <h3 className="mb-3 text-lg font-semibold transition-colors duration-300 group-hover:text-blue-600">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="mb-4 flex-grow">
                  <h4 className="text-sm mb-2 font-medium">Incluye:</h4>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-xs text-muted-foreground flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{service.features.length - 3} más...
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.technologies.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {service.technologies.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{service.technologies.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <button
                      onClick={() => navigateToSection('titulo-contacto')}
                      className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0"
                    >
                      Consultar precio
                    </button>
                    <span className="text-muted-foreground">{service.deliveryTime}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                    onClick={() => setSelectedService(service)}
                  >
                    Ver Detalles
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No se encontraron servicios que coincidan con tu búsqueda.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              <X className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          </motion.div>
        )}

        {/* Toggle show more/less - Centered and Enhanced */}
        {!hasActiveFilters && filteredServices.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={() => setShowAllServices(!showAllServices)}
              >
                {showAllServices ? (
                  <>
                    Ver Menos Servicios
                    <ChevronUp className="h-5 w-5 ml-2" />
                  </>
                ) : (
                  <>
                    Ver Todos los Servicios ({filteredServices.length})
                    <ChevronDown className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Work Methodology Section */}
        <WorkMethodologySection />

        {/* Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <h3 className="text-xl mb-4">¿Quieres ver ejemplos de mi trabajo?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Explora casos de estudio detallados y proyectos reales implementados con estas tecnologías.
            </p>
            <Button 
              variant="outline" 
              className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent"
              onClick={() => navigateToSection('titulo-proyectos')}
            >
              Ver Portfolio Completo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                    <selectedService.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedService.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{selectedService.category}</Badge>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{selectedService.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base">
                  {selectedService.detailedDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Pricing Section */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-green-800 font-medium">Inversión del proyecto</h4>
                    <p className="text-sm text-green-700">Precio final según alcance y personalización</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">Desde {selectedService.priceFrom}</div>
                    <div className="text-sm text-green-600">precio orientativo</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 mt-6">
                {/* Key Features */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Características Principales
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedService.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    Entregables
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedService.deliverables.map((deliverable) => (
                      <li key={deliverable} className="text-sm text-muted-foreground flex items-center">
                        <Award className="h-3 w-3 text-blue-600 mr-2 flex-shrink-0" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    Tecnologías Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Methodologies */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    Metodologías
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.methodologies.map((methodology) => (
                      <Badge key={methodology} variant="outline" className="border-orange-200 text-orange-700">
                        {methodology}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-green-800">
                    <Shield className="h-4 w-4" />
                    Soporte Incluido
                  </h4>
                  <p className="text-sm text-green-700">{selectedService.supportIncluded}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    setSelectedService(null);
                    navigateToSection('titulo-contacto');
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Solicitar Cotización
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedService(null);
                    navigateToSection('titulo-contacto');
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Hacer Pregunta
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}