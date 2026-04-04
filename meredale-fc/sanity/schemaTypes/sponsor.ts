import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sponsor',
  title: 'Sponsors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'tier',
      title: 'Sponsorship Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Platinum', value: 'platinum' },
          { title: 'Gold', value: 'gold' },
          { title: 'Silver', value: 'silver' },
          { title: 'Bronze', value: 'bronze' }
        ]
      }
    }),
    defineField({
      name: 'active',
      title: 'Active Sponsor',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tier',
      media: 'logo'
    }
  }
})