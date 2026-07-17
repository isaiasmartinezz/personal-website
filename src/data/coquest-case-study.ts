// ---------------------------------------------------------------------------
// Structured content for the custom CoQuest case-study page. Separate from
// projects.ts (which only holds the card/summary data used by the generic
// template) — this file backs the fully custom layout in
// coquest-case-study.tsx. Mirrors the pattern established by
// epvo-case-study.ts.
// ---------------------------------------------------------------------------

export interface CaseStudyMetric {
  value: string;
  label: string;
  /** Renders an accent "Target" badge (used by other case studies). */
  isTarget?: boolean;
  /** Renders a neutral caveat badge, e.g. "Uneven participation". */
  note?: string;
}

export interface SpectrumColumn {
  heading: string;
  examples: string[];
  characteristics: string[];
  emphasis?: boolean;
}

export interface LifecycleStage {
  label: string;
  fading?: boolean;
}

export interface WalkthroughStage {
  id: string;
  eyebrow: string;
  title: string;
  points: string[];
  image: string;
  imageAlt: string;
}

export interface PrincipleGroup {
  title: string;
  decisions: string[];
}

export type ArchNodeKind = "client" | "firebase" | "external" | "event";

export interface ArchNode {
  label: string;
  kind: ArchNodeKind;
}

export interface EventTraceStep {
  lane: string;
  description: string;
}

export interface DataEntity {
  name: string;
  fields: string[];
}

export interface PilotDay {
  day: string;
  body: string[];
}

export interface PilotMetricRow {
  measure: string;
  observation: string;
}

export interface PyramidLevel {
  title: string;
  description: string;
}

export interface TheoryFinding {
  concept: string;
  theory: string;
  observed: string;
}

export interface TrustRow {
  concern: string;
  response: string;
}

export interface ContributionGroup {
  category: string;
  items: string[];
}

