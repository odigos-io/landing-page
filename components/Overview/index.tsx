'use client';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import Image from 'next/image';
import { Close, Expand } from '@/public/icons';
import { SmallSpan } from '../SmallSpan/SmallSpan';
import { Timeline } from '../SmallSpan/Timeline';
import ScrambleText from '../ScrambleText';
import CommandLineInterface from '../Terminal';
import MirrorText from '../MirrorText';
import ShineText from '../ShineText';
import BackgroundLine from '../BackgroundLine';
import SoundComponent from '../SoundComponent';
import FloatingHeader from '../FloatingHeader';
import { Open_Sans } from 'next/font/google';
import GithubButton from '../GithubButtton';

const TIMES = ['0ms', '25ms', '50ms', '75ms', '100ms'];
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const Overview = () => {
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [showDemo, setShowDemo] = React.useState(false);
  useEffect(() => {
    // Set a timeout to show the second section after 5 seconds
    const timeoutId = setTimeout(() => {
      setShowSecondSection(true);
    }, 3000);
    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* {!showSecondSection && (
        <div
          style={{
            marginTop: 200,
          }}
        >
          <CommandLineInterface />
        </div>
      )} */}
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
      {true && (
        <>
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <BackgroundLine />
            <MirrorText />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: '#d7d7d7',
                fontSize: 24,
                textAlign: 'center',
                width: '70%',
                fontWeight: 400,
                letterSpacing: 1.9,
                marginTop: 20,
              }}
            >
              Simplify OpenTelemetry complexity with the only platform that can
              generate distributed tracing across all your applications without
              code changes
            </div>
            <div
              style={{
                marginTop: 40,
              }}
            >
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
                  }}
                >
                  <div style={{ marginLeft: '2%' }}>
                    <SmallSpan
                      status={''}
                      path={'user/id'}
                      value={'TRACE'}
                      percent="10%"
                      type="blue"
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '12%' }}>
                    <SmallSpan
                      path={'Lambda'}
                      status={''}
                      value={'Invoke'}
                      percent="10%"
                      type="white-blue"
                      icon="/icons/overview/code.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '22%' }}>
                    <SmallSpan
                      status={''}
                      value={'GET'}
                      percent="10%"
                      type="light-blue"
                      path={'http/network'}
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '32%' }}>
                    <SmallSpan
                      status={''}
                      value={'POST'}
                      percent="10%"
                      type="orange"
                      path={'/user'}
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  {/* <div style={{ marginLeft: '42%' }}>
                    <SmallSpan
                      status={''}
                      value={'PUT'}
                      percent="10%"
                      type="basic"
                      path={'HTTP/1.1'}
                      icon="/icons/overview/db.svg"
                    />
                  </div> */}
                  <div style={{ marginLeft: '42%' }}>
                    <SmallSpan
                      status={''}
                      value={'OPTIONS'}
                      percent="20%"
                      type="peach"
                      icon="/icons/overview/fast.svg"
                      // path={'HTTP/1.1'}
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
                      type="blue"
                    />
                  </div>
                  <div style={{ marginLeft: '10%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="20%"
                      type="white-blue"
                    />
                  </div>
                  <div style={{ marginLeft: '20%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="35%"
                      type="light-blue"
                    />
                  </div>
                  <div style={{ marginLeft: '40%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="50%"
                      type="orange"
                    />
                  </div>
                  {/* <div style={{ marginLeft: '40%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="30%"
                      type="peach"
                    />
                  </div> */}
                  <div style={{ marginLeft: '30%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="70%"
                      type="peach"
                    />
                  </div>
                </section>
              </div>
              <div
                style={{
                  marginTop: 100,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FloatingHeader />
              </div>
            </div>
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
        </>
      )}
    </>
  );
};

export default Overview;
