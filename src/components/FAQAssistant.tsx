import { useState } from 'react';
import { HelpCircle, X, ChevronDown, MessageCircle, Clock, DollarSign, Code, Users, Phone, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: 'services' | 'pricing' | 'process' | 'tech' | 'contact';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: '¿Qué servicios de automatización ofreces?',
    answer: 'Ofrezco automatización completa de procesos empresariales, dashboards interactivos, integración de APIs, limpieza y análisis de datos, y sistemas de reportes automáticos. Todo enfocado en ahorrar tiempo y aumentar la eficiencia de tu empresa.',
    icon: <Zap className="h-4 w-4" />,
    category: 'services'
  },
  {
    id: '2',
    question: '¿Cuánto tiempo toma implementar una solución?',
    answer: 'Dependiendo de la complejidad: proyectos simples (dashboards básicos) toman 1-2 semanas, proyectos medianos (automatizaciones complejas) 3-4 semanas, y proyectos grandes (sistemas completos) 6-8 semanas. Siempre con entregables semanales.',
    icon: <Clock className="h-4 w-4" />,
    category: 'process'
  },
  {
    id: '3',
    question: '¿Cómo funcionan los precios de tus servicios?',
    answer: 'Trabajo con presupuestos fijos basados en el alcance del proyecto. Ofrezco consulta gratuita inicial para evaluar tus necesidades y proporcionar un presupuesto detallado. También tengo opciones de mantenimiento mensual para sistemas implementados.',
    icon: <DollarSign className="h-4 w-4" />,
    category: 'pricing'
  },
  {
    id: '4',
    question: '¿Qué tecnologías utilizas en tus proyectos?',
    answer: 'Uso Python para automatización y análisis, SQL para bases de datos, Power BI y Tableau para visualización, APIs REST para integraciones, y herramientas cloud como AWS y Azure. Todo seleccionado según las necesidades específicas de tu proyecto.',
    icon: <Code className="h-4 w-4" />,
    category: 'tech'
  },
  {
    id: '5',
    question: '¿Trabajas con empresas de todos los tamaños?',
    answer: 'Sí, desde startups hasta grandes corporaciones. Adapto mis soluciones al tamaño y presupuesto de cada empresa. Las pequeñas empresas suelen empezar con dashboards simples, mientras que las grandes implementan sistemas más complejos.',
    icon: <Users className="h-4 w-4" />,
    category: 'contact'
  },
  {
    id: '6',
    question: '¿Cómo puedo contactarte para un proyecto?',
    answer: 'Puedes contactarme a través de LinkedIn, email (contact@jmrmservices.es), o WhatsApp. Ofrezco una consulta gratuita de 30 minutos para entender tus necesidades y ver cómo puedo ayudarte.',
    icon: <Phone className="h-4 w-4" />,
    category: 'contact'
  }
];

export default function FAQAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleContactClick = () => {
    const contactElement = document.getElementById('titulo-contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Botón flotante - muy simplificado */}
      <div className="fixed bottom-6 left-6 z-40 group">
        <Button
          onClick={toggleOpen}
          size="lg"
          className={`
            relative h-14 w-14 rounded-full shadow-lg transition-all duration-300 text-sm font-medium
            ${isOpen 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }
            hover:shadow-xl hover:scale-110 border-2 border-white/20
          `}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              {/* Indicador mejorado */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-sm" />
            </>
          )}
        </Button>

        {/* Tooltip simplificado */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 
                       bg-foreground text-background px-3 py-2 rounded-lg text-sm 
                       whitespace-nowrap pointer-events-none
                       opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200 z-50">
            ¿Tienes preguntas?
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground" />
          </div>
        )}
      </div>

      {/* Panel FAQ - simplificado */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-200"
            onClick={toggleOpen}
          />

          {/* FAQ Panel - Más grande y llamativo */}
          <div className="fixed bottom-20 left-6 z-40 w-[420px] max-w-[calc(100vw-3rem)]
                        transform transition-all duration-300 ease-out">
            <Card className="shadow-2xl border-2 border-gradient bg-gradient-to-br from-card/98 to-card/95 backdrop-blur-md">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  Preguntas Frecuentes
                </CardTitle>
                <p className="text-muted-foreground">
                  Encuentra respuestas rápidas sobre mis servicios de automatización
                </p>
              </CardHeader>
              
              <CardContent className="space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {faqData.map((faq, index) => (
                  <Collapsible
                    key={faq.id}
                    open={openItems.includes(faq.id)}
                    onOpenChange={() => toggleItem(faq.id)}
                  >
                    <CollapsibleTrigger className={`
                      flex items-start gap-4 w-full p-4 rounded-xl transition-all duration-300 text-left
                      hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-purple-50/70 
                      hover:dark:from-blue-950/30 hover:dark:to-purple-950/30
                      hover:shadow-lg hover:scale-[1.02] group
                      ${openItems.includes(faq.id) 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 shadow-md' 
                        : 'hover:border-blue-200/50'
                      }
                    `}>
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                        ${openItems.includes(faq.id)
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white'
                        }
                      `}>
                        {faq.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className={`
                          font-semibold leading-relaxed transition-colors duration-300
                          ${openItems.includes(faq.id) 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'group-hover:text-blue-600'
                          }
                        `}>
                          {faq.question}
                        </p>
                      </div>
                      <ChevronDown className={`
                        h-5 w-5 transition-all duration-300 flex-shrink-0
                        ${openItems.includes(faq.id) 
                          ? 'rotate-180 text-blue-600' 
                          : 'text-muted-foreground group-hover:text-blue-600'
                        }
                      `} />
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out 
                                                 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                                                 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2
                                                 data-[state=open]:duration-300 data-[state=closed]:duration-200">
                      <div className="ml-14 mr-4 pb-4">
                        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/30 dark:border-blue-800/30">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                
                {/* CTA para contacto - Mejorado */}
                <div className="pt-6 border-t-2 border-gradient-to-r from-blue-200/50 to-purple-200/50">
                  <div className="text-center mb-3">
                    <p className="text-muted-foreground font-medium">
                      ¿No encuentras lo que buscas?
                    </p>
                  </div>
                  <Button 
                    onClick={handleContactClick}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                             hover:from-blue-700 hover:to-purple-700 transition-all duration-300
                             hover:shadow-lg hover:scale-[1.02] font-semibold text-white
                             py-3 h-auto"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Contacta conmigo directamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}