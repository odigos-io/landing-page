"use client";

import React from "react";
import { useMobile } from "@/contexts";
import styled, { css } from "styled-components";
import {
  ShareFacebookButton,
  ShareLinkedinButton,
  ShareTwitterButton,
  SlackInviteButton,
  Text,
} from "@/components";

interface SocialButtonsProps {
  slug: string;
}

const Container = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "12px" : "24px")};

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      & > div,
      & button {
        width: 100%;
      }
    `}
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.grey};
`;

export const SocialButtons = ({ slug }: SocialButtonsProps) => {
  const { isMobile } = useMobile();
  const url = `https://odigos.io/blog/${slug}`;

  return (
    <Container $isMobile={isMobile}>
      <Text fontSize={20}>Share:</Text>
      <ShareLinkedinButton url={url} />
      <ShareFacebookButton url={url} />
      <ShareTwitterButton url={url} />
      {!isMobile && <Divider />}
      <SlackInviteButton />
    </Container>
  );
};
