'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const WebActionsButtonsWrapper = styled.div`
  @media (max-width: 450px) {
    display: none;
  }
`;

const MobileActionsButtonsWrapper = styled.div`
  display: none;
  @media (max-width: 450px) {
    display: flex;
  }
`;

const Hero = () => {
  const [isLoad, setIsLoad] = useState<Boolean>(false);

  useEffect(() => {
    setIsLoad(true);
  }, []);

  return (
    isLoad && (
      <>
        <section className="pt-35 md:pt-40 xl:pt-46 pb-20 xl:pb-25 overflow-hidden">
          <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
            <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
              <div className=" md:w-1/3">
                <h4 className="text-black dark:text-white text-lg font-medium mb-4.5">
                  🚀 Enterprise-grade performance
                </h4>
                <h1 className="text-black dark:text-white text-3xl xl:text-hero font-bold mb-5 ">
                  Get Started With Distributed Tracing in Minutes
                </h1>
                <p>
                  Simplify OpenTelemetry complexity with the only platform that
                  can generate distributed tracing across all your applications
                  <strong>
                    <u style={{ marginLeft: 3 }}>without code changes</u>
                  </strong>
                </p>
                <WebActionsButtonsWrapper>
                  <div className="mt-10">
                    <div className="flex flex-wrap gap-5">
                      <a href="/waitlist" target="_blank">
                        <button className="flex bg-black dark:hover:bg-secondary dark:hover:text-black hover:bg-blackho dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-7.5 py-2.5">
                          Join Odigos Cloud Waitlist
                        </button>
                      </a>
                      <a href="https://calendly.com/edenfed" target="_blank">
                        <button className="flex bg-black dark:hover:bg-secondary dark:hover:text-black dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-7.5 py-2.5">
                          Book a Demo
                        </button>
                      </a>
                    </div>
                  </div>
                </WebActionsButtonsWrapper>
                <MobileActionsButtonsWrapper>
                  <div className="mt-10">
                    <div className="flex flex-wrap gap-2">
                      <a href="/waitlist" target="_blank">
                        <button className="flex bg-black dark:hover:bg-secondary dark:hover:text-black hover:bg-blackho text-sm dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-2.5 py-2.5">
                          Join Odigos Cloud Waitlist
                        </button>
                      </a>
                      <a href="https://calendly.com/edenfed" target="_blank">
                        <button className="flex bg-black dark:hover:bg-secondary dark:hover:text-black dark:bg-btndark text-sm text-white rounded-full ease-in-out duration-300 px-2.5 py-2.5">
                          Book a Demo
                        </button>
                      </a>
                    </div>
                  </div>
                </MobileActionsButtonsWrapper>
              </div>

              <div className="animate_right md:w-1/2 hidden lg:block">
                <div className="relative 2xl:-mr-7.5">
                  <div className=" relative aspect-[1800/854] w-full"></div>
                  <Image
                    className="dark:block"
                    src="/images/hero/overview.gif"
                    alt="Hero"
                    fill
                    sizes="100%"
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
    )
  );
};

export default Hero;
