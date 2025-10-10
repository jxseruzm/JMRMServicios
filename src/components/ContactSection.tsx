import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import ScheduleCallModal from './ScheduleCallModal';
import { toast } from 'sonner';

export default function ContactSection() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    'bot-field': ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim()) return toast.error('Por favor, ingresa tu nombre'), false;
    if (!email.trim()) return toast.error('Por favor, ingresa tu email'), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Por favor, ingresa un email válido'), false;
    if (!subject.trim()) return toast.error('Por favor, ingresa un asunto'), false;
    if (!message.trim()) return toast.error('Por favor, escribe tu mensaje'), false;
    return true;
  };

  // x-www-form-urlencoded helper
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k] ?? ''))
      .join('&');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData['bot-field']) return; // honeypot

    setIsSubmitting(true);
    try {
      await fetch('/?no-cache=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          ...formData
        })
      });

      setShowSuccessAnimation(true);
      toast.success('¡Mensaje enviado correctamente!', {
        description: 'Te responderé en menos de 24 horas.',
        icon: <CheckCircle className="h-4 w-4" />
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        'bot-field': ''
      });

      setTimeout(() => setShowSuccessAnimation(false), 4000);
    } catch (error) {
      toast.error('Error al enviar el mensaje', {
        description: 'Inténtalo de nuevo o contáctame directamente.',
        icon: <AlertCircle className="h-4 w-4" />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@jmrmservices.es', href: 'mailto:contact@jmrmservices.es' },
    { icon: Phone, label: 'Teléfono', value: '+34 722 350 678', href: 'tel:+34722350678' },
    { icon: MapPin, label: 'Ubicación', value: 'Barcelona, España', href: '#' }
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/joseruz/', color: 'hover:text-blue-600' }
  ];

  const subtleParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i, x: 20 + i * 10, delay: i * 0.1, duration: 2, color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6'
  }));

  return (
    <section id="contacto" className="py-20 bg-muted/30 relative">
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
            onClick={() => setShowSuccessAnimation(false)}
          >
            {subtleParticles.map(p => (
              <motion.div key={p.id} className="absolute w-1.5 h-1.5 rounded-full opacity-40"
                style={{ backgroundColor: p.color, left: `${p.x}%`, top: '20%' }}
                initial={{ y: 0, opacity: 0 }} animate={{ y: [0, -30, -60], opacity: [0, 0.4, 0] }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
              />
            ))}
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} className="relative z-10"
            >
              <Card className="p-8 md:p-12 max-w-md mx-4 text-center shadow-xl border border-border/50 bg-card/95 backdrop-blur-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <motion.div animate={{ opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl scale-150"
                    />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }} className="space-y-3">
                  <h3 className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mensaje Enviado</h3>
                  <p className="text-muted-foreground">Gracias por tu interés, <strong className="text-foreground">{formData.name || 'estimado/a'}</strong></p>
                  <p className="text-sm text-muted-foreground">Responderé a <strong className="text-foreground">{formData.email}</strong> en menos de 24 horas</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Toca en cualquier lugar para continuar
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 id="titulo-contacto" className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trabajemos Juntos</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Columna info (sin cambios relevantes) */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <Card className="p-8 h-full">
                <h3 className="text-xl mb-8">Información de Contacto</h3>
                <div className="space-y-6 mb-8">
                  {[
                    { icon: Mail, label: 'Email', value: 'contact@jmrmservices.es', href: 'mailto:contact@jmrmservices.es' },
                    { icon: Phone, label: 'Teléfono', value: '+34 722 350 678', href: 'tel:+34722350678' },
                    { icon: MapPin, label: 'Ubicación', value: 'Barcelona, España', href: '#' }
                  ].map(info => (
                    <div key={info.label} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center"><info.icon className="h-5 w-5 text-blue-600" /></div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        {info.href && info.href !== '#' ? <a href={info.href} className="hover:text-blue-600 transition-colors">{info.value}</a> : <div>{info.value}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-6">
                  <h4 className="mb-4">Sígueme en</h4>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/joseruz/" target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center transition-colors hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg">
                  <h4 className="mb-2">Agenda una Llamada</h4>
                  <p className="text-sm text-muted-foreground mb-4">Hablemos sobre tu proyecto.</p>
                  <Button variant="outline" size="sm" onClick={() => setIsScheduleModalOpen(true)}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300">
                    Agendar Llamada
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Formulario Netlify */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <Card className="p-8 h-full">
                <h3 className="text-xl mb-8">Envía un Mensaje</h3>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* REQUERIDO por Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* Honeypot */}
                  <div className="hidden">
                    <Label htmlFor="bot-field">No llenar este campo</Label>
                    <input id="bot-field" name="bot-field" onChange={handleInputChange} value={formData['bot-field']} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Tu nombre" className="mt-1" disabled={isSubmitting} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" className="mt-1" disabled={isSubmitting} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Tu empresa" className="mt-1" disabled={isSubmitting} />
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="¿En qué puedo ayudarte?" className="mt-1" disabled={isSubmitting} />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Cuéntame más..." className="mt-1 min-h-32" disabled={isSubmitting} />
                  </div>

                  <div className="text-sm text-muted-foreground">* Campos obligatorios</div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Enviando...</>) : (<><Send className="h-4 w-4 mr-2" />Enviar Mensaje</>)}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">📧 Respondo en menos de 24 horas. Si es urgente, no dudes en llamarme directamente.</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <ScheduleCallModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
    </section>
  );
}
