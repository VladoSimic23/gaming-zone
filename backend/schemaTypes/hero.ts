export default {
  name: 'hero',
  title: 'Hero / Naslovna sekcija',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Glavni naslov',
      type: 'string',
      description: 'Npr. Dobrodošli u ggZone',
      initialValue: 'DOBRODOŠLI U GGZONE',
    },
    {
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
      description: 'Manji tekst ispod naslova',
      initialValue: 'Najbolje gaming iskustvo u gradu',
    },
    {
      name: 'images',
      title: 'Slike za Slideshow',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule: import('sanity').Rule) => Rule.required().min(1),
    },
  ],
}
