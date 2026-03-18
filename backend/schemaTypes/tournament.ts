export default {
  name: 'tournament',
  title: 'Turnir',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov turnira',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Datum i vrijeme početka',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Odredite datum i vrijeme kada turnir počinje',
    },
    {
      name: 'mainImage',
      title: 'Glavna slika turnira',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativni tekst',
          description: 'Opis slike za pristupačnost',
        },
      ],
    },
    {
      name: 'details',
      title: 'Detalji turnira (Tekst, Pravila, Nagrade)',
      type: 'array',
      of: [
        {
          type: 'block', // Omogućuje standardni tekst formatiranje, liste, naslove (h1-h6)
        },
        {
          type: 'image', // Omogućuje ubacivanje slika i ikona bilo gdje u tekstu
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativni tekst slike',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Opis ispod slike',
            },
          ],
        },
      ],
      description:
        'Fleksibilno polje za detalje. Ovdje možete pisati tekst, formatirati nagrade kao liste, pa čak i ubacivati ikone ili dodatne slike direktno u dokument.',
    },
  ],
}
