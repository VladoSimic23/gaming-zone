import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'liveStatus',
  title: 'Live Status Računala',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov (interni)',
      type: 'string',
      initialValue: 'Glavni Status',
      description: 'Ovaj dokument se koristi za prikaz live statusa (ne mijenjaj naslov).',
    }),
    defineField({
      name: 'stations',
      title: 'Stanice (Računala i Konzole)',
      description: 'Dodajte računala ili konzole i postavite njihov trenutni status.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Oznaka (npr. PC-01, PS5-2)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Vrsta opreme',
              type: 'string',
              options: {
                list: [
                  {title: 'Računalo (PC)', value: 'pc'},
                  {title: 'Konzola (Playstation)', value: 'ps'},
                ],
                layout: 'radio',
              },
              initialValue: 'pc',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'status',
              title: 'Trenutni Status',
              type: 'string',
              options: {
                list: [
                  {title: '🟢 Slobodan', value: 'slobodan'},
                  {title: '🔴 Zauzet', value: 'zauzet'},
                  {title: '⚫ Nije u funkciji', value: 'kvar'},
                ],
                layout: 'radio',
              },
              initialValue: 'slobodan',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              status: 'status',
              type: 'type',
            },
            prepare(selection) {
              const {title, status, type} = selection
              const emoji = status === 'slobodan' ? '🟢' : status === 'zauzet' ? '🔴' : '⚫'
              const statusText =
                status === 'slobodan' ? 'Slobodan' : status === 'zauzet' ? 'Zauzet' : 'Nije u funk.'
              const typeIcon = type === 'pc' ? '💻' : '🎮'
              return {
                title: `${typeIcon} ${title}`,
                subtitle: `${emoji} ${statusText}`,
              }
            },
          },
        },
      ],
    }),
  ],
})
