'use client';
import React from 'react';
import SectionHeader from '../Common/SectionHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
          </div>
          <div className="flex flex-wrap gap-y-10 justify-around">
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
              className="animate_top w-1/6"
            >
              <div className="inline-block rounded-[10px] shadow-solid-7  p-4.5">
                <Image
                  width={50}
                  height={50}
                  src="/dest/datadog.svg"
                  alt="Brand"
                />
              </div>
            </motion.div>

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
              className="animate_top w-1/6"
            ></motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="inline-block rounded-[10px] shadow-solid-7  p-4.5">
                <Image
                  width={50}
                  height={50}
                  src="/dest/chronosphere.svg"
                  alt="Brand"
                />
              </div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="bg-[#FFDB26] rounded-full w-[11px] h-[11px]"></div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="inline-block rounded-[10px] shadow-solid-7  p-4.5">
                <Image
                  width={50}
                  height={50}
                  src="/dest/honeycomb.svg"
                  alt="Brand"
                />
              </div>
            </motion.div>

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
              className="animate_top w-1/6"
            ></motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="bg-[#62E888] rounded-full w-[15px] h-[15px]"></div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="inline-block rounded-[10px] shadow-solid-7  p-4.5">
                <Image
                  width={50}
                  height={50}
                  src="/dest/jaegertracingio.svg"
                  alt="Brand"
                />
              </div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="bg-[#EF5C00] rounded-full w-[23px] h-[23px]"></div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="inline-block rounded-[10px] shadow-solid-7  p-4.5">
                <Image
                  width={50}
                  height={50}
                  src="/dest/newrelic.svg"
                  alt="Brand"
                />
              </div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="bg-[#016BFF] rounded-full w-[15px] h-[15px]"></div>
            </motion.div>

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
              className="animate_top w-1/6"
            >
              <div className="inline-block rounded-[10px] shadow-solid-7  p-4.5">
                <Image
                  width={50}
                  height={50}
                  src="/dest/loki.svg"
                  alt="Brand"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Integration;
