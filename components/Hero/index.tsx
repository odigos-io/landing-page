'use client';
import React from 'react';
import Image from 'next/image';
import { usePlausible } from 'next-plausible';
import { Close } from '@/public/icons';

const Hero = () => {
  const [showDemo, setShowDemo] = React.useState(false);
  const plausible = usePlausible();

  return (
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
              <div className="md:hidden">
                <div className="mt-10">
                  <div className="flex flex-wrap gap-5">
                    <a href="/waitlist" target="_blank">
                      <button
                        className="flex bg-black dark:hover:bg-secondary dark:hover:text-black hover:bg-blackho dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-7.5 py-2.5"
                        onClick={() => {
                          const url = localStorage.getItem('conversion');
                          plausible('Join Waitlist', {
                            props: {
                              landing: url,
                            },
                          });
                        }}
                      >
                        Join Odigos Cloud Waitlist
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex">
                <div className="mt-10">
                  <div className="flex flex-wrap gap-2">
                    <a href="/waitlist" target="_blank">
                      <button className="flex bg-black dark:hover:bg-secondary dark:hover:text-black hover:bg-blackho text-sm dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-2.5 py-2.5">
                        Join Odigos Cloud Waitlist
                      </button>
                    </a>
                    <button
                      className="flex bg-black dark:hover:bg-secondary dark:hover:text-black hover:bg-blackho text-sm dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-2.5 py-2.5"
                      onClick={() => {
                        setShowDemo(true);
                        const url = localStorage.getItem('conversion');
                        plausible('Watch a demo', {
                          props: {
                            landing: url,
                          },
                        });
                      }}
                    >
                      Watch a Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate_right md:w-1/2 hidden lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className=" relative aspect-[1800/854] w-full"></div>
                <Image
                  loading="lazy"
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
        <div className="flex justify-center flex-col items-center bg-gray-800 p-4 md:hidden">
          <p style={{ color: '#fff', fontWeight: 600 }}> Watch a Demo</p>
          <iframe
            style={{
              marginTop: 10,
              width: '100%',
              height: 300,
            }}
            src={`https://www.youtube.com/embed/nynyV7FC4VI`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>

        {showDemo && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black overflow-hidden z-999">
            <div className="relative">
              <div
                className="absolute top-[-40px] right-[-40px] cursor-pointer"
                onClick={() => setShowDemo(false)}
              >
                <div className=" rounded-full flex items-center justify-center hover:bg-#ffffff78">
                  <Image
                    loading="lazy"
                    src={Close}
                    alt="Close"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              </div>

              <iframe
                className="rounded-lg"
                style={{ width: '60vw', height: '60vh' }}
                src={`https://www.youtube.com/embed/nynyV7FC4VI`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;
