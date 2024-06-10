'use client';

import theme from '@/style/theme';
import styled from 'styled-components';

const AboutLayout = styled.section`
  background: ${theme.colors.secondary};
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 24px 20px;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AboutLayout>{children}</AboutLayout>;
}
