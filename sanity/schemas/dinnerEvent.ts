import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'dinnerEvent',
  title: 'Dinner Event',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'city', maxLength: 96 },
      validation: (rule) => rule.required(),
      description: 'URL-friendly identifier, e.g. "nyc", "seattle"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Display date string, e.g. "Thurs Mar 19"',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Display time string, e.g. "7:00 pm"',
    }),
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
    }),
    defineField({
      name: 'venueAddress',
      title: 'Venue Address',
      type: 'string',
    }),
    defineField({
      name: 'venueUrl',
      title: 'Venue Map URL',
      type: 'url',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'HubSpot Form ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hubspotPortalId',
      title: 'HubSpot Portal ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'string',
      description: 'Path to hero background image',
    }),
    defineField({
      name: 'heroImageIsBright',
      title: 'Hero Image Is Bright',
      type: 'boolean',
      initialValue: false,
      description: 'If true, dark text overlay will be used',
    }),
    defineField({
      name: 'formImage',
      title: 'Form Section Image',
      type: 'string',
      description: 'Path to form section background image',
    }),
    defineField({
      name: 'formImageIsBright',
      title: 'Form Image Is Bright',
      type: 'boolean',
      initialValue: false,
      description: 'If true, dark text overlay will be used',
    }),
    defineField({
      name: 'whyAttend',
      title: 'Why Attend',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Networking', value: 'networking' },
                  { title: 'Insights', value: 'insights' },
                  { title: 'Experience', value: 'experience' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }) {
              return { title, subtitle: icon };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'roles',
      title: 'Target Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of target audience roles',
    }),
  ],
  preview: {
    select: {
      city: 'city',
      date: 'date',
      venue: 'venue',
    },
    prepare({ city, date, venue }) {
      return {
        title: city,
        subtitle: `${venue || ''} — ${date || ''}`,
      };
    },
  },
});
