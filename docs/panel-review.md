# Adversarial website review

Brief: tell one Production Context Platform story across Observability, Security and Coding Agents. Preserve the original home, Observability and Security heroes, including text and art, plus the original side-by-side AI-agent conversations.

Baseline: main commit `5025e64`, fetched September 10, 2026. Reviews assess the local implementation. Scores are reviewer judgments, not measured customer outcomes.

## Historical rubric (rounds 1–3)

Each reviewer scores the same 100-point rubric independently:

| Dimension | Maximum |
| --- | ---: |
| Narrative coherence | 25 |
| Preservation of user intent | 20 |
| Specificity and credibility | 20 |
| Visual and content UX | 20 |
| Implementation and completeness | 15 |

The overall panel score is the arithmetic mean. Delivery target: at least 90 overall, with every reviewer at least 90 and no unresolved material defect. Reviewers are asked to challenge the work, not to converge on the target.

## Round 1

Reviewed the restored protected sections and the first revised body content. Design reviewed the production build at port 3102 on desktop and mobile; narrative and product reviewers inspected source.

| Reviewer | Narrative | Preservation | Credibility | UX | Completeness | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Narrative | 18 | 20 | 14 | 16 | 13 | 81 |
| Product and engineering | 23 | 20 | 17 | 17 | 11 | 88 |
| Design and interaction | 20 | 20 | 17 | 16 | 12 | 85 |

**Overall: 84.7/100.**

### Changes prompted by the review

- Replaced the additional checkout specimen with a compact requests/functions/values definition before the protected conversations. Added early links to all three use cases.
- Made the mobile menu scroll within the viewport, contained overscroll and added keyboard focus management and Escape handling.
- Gave the Coding Agents body a distinct setup explanation, with Enterprise availability near the hero and specific demo/documentation closing actions.
- Clarified subsequent-request capture on Observability. Replaced the benchmark panel with an existing attributed testimonial. Made collection governance distinct from incident investigation.
- Made the Security body follow a concrete illustrative request through lookup, rendering, parsing and a data write before explaining scoped policy enforcement.
- Shortened use-case text and removed repeated card framing from the capture section.
- Corrected the design brief and added an executable preservation check.

## Round 2

Reviewed the revised body content and the final production build at port 3104.

| Reviewer | Narrative | Preservation | Credibility | UX | Completeness | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Narrative | 23 | 20 | 18 | 18 | 13 | 92 |
| Product and engineering | 24 | 20 | 18 | 18 | 12 | 92 |
| Design and interaction | 23 | 20 | 18 | 18 | 14 | 93 |

**Overall: 92.3/100. All three reviewers cleared 90.**

Narrative and product reviews independently inspected source and ran the preservation check. Design independently inspected source and saved desktop/mobile screenshots across all four pages. Its browser surface became unavailable in round 2, so final interaction evidence came from the parent agent's live CUA tests. Round 1's design browser review was independent.

### Final corrections and evidence

- Reviewers identified the mobile-menu cleanup stealing focus from the newly opened trial. This was reproduced on the port 3103 production build: the dialog was visible but the burger was focused. The header now yields focus and scroll ownership to an active modal.
- Added trial-dialog initial focus, Tab containment and return focus. On the final build, the name input receives focus through the menu, Tab wraps from the last control to Close, Shift+Tab wraps back, and Escape returns focus to the menu trigger.
- At both 390×844 and 320×568, Careers and the trial button are reachable, the menu scrolls within the viewport, and the background stays still at the menu's scroll boundary. Menu route selection closes the sheet and restores scrolling.
- Replaced the remaining broad unlocked Observability claims with instrumented-service and subsequent-request language.
- Product performed a targeted final review of the focus changes and retained 92. Design finalized 93 after examining the screenshots and recorded interaction evidence. No remaining must-fix issue was reported. Minor residual observations: some repeated platform phrasing and faint microcopy in existing supporting Security diagrams.

## Final verification

