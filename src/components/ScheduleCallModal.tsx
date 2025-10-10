import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, MessageCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ScheduleCallModalProps { isOpen: boolean; onClose: () => void; }
type Step = 'select-date' | 'fill-form' | 'confirmation';
interface TimeSlot { id: string; time: string; available: boolean; }
interface WeekDate { date: string; day: number; month: string; weekday: string; fullWeekday: string; isWeekend: boolean; isPast: boolean; isAvailable: boolean; }
type ServiceCategoryValue = 'data-engineering' | 'automation' | 'ai-ml' | 'consulta-general';
interface ServiceCategory { value: ServiceCategoryValue; label: string; }
interface ServiceItem { value: string; label: string; }

const serviceCategories: ServiceCategory[] = [
  { value: 'data-engineering', label: 'Data Engineering' },
  { value: 'automation', label: 'Automatización' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'consulta-general', label: 'Consulta General' },
];

const servicesByCategory: Record<ServiceCategoryValue, ServiceItem[]> = {
  'data-engineering': [
    { value: 'procesamiento-big-data', label: 'Procesamiento Big Data' },
    { value: 'arquitectura-data-lake', label: 'Arquitectura Data Lake' },
    { value: 'analytics-tiempo-real', label: 'Analytics en Tiempo Real' },
    { value: 'migracion-nube', label: 'Migración a la Nube' },
  ],
  automation: [
    { value: 'automatizacion-pipelines', label: 'Automatización de Pipelines' },
    { value: 'web-scraping-data-mining', label: 'Web Scraping & Data Mining' },
    { value: 'recordatorio-pagos-mensual', label: 'Sistema de Recordatorio de Pagos Mensual' },
  ],
  'ai-ml': [
    { value: 'mlops-machine-learning', label: 'MLOps & Machine Learning' },
    { value: 'chatbot-whatsapp', label: 'ChatBot WhatsApp' },
    { value: 'creacion-contenido-rrss', label: 'Creación Automática de Contenido en RRSS' },
  ],
  'consulta-general': [
    { value: 'evaluacion-proyecto', label: 'Evaluación de Proyecto' },
    { value: 'consultoria-estrategica', label: 'Consultoría Estratégica' },
    { value: 'analisis-necesidades', label: 'Análisis de Necesidades' },
  ],
};

