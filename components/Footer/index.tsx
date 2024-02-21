'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Send } from '@/public/icons';
import { MAILCHIMP_API_URL, sendToService } from '../WaitlistForm/utils';
import { Input } from '@/design-system/input/input';
import { Button } from '@/design-system/button/button';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  function handleSubscribe() {
    const body = { email, name: '' };
    sendToService(body, MAILCHIMP_API_URL);
    setIsSubscribed(true);
  }

  return (
    <>
      <footer
        style={{ backgroundColor: '#060606' }}
        className="bg-white dark:bg-blacksection border-t border-stroke dark:border-strokedark"
      >
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap lg:justify-between gap-8 lg:gap-0">
              <div className="w-1/1 lg:w-1/4">
                <Image
                  loading="lazy"
                  width={80}
                  height={80}
                  src="/images/logo/logo.png"
                  alt="Logo"
                  className="hidden dark:block rounded-2xl"
                />

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
                        className="inline-block hover:text-secondary mb-3"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blog"
                        className="inline-block hover:text-secondary mb-3"
                      >
                        Blog
                      </a>
                    </li>

                    <li>
                      <a
                        href="/pricing"
                        className="inline-block hover:text-secondary mb-3"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://app.odigos.io/about/terms-of-use"
                        className="inline-block hover:text-secondary mb-3"
                        target="_blank"
                      >
                        Privacy Policy
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
                      <li
                        style={{
                          display: 'flex',
                          gap: 10,
                        }}
                      >
                        {isHydrated && (
                          <>
                            <Input
                              placeholder="Enter your email"
                              value={email}
                              onChange={(val) => setEmail(val)}
                              style={{ width: 300, backgroundColor: '060606' }}
                            />
                            <Button onClick={handleSubscribe} disabled={!email}>
                              <Image
                                width={22}
                                height={22}
                                src={Send}
                                alt="Send"
                              />
                            </Button>
                          </>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t flex flex-wrap lg:justify-between  py-7">
            <div></div>

            <div>
              <p>&copy; Keyval. All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
