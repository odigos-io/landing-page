'use client';
import React from 'react';
import SectionHeader from '../Common/SectionHeader';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Testimonial = () => {
  return (
    <>
      <section>
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top text-center mx-auto">
            <SectionHeader
              headerInfo={{
                title: ``,
                subtitle: `Client’s Testimonials`,
                description: `Discover what our valued clients have to say about their experiences.`,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

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
          className="animate_top mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0 mt-15 xl:mt-20"
        >
          {/* <!-- Slider main container --> */}
          <div className="swiper testimonial-01 pb-22.5 mb-20">
            {/* <!-- Additional required wrapper --> */}
            <Swiper
              spaceBetween={50}
              slidesPerView={2}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              breakpoints={{
                // when window width is >= 640px
                0: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              <SwiperSlide>
                <div className="bg-white rounded-lg shadow-solid-9 dark:shadow-none dark:bg-blacksection dark:border dark:border-strokedark p-9 pt-7.5">
                  <div className="flex justify-between border-b border-stroke dark:border-strokedark pb-6 mb-7.5">
                    <div>
                      <h4 className="text-black dark:text-white text-metatitle3 mb-1.5">
                        Tolu Aina
                      </h4>
                      <p>Access Bank</p>
                    </div>
                    <Image
                      width={60}
                      height={50}
                      className=""
                      src="data:image/png;base64,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"
                      alt="User"
                      style={{ borderRadius: 4 }}
                    />
                  </div>

                  <p>
                    Odigos has proven to be a game-changer for us. With its
                    ability to generate distributed traces instantly, Odigos has
                    streamlined our process of identifying and resolving
                    performance issues, pinpointing bottlenecks within
                    microservices communication, and enhancing the overall
                    reliability of our applications.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Testimonial;
