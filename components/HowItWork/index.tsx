'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import featuresTabData from './featuresTabData';
import FeaturesTabItem from './HowItWorkItem';
import './style.css';
import { motion } from 'framer-motion';

const HowItWork = () => {
  return (
    <>
      {/* <!-- ===== Features Tab Start ===== --> */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <h2 className="relative font-bold text-black text-center dark:text-white text-3xl xl:text-hero mb-6">
          Implementation in 3 easy steps
        </h2>
      </div>
      <section className="pt-18.5 pb-20 lg:pb-22.5 relative">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 relative">
          <div className="absolute -top-16 -z-1 mx-auto h-[350px] w-[90%]">
            <Image
              fill
              className="dark:hidden"
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted Shape"
            />
            <Image
              fill
              className="hidden dark:block"
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted Shape"
            />
          </div>
          <div className="gradient"></div>
          {/* <!-- Tab Content Start --> */}
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
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {featuresTabData.map((feature, key) => (
              <div key={key}>
                <FeaturesTabItem featureTab={feature} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HowItWork;
