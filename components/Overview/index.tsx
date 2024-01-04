'use client';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import Image from 'next/image';
import { Expand } from '@/public/icons';
import { SmallSpan } from '../SmallSpan/SmallSpan';
import { Timeline } from '../SmallSpan/Timeline';
import ScrambleText from '../ScrambleText';
import CommandLineInterface from '../Terminal';
import MirrorText from '../MirrorText';
import ShineText from '../ShineText';
import BackgroundLine from '../BackgroundLine';
import SoundComponent from '../SoundComponent';

const Overview = () => {
  const [showSecondSection, setShowSecondSection] = useState(false);

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
                    gap: 12,
                  }}
                >
                  <div style={{ marginLeft: '2%' }}>
                    <SmallSpan
                      status={''}
                      path={'user/id'}
                      value={'TRACE'}
                      percent="10%"
                      type="basic"
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '12%' }}>
                    <SmallSpan
                      path={'Lambda'}
                      status={''}
                      value={'Invoke'}
                      percent="10%"
                      type="basic"
                      icon="/icons/overview/code.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '22%' }}>
                    <SmallSpan
                      status={''}
                      value={'GET'}
                      percent="10%"
                      type="basic"
                      path={'http/network'}
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '32%' }}>
                    <SmallSpan
                      status={''}
                      value={'POST'}
                      percent="10%"
                      type="basic"
                      path={'/user'}
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '42%' }}>
                    <SmallSpan
                      status={''}
                      value={'PUT'}
                      percent="10%"
                      type="basic"
                      path={'HTTP/1.1'}
                      icon="/icons/overview/db.svg"
                    />
                  </div>
                  <div style={{ marginLeft: '52%' }}>
                    <SmallSpan
                      status={''}
                      value={'OPTIONS'}
                      percent="20%"
                      type="basic"
                      // path={'/index.html'}
                      icon="/icons/overview/fast.svg"
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
                      type="basic"
                    />
                  </div>
                  <div style={{ marginLeft: '10%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="20%"
                      type="basic"
                    />
                  </div>
                  <div style={{ marginLeft: '20%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="35%"
                      type="basic"
                    />
                  </div>
                  <div style={{ marginLeft: '20%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="20%"
                      type="basic"
                    />
                  </div>
                  <div style={{ marginLeft: '40%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="30%"
                      type="basic"
                    />
                  </div>
                  <div style={{ marginLeft: '10%' }}>
                    <ProgressBar
                      status={''}
                      value={''}
                      percent="80%"
                      type="basic"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