- Production build, TypeScript, ESLint with zero warnings, and `git diff --check`: pass.
- Fixed-baseline preservation script: pass. Original home hero and comparison files, all three hero art files, Observability hero markup, and Security hero markup/styles match `5025e64`.
- Home, Observability, Security, Coding Agents, Technology and the Cursor walkthrough: HTTP 200, one H1 and expected canonical URL. Coding Agents is included in the sitemap.
- Desktop and phone rendering inspected. No horizontal document overflow on the four principal routes at the inspected phone sizes. Browser viewport override reset after testing.
- No form was submitted and no deployment was performed.
- Final local preview: http://127.0.0.1:3104.
- Screenshots: `/Users/edenfed/.codex/visualizations/2026/09/10/01a08a52-3204-7a71-809e-6d13bd7cd0ad/landing-review/`.

The score is an internal adversarial review judgment. It is not a claim about conversion performance or customer outcomes.


## Round 3 — Owner feedback

The owner rejected the added homepage definition, both quote sections, the generic CTA and the Observability signal headline. This feedback supersedes the prior internal assessment.

Changes: remove the definition and quote sections; remove redundant Production Context navbar item; replace CTA with “Stop guessing. Ask production.”; explain predefined manual/automatic coverage versus dynamic instrumentation with a source-backed OdiShop example. Protected heroes and conversations remain unchanged.

The first narrative review scored 88 and identified repeated explanation after the new comparison plus a missing fact in the diagnosis. Removed the redundant closing bridge, gave the next section a distinct deployment/destinations/Autofocus role, and explained that 47 ms is normal for eu-west before identifying the shared 10 ms limit as the fault.

| Reviewer | Narrative | Preservation | Credibility | UX | Completeness | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Narrative, after corrections | 23 | 20 | 18 | 18 | 13 | 92 |
| Product and engineering | 24 | 20 | 19 | 18 | 13 | 94 |
| Design and interaction | 23 | 20 | 19 | 18 | 14 | 94 |

**Final round 3 average: 93.3/100.** No must-fix issue remained. These are internal editorial judgments; the owner's preferences remain decisive.

Design reviewed saved desktop, 390px and 320px screenshots and independently checked the supporting blog details and preservation. Root performed the live browser checks. Final polish adds a word-break opportunity after the class name in the narrow code specimen and balanced wrapping for the CTA headline.

Verification: production build, TypeScript, zero-warning ESLint, whitespace and protected-content checks pass. HTTP assertions confirm both pages return 200, have one H1, contain the new messaging, and exclude all rejected headings and blockquotes. Browser checks confirm no horizontal document overflow at the tested phone widths, removal of the redundant menu entry on desktop and mobile, menu dismissal, and logo navigation to home.

Latest preview: http://127.0.0.1:3106. Screenshots are under `landing-review/round-3/` in the directory recorded above. No form submission or deployment.


## Round 4 — AI can investigate production

The owner rated the preceding site **70/100**, superseding the earlier internal assessments, and chose the intended takeaway: **“Odigos gives AI the power to investigate production.”**

This round uses a stricter rubric: buyer clarity 25, differentiation 25, causal story 25, evidence 15, friction 10. Hero preservation and implementation correctness are pass/fail gates, with no narrative points. Review scores remain subjective editorial judgments, not conversion measurements.

### Adversarial iterations

Initial independent audits found that a compelling agent conversation turned into unrelated product brochures and setup explanations. Subsequent reviews scored Home/Observability 80 and the five-page journey 84: the AI promise was clearer, but the mechanism, independent evidence and evaluation path needed work.

Changes prompted by those reviews:

- Put the explicit AI investigation promise and actual Jaeger capture before the protected conversations, with proof before mechanism steps on phones.
- Explain DeepBPF capture, subsequent matching traffic and the separate roles of the agent, MCP controls and telemetry backend.
- Replace abstract use-case cards with distinct outcome links.
- Add the separate documented OdiMall/Dynatrace incident lifecycle: temporary capture on problem open, richer spans, removal on close. Explicitly identify configured automation and the absence of an LLM.
- Keep Autofocus compact and distinct while awaiting a factual trigger/target/capture example from the owner.
- Show the actual Cursor verification artifact on Coding Agents, with readable outcomes and its approximately 90-second observation window.
- Follow a clearly illustrative Security request into a sensitive function; connect the evidence to engineers and agents while leaving policy approval with the team.
- Replace Technology's abstract hero artifact with a function-boundary illustration, correct console description and concrete runtime/deployment boundaries.
- Align the platform and Technology evaluation paths with an AI demo and MCP documentation.
- Make evidence originals explicitly inspectable at full size. Fix the console's negative mobile image offset, and verify its horizontal scroll reaches both ends.

