import type { EventPost } from '@/types';

/* Corrections applied on top of the Sanity event records, keyed by slug. Use this
   only when the CMS record cannot be edited right away, and delete the entry once
   Sanity holds the same text, or later Studio edits to those fields are ignored. */
export const EVENT_OVERRIDES: Record<string, Partial<EventPost>> = {
  // Ari is not speaking in London; Odigos is an Exhibitor Partner.
  'observability-sre-summit-london-2026': {
    title: 'Meet Odigos at the Observability & SRE Summit in London',
    content: `### Wake up to the root cause.

Odigos is exhibiting at the [Observability & SRE Summit](https://www.iqpc.com/events-observability-sre-summit) at Hilton London Syon Park, October 21-22. Come find the team on the expo floor.

Odigos records what runs inside every service, live, with nothing in your code. One command on Kubernetes or Linux traces every service from day one, in every language, even the ones nobody owns. When a service drifts, Autofocus captures what the code did while it happens, so your engineers and AI agents start from the evidence.

Bring a production question. We will show you how Odigos answers it.

Want a set time with the team? Use the form and we will book a slot before the event.`,
  },
};

export const applyEventOverride = (event: EventPost): EventPost => ({ ...event, ...EVENT_OVERRIDES[event.slug] });
