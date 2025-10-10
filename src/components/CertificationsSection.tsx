import { motion } from 'motion/react';
import { Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function CertificationsSection() {
  const certifications = [
    {
      name: "Arquitectura Big Data con Spark y Hadoop",
      issuer: "Apache Foundation",
      date: "2024",
      credentialId: "APACHE-BD-2024-001",
      description: "Certificación especializada en arquitecturas Big Data usando Apache Spark y Hadoop para procesamiento distribuido de grandes volúmenes de datos.",
      skills: ["Apache Spark", "Hadoop HDFS", "MapReduce", "Spark SQL", "PySpark", "Scala", "Big Data Architecture"],
      status: "Activa",
      level: "Profesional",
      validity: "3 años",
      logo: "⚡"
    }
  ];

  const upcomingCerts = [];

  return (
    <section id="certificaciones" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="titulo-certificaciones" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certificaciones Profesionales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Certificación especializada que valida mi expertise en arquitecturas Big Data 
            y procesamiento distribuido de grandes volúmenes de datos.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Active Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl mb-8 text-center flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Certificación Profesional
            </h3>
            
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-800 text-xs"
                      >
                        {cert.status}
                      </Badge>
                    </div>

                    {/* Logo and header */}
                    <div className="mb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">{cert.logo}</div>
                        <div className="flex-1">
                          <h4 className="text-lg leading-tight mb-1">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {cert.date}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {cert.level}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="text-xs text-muted-foreground mb-2">Habilidades:</div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Válida: {cert.validity}</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Verificar
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>



          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
              <div className="grid grid-cols-2 gap-6 text-center max-w-md mx-auto">
                <div>
                  <div className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    1
                  </div>
                  <div className="text-sm text-muted-foreground">Certificación Especializada</div>
                </div>
                <div>
                  <div className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground">Enfoque Big Data</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}