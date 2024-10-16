import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import esES from 'date-fns/locale/es';

const locales = {
    'en-US': enUS,
    'es': esES,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const translations = {
    enUS: {
      newEvent: 'New event',
      dateAndStartTime: 'Date and start time',
      dateAndEndTime: 'Date and end time',
      titleAndNotes: 'Title and notes',
      eventTitle: 'Event title',
      aShortDescription: 'A short description',
      notes: 'Notes',
      additionalInfo: 'Additional information',
      save: 'Save',
      time: 'Time',
      incorrectDates: 'Incorrect dates',
      checkEnteredDates: 'Check entered dates',
    },
    es: {
      newEvent: 'Nuevo evento',
      dateAndStartTime: 'Fecha y hora de inicio',
      dateAndEndTime: 'Fecha y hora de final',
      titleAndNotes: 'Título y notas',
      eventTitle: 'Título del evento',
      aShortDescription: 'Una breve descripción',
      notes: 'Notas',
      additionalInfo: 'Información adicional',
      save: 'Guardar',
      time: 'Hora',
      incorrectDates: 'Fechas incorrectas',
      checkEnteredDates: 'Compruebe las fechas ingresadas',
    },
  };