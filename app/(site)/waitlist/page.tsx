'use client';
import React, { useEffect, useState } from 'react';
import { TextHeader } from '@/components/TextHeader';
import { WaitListForm } from '@/components/WaitlistForm/waitlist';
import styled from 'styled-components';

const WaitListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: sticky;
  margin-top: 50px;
`;

const FormWrapper = styled.div`
  -webkit-box-shadow: 0px 22px 122px -39px rgb(14 230 243 / 40%);
  -moz-box-shadow: 0px 22px 122px -39px rgb(14 230 243 / 40%);
  box-shadow: 0px 22px 122px -39px rgb(14 230 243 / 40%);
  border-radius: 24px;
  margin-top: 5%;
`;

function WaitList() {
  const [submitted, setSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <>
      <WaitListContainer>
        <TextHeader
          title={'Odigos Cloud'}
          subtitle={submitted ? '' : 'Join the Waitlist'}
        />

        <FormWrapper>
          <WaitListForm submitted={submitted} setSubmitted={setSubmitted} />
        </FormWrapper>
      </WaitListContainer>
    </>
  ) : null;
}

export default WaitList;
