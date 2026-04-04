import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Match Report', value: 'match-report' },
          { title: 'Announcement', value: 'announcement' },
          { title: 'Event', value: 'event' },
          { title: 'General', value: 'general' }
        ]
      }
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Summary',
      type: 'text',
      rows: 2,
      description: 'A brief preview of the article'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'featuredImage'
    }
  }
})