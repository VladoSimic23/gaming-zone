const dayFields = [
  {
    name: 'isOpen',
    title: 'Igraonica radi ovaj dan?',
    type: 'boolean',
    initialValue: true,
  },
  {
    name: 'openTime',
    title: 'Vrijeme otvaranja (npr. 10:00)',
    type: 'string',
    hidden: ({parent}: any) => parent?.isOpen === false,
  },
  {
    name: 'closeTime',
    title: 'Vrijeme zatvaranja (npr. 23:00)',
    type: 'string',
    hidden: ({parent}: any) => parent?.isOpen === false,
  },
]

export default {
  name: 'workingHours',
  title: 'Radno Vrijeme',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naziv (npr. Ljetno radno vrijeme ili Standardno)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'monday',
      title: 'Ponedjeljak',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
    {
      name: 'tuesday',
      title: 'Utorak',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
    {
      name: 'wednesday',
      title: 'Srijeda',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
    {
      name: 'thursday',
      title: 'Četvrtak',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
    {
      name: 'friday',
      title: 'Petak',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
    {
      name: 'saturday',
      title: 'Subota',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
    {
      name: 'sunday',
      title: 'Nedjelja',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: dayFields,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: any) {
      return {
        title: title || 'Nedefinirano radno vrijeme',
        subtitle: 'Postavke radnog tjedna',
      }
    },
  },
}
