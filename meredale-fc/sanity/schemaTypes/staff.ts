import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'staff',
  title: 'Coaching Staff',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Head Coach', value: 'Head Coach' },
          { title: 'Assistant Coach', value: 'Assistant Coach' },
          { title: 'Goalkeeper Coach', value: 'Goalkeeper Coach' },
          { title: 'Fitness Coach', value: 'Fitness Coach' },
          { title: 'Team Manager', value: 'Team Manager' }
        ]
      }
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo'
    }
  }
})