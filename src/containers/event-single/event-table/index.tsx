'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { FlexRow } from '@/styles';
import { Text } from '@/components';
import type { EventPost } from '@/types';
import { formatEventDateRange } from '@/functions';
import styled, { useTheme } from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
`;

const TableRow = styled.tr<{ $isLast: boolean }>`
  border-bottom: ${({ theme, $isLast }) => ($isLast ? 'none' : `1px solid ${theme.colors.grey_darkest}`)};
`;

const LeftCell = styled.td`
  padding: 16px 16px 16px 0;
`;

const RightCell = styled.td`
  padding: 16px 0 16px 16px;
`;

export const EventTable = ({ event }: { event: EventPost }) => {
  const theme = useTheme();

  const rows = useMemo(() => {
    return [
      {
        icon: '/assets/icons/calendar.svg',
        label: 'Date',
        value: formatEventDateRange(event.eventStartDate, event.eventEndDate),
      },
      {
        icon: '/assets/icons/map.svg',
        label: 'Location',
        value: event.location,
      },
      {
        icon: '/assets/icons/booth.svg',
        label: 'Booth',
        value: event.booth,
      },
    ];
  }, [event]);

  return (
    <Table>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={row.label} $isLast={index === rows.length - 1}>
            <LeftCell>
              <FlexRow $gap={4} $align='center'>
                <Image src={row.icon} alt={row.label} width={24} height={24} />
                <Text color={theme.colors.grey_lighter}>{row.label}</Text>
              </FlexRow>
            </LeftCell>

            <RightCell>
              <Text>{row.value || '-'}</Text>
            </RightCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};
