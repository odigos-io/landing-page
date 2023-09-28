'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="pt-35 md:pt-40 xl:pt-46 pb-20 xl:pb-25 overflow-hidden">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/3">
              <h1 className="text-black dark:text-white text-3xl xl:text-hero font-bold mb-5 ">
                Enterprise grade observability pipelines using eBPF and
                OpenTelemetry
              </h1>
              <p>
                Simplify OpenTelemetry complexity with the only platform that
                can generate distributed tracing across all your applications
                (without code changes)
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <button
                      onClick={() =>
                        window.open('https://app.keyval.dev/waitlist', '_blank')
                      }
                      className="flex bg-black hover:bg-blackho dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-7.5 py-2.5"
                    >
                      Join Odigos Waitlist
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="animate_right md:w-1/2 hidden lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className=" relative aspect-[1800/854] w-full"></div>
                <Image
                  className="dark:block"
                  src="/images/hero/overview.gif"
                  alt="Hero"
                  fill
                  style={{
                    borderRadius: 10,
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
