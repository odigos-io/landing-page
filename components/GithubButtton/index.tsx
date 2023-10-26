'use client';
import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from 'styled-components';
import { usePlausible } from 'next-plausible'

const ButtonContainer = styled.div`
  margin-top: 10px;
  @media (max-width: 768px) {
    visibility: hidden;
  }
`;
const GithubButton = () => {
  const plausible = usePlausible()
  return (
    <button onClick={() => {
      const url = localStorage.getItem('conversion');
      plausible('Github Click', {
        props: {
          landing: url,
        },
      })
    }}>
      <ButtonContainer style={{ marginTop: 10 }}>
        <GitHubButton
          href="https://github.com/keyval-dev/odigos"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Star keyval-dev/odigos on GitHub"
        >
          Star
        </GitHubButton>
      </ButtonContainer>
    </button>
  );
};

export default GithubButton;
