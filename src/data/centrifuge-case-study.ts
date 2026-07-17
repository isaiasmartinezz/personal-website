// ---------------------------------------------------------------------------
// Structured content for the custom benchtop-centrifuge case-study page.
// Mirrors the pattern established by the other custom case studies. Every
// user-facing string here is written to describe a centrifuge built from
// scratch — no historical version terminology (e.g. "V2"/"V3") appears
// anywhere, per an explicit content requirement for this page.
// ---------------------------------------------------------------------------

export interface CaseStudyMetric {
  value: string;
  label: string;
  isTarget?: boolean;
  note?: string;
}

export type OperatingState = "ready" | "active" | "complete";

export interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
}

export interface DesignProblemPoint {
  text: string;
}

export interface PipelineStep {
  label: string;
  category: "Input" | "Control" | "Sensing" | "Actuation" | "Feedback";
  detail: string;
}

export interface AnatomyLayer {
  layer: string;
  title: string;
  items: string[];
}

export interface FabricationStep {
  step: string;
}

export interface VerificationRow {
  location: string;
  part: string;
  designed: string;
  measured: string;
}

export interface VerificationCategory {
  category: "Matched design" | "Small fabrication deviation" | "Required manual adjustment";
  rows: VerificationRow[];
  note: string;
}

export interface FirmwareEvent {
  label: string;
}

export interface RequirementRow {
  id: string;
  description: string;
  met: "Yes" | "No" | "Unsure";
  note: string;
}

export interface ContributionGroup {
  category: string;
  items: string[];
}

