import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Match Photos', value: 'match' },
          { title: 'Training', value: 'training' },
          { title: 'Events', value: 'events' },
          { title: 'Team Photos', value: 'team' }
        ]
      }
    }),
    defineField({
      name: 'date',
      title: 'Date Taken',
      type: 'date'
    })
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image'
    }
  }
})