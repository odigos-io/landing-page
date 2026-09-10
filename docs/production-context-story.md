# Production Context website direction

## The intended takeaway

**Odigos gives AI the power to investigate production.**

This is the owner's chosen impression. Production Context Platform is the product category supporting that power. The differentiator is active evidence acquisition: an investigation can change what running software captures, instead of ending at the limits of existing telemetry.

The original website was audited against origin/main `5025e64`, fetched September 10, 2026. The owner rated the earlier iteration 70/100 despite higher internal scores. Those scores are not evidence of buyer conviction. The new review rubric treats preservation and technical correctness as gates, rather than awarding them narrative points.

## Page jobs

- **Home:** state the chosen promise briefly, bring the two protected agent conversations forward, connect the evidence to three outcomes, and invite a concrete AI demo. Keep the detailed checkout capture off the homepage.
- **Observability:** explain predefined manual/conventional automatic coverage versus investigation-directed instrumentation. Show a requested capture, then independently demonstrate incident-driven temporary capture and removal. Keep Autofocus distinct from the documented Dynatrace workflow, and restore Odigos Central as the named control plane for fleet management and governance.
- **Security:** help CISOs and technical leaders understand the attack, assess the blast radius and contain the threat. Put readable decisions before supporting code symbols. Explain virtual patching first, then the broader thread/process options.
- **Coding Agents:** carry the runtime finding into a targeted code change, then check new traffic after deployment. Keep the detailed capture available as optional supporting evidence. Explain the agent, Enterprise MCP and backend connection compactly.
- **Technology:** explain DeepBPF's external visibility into Java, Python, Node.js, Go and .NET, the eBPF execution boundary and the separate controls configured by the operator.

## Structure and design

Existing palette: paper `#fbfaf7`, surface `#ffffff`, ink `#121215`, violet `#5b43f1`, evidence green `#0c7a58`, panel `#0b0b0d`. Geist carries the prose and headings; Geist Mono identifies code and values. Retain the existing spacing and width system.

The detailed React recreation of the actual Jaeger capture now lives behind “Inspect the captured evidence” on Coding Agents. It renders the selected function and 47 ms / 10 ms decision as readable text, labels the recreation and links the original image. Home uses a compact introduction before its protected conversations. Security uses a clearly illustrative request inspection. Technology illustrates the application process and external DeepBPF capture, with eBPF load-time verification in the kernel. The actual Odigos console illustrates the separate workload/data-scope controls. No stock imagery or new animation system is added.

```text
HOME
original hero
customer logo carousel
compact AI investigation promise
original agents without / with Odigos conversations
three outcome links
Stop guessing. Ask production. → AI demo

OBSERVABILITY
original hero
predefined manual/automatic coverage ↔ dynamic capture
OdiMall incident lifecycle: open → deeper evidence → remove rules
compact Autofocus and operational details
Odigos Central: fleet management, capture policies and access
next question: carry the finding into a code change

SECURITY
original hero
understand the attack → readable illustrative evidence
assess the blast radius → affected-service communications
contain the threat → virtual patch, thread and process options
technology / security demo

CODING AGENTS
agent investigation hero
runtime evidence → regional policy fix → verified traffic
optional captured-evidence detail
agent + Enterprise MCP + backend, with capture access
agent demo

TECHNOLOGY
external application context: Java, Python, Node.js, Go and .NET
AI investigation → eBPF execution boundary → DeepBPF depth
actual console: sources, rules, actions, destinations
team-controlled scope and access
```

The new sequence replaces separate brochure-like cards and repeated plumbing explanations. The recency-driven homepage blog grid is removed; relevant walkthrough links sit next to the claims they substantiate. Cross-page links answer the reader's next question instead of repeating a generic platform pitch or linking to the current page.

## Protected owner choices

- Preserve home, Observability and Security hero text, art and presentation exactly from `5025e64`.
- Preserve the original side-by-side agent conversations, rendered exactly once on Home.
- Do not restore the rejected standalone production-context definition, testimonials, or Production Context navbar entry.
- Keep “Stop guessing. Ask production.” as the platform closing headline.
- Keep the original nine logos in the continuous carousel. No pause button, extra customer logos or invented customer count. Hover pause remains; reduced motion restores a static grid; the duplicate group is hidden from assistive technology.

## Evidence and claim boundaries

- `blogs/cursormcpblog.mdx` documents Cursor + Odigos MCP + Jaeger on OdiShop, a production-like demo. This is not a reported customer incident. The actual method capture shows `region=eu-west`, `replicaSkewMs=47`, `threshold=10` and `allowed=false`. The single threshold rejected healthy EU checkouts. The documented region-aware change was followed by successful traffic in both regions, payment execution and completed traces.
- Odigos MCP controls inspection, profiling and instrumentation. The backend supplies trace queries. Do not imply that MCP is the trace store.
- New capture observes subsequent matching traffic. It does not recover previously unrecorded requests. Activation time and the arrival of relevant traffic are different.
- `blogs/mcp-based-auto-remediation-davis-ai-to-odigos-mcp-server-and-back-again.mdx` demonstrates OdiMall, Dynatrace workflows and MCP. Problem-open automation adds payload/code capture; problem-close automation removes rules. There was no LLM in that loop. It is not proof of Autofocus behavior.
- Autofocus is described conservatively from existing product copy. A more specific trigger/capture/result example has been requested from the owner; none has been invented.
- The owner clarified that DeepBPF deeply inspects Java, Python, Node.js, Go and .NET entirely from outside application processes. The Technology page no longer uses the instrumentation-engine catalog to describe DeepBPF. See `docs/deepbpf-technology-evidence.md` for this correction and the verified Linux source boundaries.
- Linux checks eBPF programs before loading them; the verifier does not approve model reasoning or customer data-access policies. Avoid zero-overhead or zero-risk guarantees.
- Security's functions, request and values are labeled illustrative. Policy approval belongs to the team. No autonomous blocking or verified attack outcome is implied.
- The homepage closes with an AI demo and Enterprise MCP documentation, avoiding an unverified claim that a particular trial includes MCP access.

## Verification

- `scripts/verify-landing-preservation.mjs` compares protected content to the fixed main commit and checks that the conversation component appears once.
- Production build, TypeScript, ESLint and whitespace checks.
- Desktop and phone review of all five core routes; image loading, wrapping, overflow, navigation and the conversion flow.
- No new dependencies, external services or deployment. Final local production preview: `http://127.0.0.1:3111/` (fresh browser origin after repeated review builds).


## Latest owner refinements

The owner rejected the prominence of the checkout example on Home. Its detailed capture is removed from Home and remains available on Coding Agents. The compact AI promise leads directly into the protected conversations. The owner also requested restoration of the named Odigos Central section on Observability.

Security leads with the decisions facing CISOs and technical leaders: understand the attack, assess the blast radius and contain the threat. It maps the affected service and its communications, highlights function-level virtual patching and explains stopping a thread or process as broader responses. Connected services are potential investigation targets, not automatically confirmed compromised.

Technology now centers DeepBPF: deep Java, Python, Node.js, Go and .NET context from outside the application, an eBPF execution boundary checked by Linux, and separate team-controlled scope and permissions. Program verification details link directly to reviewed Linux v6.18 source sections.