### Final panel

| Reviewer | Clarity | Differentiation | Story | Evidence | Friction | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Skeptical buyer | 23 | 22 | 23 | 12 | 9 | 89 |
| Product differentiation | 23 | 23 | 24 | 12 | 9 | 91 |
| Design and content | 23 | 23 | 22 | 13 | 9 | 90 |

**Overall: 90/100.** The skeptical buyer retained 89 because of protected absolute wording and limited demonstration evidence. These deductions were not removed by inventing claims or changing protected content. No reviewer found a remaining material narrative blocker. This round satisfies the owner's requested overall score threshold; it does not imply unanimous 90+ ratings or validated buyer conversion.

Review scope: five core marketing routes. Agents independently reviewed one another's source changes; some also reviewed their own bounded implementation. Root performed live browser interactions and supplied screenshots. Design inspected Home, Observability, Security, Coding and Technology at desktop and phone widths; the product reviewer inspected the available evidence captures. Pricing, documentation and the full blog were not redesigned or independently scored.

### Verification and limits

Production build, TypeScript, ESLint, whitespace and fixed-baseline preservation checks passed. Browser review covered all five core pages at desktop and phone widths, including 320px wrapping checks, mobile route navigation, image loading, and console scrolling from 0 to its 762px maximum without page overflow. The customer carousel retains its nine original logos and has no pause button. No forms were submitted and nothing was deployed.

Screenshots: `landing-review/round-4/` under the visualizations directory recorded above. Latest local production preview: **http://127.0.0.1:3104/**.

Remaining editorial limits: dense screenshots need full-size inspection; the manual/automatic comparison is still lengthy on a small phone; a precise Autofocus example is pending owner input; demonstrations do not establish broad customer outcomes.


Final preview note: the existing in-app browser origin reused old client-navigation data across repeated production builds, while direct HTTP responses served the new content. A fresh origin loaded the current route correctly. The final build is served at **http://127.0.0.1:3109/** to keep the review isolated from those cached routes. No production caching configuration was changed.

## Round 5 — Owner-approved direction, targeted refinements

The owner approved the Home and Observability direction and requested a clearer Home visual, Security blast radius and mitigation options, and a rewritten Technology story centered on external DeepBPF capture and the eBPF sandbox.

- Replaced the Home bitmap with a responsive React recreation of the documented OdiShop capture. The original evidence and walkthrough remain linked, and the recreation is labeled.
- Added an illustrative affected-service communication map to Security. Potential exposure is distinct from confirmed compromise. Function-level virtual patching is the primary mitigation, with thread and process stops explaining their broader interruption scope.
- Rebuilt Technology around deep visibility into Java, Python, Node.js and Go from outside application processes. The diagram and copy distinguish load-time eBPF verification from the scope of MCP requests and customer permissions. Removed the incorrect instrumentation-engine catalog.
- Verified kernel descriptions against pinned Linux v6.18 source. See `deepbpf-technology-evidence.md` for primary-source references and product-owner assertions.

The technical reviewer found no material copy issues. The design reviewer inspected desktop and 320px screenshots of the new Home capture and Technology diagram and found no material visual defects; the four-language row wraps at the smallest width. The buyer reviewer inspected the Security screenshots and confirmed readable mitigation choices, clear function-patching priority and the distinction between observed access and potential exposure. This targeted review does not assign a new numerical score or claim a measured conversion improvement.

Final production build (including TypeScript), zero-warning ESLint, whitespace and fixed-baseline preservation checks passed. All five core routes return HTTP 200 with one H1 and their expected canonical URL. Root inspected the changed sections on desktop and at 320px, including Security map, patch policy and both broader mitigation options. No horizontal document overflow was observed. Viewport override was reset after review. No form submission or deployment.

Latest local preview: **http://127.0.0.1:3111/**. Screenshots are under `landing-review/round-5/` in the visualizations directory recorded above.
