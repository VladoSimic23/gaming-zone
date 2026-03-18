export default {
  name: 'playstationGame',
  title: 'Igre za PlayStation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov igre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Slika igre',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
