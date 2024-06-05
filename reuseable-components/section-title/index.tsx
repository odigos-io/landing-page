'use client';
import React from 'react';
import { motion } from 'framer-motion';

type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
  position?: 'center' | 'left' | 'right';
};

export const SectionTitle = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

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
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        className="animate_top text-center mx-auto"
      >
        {title && (
          <div className="bg-zumthor dark:bg-blacksection dark:border dark:border-strokedark inline-block rounded-full py-1.5 px-4.5 mb-4">
            <h4 className="font-medium text-sectiontitle text-black dark:text-white">
              {title}
            </h4>
          </div>
        )}
        <h2 className="font-bold text-3xl xl:text-sectiontitle3 text-black dark:text-white md:w-4/5 xl:w-1/2 mx-auto mb-4">
          {subtitle}
        </h2>
        <p
          style={{ fontSize: '1.3rem' }}
          className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[100%]"
        >
          {description}
        </p>
      </motion.div>
    </>
  );
};