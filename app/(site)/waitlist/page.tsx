'use client';
import { TextHeader } from '@/components/TextHeader';
import { WaitListForm } from '@/components/WaitlistForm/waitlist';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  -webkit-box-shadow: 0px 22px 122px -39px rgb(14 230 243 / 40%);
  -moz-box-shadow: 0px 22px 122px -39px rgb(14 230 243 / 40%);
  box-shadow: 0px 22px 122px -39px rgb(14 230 243 / 40%);
  border-radius: 24px;
`;

function WaitList() {
  const [submitted, setSubmitted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return isHydrated ? (
    <>
      <Image src="/images/logo/logo.png" width={100} height={100} alt={''} />
      <TextHeader
        title={'Odigos Cloud'}
        subtitle={submitted ? '' : 'Join the Waitlist'}
      />

      <br />
      <FormWrapper>
        <WaitListForm submitted={submitted} setSubmitted={setSubmitted} />
      </FormWrapper>
    </>
  ) : null;
}

export default WaitList;
