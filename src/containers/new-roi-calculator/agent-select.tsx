'use client';

import { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import type { RoiAgent } from '@/constants/roi-calculator';

interface AgentSelectProps {
  id?: string;
  label: string;
  agents: RoiAgent[];
  value: string;
  onChange: (value: string) => void;
}

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

const Label = styled.span`
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Trigger = styled.button`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 14px 14px 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper-2);
  color: var(--ink);
  font-size: 15px;
  line-height: 1.2;
  text-align: left;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 0 color-mix(in srgb, var(--ink) 4%, transparent);
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;

  &:hover {
    border-color: color-mix(in srgb, var(--accent) 28%, var(--line));
    background: color-mix(in srgb, var(--accent) 4%, var(--paper-2));
  }

  &:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }

  &[aria-expanded='true'] {
    border-color: color-mix(in srgb, var(--accent) 40%, var(--line));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent),
      0 10px 28px color-mix(in srgb, var(--ink) 8%, transparent);
  }
`;

const TriggerText = styled.span`
  min-width: 0;
  overflow: hidden;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChevronWrap = styled.span<{ $open: boolean }>`
  display: grid;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 999px;
  background: var(--paper-3);
  color: var(--ink-soft);
  transition:
    transform 180ms ease,
    background 160ms ease,
    color 160ms ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});

  ${Trigger}[aria-expanded='true'] & {
    background: color-mix(in srgb, var(--accent) 14%, var(--paper-3));
    color: var(--accent);
  }
`;

const Chevron = styled.span`
  width: 10px;
  height: 10px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-1px) rotate(45deg);
`;

const Menu = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  left: 0;
  z-index: 20;
  margin: 0;
  padding: 6px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper-2);
  list-style: none;
  box-shadow:
    0 16px 40px color-mix(in srgb, var(--ink) 12%, transparent),
    0 0 0 1px color-mix(in srgb, var(--ink) 3%, transparent);
  animation: menuIn 160ms ease;

  @keyframes menuIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const OptionButton = styled.button<{ $selected: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 0;
  border-radius: 10px;
  background: ${({ $selected }) =>
    $selected ? 'color-mix(in srgb, var(--accent) 10%, var(--paper))' : 'transparent'};
  color: var(--ink);
  font-size: 15px;
  line-height: 1.2;
  text-align: left;
  cursor: pointer;
  transition: background 140ms ease;

  &:hover,
  &:focus-visible {
    background: color-mix(in srgb, var(--accent) 8%, var(--paper));
    outline: none;
  }
`;

const OptionText = styled.span`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
`;

const OptionName = styled.span`
  font-weight: 500;
`;

const OptionMeta = styled.span`
  flex-shrink: 0;
  color: var(--ink-mute);
  font-size: 12px;
  font-weight: 500;
`;

const SelectedMark = styled.span`
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  border-radius: 50%;
  background: var(--accent);
  color: var(--paper-2);
  font-size: 11px;
  font-weight: 700;
`;

export const AgentSelect = ({ id, label, agents, value, onChange }: AgentSelectProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const selected = agents.find((agent) => agent.id === value) ?? agents[0];

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Field ref={rootRef}>
      <Label id={labelId}>{label}</Label>
      <Trigger
        id={id}
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => setOpen((current) => !current)}
      >
        <TriggerText>{selected.name}</TriggerText>
        <ChevronWrap $open={open} aria-hidden='true'>
          <Chevron />
        </ChevronWrap>
      </Trigger>

      {open ? (
        <Menu role='listbox' aria-labelledby={labelId}>
          {agents.map((agent) => {
            const isSelected = agent.id === value;

            return (
              <li key={agent.id} role='none'>
                <OptionButton
                  type='button'
                  role='option'
                  aria-selected={isSelected}
                  $selected={isSelected}
                  onClick={() => {
                    onChange(agent.id);
                    setOpen(false);
                  }}
                >
                  <OptionText>
                    <OptionName>{agent.name}</OptionName>
                    <OptionMeta>Odigos uses {agent.cpuLessPct}% less CPU</OptionMeta>
                  </OptionText>
                  {isSelected ? <SelectedMark aria-hidden='true'>✓</SelectedMark> : null}
                </OptionButton>
              </li>
            );
          })}
        </Menu>
      ) : null}
    </Field>
  );
};
