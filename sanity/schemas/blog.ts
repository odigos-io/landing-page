import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog Post',
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
      description: 'Date string, e.g. "Jul 26 2022"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'string',
      description: 'Path to author image, e.g. /assets/team/john_doe.jpg',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'string',
      description: 'Path to cover image, e.g. /assets/blogs/my-post/cover.png',
    }),
    defineField({
      name: 'webCoverImage',
      title: 'Web Cover Image',
      type: 'string',
      description: 'Optional web-specific cover image path',
    }),
    defineField({
      name: 'mobileCoverImage',
      title: 'Mobile Cover Image',
      type: 'string',
      description: 'Optional mobile-specific cover image path',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metadata',
      title: 'SEO Metadata',
      type: 'text',
      rows: 3,
      description: 'Metadata description for SEO (falls back to description if empty)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'boldTag',
      title: 'Bold Tag',
      type: 'string',
      description: 'A tag to display in bold',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Optional CTA button text',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'Optional CTA button URL',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'markdown',
      description: 'Blog post content in Markdown format',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      date: 'pubDate',
    },
    prepare({ title, author, date }) {
      return {
        title,
        subtitle: `${author || 'No author'} — ${date || 'No date'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Publish Date (Newest)',
      name: 'pubDateDesc',
      by: [{ field: 'pubDate', direction: 'desc' }],
    },
    {
      title: 'Publish Date (Oldest)',
      name: 'pubDateAsc',
      by: [{ field: 'pubDate', direction: 'asc' }],
    },
  ],
});
