'use client';
import Image from 'next/image';
import { Blog } from '@/types/blog';
import { imageBuilder } from '@/sanity/sanity-utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BlogItem = ({ blog }: { blog: any }) => {
  const { image, title, metadata, slug, authorImage } = blog;

  function getImage() {
    const url = image.replace('~/assets/images', '');
    return url;
  }
  console.log({ authorImage });
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
          paddingBottom: 24,
        }}
        // className="animate_top bg-white dark:bg-blacksection rounded-lg shadow-solid-8 p-4 pb-9"
      >
        <Link
          href={`/blog/${slug}`}
          className="block relative aspect-[368/239]"
        >
          {image ? (
            <img
              style={{
                objectFit: 'cover',
                height: '100%',
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
          <h3 style={{ fontSize: 20, color: '#fff', marginTop: 24 }}>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          <p>{metadata ? `${metadata.slice(0, 100)}...` : ''}</p>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
