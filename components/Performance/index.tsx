'use client';
import React from 'react';
import SectionHeader from '../Common/SectionHeader';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProgressBarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 3rem;
  border-radius: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Performance = () => {
  return (
    <>
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: '',
              subtitle: 'Extreme Performance',
              description: `Odigos provides unprecedented 50x faster performance - virtually eliminating latency`,
            }}
          />
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                x: -20,
              },

              visible: {
                opacity: 1,
                x: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top "
          >
            <ProgressBarsWrapper>
              <ProgressBar
                status={'No Instrumentation'}
                value={'183.09ms'}
                percent="40%"
                type="basic"
              />
              <ProgressBar status={'Odigos'} value={'190.62ms'} percent="41%" />
              <ProgressBar
                status={"Traditional APM's"}
                value={'8,798.20ms'}
                percent="100%"
                type="traditional"
              />
            </ProgressBarsWrapper>
            <p className="pl-12 pt-4 text-sm text-gray-400 opacity-60">
              *Performance measured in milliseconds
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Performance;
