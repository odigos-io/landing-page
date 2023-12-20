'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const PricingItem = ({ price }) => {
  return (
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
      className="animate_top md:w-[45%] lg:w-1/3 group relative bg-white dark:bg-blacksection rounded-lg shadow-solid-10 dark:shadow-none border border-stroke dark:border-strokedark p-7.5 xl:p-12.5"
    >
      {price.nickname == 'Cloud' && (
        <div className="absolute top-7.5 -right-3.5 -rotate-90 rounded-tl-full rounded-bl-full bg-secondary font-medium text-black text-metatitle uppercase py-1.5 px-4.5">
          Open Beta
        </div>
      )}

      {price.custom_price ? (
        <h3 className="text-black dark:text-white font-bold text-3xl xl:text-sectiontitle3 mb-7.5">
          {price.custom_price}
        </h3>
      ) : (
        <h3 className="text-black dark:text-white font-bold text-3xl xl:text-sectiontitle3 mb-6">
          <div className="flex flex-col -mt-5">
            <span className="text-regular text-waterloo dark:text-manatee">
              starting at
            </span>
            <div>
              ${' '}
              {(price.unit_amount / 100).toLocaleString('en-US', {
                currency: 'USD',
              })}
              <span className="text-regular text-waterloo dark:text-manatee">
                /month
              </span>
            </div>
          </div>
        </h3>
      )}
      <h4 className="text-black dark:text-white font-medium text-para2 mb-2.5">
        {price.nickname}
      </h4>
      <p>{price.description}</p>

      <div className="border-t border-stroke dark:border-strokedark mt-9 pt-9 pb-12.5">
        {price.nickname === 'Open Source' && (
          <ul>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Support for Java, Python, Go, .NET and JavaScript applications
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Kubernetes environment
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Local UI for a single cluster
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Community Support
            </li>
          </ul>
        )}
        {price.nickname === 'Cloud' && (
          <ul>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Control instrumentation in runtime
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Virtual Machines, Bare Metal, and Serverless environments
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Multi Cluster management
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Business Hours Support
            </li>
          </ul>
        )}
        {price.nickname === 'Enterprise' && (
          <ul>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              eBPF-based instrumentation for additional programming languages
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 ">
              Enterprise-grade performance
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Support for legacy applications
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 ">
              24/7 Premium Support
            </li>
          </ul>
        )}
      </div>

      <a target="_blank" href={price.link}>
        <button
          aria-label="purchase this plan"
          className="inline-flex items-center gap-2.5 text-primary dark:text-white dark:hover:text-secondary font-medium transition-all duration-300"
        >
          <span className="hover:pr-2 duration-500">{price.action_text}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </a>
    </motion.div>
  );
};
