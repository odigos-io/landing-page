'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30 px-4 md:px-8 2xl:px-0 overflow-hidden  ">
        <div
          style={{ borderRadius: 300 }}
          className="mx-auto max-w-c-1390 px-7.5 md:px-12.5 xl:px-17.5 py-12.5 xl:py-0 gradient-background"
        >
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: 350,
              gap: 40,
            }}
            className="flex  gap-8 md:gap-0  "
          >
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] "
            >
              <h2 style={{ fontSize: 80 }} className="dark:text-black ">
                Join The Waitlist
              </h2>
              <p
                style={{ fontSize: 24, marginTop: 30 }}
                className="dark:text-black"
              >
                Save your spot and get notified when we launch our Odigos Cloud
                platform
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-center xl:justify-center">
                <a
                  href="/waitlist"
                  target="_blank"
                  style={{ border: '1px solid black' }}
                  className="inline-flex items-center gap-2.5 font-medium text-white dark:text-black  dark:transparent hover:bg-white rounded-full py-3 px-6 hover:opacity-90"
                >
                  Join Odigos Cloud Waitlist
                  <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="hidden dark:block"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
