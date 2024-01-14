'use client';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import Image from 'next/image';
import { Close, Expand } from '@/public/icons';
import { SmallSpan } from '../SmallSpan/SmallSpan';
import MirrorText from '../MirrorText';
import ShineText from '../ShineText';
import FloatingHeader from '../FloatingHeader';
import GithubButton from '../GithubButtton';
import './style.css';
import FloatingHeaderMobile from '../FloatingHeaderMobile';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const TIMES = ['0ms', '200ms', '400ms', '600ms'];

const Overview = () => {
  const [showDemo, setShowDemo] = React.useState(false);

  const demoRef = React.useRef(null);
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        setShowDemo(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);
  useOnClickOutside(demoRef, () => setShowDemo(false));

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          position: 'absolute',
          top: 20,
          left: 20,
          cursor: 'pointer',
        }}
        onClick={() => setShowDemo(true)}
      >
        <div style={{ color: '#fff' }}>Watch a Demo</div>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 36,
            display: 'flex',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            loading="lazy"
            src={'/icons/overview/play.svg'}
            alt="Expand"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
        }}
      >
        <GithubButton />
      </div>
      {
        <>
          <div
            style={{
              overflow: 'hidden',
              width: '100vw',
              // height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <MirrorText />
            <div
              className="sub-title-container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: '#d7d7d7',
                textAlign: 'center',
                fontWeight: 200,
                lineHeight: 1.1,
              }}
            >
              Enterprise-Grade OpenTelemetry for Superior Application
              Performance Monitoring
            </div>
            <div style={{ marginTop: 40 }}>
              <ShineText />
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <div
                style={{
                  width: '80%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <section
                  className="mobile-view"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20%',
                  }}
                ></section>

                <section
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '79%',
                  }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {TIMES.map((time) => (
                      <span style={{ fontSize: 12 }}>{time}</span>
                    ))}
                  </div>
                </section>
              </div>

              <div
                style={{
                  width: '80%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <section
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20%',
                    gap: 12,
                    height: 200,
                  }}
                >
                  <div style={{ marginLeft: '2%' }}>
                    <SmallSpan
                      status={''}
                      path={'products/id'}
                      value={'HTTP'}
                      percent="10%"
                      type="white-blue"
                      icon="/icons/overview/web.svg"
                      delay={10}
                    />
                  </div>
                  <div style={{ marginLeft: '12%' }}>
                    <SmallSpan
                      path={'products'}
                      status={''}
                      value={'mySQL'}
                      percent="10%"
                      type="white-blue"
                      icon="/icons/overview/db.svg"
                      delay={200}
                    />
                  </div>
                  <div style={{ marginLeft: '12%' }}>
                    <SmallSpan
                      status={''}
                      value={'gRPC'}
                      percent="10%"
                      type="white-blue"
                      path={'suppliers'}
                      icon="/icons/overview/swap.svg"
                      delay={250}
                    />
                  </div>
                  <div style={{ marginLeft: '22%' }}>
                    <SmallSpan
                      status={''}
                      value={'gRPC'}
                      percent="10%"
                      type="orange"
                      path={'supplier.id'}
                      icon="/icons/overview/swap.svg"
                      delay={1000}
                    />
                  </div>
                  <div style={{ marginLeft: '32%' }}>
                    <SmallSpan
                      status={''}
                      value={'Kafka'}
                      percent="20%"
                      type="orange"
                      icon="/icons/overview/kafka.svg"
                      delay={1300}
                      path={'inquire'}
                    />
                  </div>
                </section>

                <section
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    gap: 12,
                  }}
                >
                  <div style={{ marginLeft: '2%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="98%"
                      type="white-blue"
                      delay={10}
                    />
                  </div>
                  <div style={{ marginLeft: '10%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="20%"
                      type="white-blue"
                      delay={200}
                    />
                  </div>
                  <div style={{ marginLeft: '12%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="85%"
                      type="white-blue"
                      delay={250}
                    />
                  </div>
                  <div style={{ marginLeft: '18%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="74%"
                      type="orange"
                      delay={1000}
                    />
                  </div>
                  <div style={{ marginLeft: '22%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="30%"
                      type="orange"
                      delay={1300}
                    />
                  </div>
                </section>
              </div>
              {!showDemo && (
                <div
                  className="mobile-view"
                  style={{
                    marginTop: 50,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FloatingHeader />
                </div>
              )}
              <div
                className="desktop-view"
                style={{
                  marginTop: 50,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FloatingHeaderMobile stickToTop={false} />
              </div>
            </div>
          </div>
          {showDemo && (
            <div
              style={{ zIndex: 9999, overflow: 'hidden' }}
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black overflow-hidden z-9999"
            >
              <div className="relative" ref={demoRef}>
                <div
                  className="absolute top-[-40px] right-[0] cursor-pointer"
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
                  className="rounded-lg demo-view"
                  src={`https://www.youtube.com/embed/nynyV7FC4VI`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </div>
          )}
        </>
      }
    </>
  );
};

export default Overview;
