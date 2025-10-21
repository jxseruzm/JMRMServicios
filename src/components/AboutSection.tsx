import { Database, TrendingUp, Clock, Shield, GraduationCap, Award } from 'lucide-react';
import { Card } from './ui/card';
import profileImage from '../assets/Perfil.png';

export default function AboutSection() {
  const achievements = [
    {
      icon: Database,
      title: "Big Data",
      description: "Arquitecturas escalables y procesamiento masivo de datos"
    },
    {
      icon: TrendingUp,
      title: "Optimización",
      description: "Mejora continua de procesos y performance de sistemas"
    },
    {
      icon: Clock,
      title: "Automatización",
      description: "Eliminación de tareas manuales y ahorro de tiempo"
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Sistemas robustos con alta disponibilidad y calidad"
    }
  ];

  const credentials = [
    {
      icon: GraduationCap,
      title: "Formación Académica",
      items: [
        "Máster en Data Science - Nuclio Digital School",
        "Grado Superior en Administración de Sistemas - IES Grán Capitan, Córdoba"
      ]
    },
    {
      icon: Award,
      title: "Especialización",
      items: [
        "Arquitecturas de Big Data",
        "Pipelines de datos en tiempo real",
        "Automatización de procesos"
      ]
    }
  ];

  return (
    <section id="sobre-mi" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="titulo-sobre-mi" className="text-3xl md:text-4xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sobre Mí
            </h2>
            
            {/* Imagen de perfil destacada */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-600 to-purple-600 shadow-2xl shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={profileImage}
                      alt="José Ruz - Data Engineer especializado en Big Data"
                      className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                {/* Badge flotante */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border-2 border-white">
                  ✓ Data Engineer
                </div>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Soy <span className="text-blue-600 font-semibold">José Ruz</span>, Data Engineer especializado en <strong>Big Data</strong> y <strong>automatización de procesos</strong>. 
              Con formación en Data Science y experiencia en administración de sistemas, me dedico a crear 
              soluciones que transforman datos complejos en <em className="text-purple-600">insights accionables</em> y sistemas eficientes 
              que ahorran tiempo y recursos a las organizaciones.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Mi Enfoque */}
            <div className="space-y-6">
              <h3 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Mi Enfoque Profesional
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Me especializo en diseñar y construir <strong>arquitecturas de datos robustas</strong> que 
                  no solo procesan grandes volúmenes de información, sino que lo hacen de manera eficiente 
                  y escalable. Mi enfoque está en la <strong>automatización inteligente</strong> que elimina 
                  tareas repetitivas y optimiza procesos empresariales.
                </p>
                <p className="text-muted-foreground">
                  Desde la implementación de <em>pipelines de datos en tiempo real</em> hasta la creación 
                  de sistemas de monitoreo avanzados, cada proyecto está diseñado para maximizar el 
                  <strong>ROI</strong> y proporcionar <strong>insights valiosos</strong> para la toma de decisiones estratégicas.
                </p>
                <p className="text-muted-foreground">
                  Mi formación en Data Science por <strong>Nuclio Digital School</strong> y mi experiencia 
                  en administración de sistemas me permite abordar proyectos desde una perspectiva integral, 
                  considerando tanto la arquitectura técnica como las necesidades del negocio.
                </p>
              </div>
            </div>

            {/* Credenciales y Especialización */}
            <div className="space-y-6">
              {credentials.map((credential) => (
                <div key={credential.title}>
                  <Card className="p-6 bg-gradient-to-br from-blue-600/5 to-purple-600/5 border-blue-200/20 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <credential.icon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {credential.title}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {credential.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Áreas de Especialización */}
          <div className="mb-16">
            <h3 className="text-2xl text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Áreas de Especialización
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.title}>
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-blue-600/5 to-purple-600/5 border-blue-200/20">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3+
              </div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                7+
              </div>
              <div className="text-sm text-muted-foreground">Proyectos completados</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Satisfacción del cliente</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Sistemas funcionando</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}