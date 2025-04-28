'use client';
import React, { use, useState } from 'react';
import styled from 'styled-components';
import { HEADER_DATA, pricingPlan } from './data';
import ContactForm from './contact-us-form';
import Modal from '@/reuseable-components/modal';
import { Button, UnderlineText } from '@/reuseable-components';
import theme from '@/style/theme';
import Image from 'next/image';
import { SectionContainer } from '@/style';
import useIsMobile from '@/hooks/useIsMobile';
import PricingComponent from '.';

const Container = styled(SectionContainer)`
  height: auto;
  flex-direction: column;

  width: 100%;
  padding: 0px 64px 0px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 1440px;
  border-collapse: collapse;
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
`;

const Th = styled.th`
  padding: 16px;
  border-bottom: 1px solid #333;
  text-align: left;
  font-size: 18px;
`;

const ThHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ThTitle = styled.div`
  font-family: ${({ theme }) => theme.font_family.primary};
  font-weight: 400;
  font-size: 56px;
  line-height: 130%;
`;
const ThSubtitle = styled.div`
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  letter-spacing: -4%;
  text-transform: uppercase;
`;

const ThDescription = styled.div`
  font-family: ${({ theme }) => theme.font_family.primary};
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0%;
  opacity: 0.8;
`;

const ThButtonWrapper = styled.div`
  margin-top: 12px;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #333;
  font-size: 16px;
`;

const Tr = styled.tr``;

const SectionRow = styled.tr`
  height: 64px;

  opacity: 0.8;

  td {
    font-family: ${({ theme }) => theme.font_family.secondary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 24px;
    padding: 24px 0;
    line-height: 32px;
    padding-left: 16px;
    max-width: 300px;
  }
`;

export const CheckMark = () => <Image src='/icons/common/v.svg' alt='check' width={16} height={16} style={{ margin: '0 auto' }} />;
export const CrossMark = () => <Image src='/icons/common/close2.svg' alt='cross' width={16} height={16} style={{ margin: '0 auto', opacity: 0.4 }} />;

const PricingTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const isMobile = useIsMobile(800);
  const handleButtonClick = (index: number, link: string) => {
    if (index === 0) {
      window.open(link, '_blank');
    } else {
      setOpen(true);
    }
  };

  if (isMobile) {
    return <PricingComponent />;
  }

  return (
    <Container>
      <Table>
        <thead>
          <Tr>
            {HEADER_DATA.map((plan, index) => (
              <Th key={index}>
                <ThHeader>
                  {plan.title && <ThTitle>{plan.title}</ThTitle>}
                  <ThSubtitle>{plan.plan}</ThSubtitle>
                  {plan.description && <ThDescription>{plan.description}</ThDescription>}
                  {plan.button && (
                    <ThButtonWrapper>
                      <Button style={{ background: theme.colors.secondary }} onClick={() => handleButtonClick(index, plan.button.link)}>
                        <UnderlineText>{plan.button.text}</UnderlineText>
                      </Button>
                    </ThButtonWrapper>
                  )}
                </ThHeader>
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {pricingPlan.map((item, idx) =>
            item.section ? (
              <SectionRow key={idx}>
                <td colSpan={3}>{item.section}</td>
              </SectionRow>
            ) : (
              <Tr key={idx}>
                <Td>{item.feature}</Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {typeof item.community === 'boolean' ? item.community ? <CheckMark /> : <CrossMark /> : item.community}
                  </div>
                </Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {typeof item.premium === 'boolean' ? item.premium ? <CheckMark /> : <CrossMark /> : item.premium}
                  </div>
                </Td>
              </Tr>
            ),
          )}
        </tbody>
      </Table>
      {open && (
        <Modal title={success ? '' : 'We’d love to hear from you!'} description={'Whether you have questions, feedback, or need assistance, our team is here to help.'} onClose={() => setOpen(false)}>
          <ContactForm success={success} setSuccess={setSuccess} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </Container>
  );
};

export default PricingTable;
