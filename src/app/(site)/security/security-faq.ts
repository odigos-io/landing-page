/* the same answers the FAQ shows, for answer engines */
export const FAQ: { q: string; a: string }[] = [
  {
    "q": "What is Odigos security?",
    "a": "Odigos is eBPF runtime security for Kubernetes. It reads the function calls inside live services, with their arguments and return values, across every service, and blocks a call at the function level by policy."
  },
  {
    "q": "How does Odigos detect AI-powered attacks?",
    "a": "Detection is baselined on your own traffic: the calls a route normally makes, and the one it has never made. No shared model, no signature feed."
  },
  {
    "q": "Does Odigos require code changes?",
    "a": "No. Nothing goes in your code, your process or your build. One sensor on the node, no SDK, no sidecar, no redeploy."
  },
  {
    "q": "What is virtual patching at the function level?",
    "a": "A policy that refuses one vulnerable function, or changes what it returns, in a running service. Scoped to the callers you name, shipped or reverted without a redeploy, deleted when the real patch lands."
  },
  {
    "q": "How is Odigos different from a WAF, EDR or ADR?",
    "a": "Each of those judges one piece of an attack: a request, a process, one application. Odigos reads the function calls the attack is made of, across services, so a chain of ordinary-looking steps is visible as a chain."
  }
];
