import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'player',
  title: 'Players',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'number',
      title: 'Jersey Number',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(99)
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Goalkeeper', value: 'Goalkeeper' },
          { title: 'Defender', value: 'Defender' },
          { title: 'Midfielder', value: 'Midfielder' },
          { title: 'Forward', value: 'Forward' }
        ]
      }
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number'
    }),
    defineField({
      name: 'photo',
      title: 'Player Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'goals',
      title: 'Goals (Season)',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'assists',
      title: 'Assists (Season)',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'featured',
      title: 'Featured Player',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo'
    }
  }
})