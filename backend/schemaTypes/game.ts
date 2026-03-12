export default {
  name: 'game',
  title: 'Igre (Popis)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov igre',
      type: 'string',
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Slika igre (Poster)',
      type: 'image',
      options: {
        hotspot: true, // Omogućava precizno rezanje (cropping) slike u studiju
      },
      validation: (Rule: import('sanity').Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
