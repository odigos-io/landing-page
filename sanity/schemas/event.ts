import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
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
      description: 'Date string, e.g. "Aug 18 2025"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'string',
      description: 'Path to banner image, e.g. /assets/events/kubecon-2025/banner.png',
    }),
    defineField({
      name: 'eventStartDate',
      title: 'Event Start Date',
      type: 'string',
      description: 'Event start date string, e.g. "Nov 10 2025"',
    }),
    defineField({
      name: 'eventEndDate',
      title: 'Event End Date',
      type: 'string',
      description: 'Event end date string, e.g. "Nov 13 2025"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'booth',
      title: 'Booth Number',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'markdown',
      description: 'Event description content in Markdown format',
    }),
    defineField({
      name: 'customHtml',
      title: 'Custom HTML Embed',
      type: 'text',
      rows: 10,
      description: 'Optional raw HTML to embed on the page (e.g. HubSpot CTA). Renders below the content.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      date: 'eventStartDate',
    },
    prepare({ title, location, date }) {
      return {
        title,
        subtitle: `${location || 'No location'} — ${date || 'No date'}`,
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