export default function ScheduleCallModal({ isOpen, onClose }: ScheduleCallModalProps) {
  const [step, setStep] = useState<Step>('select-date');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<{
    name: string; email: string; phone: string; company: string;
    category: '' | ServiceCategoryValue; service: string; notes: string;
  }>({ name: '', email: '', phone: '', company: '', category: '', service: '', notes: '' });

  // ---- disponibilidad (busy) ----
  const [busyIntervals, setBusyIntervals] = useState<Array<{ start: Date; end: Date }>>([]);
  const [busyLoading, setBusyLoading] = useState(false);
  const CALENDAR_UID = 'b6d05b30669242deaa1653441a76abce';

  // Parser robusto: acepta 20251012T120000+0200 | ...Z | ISO normal
  const parseAnyDate = (input: unknown): Date => {
    if (!input) return new Date(NaN);

    if (typeof input === 'string' && /^\d{8}T\d{6}(Z|[+-]\d{4})$/.test(input)) {
      const iso = input.replace(
        /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z|[+-]\d{4})$/,
        (_m, Y, Mo, D, H, Mi, S, off) =>
          `${Y}-${Mo}-${D}T${H}:${Mi}:${S}${off === 'Z' ? 'Z' : off.replace(/([+-])(\d{2})(\d{2})/, '$1$2:$3')}`
      );
      return new Date(iso);
    }

    if (typeof input === 'string' && !Number.isNaN(Date.parse(input))) {
      return new Date(input);
    }

    return new Date(NaN);
  };

  // margen para evitar “bailar” en frontera de segundos
  const OVERLAP_EPS_MS = 60 * 1000;
  const overlaps = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) =>
    aStart.getTime() < bEnd.getTime() - OVERLAP_EPS_MS &&
    bStart.getTime() < aEnd.getTime() - OVERLAP_EPS_MS;

  // slots base
  const baseSlots = useMemo<TimeSlot[]>(() => ([
    { id: '12:00', time: '12:00', available: true },
    { id: '13:00', time: '13:00', available: true },
    { id: '18:00', time: '18:00', available: true },
  ]), []);

  // carga disponibilidad del día (usa busy; si no, cae a events[].dateandtime)
  useEffect(() => {
    const loadBusy = async () => {
      setBusyIntervals([]);
      setBusyLoading(true);
      setSelectedTime(''); // resetea selección al cambiar de día
      if (!selectedDate) { setBusyLoading(false); return; }
      try {
        const res = await fetch('/api/zoho/day-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateYMD: selectedDate, calendar_uid: CALENDAR_UID }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.error('day-events FAIL', res.status, data);
          setBusyLoading(false);
          return;
        }

        let intervals: Array<{ start: Date; end: Date }> = [];

        if (Array.isArray(data.busy)) {
          intervals = (data.busy as Array<{ start: string; end: string }>)
            .map((b): { start: Date; end: Date } => ({ start: parseAnyDate(b.start), end: parseAnyDate(b.end) }))
            .filter((x: { start: Date; end: Date }) => !Number.isNaN(x.start.valueOf()) && !Number.isNaN(x.end.valueOf()));
        }

        if (!intervals.length && Array.isArray(data.events)) {
          intervals = (data.events as Array<{ dateandtime?: { start: string; end: string }; dateAndTime?: { start: string; end: string } }>)
            .map((ev): { start: Date; end: Date } => {
              const dt = ev?.dateandtime ?? ev?.dateAndTime ?? ({} as { start?: string; end?: string });
              return { start: parseAnyDate(dt.start), end: parseAnyDate(dt.end) };
            })
            .filter((x: { start: Date; end: Date }) => !Number.isNaN(x.start.valueOf()) && !Number.isNaN(x.end.valueOf()));
        }

        setBusyIntervals(intervals);
      } catch (e) {
        console.error(e);
      } finally {
        setBusyLoading(false);
      }
    };
    loadBusy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  // recalcula slots con busy
  const getAvailableTimeSlots = (): TimeSlot[] => {
    if (!selectedDate) return [];
    const d = new Date(selectedDate);
    const isSaturday = d.getDay() === 6;
    const base = isSaturday ? [{ id: '12:00', time: '12:00', available: true }] as TimeSlot[] : baseSlots;

    return base.map((slot) => {
      const start = new Date(`${selectedDate}T${slot.time}:00`);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      const isBusy = busyIntervals.some((b) => overlaps(start, end, b.start, b.end));
      return { ...slot, available: slot.available && !isBusy };
    });
  };

  // si el slot elegido pasa a ocupado tras cargar busy, lo anulamos
  useEffect(() => {
    if (!selectedTime || !selectedDate) return;
    const slots = getAvailableTimeSlots();
    const chosen = slots.find((s) => s.time === selectedTime);
    if (chosen && !chosen.available) setSelectedTime('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busyIntervals]);

  const getAvailableServices = (): ServiceItem[] =>
    formData.category ? servicesByCategory[formData.category] : [];

  const generateCurrentWeek = (weekOffset: number = 0): WeekDate[] => {
    const today = new Date();
    const todayYMD = new Date(today.toDateString());
    const startOfWeek = new Date(todayYMD);
    const dow = todayYMD.getDay();
    const deltaToMonday = dow === 0 ? -6 : 1 - dow;
    startOfWeek.setDate(startOfWeek.getDate() + deltaToMonday + weekOffset * 7);

    const weekDates: WeekDate[] = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const isPast = currentDate < todayYMD;
      weekDates.push({
        date: currentDate.toISOString().split('T')[0],
        day: currentDate.getDate(),
        month: currentDate.toLocaleDateString('es-ES', { month: 'short' }),
        weekday: currentDate.toLocaleDateString('es-ES', { weekday: 'short' }),
        fullWeekday: currentDate.toLocaleDateString('es-ES', { weekday: 'long' }),
        isWeekend: currentDate.getDay() === 6,
        isPast,
        isAvailable: !isPast,
      });
    }
    return weekDates;
  };

  const currentWeekDates = generateCurrentWeek(currentWeekOffset);

  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'next') setCurrentWeekOffset((p) => p + 1);
    else if (direction === 'prev' && currentWeekOffset > 0) setCurrentWeekOffset((p) => p - 1);
  };

  const getWeekRange = (): string => {
    if (currentWeekDates.length < 6) return '';
    const firstDay = currentWeekDates[0];
    const lastDay = currentWeekDates[5];
    return `${firstDay.day} ${firstDay.month} - ${lastDay.day} ${lastDay.month}`;
  };

  const handleDateTimeSelect = () => {
    // Revalida por si algo cambió justo ahora
    const slot = getAvailableTimeSlots().find(s => s.time === selectedTime);
    if (!selectedDate || !selectedTime || !slot?.available) return;
    setStep('fill-form');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = formData.email.trim();
    const slot = getAvailableTimeSlots().find(s => s.time === selectedTime);
    if (!selectedDate || !selectedTime || !email || !slot?.available) return;

    setIsSubmitting(true);
    try {
      const start = new Date(`${selectedDate}T${selectedTime}:00`);
      const end = new Date(start.getTime() + 30 * 60 * 1000);

      const payload = {
        title: 'Consulta de datos (30 min)',
        description: `${formData.name} – ${formData.category || 'General'}/${formData.service || 'Consulta'}\n${formData.notes || ''}`,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
        timezone: 'Europe/Madrid',
        calendar_uid: CALENDAR_UID,
        attendees: [{ email, permission: 1, attendance: 1 }],
      };

      const res = await fetch('/api/zoho/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: unknown = {};
      try { data = JSON.parse(text); } catch {}
      if (!res.ok) {
        console.error('Create event FAIL', res.status, data || text);
        throw new Error(typeof data === 'object' ? JSON.stringify(data) : text);
      }
      setStep('confirmation');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('select-date');
    setSelectedDate('');
    setSelectedTime('');
    setCurrentWeekOffset(0);
    setFormData({ name: '', email: '', phone: '', company: '', category: '', service: '', notes: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto p-0 m-2 sm:m-4">
        <DialogTitle className="sr-only">Agendar Consulta Gratuita</DialogTitle>
        <DialogDescription className="sr-only">
          Charlemos sobre tu proyecto de datos - 30 minutos gratis. Selecciona fecha, hora y completa tus datos.
        </DialogDescription>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="relative">
          <div className="p-3 sm:p-4 lg:p-6 border-b">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl">Agendar Consulta Gratuita</h2>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">Charlemos sobre tu proyecto de datos - 30 minutos gratis</p>
            </div>

            <div className="flex items-center mt-4 sm:mt-6 space-x-1 sm:space-x-2 overflow-x-auto">
              {['Fecha y hora', 'Información', 'Confirmación'].map((stepName, index) => {
                const order: Step[] = ['select-date', 'fill-form', 'confirmation'];
                const currentIndex = order.indexOf(step);
                const done = index < currentIndex;
                const active = index === currentIndex;

                return (
                  <div key={stepName} className="flex items-center flex-shrink-0">
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                        active ? 'bg-blue-600 text-white' : done ? 'bg-green-600 text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {done ? <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> : index + 1}
                    </div>
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm truncate">{stepName}</span>
                    {index < 2 && <div className="w-4 sm:w-8 h-px bg-border mx-2 sm:mx-4" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 sm:p-4 lg:p-6">
            <AnimatePresence mode="wait">
              {step === 'select-date' && (
                <motion.div key="select-date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                        <h3 className="flex items-center gap-2 text-sm sm:text-base">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          Selecciona una fecha
                        </h3>
                        <div className="flex items-center gap-2 justify-center sm:justify-end">
                          <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')} disabled={currentWeekOffset === 0} className="h-7 w-7 sm:h-8 sm:w-8">
                            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="text-xs sm:text-sm text-muted-foreground min-w-20 sm:min-w-32 text-center">{getWeekRange()}</span>
                          <Button variant="outline" size="icon" onClick={() => navigateWeek('next')} disabled={currentWeekOffset >= 8} className="h-7 w-7 sm:h-8 sm:w-8">
                            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                        {currentWeekDates.map((date: WeekDate) => (
                          <Button
                            key={date.date}
                            variant={selectedDate === date.date ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedDate(date.date)}
                            disabled={!date.isAvailable}
                            className={`flex flex-col h-16 sm:h-20 p-2 sm:p-3 ${
                              !date.isAvailable
                                ? 'opacity-50 cursor-not-allowed'
                                : selectedDate === date.date
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                            }`}
                          >
                            <span className="text-xs capitalize">{date.weekday}</span>
                            <span className={`text-sm ${selectedDate === date.date ? 'font-semibold' : ''}`}>{date.day}</span>
                            <span className="text-xs">{date.month}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {selectedDate && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <h3 className="flex items-center gap-2 mb-4 text-sm sm:text-base">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          Selecciona una hora
                        </h3>

                        {busyLoading ? (
                          <div className="text-xs text-muted-foreground">Comprobando disponibilidad…</div>
                        ) : null}

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                          {getAvailableTimeSlots().map((slot: TimeSlot) => {
                            const disabled = busyLoading || !slot.available;
                            return (
                              <Button
                                key={slot.id}
                                variant="outline"
                                size="sm"
                                onClick={() => !disabled && setSelectedTime(slot.time)}
                                disabled={disabled}
                                className={`relative h-12 flex items-center justify-center transition-all duration-300 ${
                                  disabled
                                    ? 'opacity-40 cursor-not-allowed bg-muted'
                                    : selectedTime === slot.time
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg scale-105 ring-2 ring-blue-500/20'
                                    : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:scale-102 hover:shadow-md'
                                }`}
                              >
                                <span className={selectedTime === slot.time ? 'font-semibold text-white' : ''}>{slot.time}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {selectedDate && selectedTime && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-center sm:justify-end pt-3 sm:pt-4">
                        <Button onClick={handleDateTimeSelect} className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto">
                          Continuar
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 'fill-form' && (
                <motion.div key="fill-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <div className="space-y-6">
                    <Card className="p-4 bg-blue-50 dark:bg-blue-950/20">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las {selectedTime}
                        </span>
                      </div>
                    </Card>

                    <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Label htmlFor="modal-name">Nombre completo *</Label>
                          <Input id="modal-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre" required />
                        </div>
                        <div>
                          <Label htmlFor="modal-email">Email *</Label>
                          <Input id="modal-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@email.com" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Label htmlFor="modal-phone">Teléfono</Label>
                          <Input id="modal-phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+34 123 456 789" />
                        </div>
                        <div>
                          <Label htmlFor="modal-company">Empresa</Label>
                          <Input id="modal-company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Tu empresa" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <Label htmlFor="modal-category">Categoría *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value: ServiceCategoryValue) => {
                              setFormData({ ...formData, category: value, service: '' });
                            }}
                            required
                          >
                            <SelectTrigger id="modal-category" className="w-full">
                              <SelectValue placeholder="Selecciona categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceCategories.map((category: ServiceCategory) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="modal-service">Servicio específico *</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value: string) => setFormData({ ...formData, service: value })}
                            disabled={!formData.category}
                            required
                          >
                            <SelectTrigger id="modal-service" className="w-full">
                              <SelectValue placeholder={!formData.category ? 'Primero selecciona categoría' : 'Selecciona servicio'} />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableServices().map((service: ServiceItem) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="modal-notes">Cuéntame sobre tu proyecto</Label>
                        <Textarea
                          id="modal-notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Comparte detalles sobre tu desafío de datos..."
                          className="min-h-24"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between pt-3 sm:pt-4 gap-3 sm:gap-0">
                        <Button type="button" variant="outline" onClick={() => setStep('select-date')} className="w-full sm:w-auto">
                          Volver
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto"
                          disabled={isSubmitting || !formData.category || !formData.service || !formData.email.trim()}
                        >
                          {isSubmitting ? 'Agendando…' : 'Agendar Llamada'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 'confirmation' && (
                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                  <div className="text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl mb-2">¡Llamada Agendada!</h3>
                      <p className="text-muted-foreground">Te he enviado una confirmación por email con los detalles de nuestra reunión.</p>
                    </div>

                    <Card className="p-4 text-left space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>
                          {selectedDate
                            ? new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                            : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>{selectedTime} (30 minutos)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span>{formData.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                        <span>
                          Proyecto:{' '}
                          {(() => {
                            const category = serviceCategories.find((cat) => cat.value === formData.category);
                            const service = formData.service ? getAvailableServices().find((srv) => srv.value === formData.service) : null;
                            if (category && service) return `${category.label} - ${service.label}`;
                            if (category) return category.label;
                            return 'No especificado';
                          })()}
                        </span>
                      </div>
                    </Card>

                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">📧 Recibirás un enlace de videollamada unos minutos antes de la cita</p>
                      <p className="text-sm text-muted-foreground">📱 Si necesitas reagendar, contáctame directamente</p>
                    </div>

                    <Button
                      onClick={handleClose}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duración-300 transform hover:scale-105 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Perfecto, nos vemos pronto
                        <div className="ml-2">✨</div>
                      </span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
