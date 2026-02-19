import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pubDate',
      title: 'Publish Date',
      type: 'string',
      description: 'Date string, e.g. "Mar 1 2026"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'string',
      description: 'Path to banner image, e.g. /assets/webinars/march-2026/banner.png',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'string',
      description: 'Webinar date, e.g. "March 19 2026"',
    }),
    defineField({
      name: 'eventTime',
      title: 'Event Time',
      type: 'string',
      description: 'Webinar start time, e.g. "2:00 PM ET"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Webinar duration, e.g. "60 minutes"',
    }),
    defineField({
      name: 'content',
      title: 'Abstract / Description',
      type: 'markdown',
      description: 'Webinar description content in Markdown format',
    }),
    defineField({
      name: 'speakers',
      title: 'Featured Speakers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'title', title: 'Title / Role', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'company', title: 'Company', type: 'string' }),
            defineField({ name: 'image', title: 'Headshot Image', type: 'string', description: 'Path to speaker image' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'riversideEventId',
      title: 'Riverside Event ID',
      type: 'string',
      description: 'The data-event-id from the Riverside embed code',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date || 'No date set',
      };
    },
  },
  orderings: [
    {
      title: 'Publish Date (Newest)',
      name: 'pubDateDesc',
      by: [{ field: 'pubDate', direction: 'desc' }],
    },
  ],
});