export interface ChallengeEntry {
  title: string;
  decision: string;
  lesson: string;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export const header = {
  eyebrow: "EMBEDDED SYSTEMS · BIOENGINEERING · 2024",
  title: "Custom Benchtop Centrifuge",
  formalTitle: "Phase-Aware Control, RPM Feedback, and Multimodal Notifications",
  intro:
    "Built a centrifuge from scratch by integrating a custom rotor and enclosure, Arduino-based motor control, optical speed sensing, an LCD interface, and phase-aware visual and auditory feedback.",
  meta: [
    { label: "Role", value: "Embedded Systems & Bioengineering" },
    { label: "Team", value: "3 people" },
    { label: "Controller", value: "Arduino" },
    { label: "Fabrication", value: "Laser Cut + 3D Printed" },
    { label: "Year", value: "2024" },
  ],
  heroCaption:
    "An integrated electromechanical prototype combining the rotor, motor, optical sensor, control electronics, LCD, physical controls, RGB indicator, speaker, and custom enclosure.",
};

export const projectSummary =
  "We built a custom benchtop centrifuge from scratch, integrating a fabricated rotor and enclosure with Arduino-based motor control, optical RPM sensing, an LCD interface, and phase-aware visual and auditory feedback.";
export const supportingStatement =
  "The device communicates its operating state through color and sound so an operator can distinguish setup, active centrifugation, ramp-down, and run completion without continuously watching the display.";
export const engineeringStatement =
  "The project combined mechanical fabrication, analog and digital electronics, embedded firmware, feedback sensing, and user-interface design in one integrated prototype.";

// ---------------------------------------------------------------------------
// Hero hotspots
// ---------------------------------------------------------------------------
export const hotspots: Hotspot[] = [
  { id: "rotor", label: "Rotor and tube holder", description: "A 3D-printed two-level rotor: a lower base fixed to the motor shaft and an upper bowl that holds balanced sample tubes.", x: 46, y: 22 },
  { id: "motor", label: "Motor", description: "A DC motor drives the rotor shaft, switched through a MOSFET and commanded by PWM from the Arduino.", x: 46, y: 46 },
  { id: "sensor", label: "Optical speed sensor", description: "A reflective marker on the rotor passes an optical source and phototransistor once per revolution, feeding a comparator circuit.", x: 60, y: 50 },
  { id: "arduino", label: "Arduino", description: "Runs the firmware state machine: reads buttons and sensor pulses, drives the motor, and coordinates the LCD, RGB LED, and speaker.", x: 68, y: 58 },
  { id: "lcd", label: "LCD", description: "Displays the current mode, setpoint, remaining time, and run state (for example, \"Press Start to Begin\").", x: 47, y: 71 },
  { id: "buttons", label: "Input buttons", description: "Physical buttons select time or speed mode, increase or decrease the setpoint, and start or stop a run.", x: 27, y: 68 },
  { id: "led", label: "RGB status light", description: "A four-pin RGB LED turns blue, yellow, or green to indicate the current operating phase.", x: 78, y: 74 },
  { id: "speaker", label: "Speaker", description: "Plays a distinct tone when centrifugation starts and a different tone when the run and ramp-down finish.", x: 82, y: 70 },
  { id: "enclosure", label: "Enclosure", description: "A laser-cut, puzzle-jointed transparent enclosure houses and protects the electronics while keeping the build inspectable.", x: 15, y: 40 },
];

// ---------------------------------------------------------------------------
// Facts strip
// ---------------------------------------------------------------------------
export const factsMetrics: CaseStudyMetric[] = [
  { value: "3", label: "Operating phases" },
  { value: "2", label: "Notification channels" },
  { value: "3", label: "Primary subsystem groups", note: "Control · Sensing · Actuation" },
  { value: "2", label: "Digital-fabrication methods" },
  { value: "1", label: "Integrated prototype" },
];

// ---------------------------------------------------------------------------
// Design problem
// ---------------------------------------------------------------------------
export const designProblemPoints = [
  "Centrifuge runs may last long enough that an operator steps away.",
  "A display alone is not always noticeable from across a workspace.",
  "Motor sound does not clearly distinguish active spinning, ramp-down, and a fully completed run.",
  "Removing tubes before the rotor is stationary creates avoidable risk.",
  "The device therefore needed clear, redundant feedback about its operating state.",
];
export const designQuestion =
  "How can a benchtop device clearly communicate what it is doing — even when the operator is not standing directly in front of it?";
export const designSafetyNote =
  "The status system communicates run state; it is not a certified mechanical safety interlock.";

// ---------------------------------------------------------------------------
// Operating-cycle demonstration
// ---------------------------------------------------------------------------
export const operatingStates: {
  key: OperatingState;
  label: string;
  lcdText: string;
  behavior: string[];
}[] = [
  {
    key: "ready",
    label: "Ready",
    lcdText: "Press Start to Begin",
    behavior: [
      "Operator loads balanced tubes",
      "Operator chooses time or speed",
      "Increase and decrease buttons modify the selected value",
      "Rotor remains stationary",
    ],
  },
  {
    key: "active",
    label: "Active",
    lcdText: "Running · 01:42",
    behavior: [
      "A start cue is available",
      "Motor drives the rotor",
      "Optical sensing tracks rotor motion",
      "Remaining run time is displayed",
      "Yellow remains active throughout centrifugation and ramp-down",
    ],
  },
  {
    key: "complete",
    label: "Complete",
    lcdText: "Run Complete",
    behavior: [
      "Completion cue is available",
      "Rotor has completed the programmed run and ramp-down",
      "The interface indicates that the run is finished",
    ],
  },
];

// ---------------------------------------------------------------------------
// Full system architecture
// ---------------------------------------------------------------------------
export const architectureGroups = [
  {
    title: "User interface",
    items: ["Mode selection", "Increase control", "Decrease control", "Start control", "LCD", "RGB status indicator", "Speaker"],
  },
  {
    title: "Controller",
    items: ["Arduino", "Firmware state", "Time and speed setpoints", "PWM outputs", "Interrupt handling", "Sensor input processing"],
  },
  {
    title: "Sensing",
    items: ["Optical transmitter", "Reflective rotor marker", "Phototransistor receiver", "Comparator", "Rotor pulse signal", "Estimated RPM"],
  },
  {
    title: "Actuation",
    items: ["Motor driver MOSFET", "DC motor", "Rotor", "Tube holder"],
  },
];
export const architectureSupport = "Power supply (7–9 V)";

export const architectureFlows = [
  "Operator → Arduino → motor → rotor",
  "Rotor → optical sensor → comparator → Arduino",
  "Arduino → LCD / light / speaker → operator",
];

export const systemDiagramImage = {
  src: "/images/projects/centrifuge-system-diagram.jpg",
  alt: "Hand-drawn full system block diagram showing the user interface, control, sensing, and actuation subsystems and their signal connections",
};

export const circuitDiagramImage = {
  src: "/images/projects/centrifuge-circuit-diagram.jpg",
  alt: "Full circuit schematic showing the phototransistor and comparator sensing stage, Arduino, motor MOSFET driver, LCD, and speaker driver",
};

// ---------------------------------------------------------------------------
// Exploded device anatomy
// ---------------------------------------------------------------------------
export const anatomyLayers: AnatomyLayer[] = [
  { layer: "Layer 1", title: "Sample handling", items: ["Tube holder", "Rotor bowl", "Rotor base", "Balanced sample placement"] },
  { layer: "Layer 2", title: "Mechanical drive", items: ["Motor shaft", "Motor", "Mechanical support", "Rotor fasteners"] },
  { layer: "Layer 3", title: "Speed sensing", items: ["Reflective marker", "Optical transmitter", "Phototransistor", "Comparator circuitry"] },
  { layer: "Layer 4", title: "Control electronics", items: ["Arduino", "Motor MOSFET", "Speaker MOSFET", "Breadboards", "Power distribution"] },
  { layer: "Layer 5", title: "Operator interface", items: ["LCD", "Buttons", "RGB LED", "Speaker"] },
  { layer: "Layer 6", title: "Enclosure", items: ["Laser-cut transparent panels", "Front-panel openings", "Internal component mounting", "Wiring protection and organization"] },
];

// ---------------------------------------------------------------------------
// Mechanical design and fabrication
// ---------------------------------------------------------------------------
export const enclosureExplanation = [
  "Custom panels were dimensioned for the physical device",
  "Front-panel cutouts accommodated the LCD, buttons, status light, and speaker",
  "Puzzle-style finger joints supported assembly",
  "Transparent material kept the prototype inspectable",
  "Components and wiring were contained within one enclosure",
];
export const enclosureFlow = ["Sketch", "CAD assembly", "Laser-cut panels", "Assembled enclosure"];

export const rotorExplanation = [
  "A custom rotor base connected to the motor shaft",
  "A separate upper tube holder supported sample tubes",
  "Lower geometry incorporated elements needed for optical sensing",
  "Fasteners secured the rotating assembly",
  "Physical dimensions were checked after fabrication",
];
export const rotorFlow = ["Sketch", "CAD model", "Printed component", "Motor-mounted rotor"];

export const rotorTradeoff =
  "The larger two-level rotor improved organization and sensor separation, but its added mass reduced achievable rotational speed.";

export const enclosureCadImage = {
  src: "/images/projects/centrifuge-enclosure-cad.jpg",
  alt: "CAD render of the assembled laser-cut enclosure, showing the front-panel cutouts for the LCD, buttons, and status indicators",
};
export const rotorCadImage = {
  src: "/images/projects/centrifuge-rotor-cad.jpg",
  alt: "CAD render of the two-level rotor assembly: an upper tube-holder bowl mounted above a circular rotor base",
};
export const frontPanelSketchImage = {
  src: "/images/projects/centrifuge-front-panel-sketch.jpg",
  alt: "Dimensioned sketch of the front enclosure panel showing button, LCD, and indicator cutout placement",
};

// ---------------------------------------------------------------------------
// Design-to-build verification
// ---------------------------------------------------------------------------
export const verificationCategories: VerificationCategory[] = [
  {
    category: "Matched design",
    rows: [
      { location: "A–K", part: "Enclosure base", designed: "6–200 mm", measured: "Matched exactly" },
      { location: "A–O", part: "Enclosure right wall", designed: "3–200 mm", measured: "Matched exactly" },
      { location: "A–G", part: "Rotor base (all views)", designed: "R1.8–R75 mm", measured: "Matched exactly" },
    ],
    note: "Most fabricated dimensions matched the CAD targets closely.",
  },
  {
    category: "Small fabrication deviation",
    rows: [
      { location: "O", part: "Back wall", designed: "82.8 mm", measured: "82.5 mm" },
      { location: "E", part: "Front wall", designed: "69.6 mm", measured: "68.5 mm" },
      { location: "O", part: "Front wall fillet", designed: "R1.68 mm", measured: "R2 mm" },
      { location: "C", part: "Button bracket fillet", designed: "R1.68 mm", measured: "R1.7 mm" },
    ],
    note: "Small discrepancies came from measurement precision and did not affect function or assembly.",
  },
  {
    category: "Required manual adjustment",
    rows: [
      { location: "H", part: "Left wall", designed: "69.6 mm", measured: "71 mm" },
      { location: "J", part: "Left wall", designed: "6.4 mm", measured: "8 mm" },
    ],
    note: "A file-scaling error before laser cutting was corrected by manually shaving the panel down to the intended size.",
  },
];
export const verificationSummary =
  "None of these deviations prevented successful system integration — the enclosure required minor reinforcement with hot glue during assembly, which is normal prototype iteration rather than a failure.";

// ---------------------------------------------------------------------------
// Motor control
// ---------------------------------------------------------------------------
export const motorControlFlow = [
  "User sets desired speed",
  "Arduino calculates PWM command",
  "MOSFET switches motor power",
  "Motor accelerates rotor",
  "Optical sensor measures rotation",
  "Firmware adjusts or interprets motor behavior",
  "LCD reports device state",
];
export const motorControlExplanation = [
  "PWM controlled the effective motor drive.",
  "The motor was switched through a MOSFET rather than driven directly from an Arduino pin.",
  "A flyback diode across the motor protected the driver circuit from inductive voltage spikes.",
  "Firmware mapped motor commands to measured rotor behavior.",
  "Sensor feedback improved the relationship between selected and achieved RPM.",
];
export const motorControlNote =
  "This is best described as sensor-informed RPM control rather than a formal closed-loop (PID) controller.";

// ---------------------------------------------------------------------------
// Optical RPM sensing
// ---------------------------------------------------------------------------
export const sensingSteps = [
  "An optical source illuminates the rotor.",
  "A reflective marker passes the sensor once per revolution.",
  "The phototransistor detects the reflected-light change.",
  "A comparator converts the analog response into a cleaner digital pulse.",
  "The Arduino measures the pulse frequency.",
  "Pulse frequency is converted into rotor speed.",
];
export const rpmEquation = "RPM = pulses per second × 60 / pulses per revolution";
export const rpmEquationNote =
  "The rotor carried one reflective marker per revolution, so pulse frequency converts directly to RPM using this relationship.";
export const oscilloscopeNote = "Schematic trace — illustrative, not recorded scope data for this page.";

// ---------------------------------------------------------------------------
// Embedded firmware
// ---------------------------------------------------------------------------
export const firmwareStates = ["Setup", "Start requested", "Start notification", "Motor active", "Countdown", "Ramp-down", "Rotor stopped", "Completion notification", "Setup"];
export const firmwareEvents: FirmwareEvent[] = [
  { label: "Start button interrupt" },
  { label: "Start-cue flag" },
  { label: "Timer expiration" },
  { label: "Motor command" },
  { label: "Ramp-down completion" },
  { label: "RGB state" },
  { label: "LCD state" },
  { label: "Completion cue" },
];
export const firmwareExplanation = [
  "Physical buttons modify time or speed settings.",
  "The start control triggers the run sequence.",
  "Firmware coordinates motor output, timer state, LCD messages, lighting, and sound.",
  "Interrupt handlers remain short.",
  "Longer notification logic runs in the main loop.",
];
export const firmwareHighlight =
  "The start event originated in an interrupt, but the audio sequence required delays. Instead of running blocking audio code inside the interrupt handler, the interrupt set a flag and the main loop played the cue safely afterward.";
export const firmwarePatternAvoid = ["Interrupt", "Blocking delay", "Audio sequence"];
export const firmwarePatternUsed = ["Interrupt", "Set event flag", "Return", "Main loop handles audio"];

// ---------------------------------------------------------------------------
// Visual notification subsystem
// ---------------------------------------------------------------------------
export const visualStates = [
  { key: "ready" as OperatingState, label: "Blue — Ready", meaning: "The device is powered and waiting for setup or a start command." },
  { key: "active" as OperatingState, label: "Yellow — Running", meaning: "The programmed centrifugation cycle or ramp-down is active." },
  { key: "complete" as OperatingState, label: "Green — Complete", meaning: "The programmed cycle and ramp-down have finished." },
];
export const visualExplanation = [
  "A four-pin RGB LED was controlled through PWM-capable Arduino outputs.",
  "Firmware changed the output channels based on the current operating state.",
  "The system was first tested in circuit simulation.",
  "It was then tested on a breadboard.",
  "Finally, it was integrated into the complete centrifuge.",
];
export const visualAccessibilityNote =
  "Color was paired with LCD text and audio cues so the interface did not rely on color alone.";

export const exampleRun = {
  totalMinutes: 11.5,
  segments: [
    { state: "ready" as OperatingState, startMin: 0, endMin: 1, label: "Pre-run" },
    { state: "active" as OperatingState, startMin: 1, endMin: 11, label: "Centrifugation" },
    { state: "complete" as OperatingState, startMin: 11, endMin: 11.5, label: "Post-run" },
  ],
};

// ---------------------------------------------------------------------------
// Auditory notification subsystem
// ---------------------------------------------------------------------------
export const audioFlow = ["Arduino tone output", "MOSFET switching stage", "Speaker", "Operator cue"];
export const audioDevelopmentPath = [
  "Verify the speaker using a function generator.",
  "Test distinct frequencies.",
  "Connect the speaker to Arduino-generated square waves.",
  "Identify insufficient drive current.",
  "Add a MOSFET switching stage.",
  "Improve audibility during full-system integration.",
  "Create distinct start and completion sound patterns.",
  "Integrate both cues into the main firmware state machine.",
];
export const audioPseudocode = `if (startCuePending) {
    playStartCue();
    startCuePending = false;
}

if (runFinished) {
    playCompletionCue();
}`;

// ---------------------------------------------------------------------------
// Integration challenges and decisions
// ---------------------------------------------------------------------------
export const challenges: ChallengeEntry[] = [
  {
    title: "The start cue could not run inside the start-button interrupt",
    decision: "Set a startCueFlag inside the interrupt handler and play the audio cue from the main loop.",
    lesson: "Keeping interrupt handlers short and moving blocking logic to the main loop kept the firmware responsive and safe.",
  },
  {
    title: "The speaker was inaudible once wired into the full circuit",
    decision: "Add a MOSFET switching stage and reduce the current-limiting resistance to increase drive current.",
    lesson: "A subsystem that works in isolation can still fail once integrated — full-system testing caught a real audibility problem.",
  },
  {
    title: "The enclosure's interlocking panel design was hard to assemble reliably",
    decision: "Reinforce the puzzle-jointed panels with hot glue during final assembly.",
    lesson: "A transparent, inspectable enclosure was worth a small amount of manual reinforcement.",
  },
  {
    title: "Selected RPM did not always match measured RPM",
    decision: "Use phototransistor pulse feedback to inform and adjust the motor command rather than trusting the open-loop PWM value alone.",
    lesson: "Sensor feedback substantially improved the relationship between a selected and an achieved speed.",
  },
];

// ---------------------------------------------------------------------------
// Functional testing
// ---------------------------------------------------------------------------
export const functionalTestNotes = [
  "The RGB LED was verified in circuit simulation, then on a breadboard, then in the fully integrated system.",
  "The speaker was verified against a function generator before being driven by Arduino-generated square waves.",
  "Laser-cut enclosure panels were measured after fabrication and compared against their CAD-designed dimensions.",
  "The rotor base was confirmed to spin true and stay securely fastened to the motor shaft.",
];

// ---------------------------------------------------------------------------
// Requirements verification
// ---------------------------------------------------------------------------
export const requirementRows: RequirementRow[] = [
  { id: "1.1", description: "Spin standard 1.5 mL microcentrifuge tubes", met: "Yes", note: "No changes needed." },
  { id: "1.2", description: "Spin two identical containers simultaneously while maintaining basic safety", met: "Yes", note: "No changes needed." },
  { id: "2.1.1", description: "Support rotational speeds of at least 2,500 RPM", met: "No", note: "Would need a motor with higher voltage capacity, since the larger rotor base needed more power." },
  { id: "2.1.2", description: "Allow the operator to set speed in increments of ~100 RPM or less", met: "Yes", note: "No changes needed." },
  { id: "2.1.3", description: "Allow the operator to set speed accurately to within ~5% error", met: "Yes", note: "No changes needed." },
  { id: "2.1.4 / 2.1.5", description: "Ramp up or down within ~30 seconds without exceeding the speed setting", met: "Yes", note: "No changes needed." },
  { id: "2.1.6", description: "Maintain speed within ~5% of setpoint throughout a run", met: "Yes", note: "No changes needed." },
  { id: "2.2.1–2.2.3", description: "Allow programmable run duration (up to ~10 min, ~30 sec increments, ~5% accuracy)", met: "Yes", note: "No changes needed." },
  { id: "3.1 / 3.2", description: "Start within ~1 sec and stop/ramp-down within ~0.5 sec of a command", met: "Yes", note: "Initiation was not perfectly consistent — a more reliable button-input system would help." },
  { id: "4.1.1 / 4.2.1", description: "Notify the operator visually and audibly at run start and at safe-removal time", met: "Yes", note: "No changes needed." },
  { id: "5.1", description: "Separate anticoagulated blood into three distinct layers within ~5 minutes", met: "No", note: "The motor was not powerful enough to reach the rotational speed this separation required." },
  { id: "5.2", description: "Pellet turmeric particles from a test suspension within ~2 minutes", met: "No", note: "This verification test was not completed." },
  { id: "7.2.1 / 7.2.2", description: "Resist tipping on a flat surface or a ~5° incline", met: "Yes", note: "No changes needed." },
  { id: "7.3.1 / 7.3.2", description: "Contain spillage without wetting components that affect safety", met: "Unsure", note: "Testing was not performed, out of caution around wetting live electronics." },
];
export const requirementsFraming =
  "Safety-critical requirements around single-fault tolerance and hazardous emissions were assessed through a separate hazard-analysis process rather than the functional tests summarized here.";
export const requirementsNote =
  "This prototype demonstrated an integrated electromechanical system and phase-aware interface — it did not demonstrate laboratory-grade separation performance, clinical use, regulatory compliance, or a production-ready safety system.";

// ---------------------------------------------------------------------------
// Team contributions
// ---------------------------------------------------------------------------
export const contributionGroups: ContributionGroup[] = [
  {
    category: "Mechanical design and fabrication",
    items: [
      "Designed and laser-cut the enclosure panels in CAD",
      "Designed and 3D-printed the two-level rotor and tube holder",
      "Measured fabricated parts against CAD targets and made manual adjustments where needed",
    ],
  },
  {
    category: "Electronics and sensing",
    items: [
      "Built the phototransistor and comparator optical-sensing circuit",
      "Built the motor and speaker MOSFET driver stages",
      "Wired and tested the full circuit on breadboards before integration",
    ],
  },
  {
    category: "Embedded firmware",
    items: [
      "Implemented the run state machine in C/C++ on Arduino",
      "Implemented interrupt-safe handling for the start event",
      "Mapped PWM motor commands to sensor-measured rotor speed",
    ],
  },
  {
    category: "Notification systems",
    items: [
      "Implemented phase-aware RGB status lighting",
      "Composed and implemented distinct start and completion audio cues",
      "Integrated both notification channels into the main firmware loop",
    ],
  },
  {
    category: "Testing and verification",
    items: [
      "Ran subsystem tests for the RGB LED, speaker, and sensing circuit",
      "Ran full-system functional tests and documented requirement-by-requirement results",
      "Documented fabrication measurements against CAD targets",
    ],
  },
];

// ---------------------------------------------------------------------------
// Lessons and future improvements
// ---------------------------------------------------------------------------
export const lessons = [
  "A more powerful motor is the single highest-leverage change for meeting the higher-speed requirements.",
  "A more reliable button-input system would make run start and stop timing more consistent.",
  "The turmeric-pelleting verification test should be completed to properly assess particle-separation performance.",
  "A formal safety review would be needed before handling any biological sample, let alone anticoagulated blood.",
];
export const futureImprovements = [
  "Upgrade to a higher-power motor and re-validate achievable RPM",
  "Redesign the button input circuitry for more consistent start/stop timing",
  "Complete the turmeric-pelleting verification test",
  "Add a certified mechanical lid interlock",
  "Explore automatic imbalance detection",
  "Pursue a formal hazard analysis and risk-management review before any biological sample use",
];

// ---------------------------------------------------------------------------
// Section nav
// ---------------------------------------------------------------------------
export const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "demo", label: "Demo" },
  { id: "architecture", label: "Architecture" },
  { id: "fabrication", label: "Fabrication" },
  { id: "electronics", label: "Electronics" },
  { id: "firmware", label: "Firmware" },
  { id: "notifications", label: "Notifications" },
  { id: "testing", label: "Testing" },
  { id: "contributions", label: "Contributions" },
  { id: "lessons", label: "Lessons" },
];
