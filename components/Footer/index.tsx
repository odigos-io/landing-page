'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-blacksection border-t border-stroke dark:border-strokedark">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap lg:justify-between gap-8 lg:gap-0">
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
                className="animate_top w-1/1 lg:w-1/4"
              >
                <a href="index.html" className="relative">
                  <Image
                    width={80}
                    height={80}
                    src="/images/logo/logo.png"
                    alt="Logo"
                    className="hidden dark:block rounded-2xl"
                  />
                </a>

                <p className="mt-5 mb-10">
                  Simplify OpenTelemetry complexity with the only platform that
                  can generate distributed tracing across all your applications
                  without code changes
                </p>

                <p className="uppercase tracking-[5px] text-sectiontitle mb-1.5">
                  contact
                </p>
                <a
                  href="mailto:support@keyval.dev"
                  className="text-black dark:text-white font-medium text-itemtitle"
                >
                  support@keyval.dev
                </a>
              </motion.div>

              <div className="w-full lg:w-2/3 xl:w-7/12 flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
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
                  className="animate_top"
                >
                  <h4 className="font-medium text-black dark:text-white text-itemtitle2 mb-9">
                    Quick Links
                  </h4>

                  <ul>
                    <li>
                      <a
                        href="/"
                        className="inline-block hover:text-primary mb-3"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blog"
                        className="inline-block hover:text-primary mb-3"
                      >
                        Blog
                      </a>
                    </li>

                    <li>
                      <a
                        href="/pricing"
                        className="inline-block hover:text-primary mb-3"
                      >
                        Pricing
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="border-t border-stroke dark:border-strokedark flex flex-wrap flex-col lg:flex-row items-center justify-center lg:justify-between gap-5 lg:gap-0 py-7">
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
              className="animate_top"
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
              className="animate_top"
            >
              <p>&copy; Keyval. All rights reserved</p>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
