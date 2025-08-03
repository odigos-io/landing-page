'use client';

import styled from 'styled-components';
import { Hero1, Hero2, Hero3, HowItWorks, HowToStart, LearnMoreBlogs, Testimonial, TrustedBy } from '@/containers';

const LighterBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.black_light};
`;

const Home = () => {
  return (
    <>
      <LighterBackground>
        <Hero1 />
        <TrustedBy />
        <Hero2 />
      </LighterBackground>
      <HowItWorks />
      <HowToStart />
      <Testimonial />
      <Hero3 />
      <LearnMoreBlogs />
    </>
  );
};

export default Home;
