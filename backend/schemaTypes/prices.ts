export default {
  name: 'prices',
  title: 'Cjenik',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov cjenika (Interni naziv)',
      type: 'string',
      description: 'Npr. "Aktivni cjenik 2026"',
      validation: (Rule: any) => Rule.required(),
    },

    // PC Cijene
    {
      name: 'pcPricing',
      title: 'Cijene igranja - PC',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        {
          name: 'perHour',
          title: 'Cijena po satu',
          type: 'number',
          description: 'Cijena u BAM (ili vašoj valuti), samo broj. Npr. 3',
        },
        {
          name: 'packages',
          title: 'Posebni paketi (npr. 5 sati platiš 4)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', title: 'Naziv paketa', type: 'string'},
                {name: 'price', title: 'Cijena', type: 'number'},
              ],
            },
          ],
        },
      ],
    },

    // PlayStation Cijene
    {
      name: 'psPricing',
      title: 'Cijene igranja - PlayStation',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        {
          name: 'perHour',
          title: 'Cijena po satu',
          type: 'number',
          description: 'Cijena u BAM (ili vašoj valuti), samo broj. Npr. 4',
        },
        {
          name: 'packages',
          title: 'Posebni paketi',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', title: 'Naziv paketa', type: 'string'},
                {name: 'price', title: 'Cijena', type: 'number'},
              ],
            },
          ],
        },
      ],
    },

    // Pića
    {
      name: 'drinks',
      title: 'Pića',
      type: 'array',
      options: {collapsible: true, collapsed: true},
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Naziv pića (npr. Coca-Cola 0.33l)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Cijena',
              type: 'number',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },

    // Snacks / Grickalice
    {
      name: 'snacks',
      title: 'Snacks / Grickalice',
      type: 'array',
      options: {collapsible: true, collapsed: true},
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Naziv (npr. Čips Lays, Snickers)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Cijena',
              type: 'number',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: any) {
      return {
        title: title || 'Nedefinirani cjenik',
        subtitle: 'Postavke cijena (PC, PS, Pića, Snacks)',
      }
    },
  },
}
