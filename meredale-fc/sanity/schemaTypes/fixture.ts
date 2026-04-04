import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fixture',
  title: 'Fixtures',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Match Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'opponent',
      title: 'Opponent',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          { title: 'League', value: 'League' },
          { title: 'Cup', value: 'Cup' },
          { title: 'Friendly', value: 'Friendly' }
        ]
      }
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string'
    }),
    defineField({
      name: 'homeAway',
      title: 'Home or Away',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'Home' },
          { title: 'Away', value: 'Away' }
        ]
      }
    }),
    defineField({
      name: 'time',
      title: 'Kickoff Time',
      type: 'string'
    }),
    defineField({
      name: 'result',
      title: 'Result (if played)',
      type: 'string',
      placeholder: 'e.g., 3-1'
    }),
    defineField({
      name: 'isComplete',
      title: 'Match Completed',
      type: 'boolean',
      initialValue: false
    })
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'opponent',
      subtitle: 'date',
      media: 'homeAway'
    }
  }
})