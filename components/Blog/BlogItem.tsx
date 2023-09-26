'use client';
import Image from 'next/image';
import { Blog } from '@/types/blog';
import { imageBuilder } from '@/sanity/sanity-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BlogItem = ({ blog }: { blog: any }) => {
  const { image, title, metadata, slug, authorImage, author, pubDate } = blog;

  function getImage() {
    const url = image.replace('~/assets/images', '');
    return url;
  }

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          borderTop: 'solid 1px #d0d7de',
          paddingTop: 24,
        }}
      >
        <Link href={`/blog/${slug}`}>
          {image ? (
            <img
              style={{
                objectFit: 'cover',
                height: 185,
                width: '100%',
                borderRadius: 6,
              }}
              src={getImage()}
              alt={title}
            />
          ) : (
            'No image'
          )}
        </Link>

        <div className="">
          <h3
            style={{
              fontSize: 20,
              color: '#fff',
              marginTop: 24,
              fontWeight: 600,
            }}
          >
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.4, marginTop: 8 }}>
            {metadata}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
            {authorImage && (
              <img
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                }}
                src={authorImage}
                alt={title}
              />
            )}
            <h4 style={{ marginLeft: 12, fontWeight: 'bold', color: '#fff' }}>
              {author}
            </h4>
            <h4 style={{ marginLeft: 12, fontWeight: 'bold' }}>{'•'}</h4>
            <h4 style={{ marginLeft: 12 }}>{pubDate}</h4>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
