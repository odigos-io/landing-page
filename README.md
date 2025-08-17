# Odigos - Landing Page

## How to add a blog post?

1. Install dependencies:

```bash
yarn
```

2. Create a new Markdown file in `/blogs` (e.g. `my-blog-post`)
3. Review the blog on-site:

```bash
yarn dev
```

**Need to add images?**

1. Create a new folder in `/public/assets/blogs` (folder name should be the same name as the blog markdown file e.g. `my-blog-post`)
2. Drop all your images in that folder
3. Reference your images in the blog post with:

```bash
/assets/blogs/{BLOG_NAME}/{IMAGE_NAME}.jpg
```

**Want to add an author image?**

1. Drop a svg/jpg/png in `/public/assets/team`
2. Reference your image in the blog post with:

```bash
/assets/team/{AUTHOR_NAME}.jpg
```

## How to add an event?

1. Install dependencies:

```bash
yarn
```

2. Create a new Markdown file in `/events` (e.g. `my-event`)
3. Review the event on-site:

```bash
yarn dev
```

**Need to add images?**

1. Create a new folder in `/public/assets/events` (folder name should be the same name as the event markdown file e.g. `my-event`)
2. Drop all your images in that folder
3. Reference your images in the event with:

```bash
/assets/events/{EVENT_NAME}/{IMAGE_NAME}.jpg
```
