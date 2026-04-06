import { getAllBlogs } from '@/libs/markdown';

const BASE_URL = 'https://odigos.io';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const blogs = await getAllBlogs();

  const items = blogs
    .slice(0, 50)
    .map(
      (blog) => `    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${BASE_URL}/blog/${blog.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.pubDate).toUTCString()}</pubDate>
      <description>${escapeXml(blog.description)}</description>${blog.author ? `\n      <author>${escapeXml(blog.author)}</author>` : ''}${blog.category ? `\n      <category>${escapeXml(blog.category)}</category>` : ''}
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Odigos Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Enterprise-grade OpenTelemetry observability platform</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
