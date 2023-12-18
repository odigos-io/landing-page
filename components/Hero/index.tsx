'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { usePlausible } from 'next-plausible';
import { Modal } from '@keyval-dev/design-system';

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

const DemoWrapper = styled(MobileActionsButtonsWrapper)`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #292e45;
  padding: 1rem 0;
  margin-top: 40px;
  width: 100vw;
`;

export enum ModalPositionX {
  center = 'center',
  right = 'right',
  left = 'left',
}

export enum ModalPositionY {
  center = 'center',
  start = 'start',
  end = 'end',
}

const Hero = () => {
  const plausible = usePlausible();
  const [isLoad, setIsLoad] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const modalConfig = {
    title: '',
    showHeader: true,
    showOverlay: true,
    positionX: ModalPositionX.center,
    positionY: ModalPositionY.center,
    padding: '45px',
  };
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
                      <button
                        className="flex bg-black dark:hover:bg-secondary dark:hover:text-black dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-7.5 py-2.5"
                        onClick={() => {
                          setShowModal(true);
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
                </WebActionsButtonsWrapper>
                <MobileActionsButtonsWrapper>
                  <div className="mt-10">
                    <div className="flex flex-wrap gap-2">
                      <a href="/waitlist" target="_blank">
                        <button className="flex bg-black dark:hover:bg-secondary dark:hover:text-black hover:bg-blackho text-sm dark:bg-btndark text-white rounded-full ease-in-out duration-300 px-2.5 py-2.5">
                          Join Odigos Cloud Waitlist
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
          <DemoWrapper>
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
          </DemoWrapper>

          {showModal && (
            <Modal
              show={showModal}
              closeModal={() => setShowModal(false)}
              config={modalConfig}
            >
              <div className="video-responsive">
                <iframe
                  style={{ borderRadius: 24, width: '60vw', height: '60vh' }}
                  src={`https://www.youtube.com/embed/nynyV7FC4VI`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </Modal>
          )}
        </section>
      </>
    )
  );
};

export default Hero;
