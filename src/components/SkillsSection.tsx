import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Cloud, 
  BarChart3, 
  Code, 
  Server, 
  Workflow,
  Star,
  Users,
  CheckCircle,
  BookOpen,
  Award,
  Info,
  Lightbulb,
  Target,
  HelpCircle
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export default function SkillsSection() {
  const [selectedTech, setSelectedTech] = useState(null);

  // Información educativa de cada tecnología
  /*
  const techDetails = {
    "PostgreSQL": {
      whatIs: "PostgreSQL es una base de datos que funciona como un almacén digital muy organizado y confiable para guardar información importante de empresas y aplicaciones.",
      whyImportant: "Es como tener una biblioteca súper organizada donde puedes guardar millones de datos de forma segura y encontrarlos instantáneamente cuando los necesites.",
      realWorldExample: "Imagina que tienes una tienda online. PostgreSQL guarda todos los productos, precios, pedidos de clientes y pagos de forma que nunca se pierdan y siempre estén disponibles.",
      benefits: [
        "Nunca pierde información, incluso si hay problemas técnicos",
        "Puede manejar desde pequeñas empresas hasta grandes corporaciones",
        "Es gratuito y de código abierto",
        "Muy rápido para encontrar información específica"
      ],
      industries: ["Comercio electrónico", "Bancos y finanzas", "Gobierno", "Salud"],
      analogy: "Es como el sistema de archivo más avanzado del mundo, pero para datos digitales"
    },
    "MongoDB": {
      whatIs: "MongoDB es una base de datos moderna que almacena información de forma más flexible, como documentos digitales en lugar de tablas rígidas.",
      whyImportant: "Permite guardar datos que cambian frecuentemente o tienen estructuras diferentes, perfecto para aplicaciones web modernas y móviles.",
      realWorldExample: "Si tienes una red social, MongoDB puede guardar perfiles de usuarios con diferente información (unos con fotos, otros con videos, etc.) sin problemas.",
      benefits: [
        "Muy flexible para datos que cambian de estructura",
        "Perfecto para aplicaciones web y móviles",
        "Crece fácilmente cuando tienes más usuarios",
        "Ideal para datos como comentarios, posts, perfiles"
      ],
      industries: ["Redes sociales", "Aplicaciones móviles", "E-learning", "Gaming"],
      analogy: "Es como un archivero donde cada carpeta puede tener un formato diferente, pero siempre encuentras lo que buscas"
    },
    "DB2": {
      whatIs: "DB2 es una base de datos empresarial de IBM, diseñada específicamente para manejar los sistemas más críticos e importantes de grandes corporaciones.",
      whyImportant: "Es como el 'cerebro' de las operaciones más importantes de una empresa, donde no puede haber errores ni interrupciones.",
      realWorldExample: "Los bancos usan DB2 para manejar todas las transacciones, cuentas y movimientos de dinero, donde cada segundo cuenta y no puede fallar.",
      benefits: [
        "Extremadamente confiable para operaciones críticas",
        "Optimizado para grandes volúmenes de transacciones",
        "Soporte técnico de clase mundial de IBM",
        "Integración perfecta con otros sistemas empresariales"
      ],
      industries: ["Bancos", "Seguros", "Gobierno", "Telecomunicaciones"],
      analogy: "Es como el sistema de seguridad más avanzado para los datos más importantes de una empresa"
    },
    "Oracle": {
      whatIs: "Oracle es la base de datos empresarial más robusta del mundo, usada por las corporaciones más grandes para sus operaciones más críticas.",
      whyImportant: "Es el estándar de oro en bases de datos empresariales, conocida por su capacidad de manejar los sistemas más complejos sin fallar nunca.",
      realWorldExample: "Las aerolíneas usan Oracle para manejar reservas, vuelos y pasajeros globalmente. Imagine si un sistema de reservas fallara durante las vacaciones.",
      benefits: [
        "La más confiable para sistemas críticos del mundo",
        "Puede manejar empresas multinacionales completas",
        "Seguridad de nivel militar para datos sensibles",
        "Soporte técnico 24/7 en todo el mundo"
      ],
      industries: ["Aerolíneas", "Bancos multinacionales", "Gobierno", "Corporaciones Fortune 500"],
      analogy: "Es como tener el motor más confiable del mundo para los sistemas más importantes de una empresa"
    },
    "SQL Server": {
      whatIs: "SQL Server es la base de datos de Microsoft, diseñada para integrarse perfectamente con todos los productos de Microsoft que ya usan las empresas.",
      whyImportant: "Si una empresa usa Windows, Office y otros productos Microsoft, SQL Server hace que todo funcione como un solo sistema integrado.",
      realWorldExample: "Una empresa puede tener sus datos en SQL Server, crear reportes en Excel automáticamente, y enviar informes por Outlook, todo conectado.",
      benefits: [
        "Se integra perfectamente con Office y Windows",
        "Fácil de usar para equipos que ya conocen Microsoft",
        "Excelente para crear reportes automáticos",
        "Soporte directo de Microsoft"
      ],
      industries: ["Empresas corporativas", "Consultoría", "Servicios profesionales", "Manufactura"],
      analogy: "Es como tener todos tus electrodomésticos de la misma marca: todo funciona mejor junto"
    },
    "MySQL": {
      whatIs: "MySQL es la base de datos más popular para sitios web y aplicaciones online, usada por empresas desde startups hasta gigantes como Facebook.",
      whyImportant: "Es gratis, confiable y perfecto para cualquier proyecto web, desde un blog personal hasta una plataforma con millones de usuarios.",
      realWorldExample: "La mayoría de sitios web que visitas diariamente (como WordPress, tiendas online, foros) funcionan con MySQL detrás de escena.",
      benefits: [
        "Completamente gratuito y fácil de empezar",
        "Usado por millones de sitios web en el mundo",
        "Rápido y eficiente para aplicaciones web",
        "Comunidad enorme de desarrolladores para ayuda"
      ],
      industries: ["Desarrollo web", "E-commerce", "Startups", "Medios digitales"],
      analogy: "Es como el motor más popular y confiable para sitios web, usado desde blogs hasta redes sociales"
    },
    "AWS": {
      whatIs: "AWS (Amazon Web Services) es como rentar una oficina, pero en lugar de espacio físico, rentas computadoras, almacenamiento y servicios en internet.",
      whyImportant: "Permite que cualquier empresa tenga acceso a la misma tecnología que usa Amazon, sin necesidad de comprar servidores costosos o contratar técnicos especializados.",
      realWorldExample: "Netflix usa AWS para transmitir películas a millones de personas simultáneamente. En lugar de tener miles de servidores propios, los 'renta' de Amazon según los necesite.",
      benefits: [
        "Solo pagas por lo que usas, como la electricidad",
        "Puedes crecer instantáneamente si necesitas más capacidad",
        "Amazon se encarga del mantenimiento técnico",
        "Acceso a tecnología de nivel mundial desde el primer día"
      ],
      industries: ["Streaming de video", "E-commerce", "Startups", "Aplicaciones móviles"],
      analogy: "Es como tener acceso a la infraestructura tecnológica de Amazon para tu propia empresa"
    },
    "Google Cloud": {
      whatIs: "Google Cloud es la plataforma donde Google comparte la misma tecnología que usa para sus servicios como Gmail, YouTube y Google Search.",
      whyImportant: "Especializado en análisis de datos e inteligencia artificial, perfecto para empresas que quieren entender mejor sus datos y automatizar procesos.",
      realWorldExample: "Una empresa de retail puede usar Google Cloud para predecir qué productos se venderán más, usando la misma IA que Google usa para sus búsquedas.",
      benefits: [
        "Acceso a la inteligencia artificial de Google",
        "Excelente para analizar grandes cantidades de datos",
        "Misma infraestructura que mantiene YouTube funcionando",
        "Herramientas muy fáciles de usar para análisis"
      ],
      industries: ["Análisis de datos", "Inteligencia artificial", "Investigación", "Marketing digital"],
      analogy: "Es como tener acceso al cerebro de Google para analizar datos y tomar mejores decisiones"
    },
    "IBM Cloud": {
      description: "Plataforma de servicios en la nube empresarial de IBM, especializada en soluciones híbridas, inteligencia artificial y sistemas críticos para grandes organizaciones.",
      experience: "3+ años",
      proficiency: 80,
      useCases: ["Enterprise Hybrid Cloud", "AI/Watson Services", "Legacy Integration", "Critical Workloads"],
      keyFeatures: ["Hybrid Multi-cloud", "Watson AI", "Red Hat Integration", "Enterprise Security"],
      certifications: ["IBM Cloud Professional Architect"],
      projects: "7+ migraciones empresariales"
    },
    "Kubernetes": {
      description: "Sistema de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones containerizadas.",
      experience: "4+ años",
      proficiency: 85,
      useCases: ["Container Orchestration", "Microservices", "CI/CD", "Auto-scaling"],
      keyFeatures: ["Container Orchestration", "Service Discovery", "Load Balancing", "Rolling Updates"],
      certifications: ["Certified Kubernetes Administrator (CKA)"],
      projects: "15+ implementaciones de microservicios"
    },  

    "Python": {
      whatIs: "Python es un lenguaje de programación que es como el 'inglés' del mundo de la tecnología: fácil de entender y usado en todas partes.",
      whyImportant: "Es el lenguaje favorito para trabajar con datos, inteligencia artificial y automatizar tareas repetitivas porque es muy fácil de leer y escribir.",
      realWorldExample: "Instagram está hecho en Python, y también se usa para entrenar los algoritmos de recomendación de Spotify y para automatizar reportes empresariales.",
      benefits: [
        "Muy fácil de aprender y entender",
        "Perfecto para análisis de datos e inteligencia artificial",
        "Puede automatizar tareas repetitivas",
        "Enorme comunidad de usuarios en todo el mundo"
      ],
      industries: ["Análisis de datos", "Inteligencia artificial", "Desarrollo web", "Automatización"],
      analogy: "Es como tener un asistente súper inteligente que puede aprender cualquier tarea y hacerla automáticamente"
    },
    "SQL": {
      description: "Lenguaje estándar para gestión y consulta de bases de datos relacionales, fundamental para cualquier trabajo con datos estructurados.",
      experience: "8+ años",
      proficiency: 95,
      useCases: ["Data Analysis", "Database Management", "Reporting", "Data Warehousing"],
      keyFeatures: ["Declarative Language", "Set-based Operations", "ACID Properties", "Standardized"],
      certifications: ["Multiple DB-specific certifications"],
      projects: "100+ consultas y análisis"
    },

    "Bash": {
      description: "Shell de comandos y lenguaje de scripting fundamental para automatización de sistemas Unix/Linux y operaciones DevOps.",
      experience: "6+ años",
      proficiency: 85,
      useCases: ["System Administration", "Automation Scripts", "CI/CD Pipelines", "Server Management"],
      keyFeatures: ["System Integration", "Automation", "Portability", "Text Processing"],
      certifications: ["Linux Professional Institute"],
      projects: "100+ scripts de automatización"
    },
    "PowerShell": {
      description: "Shell de comandos y lenguaje de scripting de Microsoft, potente para automatización de sistemas Windows y gestión de infraestructura híbrida.",
      experience: "4+ años",
      proficiency: 80,
      useCases: ["Windows Administration", "Azure Automation", "System Management", "Infrastructure Scripts"],
      keyFeatures: ["Object-oriented", "Cross-platform", "Rich Cmdlets", "Integration with .NET"],
      certifications: ["Microsoft PowerShell Certified"],
      projects: "50+ scripts de administración"
    },
    "Docker": {
      whatIs: "Docker es como una maleta mágica que empaca una aplicación con todo lo que necesita para funcionar, y puede abrirse en cualquier computadora del mundo.",
      whyImportant: "Resuelve el problema de 'en mi computadora sí funciona'. Con Docker, si funciona en una computadora, funcionará en todas.",
      realWorldExample: "Un desarrollador puede crear una aplicación en su laptop, empaquetarla con Docker, y esa misma aplicación funcionará idéntica en los servidores de Google, Amazon o cualquier lugar.",
      benefits: [
        "Las aplicaciones funcionan igual en cualquier computadora",
        "Facilita enormemente el trabajo en equipo",
        "Ahorra tiempo y dinero en configuraciones",
        "Hace que las aplicaciones sean más seguras y estables"
      ],
      industries: ["Desarrollo de software", "DevOps", "Startups", "Tecnología"],
      analogy: "Es como tener un contenedor de envío estándar, pero para aplicaciones: cabe en cualquier barco (servidor)"
    },
    "API": {
      description: "Desarrollo y consumo de interfaces de programación de aplicaciones para integración de sistemas y comunicación entre servicios.",
      experience: "7+ años",
      proficiency: 95,
      useCases: ["System Integration", "Microservices", "Data Exchange", "Web Services"],
      keyFeatures: ["RESTful Design", "Authentication", "Documentation", "Versioning"],
      certifications: ["API Design Professional"],
      projects: "40+ APIs desarrolladas"
    },
    "Apache Spark": {
      whatIs: "Apache Spark es como tener un equipo de 1000 personas trabajando juntas para analizar datos enormes en minutos en lugar de días.",
      whyImportant: "Cuando tienes millones o billones de datos (como todas las compras de Amazon), las computadoras normales tardarían años. Spark lo hace en minutos.",
      realWorldExample: "Netflix usa Spark para analizar qué películas ve cada usuario y recomendar nuevas. Procesa datos de 200 millones de usuarios en tiempo real.",
      benefits: [
        "Procesa datos masivos 100 veces más rápido que métodos tradicionales",
        "Puede trabajar con datos más grandes que la memoria de una computadora",
        "Encuentra patrones en datos que serían imposibles de ver manualmente",
        "Usado por las empresas más grandes del mundo"
      ],
      industries: ["Streaming de video", "E-commerce", "Banca", "Telecomunicaciones"],
      analogy: "Es como tener una fábrica que puede procesar montañas de información en tiempo récord"
    },
    "Hadoop": {
      description: "Framework de software que permite el procesamiento distribuido de grandes conjuntos de datos a través de clusters de computadoras.",
      experience: "3+ años",
      proficiency: 80,
      useCases: ["Distributed Storage", "Batch Processing", "Data Lakes", "Large-scale Analytics"],
      keyFeatures: ["Distributed Storage", "MapReduce", "Fault Tolerance", "Scalability"],
      certifications: ["Cloudera Hadoop Developer"],
      projects: "8+ clusters de Hadoop"
    },
    "Kafka": {
      description: "Plataforma de streaming distribuida que maneja flujos de datos en tiempo real con alta velocidad, escalabilidad y durabilidad.",
      experience: "4+ años",
      proficiency: 85,
      useCases: ["Real-time Streaming", "Event Sourcing", "Log Aggregation", "Microservices Communication"],
      keyFeatures: ["High Throughput", "Fault Tolerant", "Persistent", "Distributed"],
      certifications: ["Confluent Certified Kafka Developer"],
      projects: "12+ sistemas de streaming"
    },

    "PowerBI": {
      whatIs: "PowerBI convierte números aburridos en gráficos coloridos e interactivos que cualquier persona puede entender, incluso si no sabe de matemáticas.",
      whyImportant: "Los datos sin visualización son como tener un tesoro enterrado. PowerBI es el mapa que te muestra dónde está el oro escondido en tus datos.",
      realWorldExample: "Una tienda puede ver instantáneamente qué productos se venden más, en qué horas, qué días, y en qué tiendas, todo en gráficos fáciles de entender.",
      benefits: [
        "Convierte datos complejos en gráficos simples",
        "Se actualiza automáticamente con nueva información",
        "Funciona perfectamente con Excel y Office",
        "Permite tomar decisiones basadas en datos reales"
      ],
      industries: ["Retail", "Manufactura", "Servicios", "Educación"],
      analogy: "Es como tener un traductor que convierte números complicados en historias visuales que todos entienden"
    },
    "RapidMiner": {
      description: "Plataforma de ciencia de datos que proporciona un entorno integrado para preparación de datos, machine learning, deep learning y análisis predictivo.",
      experience: "3+ años",
      proficiency: 80,
      useCases: ["Data Mining", "Predictive Analytics", "Machine Learning", "Data Preparation"],
      keyFeatures: ["Visual Workflow", "AutoML", "Data Integration", "Model Deployment"],
      certifications: ["RapidMiner Certified Analyst"],
      projects: "12+ modelos predictivos"
    },
    "ETL/ELT": {
      description: "Procesos fundamentales de integración de datos que extraen, transforman y cargan datos desde múltiples fuentes hacia sistemas de destino.",
      experience: "6+ años",
      proficiency: 95,
      useCases: ["Data Integration", "Data Warehousing", "Real-time Processing", "Data Migration"],
      keyFeatures: ["Data Integration", "Transformation Logic", "Error Handling", "Monitoring"],
      certifications: ["Multiple ETL tool certifications"],
      projects: "30+ pipelines de integración"
    },
    "Data Pipelines": {
      description: "Sistemas automatizados que mueven y procesan datos desde fuentes hasta destinos, asegurando calidad, consistencia y disponibilidad.",
      experience: "6+ años",
      proficiency: 95,
      useCases: ["Automated Data Flow", "Real-time Processing", "Batch Processing", "Data Quality"],
      keyFeatures: ["Automation", "Monitoring", "Error Recovery", "Scalability"],
      certifications: ["Various pipeline technology certifications"],
      projects: "40+ pipelines automatizados"
    },
    "Stream Processing": {
      description: "Procesamiento de datos en tiempo real que permite analizar y actuar sobre flujos continuos de datos con latencia mínima.",
      experience: "3+ años",
      proficiency: 85,
      useCases: ["Real-time Analytics", "Event Processing", "IoT Data", "Fraud Detection"],
      keyFeatures: ["Low Latency", "Continuous Processing", "Event-driven", "Scalable"],
      certifications: ["Stream processing certifications"],
      projects: "10+ sistemas en tiempo real"
    },
    "Data Modeling": {
      description: "Diseño y estructuración de datos para optimizar el almacenamiento, consulta y análisis, incluyendo modelos dimensionales y normalizados.",
      experience: "6+ años",
      proficiency: 90,
      useCases: ["Data Warehouse Design", "Schema Design", "Performance Optimization", "Analytics"],
      keyFeatures: ["Dimensional Modeling", "Normalization", "Performance Tuning", "Documentation"],
      certifications: ["Data modeling certifications"],
      projects: "25+ modelos de datos"
    },
    "Git": {
      description: "Sistema de control de versiones distribuido que rastrea cambios en archivos y coordina el trabajo entre múltiples desarrolladores.",
      experience: "7+ años",
      proficiency: 95,
      useCases: ["Version Control", "Collaboration", "Code Review", "Release Management"],
      keyFeatures: ["Distributed", "Branching", "Merging", "History Tracking"],
      certifications: ["Git Professional"],
      projects: "100+ repositorios gestionados"
    },

    "Monitoring": {
      description: "Sistemas y prácticas para observar, medir y alertar sobre el rendimiento y salud de aplicaciones e infraestructura.",
      experience: "5+ años",
      proficiency: 85,
      useCases: ["System Health", "Performance Monitoring", "Alerting", "Troubleshooting"],
      keyFeatures: ["Real-time Metrics", "Alerting", "Dashboards", "Log Analysis"],
      certifications: ["Monitoring tool certifications"],
      projects: "25+ sistemas monitoreados"
    },
    "Testing": {
      description: "Prácticas y herramientas para verificar la calidad, funcionalidad y rendimiento del software y sistemas de datos.",
      experience: "6+ años",
      proficiency: 90,
      useCases: ["Unit Testing", "Integration Testing", "Data Quality Testing", "Performance Testing"],
      keyFeatures: ["Automated Testing", "Quality Assurance", "Test Coverage", "Continuous Testing"],
      certifications: ["Testing certifications"],
      projects: "50+ suites de testing"
    },
    "n8n": {
      description: "Plataforma de automatización de flujos de trabajo de código abierto que permite conectar aplicaciones y automatizar procesos sin código.",
      experience: "2+ años",
      proficiency: 80,
      useCases: ["Workflow Automation", "Data Integration", "API Orchestration", "Business Process Automation"],
      keyFeatures: ["Visual Workflow Editor", "200+ Integrations", "Self-hosted", "Custom Nodes"],
      certifications: ["n8n Automation Specialist"],
      projects: "15+ flujos automatizados"
    },
    "Notion": {
      whatIs: "Notion es como tener un asistente personal digital que combina notas, tareas, bases de datos y wikis en un solo lugar súper organizado.",
      whyImportant: "Permite organizar proyectos, documentar procesos y colaborar en equipo de forma visual e intuitiva, especialmente útil para gestionar proyectos de datos complejos.",
      realWorldExample: "Los equipos de data engineering usan Notion para documentar pipelines, crear wikis técnicos, hacer seguimiento de proyectos y mantener bases de conocimiento organizadas.",
      benefits: [
        "Todo en un solo lugar: notas, tareas, documentos y bases de datos",
        "Ideal para documentar procesos técnicos de forma visual",
        "Perfecto para colaboración en equipo y gestión de proyectos",
        "Plantillas listas para usar y totalmente personalizable"
      ],
      industries: ["Tecnología", "Startups", "Consultoría", "Equipos de desarrollo"],
      analogy: "Es como tener un estudio de arquitecto digital donde puedes diseñar y organizar todos tus proyectos y conocimientos"
    }
  };
  */
  const skillCategories = [
    {
      icon: Database,
      title: "Bases de Datos",
      color: "text-blue-600",
      skills: ["PostgreSQL", "MongoDB", "DB2", "Oracle", "SQL Server", "MySQL"]
    },
    {
      icon: Cloud,
      title: "Cloud Platforms",
      color: "text-green-600",
      skills: ["AWS", 
        //"Google Cloud", 
        "IBM Cloud" 
        //"Kubernetes"
        ]
    },
    {
      icon: Code,
      title: "Lenguajes",
      color: "text-purple-600",
      skills: ["Python", "SQL", "Bash", "PowerShell"]
    },
    {
      icon: BarChart3,
      title: "Big Data & Analytics",
      color: "text-orange-600",
      skills: [
        "Apache Spark", 
        "Hadoop", 
        "Kafka", 
        "PowerBI", 
       // "RapidMiner"
      ]
    },
    {
      icon: Server,
      title: "Data Engineering",
      color: "text-red-600",
      skills: ["ETL/ELT", "Data Pipelines", "Stream Processing", "Data Modeling"]
    },
    {
      icon: Workflow,
      title: "DevOps & Tools",
      color: "text-teal-600",
      skills: ["Git", "Docker", "API", "Monitoring", "Testing", "n8n", "Notion"]
    }
  ];

  return (
    <section id="habilidades" className="py-20 relative overflow-hidden">
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-blue-500/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-purple-500/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-500/30 rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {/* Gradient background effect */}
          <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-3xl blur-3xl"></div>
          
          <div className="relative z-10">

            
            <h2 id="titulo-habilidades" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Habilidades Técnicas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un conjunto completo de herramientas y tecnologías para construir 
              soluciones de datos robustas y escalables.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), transparent)",
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05), transparent)",
                      "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), transparent)"
                    ],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                {/* Shimmer effect simplificado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center mb-4 relative z-10">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg group-hover:shadow-xl ${category.color} hover:scale-105 transition-all duration-200 border border-gray-200/50`}>
                    <category.icon className="h-7 w-7 drop-shadow-sm" />
                  </div>
                  <h3 className="ml-4 font-semibold group-hover:text-blue-600 transition-colors duration-300">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="group hover:scale-105 hover:-translate-y-1 transition-all duration-200"
                    >
                      <Badge 
                        variant="secondary" 
                        onClick={() => setSelectedTech(techDetails[skill] ? { name: skill, ...techDetails[skill] } : null)}
                        className={`
                          relative overflow-hidden cursor-pointer px-4 py-2 font-medium
                          bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700
                          border-2 border-gray-200/60 dark:border-gray-600/60
                          shadow-sm hover:shadow-xl
                          transition-all duration-500 ease-out
                          hover:border-transparent
                          group
                          ${category.color === 'text-blue-600' ? 'hover:from-blue-500 hover:to-blue-600 hover:shadow-blue-500/30' : ''}
                          ${category.color === 'text-green-600' ? 'hover:from-green-500 hover:to-green-600 hover:shadow-green-500/30' : ''}
                          ${category.color === 'text-purple-600' ? 'hover:from-purple-500 hover:to-purple-600 hover:shadow-purple-500/30' : ''}
                          ${category.color === 'text-orange-600' ? 'hover:from-orange-500 hover:to-orange-600 hover:shadow-orange-500/30' : ''}
                          ${category.color === 'text-red-600' ? 'hover:from-red-500 hover:to-red-600 hover:shadow-red-500/30' : ''}
                          ${category.color === 'text-teal-600' ? 'hover:from-teal-500 hover:to-teal-600 hover:shadow-teal-500/30' : ''}
                          hover:text-white hover:font-semibold
                        `}
                      >
                        <span className="relative z-20 transition-all duration-300 group-hover:drop-shadow-sm">
                          {skill}
                        </span>
                        
                        {/* Efecto shimmer simplificado */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12" />
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills Statistics - Simplificado */}
        <div className="mt-20">
          <Card className="p-8 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-blue-600/5 border-0 relative overflow-hidden">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))",
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                  "linear-gradient(225deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))"
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  10+
                </motion.div>
                <p className="text-sm text-muted-foreground font-medium">Tecnologías Dominadas</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  3+
                </motion.div>
                <p className="text-sm text-muted-foreground font-medium">Años de Experiencia</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  6
                </motion.div>
                <p className="text-sm text-muted-foreground font-medium">Categorías Especializadas</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  100%
                </motion.div>
                <p className="text-sm text-muted-foreground font-medium">Pasión por la Innovación</p>
              </motion.div>
            </div>
          </Card>
        </div>

        {/* Technology Details Modal - Informativo */} {/*
        <Dialog open={!!selectedTech} onOpenChange={() => setSelectedTech(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            {selectedTech && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="section-heading">{selectedTech.name}</span>
                      <div className="text-sm text-muted-foreground mt-1 font-normal">
                        Guía informativa para entender esta tecnología
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Información detallada sobre {selectedTech.name}, incluyendo qué es, por qué es importante, ejemplos del mundo real, beneficios, industrias que lo usan y analogías para facilitar su comprensión.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  
                  {/* ¿Qué es? */} {/*
                  <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 mt-0.5">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="card-title text-blue-800 dark:text-blue-200 mb-2">¿Qué es {selectedTech.name}?</h4>
                        <p className="body-text text-blue-700 dark:text-blue-300 leading-relaxed">
                          {selectedTech.whatIs || selectedTech.description}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* ¿Por qué es importante? */} {/*
                  {selectedTech.whyImportant && (
                    <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50 mt-0.5">
                          <Lightbulb className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="card-title text-green-800 dark:text-green-200 mb-2">¿Por qué es importante?</h4>
                          <p className="body-text text-green-700 dark:text-green-300 leading-relaxed">
                            {selectedTech.whyImportant}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Ejemplo del mundo real */} {/*
                  {selectedTech.realWorldExample && (
                    <Card className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200/50">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 mt-0.5">
                          <Target className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="card-title text-orange-800 dark:text-orange-200 mb-2">Ejemplo del mundo real</h4>
                          <p className="body-text text-orange-700 dark:text-orange-300 leading-relaxed">
                            {selectedTech.realWorldExample}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Beneficios principales */} {/*
                  {selectedTech.benefits && (
                    <Card className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                          <Star className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="card-title text-purple-800 dark:text-purple-200">Beneficios principales</h4>
                      </div>
                      <div className="grid gap-3">
                        {selectedTech.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="body-text text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Industrias que lo usan */} {/*
                  {selectedTech.industries && (
                    <Card className="p-5 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-200/50">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/50">
                          <Users className="h-5 w-5 text-rose-600" />
                        </div>
                        <h4 className="card-title text-rose-800 dark:text-rose-200">Industrias que lo usan</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTech.industries.map((industry, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-white/70 dark:bg-black/30 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-700/50"
                          >
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Analogía */} {/*
                  {selectedTech.analogy && (
                    <Card className="p-5 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border-yellow-200/50">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 mt-0.5">
                          <Lightbulb className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="card-title text-yellow-800 dark:text-yellow-200 mb-2">En palabras simples</h4>
                          <p className="body-text text-yellow-700 dark:text-yellow-300 leading-relaxed italic">
                            {selectedTech.analogy}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Casos de uso (fallback) */} {/*
                  {selectedTech.useCases && !selectedTech.benefits && (
                    <Card className="p-5 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30 border-gray-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900/50">
                          <Target className="h-5 w-5 text-gray-600" />
                        </div>
                        <h4 className="card-title text-gray-800 dark:text-gray-200">Principales usos</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedTech.useCases.map((useCase, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="body-text text-gray-700 dark:text-gray-300 text-sm">
                              {useCase}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                  
                </div>
              </>
            )}
          </DialogContent>
        </Dialog> */}
      </div>
    </section>
  );
}