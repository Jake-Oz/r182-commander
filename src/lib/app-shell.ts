export type AppRoute = {
  href: string;
  label: string;
  description: string;
  status: "ready" | "planned";
};

export const primaryRoutes: AppRoute[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Operational overview for curriculum progress and next actions.",
    status: "ready",
  },
  {
    href: "/aircraft",
    label: "Aircraft",
    description: "Explorer for systems, configuration, and source-backed facts.",
    status: "planned",
  },
  {
    href: "/missions",
    label: "Missions",
    description: "Mission packages built from lessons, scenarios, and competencies.",
    status: "planned",
  },
  {
    href: "/scenarios",
    label: "Scenarios",
    description: "Decision flows that evaluate application and command.",
    status: "planned",
  },
  {
    href: "/assessment",
    label: "Assessment",
    description: "Competency scoring, debriefs, and graduation criteria.",
    status: "planned",
  },
  {
    href: "/progress",
    label: "Progress",
    description: "Pilot state, commander score, and competency progression.",
    status: "planned",
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Aircraft configuration and account preferences.",
    status: "planned",
  },
  {
    href: "/admin",
    label: "Admin",
    description: "Knowledge item review, source traceability, and content lifecycle.",
    status: "planned",
  },
];

export const architectureTracks = [
  "Knowledge base",
  "Mission framework",
  "Scenario engine",
  "Competency scoring",
  "Source traceability",
];
