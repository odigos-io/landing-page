import React from 'react';
import { FeatureTab } from '@/types/featureTab';

import styled from 'styled-components';
import Image from 'next/image';

const BgImage = styled.div<{ image: string }>`
  background-image: ${({ image }) =>
    `linear-gradient( to bottom,rgba(245, 246, 252, 0),rgba(7,17,26,1)),url(${image})`};
  background-repeat: no-repeat;
  background-size: contain;
`;

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, image, imageDark } = featureTab;

  return (
    <>
      <div className="flex  gap-8 lg:gap-19">
        <div className="md:w-1/2">
          <h2 className="text-black dark:text-white text-3xl xl:text-sectiontitle2 font-bold mb-7">
            {title}
          </h2>
          <p className="mb-5">{desc1}</p>
        </div>
        <Image
          src={image}
          alt="About"
          className="hidden md:block md:w-1/2 relative mx-auto aspect-[562/366] max-w-[550px]"
          width={500}
          height={500} />
      </div>
    </>
  );
};

export default FeaturesTabItem;
