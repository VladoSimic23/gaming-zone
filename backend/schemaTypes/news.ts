export default {
  name: 'news',
  title: 'Novosti',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov novosti',
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
      name: 'mainImage',
      title: 'Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativni tekst',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Datum objave',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'body',
      title: 'Tekst obavijesti / Novosti',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
