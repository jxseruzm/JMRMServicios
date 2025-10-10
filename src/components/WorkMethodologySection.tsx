import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Code, 
  Rocket, 
  LifeBuoy,
  ArrowRight,
  CheckCircle,
  Target,
  Users,
  Shield,
  Zap
} from 'lucide-react';
import { Card } from './ui/card';

export default function WorkMethodologySection() {
  const methodologySteps = [
    {
      icon: MessageCircle,
      number: "01",
      title: "Análisis",
      description: "Evaluamos tu situación y definimos objetivos claros.",
      features: ["Propuesta técnica", "Plan de acción"],
      gradient: "from-blue-500 via-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-500",
      glowColor: "shadow-blue-500/20"
    },
    {
      icon: Code,
      number: "02", 
      title: "Desarrollo",
      description: "Desarrollo iterativo con entregas semanales.",
      features: ["Demos regulares", "Código documentado"],
      gradient: "from-emerald-500 via-teal-600 to-green-600",
      bgGradient: "from-emerald-50 to-teal-50", 
      borderColor: "border-emerald-500",
      glowColor: "shadow-emerald-500/20"
    },
    {
      icon: Rocket,
      number: "03",
      title: "Despliegue", 
      description: "Lanzamiento sin downtime y configuración completa.",
      features: ["Deploy automático", "Monitoreo activo"],
      gradient: "from-orange-500 via-amber-600 to-yellow-600",
      bgGradient: "from-orange-50 to-yellow-50",
      borderColor: "border-orange-500", 
      glowColor: "shadow-orange-500/20"
    },
    {
      icon: LifeBuoy,
      number: "04",
      title: "Soporte",
      description: "Mantenimiento continuo y mejoras basadas en feedback.",
      features: ["Soporte técnico", "Actualizaciones"],
      gradient: "from-purple-500 via-violet-600 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-500",
      glowColor: "shadow-purple-500/20"
    }
  ];

  const workingPrinciples = [
    { 
      icon: Target, 
      title: "Resultados", 
      description: "Código orientado a valor de negocio",
      gradient: "from-red-500 to-pink-600",
      bgColor: "bg-red-50"
    },
    { 
      icon: Users, 
      title: "Transparencia", 
      description: "Updates regulares y acceso total",
      gradient: "from-blue-500 to-indigo-600", 
      bgColor: "bg-blue-50"
    },
    { 
      icon: Shield, 
      title: "Calidad", 
      description: "Testing automatizado y best practices",
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    { 
      icon: Zap, 
      title: "Agilidad", 
      description: "Resultados tangibles desde semana 1",
      gradient: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Metodología de Trabajo
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proceso probado que combina <span className="text-blue-600 font-semibold">agilidad</span> y 
            <span className="text-purple-600 font-semibold"> calidad</span> para resultados garantizados.
          </p>
        </motion.div>

        {/* Process Steps - Distinctive Layout */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className={`relative p-6 h-full transition-all duration-500 hover:shadow-2xl ${step.glowColor} border-2 ${step.borderColor}/20 hover:${step.borderColor} bg-gradient-to-br ${step.bgGradient} group overflow-hidden`}>
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <div className={`w-32 h-32 bg-gradient-to-br ${step.gradient} rounded-full blur-3xl -top-16 -right-16 absolute`}></div>
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-full blur-2xl -bottom-12 -left-12 absolute`}></div>
                  </div>
                  

                  
                  {/* Icon and Title Container - Side by side */}
                  <div className="relative z-10 mb-4">
                    <div className={`relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <step.icon className="h-8 w-8 relative z-10" />
                      </div>
                      
                      {/* Title inside the rectangle */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-white truncate">
                          {step.title}
                        </h4>
                      </div>
                      
                      {/* Number badge - prominent */}
                      <div className="flex-shrink-0 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-white/30">
                        <span className="text-sm font-black text-white">
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Pulsing effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 animate-pulse`}></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step.features.map((feature, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <CheckCircle className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Working Principles - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h4 className="text-xl mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            💎 Principios de Trabajo
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {workingPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className={`text-center p-4 hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-opacity-50 ${principle.bgColor} relative overflow-hidden`}>
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${principle.gradient} rounded-full blur-2xl -top-8 -right-8 absolute`}></div>
                  </div>
                  
                  {/* Icon with enhanced styling */}
                  <div className="relative z-10 mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${principle.gradient} text-white w-fit mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <principle.icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h5 className={`text-sm mb-2 font-bold bg-gradient-to-r ${principle.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                      {principle.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-tight group-hover:text-foreground transition-colors duration-300">
                      {principle.description}
                    </p>
                  </div>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-600/5 to-purple-600/5 border border-blue-200">
            <h4 className="text-lg mb-3">¿Listo para optimizar tu proyecto de datos?</h4>
            <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
              30 minutos gratuitos para analizar tu situación y proponerte un plan de acción concreto.
            </p>
            <a
              href="#titulo-contacto"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 h-10 px-6 py-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
            >
              Consulta Gratuita
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}