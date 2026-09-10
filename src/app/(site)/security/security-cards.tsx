'use client';

import React from 'react';
import styled from 'styled-components';
import { Container } from '@/containers/landing/primitives';

const Section = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-top: 88px;
  padding-bottom: 88px;
  @media (max-width: 850px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;
const Head = styled.div`
  max-width: 880px;
  h2 {
    margin: 0;
    max-width: 25ch;
    font-size: clamp(30px, 3.8vw, 48px);
    line-height: 1.08;
    font-weight: 600;
    letter-spacing: -0.035em;
    text-wrap: balance;
    color: var(--ink);
  }
  p {
    max-width: 65ch;
    margin: 24px 0 0;
    font-size: 18px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
`;
const Inspection = styled.figure`
  margin: 44px 0 0;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  figcaption {
    padding: 16px 28px;
    border-top: 1px solid var(--line);
    color: var(--ink-mute);
    font-size: 13px;
    line-height: 1.55;
  }
  @media (max-width: 600px) {
    margin-top: 32px;
    figcaption {
      padding: 16px 22px;
    }
  }
`;
const Request = styled.div`
  padding: 22px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px 24px;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--line);
  strong {
    font-size: 15px;
    line-height: 1.55;
    font-weight: 500;
    color: var(--ink);
  }
  code {
    font-family: var(--font-mono), monospace;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
  }
  @media (max-width: 600px) {
    padding: 20px 22px;
  }
`;
const InspectionBody = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  > * {
    min-width: 0;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;
const Path = styled.div`
  padding: 34px 32px;
  h3 {
    margin: 0;
    font-size: 21px;
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  ol {
    list-style: none;
    padding: 0;
    margin: 28px 0 0;
  }
  li {
    position: relative;
    padding: 0 0 28px 23px;
    margin-left: 4px;
    border-left: 1px solid var(--line-strong);
  }
  li::before {
    content: '';
    position: absolute;
    top: 6px;
    left: -4px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #92909a;
  }
  li:last-child {
    padding-bottom: 0;
    border-color: transparent;
  }
  li:last-child::before {
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
  li strong {
    display: block;
    margin-bottom: 7px;
    font-size: 15px;
    line-height: 1.55;
    font-weight: 500;
    color: var(--ink);
  }
  code {
    display: block;
    font-family: var(--font-mono), monospace;
    font-size: 13px;
    line-height: 1.65;
    color: var(--ink-mute);
    overflow-wrap: anywhere;
  }
  li:last-child code {
    color: var(--accent);
  }
  .selected {
    display: inline-block;
    margin-top: 12px;
    color: var(--accent);
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 600px) {
    padding: 28px 22px;
  }
`;
const Evidence = styled.div`
  padding: 34px 32px;
  background: var(--panel);
  color: var(--panel-ink);
  .label {
    display: block;
    margin-bottom: 14px;
    color: #c1b9dd;
    font-size: 13px;
  }
  h3 {
    margin: 0;
    font-size: 23px;
    line-height: 1.25;
    font-weight: 600;
    color: #fff;
    overflow-wrap: anywhere;
  }
  dl {
    margin: 28px 0 0;
  }
  dl > div {
    padding: 18px 0;
    border-top: 1px solid #34333d;
  }
  dt {
    margin-bottom: 8px;
    font-size: 13px;
    color: #c1becb;
  }
  dd {
    margin: 0;
    font-family: var(--font-mono), monospace;
    font-size: 14px;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }
  .sensitive {
    color: #f6a4bf;
  }
  p {
    margin: 12px 0 0;
    color: #c1becb;
    font-size: 14px;
    line-height: 1.65;
  }
  p strong {
    color: #fff;
    font-weight: 500;
  }
  @media (max-width: 600px) {
    padding: 28px 22px;
    h3 {
      font-size: 21px;
    }
  }
`;
const Scope = styled.section`
  margin-top: 76px;
  h3 {
    margin: 0;
    max-width: 30ch;
    font-size: clamp(27px, 3.2vw, 40px);
    line-height: 1.12;
    font-weight: 600;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }
  > p {
    margin: 20px 0 0;
    max-width: 70ch;
    font-size: 17px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  @media (max-width: 850px) {
    margin-top: 52px;
  }
`;
const ServiceMap = styled.figure`
  margin: 32px 0 0;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  overflow: hidden;
  .map-heading {
    display: flex;
    justify-content: space-between;
    gap: 12px 28px;
    flex-wrap: wrap;
    padding: 19px 28px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
    color: var(--ink-mute);
  }
  .map-heading strong {
    color: var(--ink);
    font-weight: 500;
  }
  .map {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr 1.15fr;
    align-items: center;
    gap: 40px;
    padding: 36px 28px;
  }
  .map > * {
    min-width: 0;
  }
  .node {
    position: relative;
    padding: 20px;
    border: 1px solid var(--line-strong);
    border-radius: 12px;
    background: var(--paper);
  }
  .node h4 {
    margin: 0;
    font-family: var(--font-mono), monospace;
    font-size: 14px;
    line-height: 1.6;
    font-weight: 500;
    overflow-wrap: anywhere;
  }
  .node p {
    margin: 7px 0 0;
    color: var(--ink-soft);
    font-size: 13px;
    line-height: 1.6;
  }
  .node .connection {
    margin-bottom: 9px;
    color: var(--ink-mute);
    font-size: 12px;
  }
  .affected {
    border: 1.5px solid var(--hot-ink);
    background: rgba(201, 52, 106, 0.06);
  }
  .affected .state {
    display: block;
    margin-bottom: 12px;
    color: var(--hot-ink);
    font-size: 12px;
    font-weight: 600;
  }
  .affected h4 {
    font-size: 17px;
  }
  .gateway::after,
  .affected::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    width: 40px;
    border-top: 1px solid var(--ink-faint);
  }
  .affected::after {
    width: 20px;
  }
  .peers {
    position: relative;
    display: grid;
    gap: 16px;
  }
  .peers::before {
    content: '';
    position: absolute;
    top: 56px;
    bottom: 56px;
    left: -20px;
    border-left: 1px solid var(--ink-faint);
  }
  .peers .node::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    width: 20px;
    border-top: 1px solid var(--ink-faint);
  }
  .peers .node {
    padding: 16px 18px;
  }
  .peers .review {
    display: block;
    margin-top: 7px;
    color: var(--ink-mute);
    font-size: 12px;
    line-height: 1.5;
  }
  figcaption {
    padding: 18px 28px;
    border-top: 1px solid var(--line);
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.65;
  }
  figcaption strong {
    color: var(--ink);
    font-weight: 500;
  }
  @media (max-width: 850px) {
    .map {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .affected {
      grid-column: 1 / -1;
      grid-row: 1;
    }
    .gateway {
      align-self: start;
    }
    .gateway::after,
    .affected::after,
    .peers::before,
    .peers .node::before {
      display: none;
    }
  }
  @media (max-width: 560px) {
    .map {
      grid-template-columns: 1fr;
      padding: 24px 22px;
      gap: 16px;
    }
    .map-heading,
    figcaption {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
`;
const Response = styled.div`
  margin-top: 76px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  align-items: center;
  gap: 56px;
  > * {
    min-width: 0;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 44px;
  }
`;
const ResponseCopy = styled.div`
  h3 {
    margin: 0;
    max-width: 24ch;
    font-size: clamp(26px, 3vw, 36px);
    line-height: 1.12;
    font-weight: 600;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }
  p {
    margin: 20px 0 0;
    max-width: 53ch;
    font-size: 16px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  p strong {
    color: var(--ink);
    font-weight: 600;
  }
  .lifecycle {
    font-size: 14px;
    color: var(--ink-mute);
  }
`;
const Policy = styled.div`
  padding: 26px 28px;
  border: 1px solid var(--accent);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  h4 {
    margin: 0 0 22px;
    color: var(--accent);
    font-size: 15px;
    font-weight: 600;
  }
  dl {
    margin: 0;
  }
  dl > div {
    display: grid;
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 14px;
    padding: 14px 0;
    border-top: 1px solid var(--line);
  }
  dt {
    font-size: 13px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
  dd {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: var(--ink);
    overflow-wrap: anywhere;
  }
  dd code {
    font-family: var(--font-mono), monospace;
    font-size: 12.5px;
  }
  .outcome {
    margin-top: 12px;
    padding-top: 18px;
    border-top: 1px solid var(--line-strong);
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
  .outcome strong {
    color: var(--signal-ink);
    font-weight: 600;
  }
  @media (max-width: 600px) {
    padding: 24px 22px;
    dl > div {
      grid-template-columns: 1fr;
      gap: 5px;
    }
  }
`;
const BroaderResponse = styled.div`
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid var(--line-strong);
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 56px;
  > * {
    min-width: 0;
  }
  h4 {
    margin: 0;
    max-width: 26ch;
    font-size: 22px;
    line-height: 1.25;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  p {
    margin: 12px 0 0;
    max-width: 49ch;
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.65;
  }
  dl {
    margin: 0;
  }
  dl > div + div {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }
  dt {
    color: var(--ink);
    font-size: 16px;
    font-weight: 600;
  }
  dd {
    margin: 8px 0 0;
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.65;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const SecurityCards = () => (
  <Section aria-labelledby='security-investigation-title'>
    <Inner>
      <Head>
        <h2 id='security-investigation-title'>Understand the attack.</h2>
        <p>
          Connect the incoming request to the application actions it triggered and the data it reached. Your security team and AI investigators get the
          evidence to establish what happened and choose a response.
        </p>
      </Head>

      <Inspection>
        <Request>
          <strong>Example: a request reaches a database secret</strong>
          <code>POST /api/tickets</code>
        </Request>
        <InspectionBody>
          <Path>
            <h3>How the request reached the secret</h3>
            <ol>
              <li>
                <strong>A customer submits a support ticket.</strong>
                <code>
                  TicketController.
                  <wbr />
                  create
                </code>
              </li>
              <li>
                <strong>The application renders the supplied text.</strong>
                <code>
                  TemplateRenderer.
                  <wbr />
                  render
                </code>
              </li>
              <li>
                <strong>The template reads a database secret.</strong>
                <code>
                  EnvironmentLookup.
                  <wbr />
                  read
                </code>
                <span className='selected'>Observed access to sensitive information</span>
              </li>
            </ol>
          </Path>
          <Evidence>
            <span className='label'>What the captured evidence shows</span>
            <h3>A database credential was read.</h3>
            <dl>
              <div>
                <dt>Requested secret</dt>
                <dd>&quot;DATABASE_URL&quot;</dd>
              </div>
              <div>
                <dt>Returned credential · redacted for this example</dt>
                <dd className='sensitive'>&quot;postgres://[masked]/appdb&quot;</dd>
              </div>
            </dl>
            <p>
              <strong>That credential could give access to database data.</strong> Check whether it was used beyond this request and whether database data
              was exposed.
            </p>
          </Evidence>
        </InspectionBody>
        <figcaption>Illustrative investigation. Application functions, request details and values are examples.</figcaption>
      </Inspection>

      <Scope aria-labelledby='security-scope-title'>
        <h3 id='security-scope-title'>Assess the blast radius.</h3>
        <p>
          Odigos maps all communications with the affected service. See which connected systems and data may also be at risk, and use those connections to
          decide where to investigate next.
        </p>
        <ServiceMap>
          <div className='map-heading'>
            <strong>Connections to the affected service</strong>
            <span>Illustrative service map</span>
          </div>
          <div className='map'>
            <div className='node gateway'>
              <p className='connection'>Incoming requests</p>
              <h4>api-gateway</h4>
              <p>Forwards customer requests to tickets-api.</p>
            </div>
            <div className='node affected'>
              <span className='state'>Affected service</span>
              <h4>tickets-api</h4>
              <p>A database credential was accessed in this service.</p>
            </div>
            <div className='peers'>
              <div className='node'>
                <p className='connection'>Database communication</p>
                <h4>appdb</h4>
                <span className='review'>Check whether the credential was used to access data.</span>
              </div>
              <div className='node'>
                <p className='connection'>Service requests</p>
                <h4>identity-api</h4>
                <span className='review'>Inspect requests from the affected service.</span>
              </div>
              <div className='node'>
                <p className='connection'>Messaging</p>
                <h4>notification-worker</h4>
                <span className='review'>Review messages sent along this path.</span>
              </div>
            </div>
          </div>
          <figcaption>
            <strong>The secret access is confirmed in this example. Exposure of connected systems is still unconfirmed.</strong> These connections identify
            where to investigate; they do not by themselves prove data theft or compromise.
          </figcaption>
        </ServiceMap>
      </Scope>

      <Response>
        <ResponseCopy>
          <h3>Contain the threat.</h3>
          <p>
            <strong>Function-level virtual patching blocks the application operation the attack depends on.</strong> Your team approves a rule that stops
            matching calls, so you can apply the mitigation before a code release.
          </p>
          <p>
            Review which legitimate requests also use that operation. A targeted rule can leave other service traffic running while your team prepares the
            permanent fix.
          </p>
          <p className='lifecycle'>Deploy or revert the virtual patch as needed. Remove it when the permanent fix is deployed.</p>
        </ResponseCopy>
        <Policy>
          <h4>Example virtual patch: block template access to environment variables</h4>
          <dl>
            <div>
              <dt>Block</dt>
              <dd>Environment-variable lookups from the template-rendering code</dd>
            </div>
            <div>
              <dt>Function</dt>
              <dd>
                <code>
                  EnvironmentLookup.
                  <wbr />
                  read
                </code>
              </dd>
            </div>
            <div>
              <dt>Called by</dt>
              <dd>
                <code>
                  TemplateRenderer.
                  <wbr />
                  render
                </code>
              </dd>
            </div>
          </dl>
          <div className='outcome'>
            The rule blocks these lookups, including the observed database-secret read. <strong>Other service traffic can continue.</strong>
          </div>
        </Policy>
      </Response>
      <BroaderResponse>
        <div>
          <h4>Stop a thread or process when a wider response is needed.</h4>
          <p>These options can interrupt legitimate application work. Choose based on the spread of the attack and the service disruption your team can accept.</p>
        </div>
        <dl>
          <div>
            <dt>Stop the thread</dt>
            <dd>Stops the thread executing the attack and interrupts the work running on that thread.</dd>
          </div>
          <div>
            <dt>Stop the process</dt>
            <dd>Stops the affected process, including its other threads and requests. This interrupts more application work than stopping one thread.</dd>
          </div>
        </dl>
      </BroaderResponse>
    </Inner>
  </Section>
);
