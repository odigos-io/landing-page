'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Text } from '../text';
import theme from '@/style/theme';
type HeaderInfo = {
  title: string;
  subtitle: string;
  description: string;
  position?: 'center' | 'left' | 'right';
};

export const SectionTitle = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;

  return (
    <>
      <motion.div
        // variants={{
        //   hidden: {
        //     opacity: 0,
        //     y: -20,
        //   },

        //   visible: {
        //     opacity: 1,
        //     y: 0,
        //   },
        // }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.1 }}
        viewport={{ once: true }}
        style={{ display: 'flex', gap: 16, alignItems: 'center' }}
      >
        <Image src="/icons/brand/icon.svg" alt="logo" width={15} height={12} />
        <Text fontFam={theme.font_family.secondary} size={18}>
          {title}
        </Text>
      </motion.div>
    </>
  );
};
