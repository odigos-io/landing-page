'use client';
import styled from 'styled-components';
import { Button, Text } from '@keyval-dev/design-system';
import React from 'react';

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 200px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: #fff;
`;

const Description = styled.p`
  color: #fff;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
  width: 200px;
  height: 50px;
`;

const Divider = styled.div`
  height: 30px;
`;

const BlogNotFound: React.FC = () => {
  return (
    <Container>
      <Title>Blog Not Found</Title>
      <Description>Sorry, the requested blog could not be found.</Description>
      <Divider />
      <StyledButton
        onClick={() => {
          window.location.href = '/blog';
        }}
      >
        <Text color={'#0A1824'} weight={600}>
          Go Back Home
        </Text>
      </StyledButton>
    </Container>
  );
};

export default BlogNotFound;
