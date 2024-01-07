'use client';
import React from 'react';
import Image from 'next/image';
import SectionHeader from '../Common/SectionHeader';
import { PricingItem } from './PricingItem';
import { PRICING } from './data';
import FloatingHeader from '../FloatingHeader';

const Pricing = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          zIndex: 9999,
          top: 50,
        }}
      >
        <FloatingHeader />
      </div>
      <section className="pt-45 pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="animate_top text-center mx-auto">
            <SectionHeader
              headerInfo={{
                title: ``,
                subtitle: `Simple Pricing`,
                description: `A simple pricing model for every step of your observability journey`,
              }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1207px] px-4 md:px-8 xl:px-0 relative mt-15 xl:mt-20">
          <div className="absolute -bottom-15 -z-1 w-full h-full">
            <Image
              fill
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-7.5 xl:gap-12.5">
            {PRICING.map((price, key) => (
              <PricingItem price={price} key={key} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
