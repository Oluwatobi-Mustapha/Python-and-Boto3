export type BlogReference = {
  label: string;
  href: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  summary: string;
  articleDescription: string;
  sections: BlogSection[];
  identrailFit: string[];
  references: BlogReference[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "machine-identity-security-2026-practical-operating-model",
    category: "Machine Identity Security",
    readTime: "10 min",
    title: "Machine Identity Security in 2026: A Practical Operating Model",
    summary:
      "A practical operating model for discovering, prioritizing, and safely controlling machine-identity trust paths in modern cloud platforms.",
    articleDescription:
      "A practical operating model for discovering and reducing machine-identity trust-path risk in production.",
    sections: [
      {
        heading: "Why machine identity now defines cloud risk",
        paragraphs: [
          "Most organizations have already crossed the point where non-human identities outnumber humans by a wide margin. Workloads, CI pipelines, automation scripts, agents, and platform controllers continuously authenticate to APIs and data services. That means compromise paths increasingly start from machine identities, not employee accounts.",
          "Security teams usually know this conceptually, but operations are still designed around traditional IAM reviews. Policies are checked in isolation, inventory is fragmented across clouds and clusters, and ownership is unclear when trust paths cross platform boundaries. The result is avoidable blast radius.",
          "The fix is not another single scanner. Teams need an operating model that treats machine identity as a continuous control system rather than a quarterly audit activity.",
        ],
      },
      {
        heading: "A four-loop operating model that works",
        paragraphs: [
          "Effective programs run four loops in parallel: discovery, graph mapping, risk prioritization, and safe enforcement. Discovery gives you an accurate identity inventory. Graph mapping tells you how identities can chain into higher-value targets. Prioritization ranks paths by exploitability and business impact. Enforcement applies policy hardening in staged rollouts to avoid outages.",
          "This is consistent with zero trust guidance from NIST and CISA: trust decisions must be continuously evaluated, and implicit trust should be minimized even inside internal environments.",
        ],
        bullets: [
          "Discovery: keep an always-fresh inventory of service accounts, roles, tokens, and credentials.",
          "Trust graphing: map which identities can reach sensitive data or control-plane actions.",
          "Risk ranking: focus on high-impact reachable paths first, not alert volume.",
          "Safe enforcement: simulate, canary, and then enforce progressively.",
        ],
      },
      {
        heading: "What to measure so leadership sees real progress",
        paragraphs: [
          "Machine-identity programs fail when metrics stay at the activity level, such as 'policies reviewed' or 'alerts closed.' Mature teams report reduction metrics: critical trust paths removed, mean time to remediate high-risk chains, and percentage of production identities with scoped permissions.",
          "If these numbers trend in the right direction, your posture is improving. If they do not, controls are likely superficial or too slow to influence risk before incidents occur.",
        ],
      },
    ],
    identrailFit: [
      "Identrail gives security and platform teams a trust-graph view of machine identities across environments.",
      "It helps prioritize exploitability and blast radius, so remediation starts with the riskiest reachable paths.",
      "Its rollout-safe control workflow supports simulation and staged enforcement, reducing outage risk while tightening policy.",
    ],
    references: [
      { label: "NIST SP 800-207 Zero Trust Architecture", href: "https://csrc.nist.gov/pubs/sp/800/207/final" },
      { label: "CISA Zero Trust Maturity Model", href: "https://www.cisa.gov/zero-trust-maturity-model" },
      { label: "SPIFFE/SPIRE concepts", href: "https://spiffe.io/docs/latest/spire-about/spire-concepts/" },
    ],
  },
  {
    slug: "aws-nhi-security-14-misconfigurations",
    category: "AWS Security",
    readTime: "8 min",
    title: "AWS NHI Security: 14 Misconfigurations That Expand Blast Radius",
    summary:
      "A field guide to high-impact AWS non-human identity misconfigurations and a practical remediation order that avoids production breakage.",
    articleDescription:
      "A field guide to high-impact AWS NHI misconfigurations and practical remediation sequencing.",
    sections: [
      {
        heading: "Most AWS identity incidents are configuration incidents",
        paragraphs: [
          "In real cloud incidents, attackers rarely need novel techniques if IAM is overly permissive. A compromised build role, runtime role, or automation token can become a fast path to cross-account movement and sensitive data access.",
          "The underlying pattern is common: permissive policies, weak trust constraints, and no pre-deploy policy validation or simulation. Small misconfigurations stack into large blast radius.",
        ],
      },
      {
        heading: "The 14 patterns teams should prioritize",
        paragraphs: [
          "Security teams repeatedly find the same risky patterns. Examples include wildcard actions, wildcard resources, broad trust policies for sts:AssumeRole, long-lived keys, stale high-privilege roles, and cross-account assumptions that are no longer required.",
          "Another common gap is process-related: teams deploy IAM changes without automated validation, policy simulation, or post-change monitoring gates. Without those controls, permission drift accelerates.",
        ],
        bullets: [
          "Overly broad policy scope (`Action: *` or `Resource: *`) in production roles.",
          "Trust policies that accept wider principals than intended.",
          "No CI integration for IAM policy validation findings.",
          "No simulation check before high-impact policy updates.",
        ],
      },
      {
        heading: "A safer remediation sequence",
        paragraphs: [
          "Start with visibility and prevention controls before major permission reduction. Add policy validation and findings triage first. Then add simulation for sensitive roles and APIs. After that, reduce privilege in stages by business criticality and environment tier.",
          "This order keeps risk moving down without introducing avoidable downtime from aggressive one-shot policy tightening.",
        ],
      },
    ],
    identrailFit: [
      "Identrail maps AWS machine-identity trust chains across accounts and surfaces the paths with highest reachable impact.",
      "It helps teams sequence remediation by blast radius so they fix meaningful exposure first.",
      "Its staged rollout controls reduce the chance of production breakage during IAM hardening.",
    ],
    references: [
      { label: "AWS IAM best practices", href: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" },
      { label: "Validate policies with IAM Access Analyzer", href: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html" },
      { label: "IAM policy simulator", href: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html" },
    ],
  },
  {
    slug: "kubernetes-machine-identity-rbac-risk-paths",
    category: "Kubernetes Security",
    readTime: "9 min",
    title: "Kubernetes Machine Identity: RBAC Risk Paths You Can Actually Fix",
    summary:
      "How to identify and reduce exploitable Kubernetes service-account and RBAC trust paths without destabilizing cluster operations.",
    articleDescription:
      "How to reduce exploitable Kubernetes service-account and RBAC trust paths without downtime.",
    sections: [
      {
        heading: "Why Kubernetes identity risk hides in combinations",
        paragraphs: [
          "Kubernetes RBAC reviews often focus on single roles, but real escalation risk lives in combinations of service accounts, bindings, token behavior, and namespace boundaries. A modest permission in one context can become dangerous when chained with another object or runtime capability.",
          "That is why many teams feel they have reviewed RBAC and still find high-risk paths later during incident simulation or post-incident analysis.",
        ],
      },
      {
        heading: "What to tighten first in production clusters",
        paragraphs: [
          "Start with service-account design: avoid broad defaults and bind identities to workload purpose. Then audit ClusterRoleBinding and sensitive RoleBinding objects, especially where secrets, workload creation, and control-plane adjacent permissions intersect.",
          "Pair this with admission policy and API audit visibility. Without admission controls and audit fidelity, RBAC hardening will always lag behind deployment velocity.",
        ],
        bullets: [
          "Scope service accounts per workload and environment.",
          "Remove unnecessary cluster-wide bindings.",
          "Use admission policy to prevent known-unsafe RBAC changes.",
          "Enable and tune API audit logs for identity-path analysis.",
        ],
      },
      {
        heading: "How to roll out safely",
        paragraphs: [
          "Do not shift from permissive to strict in a single release. Use monitor-first checks, canary policy rollout, and rollback controls with clear owner accountability.",
          "The practical objective is to reduce reachable escalation paths while preserving delivery reliability for platform teams.",
        ],
      },
    ],
    identrailFit: [
      "Identrail maps service-account to permission trust paths and highlights exploitable escalation routes.",
      "It supports simulation-first RBAC hardening to reduce policy outage risk.",
      "Security and platform teams can prioritize real blast-radius reduction instead of broad, disruptive rewrites.",
    ],
    references: [
      { label: "Kubernetes RBAC", href: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/" },
      { label: "Kubernetes service accounts", href: "https://kubernetes.io/docs/concepts/security/service-accounts/" },
      { label: "Kubernetes auditing", href: "https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/" },
    ],
  },
  {
    slug: "secrets-sprawl-to-signal-repo-exposure-program",
    category: "Software Supply Chain",
    readTime: "7 min",
    title: "From Secrets Sprawl to Signal: Building a Repo Exposure Program",
    summary:
      "How to turn secret scanning alerts into a risk-prioritized, owner-driven credential exposure program with measurable containment outcomes.",
    articleDescription:
      "How to turn secret scanning alerts into a risk-prioritized credential exposure program.",
    sections: [
      {
        heading: "Secret scanning is a sensor, not a program",
        paragraphs: [
          "Teams often deploy secret scanning and assume risk is controlled. In practice, scanners produce findings, but operational gaps decide whether exposure becomes incident. The key questions are validity, privilege, reach, and revocation speed.",
          "When those questions are unanswered, teams triage by regex severity and alert age, which misses the credentials that can actually reach sensitive systems.",
        ],
      },
      {
        heading: "Program design for real containment",
        paragraphs: [
          "A working program includes detection, exploitability classification, automated containment playbooks, clear ownership routing, and prevention feedback into the development lifecycle.",
          "The most useful KPI is mean time to containment for high-impact leaks, not total findings closed.",
        ],
        bullets: [
          "Classify exposed secrets by active privilege and reachable systems.",
          "Automate revoke/rotate workflows for top credential types.",
          "Route incidents to accountable service owners with response SLAs.",
          "Feed recurring leak causes into SDLC controls and secure defaults.",
        ],
      },
      {
        heading: "Tie exposure handling to supply-chain discipline",
        paragraphs: [
          "Credential handling is now a software supply-chain control, not only a repository hygiene issue. As delivery pipelines become more automated, leaked machine credentials can quickly affect build integrity, deployment trust, and environment boundaries.",
          "Programs aligned with secure SDLC guidance consistently outperform ad hoc incident-by-incident handling.",
        ],
      },
    ],
    identrailFit: [
      "Identrail links credential exposures to machine-identity trust paths so teams can prioritize what is actually exploitable.",
      "It helps distinguish noisy leaks from high-impact exposures quickly.",
      "Teams get clearer remediation order and measurable containment improvement over time.",
    ],
    references: [
      { label: "GitHub secret scanning", href: "https://docs.github.com/code-security/secret-scanning/about-secret-scanning" },
      { label: "NIST SSDF SP 800-218", href: "https://csrc.nist.gov/publications/detail/sp/800-218/final" },
      { label: "CISA software supply chain recommended practices", href: "https://www.cisa.gov/resources-tools/resources/securing-software-supply-chain-recommended-practices-guide-customers-and" },
    ],
  },
  {
    slug: "open-core-vs-closed-platforms-machine-identity-security",
    category: "Buying Guide",
    readTime: "6 min",
    title: "Open-Core vs Closed Platforms in Machine Identity Security",
    summary:
      "A practical buyer framework for evaluating control, portability, and long-term operating costs in machine identity security platforms.",
    articleDescription:
      "A practical buyer framework for evaluating open-core vs closed platform tradeoffs.",
    sections: [
      {
        heading: "This is an operating model decision",
        paragraphs: [
          "Open-core vs closed platform discussions often degrade into feature checklists. That misses the core issue: your identity-security program must still work during architecture changes, org changes, and cloud expansion.",
          "The right choice depends on control requirements, engineering capacity, data locality constraints, and tolerance for long-term vendor lock-in.",
        ],
      },
      {
        heading: "How to evaluate beyond demo speed",
        paragraphs: [
          "Short-term onboarding speed matters, but it is not enough. Buyers should test whether risk logic is transparent, whether graph-level insights can be exported, and whether policy enforcement can be tuned without operational fragility.",
          "A practical procurement review should also include portability cost after 24 to 36 months, because most teams underestimate this during initial selection.",
        ],
        bullets: [
          "Can the platform explain and validate why a trust path is risky?",
          "Can teams customize controls without unsupported workarounds?",
          "Can posture evidence be used directly for leadership and audit reporting?",
          "Can the deployment model evolve without full re-platforming?",
        ],
      },
      {
        heading: "Use objective ecosystem signals",
        paragraphs: [
          "Where possible, use independent security maturity signals such as supply-chain framework alignment and project health indicators. They do not replace product evaluation, but they improve decision quality and reduce marketing noise.",
        ],
      },
    ],
    identrailFit: [
      "Identrail's open-core model supports a fast initial rollout while preserving control and portability options.",
      "Teams can prove value on real machine-identity risk before committing to larger deployment footprints.",
      "The same operating model carries from early adoption to enterprise-scale governance.",
    ],
    references: [
      { label: "SLSA framework", href: "https://slsa.dev/" },
      { label: "OpenSSF Scorecard", href: "https://scorecard.dev/" },
      { label: "NIST SP 800-207", href: "https://csrc.nist.gov/pubs/sp/800/207/final" },
    ],
  },
  {
    slug: "prove-least-privilege-for-non-human-identities-to-auditors",
    category: "Compliance",
    readTime: "11 min",
    title: "How to Prove Least Privilege for Non-Human Identities to Auditors",
    summary:
      "Build audit-ready evidence for least privilege with trust-graph snapshots, exception tracking, and remediation proof over time.",
    articleDescription:
      "How to build audit-ready least-privilege evidence for machine identities.",
    sections: [
      {
        heading: "Auditors test evidence, not intent",
        paragraphs: [
          "Many teams state they enforce least privilege but struggle to prove it under audit pressure. Static policy documents and architecture diagrams are not enough. Auditors need evidence of current access state, review cadence, exception handling, and remediation outcomes.",
          "This is especially true for non-human identities because privilege drift can happen quickly through deployment automation and platform changes.",
        ],
      },
      {
        heading: "Evidence package that holds up",
        paragraphs: [
          "Strong evidence includes point-in-time trust snapshots, trend data for risky-path reduction, change logs for policy updates, and documented exception workflows with owner, expiration, and approval history.",
          "Teams should also keep linkage between detected risk and actual remediation completion so controls are demonstrably effective.",
        ],
        bullets: [
          "Current inventory of machine identities and effective permissions.",
          "High-risk trust paths and corresponding treatment decisions.",
          "Policy-change records with validation and simulation outcomes.",
          "Exception register with expiry and accountable owners.",
        ],
      },
      {
        heading: "Align controls to common frameworks",
        paragraphs: [
          "For SOC 2 and ISO 27001 programs, consistency and traceability matter as much as technical depth. The teams that pass audits with less friction are the teams that run evidence collection continuously, not the teams assembling documents right before assessment windows.",
        ],
      },
    ],
    identrailFit: [
      "Identrail helps teams generate trust-graph snapshots and remediation trails suitable for audit evidence.",
      "It shows measurable reduction in high-risk machine-identity paths over time.",
      "Security and compliance stakeholders can align on the same evidence set without manual reconstruction.",
    ],
    references: [
      { label: "AICPA SOC 2 resources", href: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" },
      { label: "ISO/IEC 27001", href: "https://www.iso.org/standard/27001" },
      { label: "NIST CSF 2.0 resource guide", href: "https://www.nist.gov/publications/nist-cybersecurity-framework-20-resource-overview-guide" },
    ],
  },
  {
    slug: "rollout-safe-authorization-controls-platform-teams",
    category: "Platform Engineering",
    readTime: "8 min",
    title: "Designing Rollout-Safe Authorization Controls for Platform Teams",
    summary:
      "How to tighten authorization in production with simulation, canary strategy, and rollback design that protects service reliability.",
    articleDescription:
      "How to tighten authorization in production using rollout-safe control patterns.",
    sections: [
      {
        heading: "Security controls fail when deployment safety is ignored",
        paragraphs: [
          "Authorization hardening often causes avoidable outages because teams treat policy updates as configuration edits rather than production changes with reliability impact. The result is tension between platform and security teams.",
          "The solution is to apply release engineering discipline to policy enforcement itself.",
        ],
      },
      {
        heading: "A rollout-safe control pattern",
        paragraphs: [
          "Use simulation to estimate impact before enforcement. Run monitor mode to capture real traffic behavior. Deploy in canary stages by service tier or environment. Gate expansion on reliability signals and keep tested rollback controls available.",
          "This pattern reduces breakage while still improving least privilege over time.",
        ],
        bullets: [
          "Simulate deny impact before shipping policy changes.",
          "Canary controls to a small blast area first.",
          "Define SLO-based gates before expansion.",
          "Keep explicit rollback and kill-switch paths.",
        ],
      },
      {
        heading: "Make reliability and security shared outcomes",
        paragraphs: [
          "When policy rollout is observable and reversible, platform teams stop treating security as a blocker. Both sides can optimize for the same outcome: reduced risk without reducing service availability.",
        ],
      },
    ],
    identrailFit: [
      "Identrail supports simulation-first control rollout and staged enforcement for machine-identity policies.",
      "It helps teams identify high-impact changes before they hit production traffic.",
      "Security posture improves while preserving platform reliability expectations.",
    ],
    references: [
      { label: "OPA policy testing", href: "https://www.openpolicyagent.org/docs/latest/policy-testing/" },
      { label: "Kubernetes admission webhook good practices", href: "https://kubernetes.io/docs/concepts/cluster-administration/admission-webhooks-good-practices/" },
      { label: "Google SRE canarying releases", href: "https://sre.google/workbook/canarying-releases/" },
    ],
  },
  {
    slug: "trust-graphs-for-security-leaders-what-to-measure",
    category: "Security Leadership",
    readTime: "7 min",
    title: "Trust Graphs for Security Leaders: What to Measure and Why",
    summary:
      "A leadership-focused metric framework that ties machine-identity posture improvements to reduced incident likelihood and business risk.",
    articleDescription:
      "A metric framework for linking machine-identity posture improvements to incident reduction.",
    sections: [
      {
        heading: "Why many security dashboards fail executive audiences",
        paragraphs: [
          "Most dashboards show activity, not risk. Counts of alerts, tickets, and policy changes do not answer what leadership cares about: are we reducing meaningful exposure, and how quickly are we doing it?",
          "Trust graphs are useful because they represent reachable risk through identity relationships. They allow teams to report on risk paths to critical assets, not just control activity.",
        ],
      },
      {
        heading: "Metrics that drive better decisions",
        paragraphs: [
          "Security leaders should track critical trust-path count, time-to-remediation for high-impact paths, least-privilege coverage of production identities, and authorization change-failure rate. These metrics connect program execution to business risk outcomes.",
          "Framework mapping can strengthen reporting quality. For example, ATT&CK cloud technique coverage can contextualize detection gaps, while DORA-style reliability metrics can show whether security controls are improving safely.",
        ],
        bullets: [
          "Critical trust paths to crown-jewel systems.",
          "Mean time to remediate high-impact identity risk.",
          "Percentage of production identities at scoped privilege baseline.",
          "Policy rollout failure rate and recovery speed.",
        ],
      },
      {
        heading: "Build reporting that supports investment decisions",
        paragraphs: [
          "When risk-path metrics are trendable and tied to incident outcomes, executive reviews shift from status reporting to investment planning. Leaders can see where additional engineering capacity or platform upgrades will produce the highest risk reduction return.",
        ],
      },
    ],
    identrailFit: [
      "Identrail turns machine-identity relationships into measurable trust-graph KPIs for leadership reporting.",
      "It helps teams connect technical remediation to reduced incident likelihood and blast radius.",
      "Executives get clearer, decision-grade visibility instead of activity-only dashboards.",
    ],
    references: [
      { label: "MITRE ATT&CK cloud matrix", href: "https://attack.mitre.org/matrices/enterprise/cloud/" },
      { label: "DORA metrics guide", href: "https://dora.dev/guides/dora-metrics/" },
      { label: "CISA Zero Trust Maturity Model", href: "https://www.cisa.gov/zero-trust-maturity-model" },
    ],
  },
];

export const homepageArticles = blogPosts.map((post) => ({
  publication: "Identrail",
  title: post.title,
  description: post.articleDescription,
  meta: post.category,
  href: `/blog/${post.slug}`,
}));
