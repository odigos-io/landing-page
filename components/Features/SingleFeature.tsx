import React from 'react';
import { Feature } from '@/types/feature';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './style.css';
const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg  xl:p-12.5 transition-all hover:shadow-solid-4 z-40 gradient-background"
        // className="gradient-background"
        style={{
          padding: 2,
          borderRadius: 24,
        }}
      >
        <div
          style={{
            backgroundColor: '#060606',
            height: '100%',
            borderRadius: 22,
            padding: '30px 60px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <h3 className="font-semibold text-xl xl:text-itemtitle text-black dark:text-white ">
            {title}
          </h3>
          <p className="dark:text-white">{description}</p>
        </div>
      </motion.div>
    </>
  );
};

export default SingleFeature;
