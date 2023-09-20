"use client";
import React from "react";
import axios from "axios";
import { motion } from "framer-motion";

export const PricingItem = ({ price }) => {
  // POST request
  const handleSubscription = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: price.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

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
      {price.nickname === "Medium" && (
        <div className="absolute top-7.5 -right-3.5 -rotate-90 rounded-tl-full rounded-bl-full bg-primary font-medium text-white text-metatitle uppercase py-1.5 px-4.5">
          popular
        </div>
      )}

      <h3 className="text-black dark:text-white font-bold text-3xl xl:text-sectiontitle3 mb-7.5">
        ${" "}
        {(price.unit_amount / 100).toLocaleString("en-US", {
          currency: "USD",
        })}
        <span className="text-regular text-waterloo dark:text-manatee">
          /month
        </span>
      </h3>
      <h4 className="text-black dark:text-white font-medium text-para2 mb-2.5">
        {price.nickname} Pack
      </h4>
      <p>Lorem ipsum dolor sit amet, consec adipisicing elit.</p>

      <div className="border-t border-stroke dark:border-strokedark mt-9 pt-9 pb-12.5">
        {price.nickname === "Small" && (
          <ul>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              300 GB Storage
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Unlimited Photos and Videos
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 opacity-40">
              Exclusive Support
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 opacity-40">
              Custom Branding Strategy
            </li>
          </ul>
        )}
        {price.nickname === "Medium" && (
          <ul>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              300 GB Storage
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Unlimited Photos and Videos
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Exclusive Support
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 opacity-40">
              Custom Branding Strategy
            </li>
          </ul>
        )}
        {price.nickname === "Large" && (
          <ul>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              300 GB Storage
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0">
              Unlimited Photos and Videos
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 ">
              Exclusive Support
            </li>
            <li className="text-black dark:text-manatee mb-4 last:mb-0 ">
              Custom Branding Strategy
            </li>
          </ul>
        )}
      </div>

      <button
        aria-label="purchase this plan"
        onClick={handleSubscription}
        className="inline-flex items-center gap-2.5 text-primary dark:text-white dark:hover:text-primary font-medium transition-all duration-300"
      >
        <span className="hover:pr-2 duration-500"> Get the Plan</span>
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
    </motion.div>
  );
};
