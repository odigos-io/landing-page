'use client';
import React from 'react';
import SectionHeader from '../Common/SectionHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Brands from '../Brands';

const Integration = () => {
  return (
    <>
      <section>
        <div className="mx-auto px-4 md:px-8 2xl:px-0">
          <SectionHeader
            headerInfo={{
              title: ``,
              subtitle: `Seamless Integration with any APM`,
              description: `Odigos is vendor agnostic and can send the telemetry data it generates to any destination supporting OpenTelemetry`,
            }}
          />
        </div>
        <div className="mx-auto max-w-c-1154 px-4 md:px-8 xl:px-0 relative z-50 mt-15 xl:mt-20 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10">
          <div>
            <Image
              fill
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
            />
            <Brands />
          </div>
        </div>
      </section>
    </>
  );
};

export default Integration;
