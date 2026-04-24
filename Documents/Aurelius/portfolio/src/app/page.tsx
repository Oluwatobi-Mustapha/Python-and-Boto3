import Image from "next/image";
import type { ReactNode } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { SmoothScroll } from "../components/SmoothScroll";
import { ScrollNudge } from "../components/ScrollNudge";
import { Navbar } from "../components/Navbar";
import { ScrollEdgeButton } from "../components/ScrollEdgeButton";
import { CinematicLoader } from "../components/CinematicLoader";
import { ReadingProgress } from "../components/ReadingProgress";
import { ProjectsSection } from "../components/ProjectsSection";
import { ArticlesSection } from "../components/ArticlesSection";
import { CopyEmailButton } from "../components/CopyEmailButton";
import { TrackedAnchor, type TrackingPayload } from "../components/TrackedAnchor";
import {
  AwardIcon,
  CloudIcon,
  ExternalIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MediumIcon,
  ShieldIcon,
  UsersIcon,
  KubernetesIcon,
  GitHubActionsIcon,
  GenericSecIcon,
  IamIdentityCenterIcon,
} from "../components/icons";
import { skillIconMap } from "../components/chipIcons";
import { homepageArticles } from "../content/identrailBlogPosts";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#oss", label: "OSS" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills", label: "Skills" },
  { href: "#articles", label: "Articles" },
  { href: "#community", label: "Community" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

type ProjectArchitecture = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type FeaturedProject = {
  teaser: string;
  title: string;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  impact: string;
  href: string;
  demoHref?: string;
  demoLabel?: string;
  architecture?: ProjectArchitecture;
  proof?: {
    scope: string;
    timeline: string;
    surface: string;
  };
};

const experience = [
  {
    company: "Independent Cloud & Identity Security Engineering",
    logoSrc: "/profile/oluwatobi-avatar.jpg",
    logoAlt: "Oluwatobi Mustapha",
    location: "Remote",
    role: "Cloud & Identity Security Engineer",
    period: "Jan 2025 - Present",
    tags: [
      "AWS IAM",
      "IAM Identity Center",
      "Non-Human Identity",
      "Zero Trust",
      "Detection as Code",
    ],
    bullets: [
      "Architected three cloud-native identity security platforms spanning just-in-time access, machine identity visibility, and authorization assurance.",
      "Built Boundary and Identrail to reduce privileged access turnaround from days to seconds and expose overprivileged risk paths across AWS and Kubernetes.",
      "Created IAM Logic Fuzzer with versioned policy checks in CI/CD, enforcing preventive guardrails and detecting four IAM policy flaw classes before deployment.",
    ],
  },
  {
    company: "CloudSec Network",
    logoSrc: "/logos/experience/cloudsec-network.png",
    logoAlt: "CloudSec Network logo",
    location: "Remote",
    role: "AI Security Freelance",
    period: "Apr 2026 - Present",
    tags: [
      "AI Security",
      "Detection Workflows",
      "Defensive Operations",
      "Applied Analysis",
    ],
    bullets: [
      "Building practical AI-assisted defense workflows for detection design and analyst triage, improving alert quality and operator-ready remediation context.",
    ],
  },
  {
    company: "Prodigy InfoTech",
    logoSrc: "/logos/experience/prodigy-infotech.svg",
    logoAlt: "Prodigy InfoTech logo",
    location: "Remote",
    role: "Cyber Security Analyst",
    period: "Jan 2024 - Feb 2025",
    tags: ["Burp Suite", "Nmap", "Metasploit", "Linux"],
    bullets: [
      "Performed vulnerability assessment and penetration testing across Linux-based targets and documented remediation clearly.",
      "Built strong habits around evidence capture, issue reproduction, and writing findings that operators could act on.",
    ],
  },
  {
    company: "Probuilt Tech",
    logoSrc: "/logos/experience/probuilt-tech.svg",
    logoAlt: "Probuilt Tech logo",
    location: "Remote",
    role: "Data Analyst",
    period: "Feb 2022 - Apr 2024",
    tags: ["SQL", "Validation", "Data Quality", "Troubleshooting"],
    bullets: [
      "Built SQL validation pipelines and repeatable data quality checks for backend workflows.",
      "Sharpened systems thinking through debugging, correctness checks, and disciplined issue investigation.",
    ],
  },
];

const featuredProjects: FeaturedProject[] = [
  {
    teaser: "Days to seconds • Approval-based IAM vending",
    title: "Boundary",
    context: "Serverless AWS access broker",
    description:
      "Boundary turns access requests into short-lived IAM Identity Center assignments with approval routing, automatic revocation, and reviewable audit evidence.",

    highlights: [
      "Approval workflow with request, approval, grant, and revoke stages",
      "Temporary access by default instead of standing privilege",
      "Auto-revocation when the approved window expires",
      "Audit trail for request, assignment, and expiry events",
      "Built for IAM Identity Center rather than risky ad hoc policy edits",
    ],
    stack: [
      "AWS IAM",
      "IAM Identity Center",
      "Serverless",
      "Audit Logging",
      "Access Governance",
    ],
    impact:
      "Reduced privileged access turnaround from days to seconds using approval-based short-lived grants.",
    proof: {
      scope: "Approval based access vending",
      timeline: "Design to demo in 6 weeks",
      surface: "AWS IAM + Identity Center",
    },
    demoHref: "https://www.youtube.com/watch?v=wvCYcQyAqew",
    demoLabel: "View Live Demo",
    href: "https://github.com/Oluwatobi-Mustapha/boundary",
  },
  {
    teaser: "AWS + Kubernetes • Risk-path visibility",
    title: "Identrail",
    context: "Machine identity security platform",
    description:
      "Identrail discovers unmanaged identities, maps risky access paths across AWS and Kubernetes, and keeps raw plus normalized evidence close to each finding.",

    highlights: [
      "Read-only collectors preserve provider-native evidence",
      "Normalized graph edges for explainable identity relationships",
      "Rule engine surfaces orphaned, overprivileged, and risky paths",
      "Findings keep remediation context and owner confidence nearby",
      "Modular monolith chosen for faster shipping and easier debugging",
    ],
    stack: [
      "AWS IAM",
      "Kubernetes RBAC",
      "React",
      "Helm",
      "Risk Analysis",
    ],
    impact:
      "Unifies risk-path analysis across 2 control planes (AWS and Kubernetes) in one explainable graph.",
    proof: {
      scope: "Machine identity risk mapping",
      timeline: "Iterated across 2 releases",
      surface: "AWS IAM + Kubernetes RBAC",
    },
    href: "https://github.com/Oluwatobi-Mustapha/identrail",
  },
  {
    teaser: "4 flaw classes • Pre-deployment policy review",
    title: "IAM Logic Fuzzer",
    context: "AWS IAM analysis tool",
    description:
      "IAM Logic Fuzzer pressure-tests AWS IAM policies before deployment and reports confused deputy risk, escalation paths, public exposure, and permission-boundary flaws.",

    highlights: [
      "Normalizes trust and permission documents into an explainable analysis model",
      "Deterministic rule engine with JSON findings and HTML reporting",
      "Designed for pre-deployment review instead of compliance-only output",
      "Scoped inputs reduce false positives and keep findings actionable",
      "Built to catch risky trust-plus-permission paths before merge",
    ],
    stack: ["AWS IAM", "Python", "Policy Analysis", "HTML Reports", "JSON"],
    impact:
      "Detects 4 IAM flaw classes pre-deployment so escalation paths are caught before merge.",
    proof: {
      scope: "Pre-merge IAM policy analysis",
      timeline: "Built with reproducible test roles",
      surface: "AWS IAM trust + permission paths",
    },
    architecture: {
      src: "/projects/iam-fuzzer-architecture.jpg",
      alt: "IAM Fuzzer architecture diagram showing Terraform provisioning, AWS IAM roles, collector and analyzer pipeline, and HTML reporting output.",
      caption:
        "Flow: Terraform-provisioned IAM test roles are collected and analyzed by the engine, then rendered into HTML findings.",
      width: 1688,
      height: 799,
    },
    href: "https://github.com/Oluwatobi-Mustapha/iam-fuzzer",
  },
];

const OSS_AUTHOR = "Oluwatobi-Mustapha";

function mergedPrSearchHref(query: string) {
  return `https://github.com/pulls?q=${encodeURIComponent(
    `is:pr is:merged author:${OSS_AUTHOR} ${query}`,
  )}`;
}

const ossContributions = [
  {
    project: "Keycloak",
    logoSrc: "/logos/oss/keycloak.svg",
    logoAlt: "Keycloak logo",
    prs: 9,
    value: "Hardened authorization correctness, FGAP/FGAPv2 policy evaluation, token exchange behavior, OIDC value persistence, session edge cases, and admin audit pagination – reducing the risk of privilege escalation and audit gaps in enterprise identity deployments.",
    href: mergedPrSearchHref("repo:keycloak/keycloak"),
  },
  {
    project: "Better Auth",
    logoSrc: "/logos/oss/better-auth.png",
    logoAlt: "Better Auth logo",
    prs: 4,
    value: "Fixed OTP race conditions and OAuth2 credential handling – preventing authentication bypass and credential leakage in applications using Better Auth as their identity layer.",
    href: mergedPrSearchHref("repo:better-auth/better-auth"),
  },
  {
    project: "Authentik",
    logoSrc: "/logos/oss/authentik.png",
    logoAlt: "Authentik logo",
    prs: 3,
    value: "Improved session integrity and MFA correctness – closing gaps that could allow session hijacking or MFA bypass in self-hosted identity provider deployments.",
    href: mergedPrSearchHref("repo:goauthentik/authentik"),
  },
  {
    project: "Cloud Custodian",
    logoSrc: "/logos/oss/cloud-custodian.png",
    logoAlt: "Cloud Custodian logo",
    prs: 3,
    value: "Fixed AWS IAM AccessDenied telemetry accuracy and RBAC scope clarity – ensuring cloud governance policies produce reliable audit signals and correct enforcement decisions.",
    href: mergedPrSearchHref("repo:cloud-custodian/cloud-custodian"),
  },
  {
    project: "Home Assistant Core",
    logoSrc: "/logos/oss/home-assistant-core.svg",
    logoAlt: "Home Assistant Core logo",
    prs: 3,
    value: "Fixed OAuth recovery flow – preventing authentication failures that could lock users out of their home automation systems after token expiry.",
    href: mergedPrSearchHref("repo:home-assistant/core"),
  },
  {
    project: "ZITADEL",
    logoSrc: "/logos/oss/zitadel.svg",
    logoAlt: "ZITADEL logo",
    prs: 1,
    value: "Contributed merged fixes and updates to ZITADEL authentication behavior – strengthening reliability in OSS identity workflows.",
    href: mergedPrSearchHref("repo:zitadel/zitadel"),
  },
  {
    project: "Leapstacks2",
    logoSrc: "/logos/oss/leapstacks2.png",
    logoAlt: "Leapstacks2 logo",
    prs: 1,
    value: "Improved RBAC scope clarity – reducing the risk of over-permissioned access in applications relying on Leapstacks2 for role-based authorization.",
    href: mergedPrSearchHref("Leapstacks2"),
  },
];

const articles = homepageArticles;

const certifications = [
  {
    name: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    code: "SCS-C03",
    viewLabel: "View on Credly",
    href: "https://www.credly.com/badges/1668fe1e-4fd2-4d4a-9390-f4b97c2dae2a",
    imageSrc: "/cert-badges/aws-security-specialty.png",
    imageAlt: "AWS Certified Security - Specialty badge",
  },
  {
    name: "Non-Human Identity Fundamentals Certified Professional",
    issuer: "Oasis Security",
    code: "NHI-FCP",
    viewLabel: "View on Credly",
    href: "https://mycourse.app/QzNWj7C2bpUwYeV0e",
    imageSrc: "/cert-badges/nhi-fundamentals.svg",
    imageAlt: "Non-Human Identity Fundamentals badge",
  },
  {
    name: "AWS Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    code: "SAA-C03",
    viewLabel: "View on Credly",
    href: "https://www.credly.com/badges/f463fd20-a83b-4ceb-a616-b88b2f1ab90d",
    imageSrc: "/cert-badges/aws-saa-official.png",
    imageAlt: "AWS Solutions Architect - Associate badge",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    code: "HCTA0-003",
    viewLabel: "View on Credly",
    href: "https://www.credly.com/badges/b168f589-c1df-4f05-aeef-899c1c15b44c",
    imageSrc: "/cert-badges/terraform-associate-official.png",
    imageAlt: "HashiCorp Terraform Associate badge",
  },
  {
    name: "CompTIA Security+ ce",
    issuer: "CompTIA",
    code: "Security+",
    viewLabel: "View on Credly",
    href: "https://www.credly.com/badges/12c184d5-e336-4ef5-b931-3b088c76460a",
    imageSrc: "/cert-badges/security-plus-official.png",
    imageAlt: "CompTIA Security+ badge",
  },
];

const skillGroups = [
  {
    title: "Identity",
    Icon: IamIdentityCenterIcon,
    items: [
      "AWS IAM",
      "IAM Identity Center",
      "Microsoft Entra ID",
      "OAuth",
      "OIDC",
      "RBAC",
      "ABAC",
      "MFA",
      "Workload Identity",
    ],
  },
  {
    title: "Infrastructure",
    Icon: KubernetesIcon,
    items: [
      "AWS",
      "Azure",
      "Kubernetes",
      "Terraform",
      "Helm",
      "Linux",
    ],
  },
  {
    title: "Engineering",
    Icon: GitHubActionsIcon,
    items: [
      "Go",
      "Python",
      "TypeScript",
      "SQL",
      "React",
      "Node.js",
      "GitHub Actions",
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Oluwatobi-Mustapha",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oluwatobimustapha/",
    Icon: LinkedinIcon,
  },
  {
    label: "Medium",
    href: "https://medium.com/@oluwatobi-mustapha",
    Icon: MediumIcon,
  },
];

const CONTACT_EMAIL = "oluwatobymustapha@gmail.com";

const heroSummaryLinks = [
  { href: "#experience", label: "Experience", Icon: UsersIcon, external: false },
  { href: "#projects", label: "Projects", Icon: CloudIcon, external: false },
  { href: "https://github.com/Oluwatobi-Mustapha/oss-contributions", label: "OSS Contributions", Icon: GithubIcon, external: true },
  { href: "#certifications", label: "Certifications", Icon: AwardIcon, external: false },
  { href: "#skills", label: "Skills", Icon: ShieldIcon, external: false },
  { href: "#contact", label: "Contact", Icon: MailIcon, external: false },
];

const testimonials = [
  {
    name: "Alexander Schwartz",
    role: "Principal Software Engineer at IBM",
    quote:
      "As I've raised the original issue, I've tested this change it and it works as expected. Thanks, Oluwatobi!",
    imageSrc: "/testimonials/alexander-schwartz.jpg",
  },
  {
    name: "Marek Posolda",
    role: "Principal Software Engineer at IBM",
    quote: "Thanks for the updates and PR review.",
    imageSrc: "/testimonials/marek-posolda.jpg",
  },
  {
    name: "Pedro Igor",
    role: "Principal Software Engineer @IBM",
    quote: "Thank you, @Oluwatobi-Mustapha for your PR fix and updates. Merged!",
    imageSrc: "/testimonials/pedro-igor.jpg",
  },
  {
    name: "Bereket Engida",
    role: "Creator of Better Auth",
    quote: "Thank you @Oluwatobi-Mustapha for the PR fix and update, LGTM.",
    imageSrc: "/testimonials/bereket-engida.jpg",
  },
  {
    name: "AJ Kerrigan",
    role: "Solutions Architect at Stacklet",
    quote: "Thanks for the catch/fix/test Oluwatobi Mustapha 🍻 !",
    imageSrc: "/testimonials/aj-kerrigan.jpg",
  },
  {
    name: "Kapil Thangavelu",
    role: "Co-Founder & CTO at Stacklet",
    quote: "This looks good to me. Thank you.",
    imageSrc: "/testimonials/kapil-thangavelu.jpg",
  },
  {
    name: "Martin Hjelmare",
    role: "Home Assistant Core Developer",
    quote: "Looks good to me, Tobi! Thanks!",
    imageSrc: "/testimonials/martin-hjelmare.jpg",
  },
  {
    name: "Basil Fateen",
    role: "Head of Startups and VC, MENAT at NVIDIA",
    quote: "Thanks for your security review and updates, Oluwatobi!",
    imageSrc: "/testimonials/basil-fateen.jpg",
  },
  {
    name: "Teffen Ellis",
    role: "Senior Full-stack Developer at Authentik Security and sister-software",
    quote:
      "Thank you sending such a detailed PR, Oluwatobi Mustapha! The changes here look great and align with an ongoing effort to make the flow stages easier to test and reason about.",
    imageSrc: "/testimonials/teffen-ellis.jpg",
  },
  {
    name: "Gayathri Vijayan",
    role: "Software Engineer at ZITADEL",
    quote:
      "Thank you very much for the contribution, Oluwatobi. Great job! Please keep contributing to Zitadel :)",
    imageSrc: "/testimonials/gayathri-vijayan.png",
  },
  {
    name: "BeryJu",
    role: "CTO at goauthentik",
    quote: "LGTM.",
    imageSrc: "/testimonials/beryju.jpg",
  },
];

function ExternalAnchor({
  href,
  className,
  newTab = true,
  eventName,
  eventData,
  children,
}: {
  href: string;
  className?: string;
  newTab?: boolean;
  eventName?: string;
  eventData?: TrackingPayload;
  children: ReactNode;
}) {
  if (eventName) {
    return (
      <TrackedAnchor
        href={href}
        className={className}
        newTab={newTab}
        eventName={eventName}
        eventData={eventData}
      >
        {children}
      </TrackedAnchor>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </a>
  );
}

function SectionLead({
  terminal,
  title,
}: {
  terminal?: string;
  title: string;
}) {
  return (
    <div className="section-lead">
      {terminal ? <div className="terminal-kicker">{terminal}</div> : null}
      <h2>{title}</h2>
    </div>
  );
}

function HeroSummaryPanel() {
  return (
    <aside className="hero-summary-shell" aria-label="Hero summary">
      <div className="hero-summary-bar">
        <span />
        <span />
        <span />
        <strong>summary@oluwatobi:~</strong>
      </div>
      <div className="hero-summary-body">
        <div className="hero-summary-grid">
          {heroSummaryLinks.map(({ href, label, Icon, external }) => (
            <a
              key={href}
              href={href}
              className="hero-summary-link"
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            >
              <div className="hero-summary-icon">
                <Icon />
              </div>
              <strong>{label}</strong>
              <ExternalIcon />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function HomePage() {
  return (
    <main className="portfolio-site portfolio-site-reference">
      <CinematicLoader />
      <SmoothScroll />
      <ScrollReveal />
      <Navbar links={navLinks} />
      <ReadingProgress />
      <ScrollEdgeButton />

      <section id="hero" className="hero-section-reference" data-nav-label="Home">
        <div className="container hero-grid-reference">
          <div className="hero-copy-reference">
            <div className="hero-person">
              <div className="hero-portrait-ring">
                <Image
                  src="/profile/oluwatobi-avatar.jpg"
                  alt="Oluwatobi Mustapha"
                  width={104}
                  height={104}
                  priority
                  className="hero-portrait"
                />
              </div>
              <div>
                <h1>Oluwatobi Mustapha</h1>
              </div>
            </div>

            <div className="hero-meta-stack">
              <div className="hero-status-row">
                <span className="hero-availability-dot" aria-hidden="true" />
                <span>Available for IAM / Cloud Security roles</span>
              </div>
              <div className="hero-role-line">
                Cloud IAM Security Engineer
              </div>
            </div>

            <div className="hero-cta-stack">
              <div className="hero-actions-reference">
                <TrackedAnchor
                  href="#projects"
                  className="button-solid"
                  newTab={false}
                  eventName="hero_cta_click"
                  eventData={{ cta: "view_projects", placement: "hero" }}
                >
                  View Projects
                  <ExternalIcon />
                </TrackedAnchor>
                <TrackedAnchor
                  href="/Oluwatobi_Mustapha_Resume.pdf"
                  className="button-outline button-resume"
                  eventName="hero_cta_click"
                  eventData={{ cta: "resume_open", placement: "hero" }}
                >
                  <span className="resume-eye resume-eye-emoji" aria-hidden="true">👀</span>
                  <span>Resume</span>
                  <ExternalIcon />
                </TrackedAnchor>
              </div>

              <div className="hero-social-row">
                {socialLinks.map(({ label, href, Icon }) => (
                  <ExternalAnchor key={label} href={href} className="social-link-reference">
                    <span className="brand-mark-badge brand-mark-badge-inline">
                      <Icon className="social-link-icon" />
                    </span>
                    <span>{label}</span>
                  </ExternalAnchor>
                ))}
              </div>
            </div>
          </div>

          <HeroSummaryPanel />
        </div>
        <ScrollNudge />
      </section>

      <section id="about" className="section-slab section-slab-dark" data-nav-label="About">
        <div className="container">
          <div className="about-copy-card">
            <h2 className="about-heading">About Me</h2>
            <p>
              I build identity security systems that reduce risk without slowing operators down. My focus is just-in-time access, machine identity visibility, and upstream auth hardening.
            </p>
            <p>
              Boundary delivers approval-based short-lived IAM grants. Identrail maps risky identity paths across AWS and Kubernetes. IAM Logic Fuzzer catches escalation and confused deputy flaws before merge. I also ship upstream fixes to Keycloak, Better Auth, Authentik, Cloud Custodian, Home Assistant Core, ZITADEL, and Leapstacks2.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="section-slab section-slab-dark" data-nav-label="Experience">
        <div className="container">
          <SectionLead title="Experience" />

          <div className="experience-stack-reference">
            {experience.map((item, index) => (
              <article
                key={`${item.company}-${item.role}`}
                className={`experience-card-reference ${index === 0 ? "is-primary" : ""}`}
              >
                <div className="experience-head-reference">
                  <div className="experience-company-meta">
                    <div className="experience-company-logo-wrap">
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={40}
                        height={40}
                        className="experience-company-logo"
                      />
                    </div>
                    <h3>{item.company}</h3>
                  </div>
                  <div className="experience-role-block">
                    <div className="experience-role-title">{item.role}</div>
                    <div className="experience-period">{item.period}</div>
                  </div>
                </div>
                <div className="experience-location">{item.location}</div>

                <div className="chip-row">
                  {item.tags.map((tag) => {
                    const TagIcon = skillIconMap[tag] ?? GenericSecIcon;
                    return (
                      <span key={tag} className="chip chip-soft chip-with-icon">
                        <TagIcon className="chip-skill-icon" />
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <h4>Key contributions</h4>
                <ul className="bullet-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-slab section-slab-dark" data-nav-label="Projects">
        <div className="container">
          <SectionLead title="Projects" />
          <ProjectsSection projects={featuredProjects} />
        </div>
      </section>

      <section id="oss" className="section-slab section-slab-dark" data-nav-label="OSS">
        <div className="container">
          <SectionLead title="Open Source Contributions" />
          <div className="oss-grid">
            {ossContributions.map((item) => (
              <ExternalAnchor
                key={item.project}
                href={item.href}
                className="oss-card"
                eventName="oss_click"
                eventData={{
                  project: item.project,
                  prs: item.prs,
                  placement: "oss_section",
                }}
              >
                <div className="oss-card-head">
                  <div className="oss-project-meta">
                    <span className="oss-project-logo-wrap">
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={24}
                        height={24}
                        className="oss-project-logo"
                      />
                    </span>
                    <span className="oss-project">{item.project}</span>
                  </div>
                  <span className="oss-prs">{item.prs} {item.prs === 1 ? "PR" : "PRs"} merged</span>
                </div>
                <p className="oss-value">{item.value}</p>
                <span className="oss-link">View merged PRs <ExternalIcon /></span>
              </ExternalAnchor>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-slab section-slab-dark" data-nav-label="Testimonials">
        <div className="container">
          <SectionLead title="Testimonials" />
        </div>
        <div className="testimonial-marquee" aria-label="Maintainer testimonials">
          <div className="testimonial-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="testimonial-item"
                aria-hidden={index >= testimonials.length}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={74}
                  height={74}
                  className="testimonial-avatar"
                />
                <div className="testimonial-copy">
                  <h3>{item.name}</h3>
                  <p className="testimonial-role">{item.role}</p>
                  <p className="testimonial-quote">{item.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section-slab section-slab-dark" data-nav-label="Certifications">
        <div className="container">
          <SectionLead title="Certifications" />

          <div className="cert-grid-reference">
            {certifications.map((cert) => (
              <ExternalAnchor key={cert.name} href={cert.href} className="cert-card-reference">
                <div className="cert-badge-wrap">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.imageAlt}
                    width={88}
                    height={88}
                    className="cert-badge-image"
                  />
                </div>
                <h3>{cert.name}</h3>
                <div className="cert-card-cta">
                  {cert.viewLabel}
                  <ExternalIcon />
                </div>
              </ExternalAnchor>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-slab section-slab-dark" data-nav-label="Skills">
        <div className="container">
          <SectionLead title="Technical Toolkit" />

          <div className="skills-grid-reference">
            {skillGroups.map(({ title, Icon, items }) => (
              <article key={title} className="skill-card-reference">
                <div className="skill-card-head">
                  <div className="skill-icon-wrap">
                    <Icon className="skill-group-logo" />
                  </div>
                  <h3>{title}</h3>
                </div>
                <div className="chip-row chip-grid">
                  {items.map((item) => {
                    const SkillIcon = skillIconMap[item];
                    return (
                      <span key={item} className="chip chip-soft chip-with-icon">
                        {SkillIcon ? <SkillIcon className="chip-skill-icon" /> : <GenericSecIcon className="chip-skill-icon" />}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="section-slab section-slab-dark" data-nav-label="Articles">
        <div className="container">
          <SectionLead title="Articles" />
          <ArticlesSection articles={articles} />
        </div>
      </section>

      <section id="community" className="section-slab section-slab-dark" data-nav-label="Community">
        <div className="container">
          <SectionLead title="Community" />

          <div className="community-feature">
            <div className="community-feature-logo brand-mark-badge brand-mark-badge-community">
              <Image src="/logos/aws.svg" alt="AWS logo" width={72} height={72} />
            </div>
            <ExternalAnchor
              href="https://aws.amazon.com/developer/community/community-builders/"
              className="community-feature-copy"
            >
              <div className="community-feature-title">AWS Community Builder</div>
              <p>Selected for the AWS Community Builder program</p>
              <p>Recognized for cloud security depth, technical writing, and active community contribution around IAM and identity security.</p>
              <span>Learn about the program<ExternalIcon /></span>
            </ExternalAnchor>
          </div>

          <div className="community-feature">
            <div className="community-feature-logo brand-mark-badge brand-mark-badge-community">
              <Image
                src="/logos/the-identity-underground-official.jpeg"
                alt="The Identity Underground logo"
                width={72}
                height={72}
                className="community-logo-image"
              />
            </div>
            <ExternalAnchor
              href="https://www.theidentityunderground.com/"
              className="community-feature-copy"
            >
              <div className="community-feature-title">The Identity Underground</div>
              <p>Member of the Silverfort-backed identity security community</p>
              <p>An invite-only community of identity security practitioners focused on modern identity defense, non-human identity, and deeper industry discussion beyond the surface level.</p>
              <span>Visit The Identity Underground<ExternalIcon /></span>
            </ExternalAnchor>
          </div>
        </div>
      </section>

      <section id="education" className="section-slab section-slab-dark" data-nav-label="Education">
        <div className="container">
          <SectionLead title="Education" />

          <div className="education-grid-reference">
            <article className="education-card-reference">
              <div className="education-mark">
                <Image
                  src="/logos/ambrose-alli-university.png"
                  alt="Ambrose Alli University logo"
                  width={120}
                  height={120}
                  className="education-badge-logo"
                />
              </div>
              <div>
                <h3>Ambrose Alli University, Edo State</h3>
                <p>Electrical Engineering</p>
                <div className="education-meta">2020-2025</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="section-slab section-slab-dark" data-nav-label="Contact">
        <div className="container">
          <div className="contact-simple">
            <h2>Let&apos;s Connect</h2>
            <p>Open to IAM security engineering, Cloud Security/Identity, and platform security roles.</p>
            <div className="contact-simple-row">
              <TrackedAnchor
                href={`mailto:${CONTACT_EMAIL}`}
                className="contact-simple-link"
                newTab={false}
                eventName="contact_click"
                eventData={{ destination: "email", placement: "contact_section" }}
              >
                <MailIcon />
                {CONTACT_EMAIL}
              </TrackedAnchor>
              <CopyEmailButton email={CONTACT_EMAIL} />
              <span className="contact-simple-divider" />
              {socialLinks.map(({ label, href, Icon }) => (
                <TrackedAnchor
                  key={label}
                  href={href}
                  className="contact-simple-link"
                  eventName="contact_click"
                  eventData={{ destination: label.toLowerCase(), placement: "contact_section" }}
                >
                  <span className="brand-mark-badge brand-mark-badge-inline">
                    <Icon className="contact-link-icon" />
                  </span>
                  {label}
                </TrackedAnchor>
              ))}
            </div>
          </div>  
        </div>
      </section>
    </main>
  );
}