export interface Tension {
  title: string;
  finding: string;
  implication: string;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export const header = {
  eyebrow: "WEB · SOCIAL COMPUTING · 2025",
  title: "CoQuest — Spontaneous Social Coordination",
  intro:
    "A real-time mobile platform that turns small pockets of free time into lightweight opportunities for in-person connection.",
  description:
    "Built with React Native and Firebase, CoQuest lets students broadcast and join short-lived activities through a shared campus map and trusted social circles.",
  meta: [
    { label: "Role", value: "Product & Engineering Team" },
    { label: "Team", value: "4 people" },
    { label: "Pilot", value: "3 days" },
    { label: "Stack", value: "React Native + Firebase" },
  ],
  heroCaption:
    "CoQuest surfaces temporary social availability through map-based, group-aware activity signals.",
};

// ---------------------------------------------------------------------------
// Hero — campus activity pulse
// ---------------------------------------------------------------------------
export const activitySignals = [
  "Jamba run · now",
  "Study session · 20 min",
  "Morning run · 8:30",
  "Board game night · 7pm",
];

// ---------------------------------------------------------------------------
// Mock "Broadcast a quest" demo
// ---------------------------------------------------------------------------
export const questDemoOptions = {
  activities: ["Quick boba run", "Study session", "Late night food?", "Board game night"],
  times: ["Now", "In 30 min", "Tonight"],
  audiences: ["Study buddies", "Dorm friends", "Whole campus"],
  locations: [
    { label: "Coupa Café, Green Library", mapLabel: "Green Library" },
    { label: "Tresidder", mapLabel: "Tresidder" },
    { label: "Arrillaga", mapLabel: "Arrillaga" },
  ],
};

// ---------------------------------------------------------------------------
// At-a-glance pilot metrics
// ---------------------------------------------------------------------------
export const metrics: CaseStudyMetric[] = [
  { value: "10", label: "Pilot participants" },
  { value: "67", label: "Quests created" },
  { value: "3 days", label: "Live deployment" },
  { value: "<7 sec", label: "Avg. quest creation, after iteration" },
  { value: "49", label: "Quests from 3 highly active hosts", note: "Uneven participation" },
];
export const metricsFootnote =
  "Results reflect a small Stanford pilot and should be interpreted as formative product evidence.";

// ---------------------------------------------------------------------------
// The coordination gap
// ---------------------------------------------------------------------------
export const coordinationSpectrum: SpectrumColumn[] = [
  {
    heading: "Formal planning",
    examples: ["Calendar invites", "Scheduled events", "Detailed group chats"],
    characteristics: ["High commitment", "High coordination cost", "Works for planned events"],
  },
  {
    heading: "The missing middle",
    examples: ["“I have 30 minutes”", "“Anyone nearby?”", "“Thinking about getting food”"],
    characteristics: ["Temporary availability", "Low commitment", "Usually invisible to acquaintances"],
  },
  {
    heading: "CoQuest",
    examples: ["Short-lived quest signals"],
    characteristics: ["Visible", "Time-boxed", "Easy to join", "Easy to ignore"],
    emphasis: true,
  },
];
export const coordinationNote =
  "CoQuest was designed for the missing middle: casual coordination among people who may not be close enough to directly message, but aren't strangers either.";

// ---------------------------------------------------------------------------
// The core interaction: quests as signals
// ---------------------------------------------------------------------------
export const questCardExample = {
  title: "Quick Jamba run",
  location: "Tresidder",
  timing: "Starts in 5 min",
  audience: "Dorm friends",
  joining: "2 joining",
};

export const questCallouts = [
  { label: "What", text: "Short activity title" },
  { label: "Where", text: "Map-linked location" },
  { label: "When", text: "Immediate or near-future time" },
  { label: "Who", text: "Selected audience" },
  { label: "Expiration", text: "Automatically disappears when no longer relevant" },
];

export const lifecycleStages: LifecycleStage[] = [
  { label: "Create" },
  { label: "Broadcast" },
  { label: "Discover" },
  { label: "Join" },
  { label: "Meet" },
  { label: "Expire", fading: true },
];

// ---------------------------------------------------------------------------
// Product walkthrough
// ---------------------------------------------------------------------------
export const walkthroughStages: WalkthroughStage[] = [
  {
    id: "discover",
    eyebrow: "Discover",
    title: "Discover nearby activity",
    points: [
      "Quests appear as interactive map markers",
      "Location makes the opportunity feel immediate",
      "Users can browse without committing",
      "Hosted and available quests are visually differentiated",
    ],
    image: "/images/projects/coquest-discover.jpg",
    imageAlt: "CoQuest map screen showing quest pins near Stanford landmarks, next to a nearby-quests list",
  },
  {
    id: "browse",
    eyebrow: "Browse",
    title: "Browse intentionally",
    points: [
      "Upcoming, hosted, and past views",
      "A filtered list for users who prefer structured browsing",
      "Complements the ambient map experience",
    ],
    image: "/images/projects/coquest-browse.jpg",
    imageAlt: "CoQuest dashboard screen showing upcoming hosted quests, next to sort and filter controls",
  },
  {
    id: "broadcast",
    eyebrow: "Broadcast",
    title: "Broadcast a quest",
    points: [
      "Minimal required input",
      "Optional description",
      "Default near-term timing",
      "Audience selection",
      "Location lookup",
    ],
    image: "/images/projects/coquest-broadcast.jpg",
    imageAlt: "CoQuest create-quest screen with title, timing, location, and audience fields, next to an audience picker",
  },
  {
    id: "circles",
    eyebrow: "Coordinate",
    title: "Coordinate within trusted circles",
    points: [
      "Users create private audience groups",
      "Groups act as distribution filters",
      "Group membership is not publicly displayed",
      "Quests may target a selected circle rather than the entire campus",
    ],
    image: "/images/projects/coquest-circles.jpg",
    imageAlt: "CoQuest group management screen showing private audience groups, next to a private-group explainer card",
  },
];

// ---------------------------------------------------------------------------
// Behavioral design principles
// ---------------------------------------------------------------------------
export const behaviorPrinciples: PrincipleGroup[] = [
  {
    title: "Lower activation energy",
    decisions: [
      "Quest titles limited to about 40 characters",
      "Descriptions optional",
      "Time defaults toward the immediate future",
      "Creation reduced to a few taps",
      "Average creation time fell from about 18 seconds to under 7",
    ],
  },
  {
    title: "Support lightweight presence",
    decisions: [
      "Users can open the app simply to see what is happening",
      "Browsing is treated as valid participation",
      "Map activity creates ambient social awareness",
      "Joining does not require a conversation thread",
    ],
  },
  {
    title: "Make silence an acceptable no",
    decisions: [
      "Quests expire automatically",
      "Users do not need to reject an invitation",
      "No public consequence for ignoring a quest",
      "Social groups remain private",
    ],
  },
];

export const creationTimeComparison = {
  before: { value: "~18 sec", points: ["More fields", "Greater hesitation"] },
  after: { value: "<7 sec", points: ["Fewer required inputs", "Faster posting"] },
  note: "Describes an observed pilot usability improvement, not a controlled large-scale experiment.",
};

// ---------------------------------------------------------------------------
// System architecture
// ---------------------------------------------------------------------------
export const architectureFlow: ArchNode[] = [
  { label: "React Native client", kind: "client" },
  { label: "Firebase Authentication", kind: "firebase" },
  { label: "Firestore", kind: "firebase" },
  { label: "Real-time listeners", kind: "event" },
  { label: "Reactive map & dashboard updates", kind: "client" },
];

export const locationFlow: ArchNode[] = [
  { label: "User-selected location", kind: "client" },
  { label: "Coordinates", kind: "client" },
  { label: "LocationIQ reverse geocoding", kind: "external" },
  { label: "Human-readable location", kind: "external" },
  { label: "Quest document", kind: "firebase" },
];

export const applicationAreas = [
  "Authentication",
  "Map",
  "Dashboard",
  "Quest creation",
  "Profile",
  "Groups",
  "Settings",
];

export const reusableComponents = ["Quest card", "Quest detail", "Map pin", "Group selector"];

// ---------------------------------------------------------------------------
// Real-time event flow
// ---------------------------------------------------------------------------
export const postEventTrace: EventTraceStep[] = [
  { lane: "Host device", description: "Presses Post — a quest document is created in Firestore" },
  { lane: "Firestore", description: "Time, location, host, audience, image, and description are stored" },
  { lane: "Firestore", description: "The quest's expiration time is calculated" },
  { lane: "Host device", description: "The quest ID is added to the host's relevant quest collections" },
  { lane: "Audience profiles", description: "The selected audience's feeds are updated" },
  { lane: "Listener", description: "Firestore listeners receive the change" },
  { lane: "Map/dashboard", description: "The map and dashboard update without a manual refresh" },
  { lane: "Map/dashboard", description: "As people join, the attendee list and RSVP state update" },
];

export const rsvpEventTrace: EventTraceStep[] = [
  { lane: "Host device", description: "A user joins the quest" },
  { lane: "Firestore", description: "A successful write is confirmed" },
  { lane: "Firestore", description: "The attendee list updates" },
  { lane: "Listener", description: "Joined-quest state updates" },
  { lane: "Map/dashboard", description: "The UI confirms the RSVP" },
];

export const rsvpNote =
  "The interface waits for a successful write before confirming a join, to avoid inconsistent RSVP state.";

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------
export const dataEntities: DataEntity[] = [
  {
    name: "Users",
    fields: [
      "SUNet identifier",
      "First and last name",
      "Groups",
      "Displayed quests",
      "Hosted quests",
      "Joined quests",
    ],
  },
  {
    name: "Quests",
    fields: [
      "Name",
      "Description",
      "Start time",
      "End time",
      "Host",
      "Audience group",
      "Location",
      "Photo",
      "Attendees",
    ],
  },
  {
    name: "Groups",
    fields: ["Name", "Owner", "Member handles", "Created timestamp", "Updated timestamp"],
  },
];

export const dataRelationships = [
  "User hosts Quest",
  "User joins Quest",
  "User owns Group",
  "Group distributes Quest",
  "Group contains Users",
];

// ---------------------------------------------------------------------------
// Pilot findings
// ---------------------------------------------------------------------------
export const pilotDays: PilotDay[] = [
  {
    day: "Day 1",
    body: ["Early users create the first quests.", "Visible activity establishes the initial norm."],
  },
  {
    day: "Day 2",
    body: [
      "Other participants begin replicating lightweight quest formats.",
      "Users open the app to see what is happening even without joining.",
    ],
  },
  {
    day: "Day 3",
    body: [
      "The app develops a shared rhythm of casual activity.",
      "Participants use it for study sessions, food runs, exercise, and social events.",
    ],
  },
];

export const pilotMetricsTable: PilotMetricRow[] = [
  { measure: "Participants", observation: "Approximately 10" },
  { measure: "Deployment", observation: "3 days" },
  { measure: "Quests created", observation: "67" },
  { measure: "Quests created by three highly active hosts", observation: "49" },
  { measure: "Quest-creation time after iteration", observation: "Under 7 seconds" },
  { measure: "Quest-creation time before iteration", observation: "Approximately 18 seconds" },
];

export const pilotNote =
  "Participation was highly uneven, which matched the expected contribution-pyramid pattern.";

// ---------------------------------------------------------------------------
// Participation pyramid
// ---------------------------------------------------------------------------
export const pyramidLevels: PyramidLevel[] = [
  {
    title: "Initiators",
    description:
      "A small number of users created much of the available activity — three highly active hosts produced 49 of the 67 quests.",
  },
  {
    title: "Participants",
    description: "Some users joined quests without frequently hosting.",
  },
  {
    title: "Browsers",
    description:
      "Some users opened the app and observed activity without posting or joining — five users primarily lurked but returned to the app multiple times during the pilot.",
  },
];

export const pyramidInsight =
  "Passive viewing was not necessarily failed engagement. Ambient awareness was part of the intended experience.";
export const pyramidSecondaryInsight =
  "Participation roles appeared fluid and changed with timing and availability.";

// ---------------------------------------------------------------------------
// Social computing theory in practice
// ---------------------------------------------------------------------------
export const theoryFindings: TheoryFinding[] = [
  {
    concept: "Contribution pyramid",
    theory: "A small number of users will initiate most activity.",
    observed: "A few highly active hosts generated much of the pilot's content.",
  },
  {
    concept: "Descriptive norms",
    theory: "Visible behavior makes similar behavior feel acceptable.",
    observed: "Once early quests appeared, other users adopted similar casual formats.",
  },
  {
    concept: "Ambient social awareness",
    theory: "People benefit from knowing who is available without directly coordinating.",
    observed: "Users opened the map simply to see what was happening.",
  },
  {
    concept: "Strength of weak ties",
    theory: "Lightweight signals can create opportunities beyond a person's closest relationships.",
    observed: "Participants reported connecting beyond their usual friend groups.",
  },
];

// ---------------------------------------------------------------------------
// Privacy, norms, and trust
// ---------------------------------------------------------------------------
export const trustRows: TrustRow[] = [
  { concern: "Unwanted location exposure", response: "Users deliberately select a location and audience" },
  { concern: "Pressure from group membership", response: "Group membership is not publicly visible" },
  { concern: "Unknown users", response: "Access restricted to Stanford-affiliated email accounts" },
  { concern: "Formal rejection anxiety", response: "Ignoring a quest requires no explicit response" },
  { concern: "Stale location or activity data", response: "Quests expire after their time window" },
  { concern: "Oversharing to the whole campus", response: "Users can target custom social circles" },
  { concern: "Inconsistent RSVP state", response: "UI confirms joins after successful backend writes" },
];

// ---------------------------------------------------------------------------
// My contributions
// ---------------------------------------------------------------------------
export const contributionGroups: ContributionGroup[] = [
  {
    category: "Product definition",
    items: [
      "Helped translate the social-coordination problem into a concrete quest-based interaction",
      "Contributed to defining the low-friction posting and joining experience",
    ],
  },
  {
    category: "Mobile engineering",
    items: [
      "Contributed to the React Native application and its reusable screen/component structure",
      "Helped connect interface states to Firebase-backed data",
    ],
  },
  {
    category: "Real-time systems",
    items: [
      "Supported Firestore data flows for quests, users, groups, and RSVP state",
      "Helped manage asynchronous writes and reactive updates",
    ],
  },
  {
    category: "Location experience",
    items: ["Contributed to map-based quest discovery and human-readable location handling"],
  },
  {
    category: "Pilot and iteration",
    items: [
      "Helped test the product with a live student cohort",
      "Used observed behavior to improve the creation flow and interpret participation patterns",
    ],
  },
];

// ---------------------------------------------------------------------------
// Product tensions and honest reflections
// ---------------------------------------------------------------------------
export const tensions: Tension[] = [
  {
    title: "Low friction encouraged posting, but activity remained uneven",
    finding: "Three highly active hosts generated 49 of the 67 quests.",
    implication: "The product depended heavily on a small number of initiators.",
  },
  {
    title: "Ephemerality reduced pressure, but silence could feel like rejection",
    finding:
      "A quest disappearing without anyone joining could make hosts feel as though they were “shouting into the void.”",
    implication: "Future versions need encouragement and feedback without introducing vanity metrics.",
  },
  {
    title: "Ambient awareness created value even without joining",
    finding: "Some participants repeatedly opened the app simply to observe nearby activity.",
    implication: "Success should not be measured only through posts and RSVPs.",
  },
  {
    title: "Local critical mass mattered",
    finding:
      "The experience became useful when enough activity was visible within both individual friend groups and the broader cohort.",
    implication: "Scaling requires community-level seeding, not only user acquisition.",
  },
];

// ---------------------------------------------------------------------------
// Future experiments
// ---------------------------------------------------------------------------
export const futureExperiments = [
  "Expand from approximately 10 users to larger cohorts",
  "Test whether the feed remains useful at 100 or more users",
  "Determine how many active hosts are needed per social circle",
  "Explore feed-ranking and density controls",
  "Test encouragement prompts for hosts whose quests receive no response",
  "Preserve low-pressure participation without gamification",
  "Investigate stronger location and audience privacy controls",
  "Test whether group-based critical mass can be built independently",
  "Measure real-world meetups separately from quest creation",
  "Study whether engagement persists beyond initial novelty",
  "Compare map-first and dashboard-first discovery behavior",
];

// ---------------------------------------------------------------------------
// Section nav
// ---------------------------------------------------------------------------
// Ordered to match the page's actual visual flow (behavior principles are
// covered before system architecture), so the scroll-spy highlight advances
// monotonically instead of jumping backward.
export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "interaction", label: "Interaction" },
  { id: "experience", label: "Experience" },
  { id: "behavior", label: "Behavior" },
  { id: "architecture", label: "Architecture" },
  { id: "pilot", label: "Pilot" },
  { id: "trust", label: "Trust" },
  { id: "contributions", label: "Contributions" },
  { id: "lessons", label: "Lessons" },
];
