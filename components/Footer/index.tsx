'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button, Input } from '@keyval-dev/design-system';
import { Send } from '@/public/icons';
import { MAILCHIMP_API_URL, sendToService } from '../WaitlistForm/utils';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  function handleSubscribe() {
    const body = { email, name: '' };
    sendToService(body, MAILCHIMP_API_URL);
    setIsSubscribed(true);
  }
  return (
    <>
      <footer className="bg-white dark:bg-blacksection border-t border-stroke dark:border-strokedark">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap lg:justify-between gap-8 lg:gap-0">
              <div className="animate_top w-1/1 lg:w-1/4">
                <a href="index.html" className="relative">
                  <Image
                    loading="lazy"
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
              </div>

              <div className="w-full lg:w-2/3 xl:w-7/12 flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
                <div>
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
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white text-itemtitle2 mb-4">
                    Stay up to date
                  </h4>

                  <ul>
                    {isSubscribed ? (
                      <li style={{ display: 'flex', gap: 10 }}>
                        <p className="inline-block hover:text-primary mb-3">
                          Thanks for subscribing!
                        </p>
                      </li>
                    ) : (
                      <li style={{ display: 'flex', gap: 10 }}>
                        <Input
                          placeholder="Enter your email"
                          value={email}
                          onChange={(val) => setEmail(val)}
                          style={{ width: 300 }}
                        />
                        <Button onClick={handleSubscribe} disabled={!email}>
                          <Image width={22} height={22} src={Send} alt="Send" />
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
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
