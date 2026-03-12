export default {
  name: 'reservation',
  title: 'Narudžbe (Rezervacije)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Ime prezime / Ime igrača',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Broj telefona',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'timeSlots',
      title: 'Vrijeme (sat/sati)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Npr. Odabrani termini: 12:00, 13:00',
      validation: (Rule: import('sanity').Rule) => Rule.required().min(1),
    },
    {
      name: 'seats',
      title: 'Količina mjesta (Broj računala/konzola)',
      type: 'number',
      validation: (Rule: import('sanity').Rule) => Rule.required().min(1).max(10),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Na čekanju', value: 'pending'},
          {title: 'Potvrđeno', value: 'confirmed'},
          {title: 'Otkazano', value: 'cancelled'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
  ],
  preview: {
    select: {
      title: 'name',
      date: 'date',
      timeSlots: 'timeSlots',
      seats: 'seats',
    },
    prepare(selection: {title?: string; date?: string; timeSlots?: string[]; seats?: number}) {
      const {title, date, timeSlots, seats} = selection
      const times = timeSlots && timeSlots.length > 0 ? timeSlots.join(', ') : 'Nema vremena'
      return {
        title: `${title} (${seats} mjesta)`,
        subtitle: `${date} u ${times}`,
      }
    },
  },
}
