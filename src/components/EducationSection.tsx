import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function EducationSection() {
  const education = [
    {
      degree: "Grado en Ingeniería Informática",
      institution: "Universidad de Santiago de Compostela",
      location: "Santiago de Compostela, España",
      period: "2018 - 2022",
      type: "Grado Universitario",
      description: "Formación integral en ingeniería de software, bases de datos, algoritmos y estructuras de datos. Especialización en desarrollo de sistemas y arquitecturas de datos.",
      highlights: [
        "Especialización en Bases de Datos y Big Data",
        "Proyecto Final: Sistema de Analytics en Tiempo Real",
        "Participación en competiciones de programación",
        "Colaboración en proyectos de investigación en IA"
      ],
      gpa: "8.2/10",
      status: "Graduado"
    },
    {
      degree: "Máster en Big Data y Data Science",
      institution: "Universidad Complutense de Madrid",
      location: "Madrid, España", 
      period: "2022 - 2023",
      type: "Máster Oficial",
      description: "Especialización avanzada en tecnologías Big Data, machine learning, y arquitecturas distribuidas. Enfoque en soluciones empresariales y casos de uso reales.",
      highlights: [
        "Especialización en Apache Spark y Hadoop",
        "Proyecto: Pipeline ML para predicción financiera",
        "Prácticas en empresa líder del sector",
        "Certificación en AWS y Azure incluida"
      ],
      gpa: "9.1/10",
      status: "Graduado con Distinción"
    },
    {
      degree: "Certificación Data Engineering Nanodegree",
      institution: "Udacity",
      location: "Online",
      period: "2023",
      type: "Nanodegree",
      description: "Programa intensivo especializado en ingeniería de datos moderna, incluyendo cloud computing, pipelines distribuidos y arquitecturas escalables.",
      highlights: [
        "5 proyectos prácticos completados",
        "Especialización en AWS Data Services",
        "Mentorías 1:1 con expertos de la industria",
        "Portfolio de proyectos en producción"
      ],
      gpa: "Excelente",
      status: "Completado"
    }
  ];

  return (
    <section id="formacion" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="titulo-formacion" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Formación Académica
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi base académica sólida que sustenta mi experiencia profesional 
            en ingeniería de datos y tecnologías emergentes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline line */}
                {index < education.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-40 bg-border hidden md:block"></div>
                )}
                
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-xl">{edu.degree}</h3>
                          <Badge 
                            variant="secondary" 
                            className={`${
                              edu.status.includes('Distinción') 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {edu.status}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground mb-1">{edu.institution}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {edu.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {edu.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {edu.gpa}
                          </div>
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {edu.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{edu.description}</p>

                      <div>
                        <h4 className="text-sm mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          Aspectos Destacados:
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {edu.highlights.map((highlight, idx) => (
                            <div key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-blue-600 mr-2 mt-1">•</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}