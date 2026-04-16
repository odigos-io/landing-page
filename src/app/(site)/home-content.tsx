'use client';

import styled from 'styled-components';
import { BottomCTA, FeatureSections, Hero1, LearnMoreBlogs, StatementCard, TrustedBy } from '@/containers';

const LighterBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.black_light};
`;

const HomeContent = () => {
  return (
    <>
      <LighterBackground>
        <Hero1 />
        <TrustedBy />
      </LighterBackground>
      <StatementCard />
      <FeatureSections />
      <LearnMoreBlogs />
      <BottomCTA />
    </>
  );
};

export default HomeContent;
