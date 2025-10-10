import { motion } from 'motion/react';
import { MapPin, Calendar, Briefcase, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Data Engineer",
      company: "Segittur (Logicalis)",
      location: "España",
      period: "Mayo 2025 - Presente",
      type: "Tiempo Completo",
      description: "Desarrollo de flujos y pipelines de datos robustos utilizando IBM Cloud Pak for Data. Especializado en virtualización de datos para mejorar la accesibilidad y eficiencia operacional.",
      achievements: [
        "Desarrollo de flujos y pipelines con IBM Cloud Pak for Data",
        "Implementación de virtualización de datos mejorando eficiencia",
        "Creación de scripts Python y PowerShell para consumo de APIs",
        "Diseño de arquitectura de datos medallón (Bronze-Silver-Gold)"
      ],
      technologies: ["IBM Cloud Pak for Data", "Python", "PowerShell", "Data Virtualization", "Medallion Architecture"]
    },
    {
      title: "Data Engineer",
      company: "Fitness KPI",
      location: "España",
      period: "Abril 2025 - Mayo 2025",
      type: "Tiempo Completo",
      description: "Desarrollo de procesos ETL especializados en el sector fitness, con enfoque en la integración y procesamiento de datos de rendimiento deportivo y métricas de salud.",
      achievements: [
        "Implementación de procesos ETL con Talend",
        "Desarrollo de soluciones de consumo de APIs",
        "Optimización de pipelines de datos para métricas KPI",
        "Integración de múltiples fuentes de datos fitness"
      ],
      technologies: ["Talend", "ETL", "APIs", "Data Integration"]
    },
    {
      title: "Data Engineer",
      company: "Xunta de Galicia (NTT DATA)",
      location: "Galicia, España",
      period: "Junio 2024 - Noviembre 2024",
      type: "Tiempo Completo",
      description: "Desarrollo de soluciones de inteligencia de negocios para el sector público. Especializado en la generación de informes ejecutivos y diseño de arquitecturas de datos gubernamentales.",
      achievements: [
        "Desarrollo de procesos ETL complejos con Talend",
        "Generación de informes ejecutivos con SAP BusinessObjects",
        "Diseño de arquitectura de datos en Universo SAP",
        "Implementación de soluciones BI para el sector público"
      ],
      technologies: ["Talend", "SAP BusinessObjects", "SAP Universe", "ETL", "Business Intelligence"]
    },
    {
      title: "Data Engineer",
      company: "Seguros RGA (NTT DATA)",
      location: "España",
      period: "Julio 2023 - Mayo 2024",
      type: "Tiempo Completo",
      description: "Gestión integral de datos en el sector asegurador, con enfoque en la resolución de incidencias críticas y optimización de procesos orquestadores para mejorar la operativa diaria.",
      achievements: [
        "Gestión y resolución de incidencias críticas de datos",
        "Diseño y optimización de procesos orquestadores",
        "Desarrollo de procesos automatizados de datos",
        "Implementación de mejoras en flujos operacionales"
      ],
      technologies: ["Data Orchestration", "Process Design", "Incident Management", "Data Operations"]
    },
    {
      title: "Junior Data Engineer",
      company: "Bankinter (NTT DATA)",
      location: "España",
      period: "Septiembre 2022 - Julio 2023",
      type: "Tiempo Completo",
      description: "Inicio de mi carrera profesional en el sector bancario, desarrollando competencias fundamentales en ingeniería de datos con enfoque en ETL, calidad de datos y control de versiones.",
      achievements: [
        "Desarrollo de flujos ETL robustos con IBM DataStage",
        "Implementación de sistemas de integridad y monitoreo ETL",
        "Dominio de SQL avanzado para análisis complejos",
        "Establecimiento de procesos de gestión de versiones"
      ],
      technologies: ["IBM DataStage", "SQL", "ETL", "Data Monitoring", "Version Control"]
    }
  ];



  const certifications = [
    "Arquitectura Big Data con Spark y Hadoop"
  ];

  return (
    <section id="experiencia" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="titulo-experiencia" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experiencia Profesional</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi trayectoria profesional construyendo soluciones de datos 
            que impulsan el crecimiento empresarial.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-32 bg-border hidden md:block"></div>
                )}
                
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-xl">{exp.title}</h3>
                          <Badge variant="secondary">{exp.type}</Badge>
                        </div>
                        <div className="text-muted-foreground mb-1">{exp.company}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm mb-2">Logros Principales:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm mb-2">Tecnologías:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="p-8 bg-gradient-to-br from-purple-600/5 to-blue-600/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Certificaciones Profesionales
                </h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-600/5 to-blue-600/5 border border-purple-200/20 hover:border-purple-300/30 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-sm leading-relaxed">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}