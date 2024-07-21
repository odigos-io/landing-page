'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UnderlineText, Text, LazyImage } from '@/reuseable-components';

const GithubNumberWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: -4px;
  width: 20px;
`;

// Utility function to format the stars count
const formatStars = (count: number): string => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count?.toString();
};

interface GithubProps {
  fontSize?: number;
}

const ODIGOS_GITHUB_URL = 'https://api.github.com/repos/odigos-io/odigos';

const Github: React.FC<GithubProps> = ({ fontSize }) => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(ODIGOS_GITHUB_URL);
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
      }
    };

    fetchStars();
  }, []);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LazyImage
          src="/icons/common/github.svg"
          alt="github"
          width={fontSize || 18}
          height={fontSize || 18}
        />
      </div>
      <Link target={'_blank'} href={'https://github.com/odigos-io/odigos'}>
        <UnderlineText size={fontSize}>{'GITHUB'}</UnderlineText>
      </Link>
      <GithubNumberWrapper>
        <Text size={10}>{stars !== null ? formatStars(stars) : ''}</Text>
      </GithubNumberWrapper>
    </div>
  );
};

export default Github;
