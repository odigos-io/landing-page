# DeepBPF technology copy: evidence and boundaries

## Product-owner clarification, September 10, 2026

The owner confirmed that DeepBPF deeply inspects Java, Python, Node.js, Go and .NET entirely from outside application processes, adding .NET in the subsequent review. The prior Technology page incorrectly used an instrumentation-engine catalog to explain DeepBPF. That text, related link, metadata and machine-readable summary have been replaced. Historical blog content is not rewritten.

The owner also confirmed:

- Blast radius means mapping the communications of the affected service to see what else may be in danger.
- Mitigation options include stopping a thread, stopping a process and virtually patching an offending function.
- The owner believes Odigos is the only company with this combination of deep external runtime visibility; no comparative evidence was supplied. The page foregrounds that concrete capability without claiming every other sandbox architecture is impossible.

## Linux source verification

Root downloaded and inspected the following files from the pinned Linux v6.18 tag, not just marketing descriptions. Working copies are under `/tmp/odigos-kernel-review/`.

- [Program load path, syscall.c lines 3076–3084](https://github.com/torvalds/linux/blob/v6.18/kernel/bpf/syscall.c#L3076): `bpf_check()` runs before runtime selection. A verification error rejects program loading.
- [Memory access checking, verifier.c line 7451](https://github.com/torvalds/linux/blob/v6.18/kernel/bpf/verifier.c#L7451): checks pointer alignment, map access types, memory regions and valid access bounds.
- [Helper call checking, verifier.c line 11364](https://github.com/torvalds/linux/blob/v6.18/kernel/bpf/verifier.c#L11364): helper availability depends on program type and constraints; unsupported helpers are rejected.
- [Infinite-loop rejection, verifier.c line 19433](https://github.com/torvalds/linux/blob/v6.18/kernel/bpf/verifier.c#L19433): rejects a detected looping state. The page says checked control flow; it does not repeat the obsolete claim that eBPF permits no loops.
- [User-memory read helper, bpf_trace.c line 173](https://github.com/torvalds/linux/blob/v6.18/kernel/trace/bpf_trace.c#L173): copies user memory through `copy_from_user_nofault`, handles failure, and declares helper argument types. This supports the mechanism for inspecting user memory; it does not establish Odigos' proprietary language understanding.
- [Linux verifier documentation](https://docs.kernel.org/bpf/verifier.html): explanatory reference; kernel source is the authority for the details above.

## Wording limits

The verifier checks eBPF programs at load time. It does not approve each MCP request, validate AI reasoning, classify secrets, or determine the customer's authorized workloads. Those are distinct from kernel execution checks.

Running outside the application means DeepBPF does not load instrumentation into the application's runtime. It does not imply a zero-overhead or zero-risk availability guarantee. No new such guarantees or benchmark numbers are introduced.

The Technology diagram distinguishes application process, kernel program checks/execution and agent capture requests. It is an explanatory architecture illustration, not an actual console capture.

## Design scope

Home: the owner subsequently rejected the prominence of the detailed checkout example. Keep the AI promise compact before the protected conversations. The responsive React recreation now lives in the optional “Inspect the captured evidence” disclosure on Coding Agents, retaining its original source link and recreation label.

Security: preserve the protected hero and lead the body with incident decisions for CISOs and technical leaders. Explain the investigation in plain language before code symbols, retain the service communication map and prioritize function-level virtual patching. The map is illustrative, and potential exposure is distinguished from confirmed compromise. The illustrated function-and-caller policy blocks environment lookups from the template renderer; it does not claim a narrower argument filter.

Technology: preserve the established paper/violet/dark-panel typography, but replace the generic instrumentation workflow with the DeepBPF external-capture and eBPF verification story. Keep the actual console for the separate topic of team-controlled capture scope.

Observability: restore the named Odigos Central section from the original approved product content, with fleet management and central controls. Keep the incident automation, Autofocus and pipeline story intact. The original three protected heroes and side-by-side conversations remain unchanged.
