import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Download, Github, Gauge, Activity, Cpu, LineChart,
  Workflow, Target, BookOpen, Wrench, FlaskConical, CheckCircle2,
  AlertTriangle, Rocket, Layers, ChevronRight, Sigma, CircuitBoard,
} from "lucide-react";

import simulinkModel from "@/assets/simulink-model.png.asset.json";
import plantSubsystem from "@/assets/plant-subsystem.png.asset.json";
import pidTuner from "@/assets/pid-tuner.png.asset.json";
import stepResponse from "@/assets/step-response.png.asset.json";
import disturbanceResponse from "@/assets/disturbance-response.png.asset.json";
import controllerComparison from "@/assets/controller-comparison.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cruise Control System — Control Systems Portfolio Project" },
      { name: "description", content: "Design, simulation and comparative analysis of P, PI, PD and PID controllers for an automotive cruise control system in MATLAB Simulink." },
      { property: "og:title", content: "Automotive Cruise Control System — MATLAB Simulink" },
      { property: "og:description", content: "Control engineering portfolio project: transfer function modeling, PID tuning, disturbance rejection and controller benchmarking." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "methodology", label: "Methodology" },
  { id: "model", label: "Model" },
  { id: "design", label: "Design" },
  { id: "results", label: "Results" },
  { id: "scope", label: "Scope" },
];

const ACHIEVEMENTS = [
  { k: "0", v: "Steady-state error with PI" },
  { k: "14.59 s", v: "Best rise time" },
  { k: "4", v: "Controllers benchmarked" },
  { k: "1/(Ms+B)", v: "Generic plant model" },
];

const TECH = ["MATLAB", "Simulink", "Control System Toolbox", "PID Tuner", "Transfer Functions", "Laplace"];

const OBJECTIVES = [
  "Derive a generic longitudinal vehicle model and transfer function",
  "Build a closed-loop cruise control architecture in Simulink",
  "Design and tune P, PI, PD and PID controllers",
  "Inject terrain disturbance and quantify rejection",
  "Benchmark controllers on rise time, overshoot, settling time and SSE",
  "Recommend the most suitable controller for the plant class",
];

const METHODOLOGY = [
  { icon: Sigma, t: "Vehicle Dynamics Modeling", d: "Apply Newton's second law to longitudinal motion with damping for drag and rolling losses." },
  { icon: Workflow, t: "Transfer Function Development", d: "Take the Laplace transform to derive a first-order plant G(s) = 1/(Ms + B)." },
  { icon: CircuitBoard, t: "Controller Design", d: "Construct P, PI, PD and PID compensators in parallel form against the same plant." },
  { icon: Cpu, t: "Simulation Environment", d: "Build the closed-loop Simulink model with reference, error, actuator, plant and feedback." },
  { icon: AlertTriangle, t: "Disturbance Injection", d: "Apply a step terrain disturbance and additive sensor noise on feedback." },
  { icon: LineChart, t: "Performance Evaluation", d: "Measure rise time, overshoot, settling time, steady-state error and rejection." },
];

const RESULTS = [
  { c: "P",   rt: "18.38", os: "0",    st: "32.74", sse: "0.146" },
  { c: "PI",  rt: "14.59", os: "9.05", st: "74.40", sse: "0" },
  { c: "PD",  rt: "21.02", os: "0",    st: "37.33", sse: "0.146" },
  { c: "PID", rt: "17.53", os: "8.54", st: "79.40", sse: "0" },
];

const ADVANTAGES = [
  "Simple, transparent mathematical model",
  "Easy to implement and reproduce",
  "Strong educational value for control theory",
  "Effective disturbance rejection with PI",
  "Clear quantitative controller comparison",
];

const LIMITATIONS = [
  "Linearized vehicle model only",
  "No transmission or driveline dynamics",
  "No actuator saturation modeled",
  "No nonlinear aerodynamic drag",
  "No adaptive or predictive control",
];

const APPLICATIONS = [
  "Cruise Control Systems",
  "Autonomous Vehicles",
  "Advanced Driver Assistance Systems (ADAS)",
  "Automotive Control Research",
  "Engineering Education",
];

const FUTURE = [
  "Adaptive Cruise Control with radar-based headway",
  "Model Predictive Control for constraint handling",
  "Full state-space and observer-based design",
  "Nonlinear vehicle dynamics with tire and grade models",
  "Sensor fusion with IMU + GPS + wheel speed",
  "AI-assisted longitudinal control policies",
];

const REFERENCES = [
  "K. Ogata, Modern Control Engineering, 5th ed. Pearson, 2010.",
  "G. F. Franklin, J. D. Powell and A. Emami-Naeini, Feedback Control of Dynamic Systems, 8th ed. Pearson, 2019.",
  "R. Rajamani, Vehicle Dynamics and Control, 2nd ed. Springer, 2012.",
  "MathWorks, “PID Controller Tuning in Simulink,” Simulink Control Design Documentation.",
  "Å. Aström and T. Hägglund, Advanced PID Control, ISA, 2006.",
];

function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <Section id="introduction" eyebrow="01 — Introduction" title="What is cruise control?">
        <div className="grid gap-8 md:grid-cols-3">
          <Card icon={Gauge} title="Definition">
            Cruise control is a closed-loop longitudinal controller that automatically modulates throttle effort to hold a driver-selected vehicle speed.
          </Card>
          <Card icon={Activity} title="Why it matters">
            It reduces driver fatigue on highways, improves fuel economy through smoother torque demand and forms the foundation for ADAS features such as adaptive cruise.
          </Card>
          <Card icon={Workflow} title="Role of feedback">
            Feedback continuously corrects the throttle command based on the measured speed error, rejecting road slope, payload, and aerodynamic disturbances.
          </Card>
        </div>
      </Section>

      <Section id="problem" eyebrow="02 — Problem Statement" title="Maintaining constant speed under disturbance">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl p-7">
            <p className="text-muted-foreground leading-relaxed">
              A passenger vehicle must hold a target speed despite continuously changing road
              conditions. Without feedback, even a small uphill grade or load change produces
              significant steady-state speed error and a degraded driving experience.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {["Road slopes & grade changes", "Vehicle load variation", "External disturbances", "Underlying system dynamics"].map(x => (
              <li key={x} className="glass rounded-xl p-4 text-sm flex items-start gap-2">
                <ChevronRight className="size-4 mt-0.5 text-primary shrink-0" /><span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="objectives" eyebrow="03 — Objectives" title="What this project sets out to prove">
        <div className="grid gap-3 sm:grid-cols-2">
          {OBJECTIVES.map((o, i) => (
            <div key={o} className="glass rounded-xl p-4 flex gap-3">
              <span className="font-mono text-xs text-primary mt-0.5">0{i + 1}</span>
              <span className="text-sm text-foreground/90">{o}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="literature" eyebrow="04 — Literature Review" title="Background">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: BookOpen, t: "Cruise control history", d: "Mechanical governors evolved into electronic throttle-by-wire systems, then into adaptive cruise control with radar and camera fusion." },
            { icon: Workflow, t: "Feedback control", d: "Closed-loop architectures provide disturbance rejection and reference tracking that open-loop maps cannot achieve." },
            { icon: Sigma, t: "PID controllers", d: "The proportional-integral-derivative family remains the workhorse of industrial control thanks to tunability and predictable behavior." },
            { icon: Cpu, t: "Automotive control", d: "Modern powertrain and chassis ECUs rely on layered PID, gain scheduling and model-based approaches for safety-critical loops." },
          ].map(x => <Card key={x.t} icon={x.icon} title={x.t}>{x.d}</Card>)}
        </div>
      </Section>

      <Section id="requirements" eyebrow="05 — System Requirements" title="Tooling and prerequisites">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-primary text-sm font-mono mb-3"><Wrench className="size-4" /> SOFTWARE</div>
            <ul className="space-y-2 text-sm">
              <li>MATLAB R2022a or newer</li>
              <li>Simulink</li>
              <li>Control System Toolbox</li>
              <li>Simulink Control Design (for PID Tuner)</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-primary text-sm font-mono mb-3"><BookOpen className="size-4" /> KNOWLEDGE</div>
            <ul className="space-y-2 text-sm">
              <li>Transfer functions and block diagrams</li>
              <li>Laplace transforms</li>
              <li>Closed-loop feedback control</li>
              <li>PID controller theory and tuning</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="methodology" eyebrow="06 — Methodology" title="How the system was built">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {METHODOLOGY.map((m, i) => (
            <div key={m.t} className="glass rounded-2xl p-6 group hover:ring-glow transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <m.icon className="size-5 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">STEP 0{i + 1}</span>
              </div>
              <h4 className="font-semibold mb-1.5">{m.t}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="model" eyebrow="07 — Mathematical Model" title="Generic longitudinal vehicle dynamics">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 glass rounded-2xl p-8 space-y-6">
            <Equation label="Vehicle Dynamics (Newton's 2nd law)">
              M · dv/dt + B · v = F
            </Equation>
            <Equation label="Plant Transfer Function (Laplace)">
              G(s) = 1 / (M·s + B)
            </Equation>
            <p className="text-sm text-muted-foreground">
              The controller methodology is fully generic. Specific numerical values for
              <span className="text-foreground"> M</span> and <span className="text-foreground">B</span>
              are used purely as example test cases during simulation and do not target any
              particular vehicle.
            </p>
          </div>
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <h4 className="font-semibold mb-4 text-sm font-mono text-primary">SYMBOLS</h4>
            <dl className="space-y-3 text-sm">
              {[
                ["M", "Effective vehicle mass"],
                ["B", "Lumped damping coefficient"],
                ["F", "Applied tractive force"],
                ["v", "Longitudinal velocity"],
              ].map(([s, d]) => (
                <div key={s} className="flex gap-4 border-b border-border/60 pb-2 last:border-0">
                  <span className="font-mono text-primary w-8">{s}</span>
                  <span className="text-muted-foreground">{d}</span>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section id="design" eyebrow="08 — System Design" title="Closed-loop Simulink architecture">
        <Figure src={simulinkModel.url} caption="Overall Simulink model: reference, error junction, PID controller, actuator gain, plant, feedback path with additive noise, and a step disturbance representing terrain." />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Reference Input", "Driver-set target speed"],
            ["Error Junction", "Difference between reference and measured speed"],
            ["Controller", "P / PI / PD / PID compensator"],
            ["Actuator", "Throttle gain stage (×600)"],
            ["Plant", "1 / (Ms + B) longitudinal dynamics"],
            ["Disturbance", "Step input modelling road grade"],
            ["Sensor + Noise", "Measured speed with additive noise"],
            ["Feedback Loop", "Closes the system around the controller"],
          ].map(([t, d]) => (
            <div key={t} className="glass rounded-xl p-4">
              <div className="text-xs font-mono text-primary mb-1">{t}</div>
              <div className="text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Figure src={plantSubsystem.url} caption="Plant subsystem with actuator gain, disturbance summation and first-order vehicle transfer function." />
        </div>
      </Section>

      <Section id="simulation" eyebrow="09 — Simulation Setup" title="Tuning and test conditions">
        <Figure src={pidTuner.url} caption="Continuous-time PID controller in parallel form, tuned via Simulink PID Tuner." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h4 className="font-semibold mb-3">Tuned PID Parameters</h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-mono">
              {[["P", "0.3395"], ["I", "0.01534"], ["D", "0.7035"], ["N", "0.1947"]].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-surface-elevated/60 p-3">
                  <div className="text-xs text-muted-foreground">{k}</div>
                  <div className="text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <h4 className="font-semibold mb-3">Test Conditions</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Continuous-time simulation, 0–700 s</li>
              <li>Reference step from 0 to target speed</li>
              <li>Step disturbance applied mid-simulation</li>
              <li>Sensor noise injected on feedback path</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="results" eyebrow="10 — Results & Analysis" title="Step response and disturbance rejection">
        <div className="grid gap-8 lg:grid-cols-2">
          <Figure src={stepResponse.url} caption="Closed-loop step response (kph) with PID controller. Rise time, overshoot and recovery after disturbance are visible." />
          <Figure src={disturbanceResponse.url} caption="Velocity in m/s — controller recovers smoothly after the injected terrain disturbance." />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Rise Time", "How fast the vehicle reaches target speed"],
            ["Overshoot", "Peak excess above the reference"],
            ["Settling Time", "Time to remain within tolerance band"],
            ["Steady-state Error", "Long-term tracking offset"],
            ["Disturbance Rejection", "Recovery after grade change"],
          ].map(([t, d]) => (
            <div key={t} className="glass rounded-xl p-4">
              <Activity className="size-4 text-primary mb-2" />
              <div className="text-sm font-semibold">{t}</div>
              <div className="text-xs text-muted-foreground mt-1">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="comparison" eyebrow="11 — Controller Comparison" title="P vs PI vs PD vs PID">
        <Figure src={controllerComparison.url} caption="Step response of all four controllers against the same plant — PI and PID reach the reference; P and PD plateau below it due to steady-state error." />

        <div className="mt-8 overflow-hidden rounded-2xl glass">
          <table className="w-full text-sm">
            <thead className="bg-surface-elevated/70">
              <tr className="text-left font-mono text-xs text-muted-foreground">
                <th className="p-4">Controller</th>
                <th className="p-4">Rise Time (s)</th>
                <th className="p-4">Overshoot (%)</th>
                <th className="p-4">Settling Time (s)</th>
                <th className="p-4">SSE</th>
              </tr>
            </thead>
            <tbody>
              {RESULTS.map(r => (
                <tr key={r.c} className="border-t border-border/60">
                  <td className="p-4 font-mono text-primary">{r.c}</td>
                  <td className="p-4">{r.rt}</td>
                  <td className="p-4">{r.os}</td>
                  <td className="p-4">{r.st}</td>
                  <td className="p-4">
                    {r.sse === "0" ? (
                      <span className="inline-flex items-center gap-1 text-[color:var(--success)]">
                        <CheckCircle2 className="size-3.5" /> 0
                      </span>
                    ) : r.sse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Insight tone="warn" title="Why P & PD leave steady-state error">
            The plant is type-0 (no free integrator). Pure proportional or PD action cannot
            generate the constant force required to fully cancel a constant disturbance, so
            a residual speed offset remains.
          </Insight>
          <Insight tone="ok" title="Why PI eliminates SSE">
            The integral term accumulates error over time and drives it to zero, producing
            the constant control effort needed to counter constant disturbances.
          </Insight>
          <Insight tone="warn" title="Why PID adds limited benefit">
            For a first-order plant the derivative term contributes little to stability and
            amplifies sensor noise — settling time actually worsens slightly versus PI.
          </Insight>
          <Insight tone="ok" title="Recommended controller: PI">
            PI delivers zero steady-state error, the fastest rise time, and clean
            disturbance rejection without unnecessary derivative noise sensitivity.
          </Insight>
        </div>
      </Section>

      <Section id="scope" eyebrow="12 — Advantages, Limits & Future" title="Project scope">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ListCard icon={CheckCircle2} title="Advantages" tone="ok" items={ADVANTAGES} />
          <ListCard icon={AlertTriangle} title="Limitations" tone="warn" items={LIMITATIONS} />
          <ListCard icon={Layers} title="Applications" tone="primary" items={APPLICATIONS} />
        </div>
        <div className="mt-8 glass rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-5">
            <Rocket className="size-5 text-primary" />
            <h3 className="text-xl font-semibold">Future Scope</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE.map(f => (
              <div key={f} className="rounded-xl border border-border/60 bg-surface-elevated/40 p-4 text-sm">
                {f}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="appendix" eyebrow="13 — Appendix & References" title="Supporting material">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FlaskConical className="size-4 text-primary" /> Appendix — MATLAB Snippet
            </h4>
<pre className="text-xs font-mono leading-relaxed bg-background/60 border border-border rounded-lg p-4 overflow-x-auto"><code>{`% Generic vehicle plant
M = 2000;   % example mass [kg]
B = 35;     % example damping [N·s/m]
s = tf('s');
G = 1/(M*s + B);

% Closed-loop controllers
Kp = 0.3395; Ki = 0.01534; Kd = 0.7035;
C_P   = pid(Kp);
C_PI  = pid(Kp, Ki);
C_PD  = pid(Kp, 0, Kd);
C_PID = pid(Kp, Ki, Kd);

T = {feedback(C_P*G,1), feedback(C_PI*G,1), ...
     feedback(C_PD*G,1), feedback(C_PID*G,1)};
step(T{:}); legend P PI PD PID
title('Cruise Control Comparison')`}</code></pre>
          </div>
          <div className="glass rounded-2xl p-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="size-4 text-primary" /> References (IEEE)
            </h4>
            <ol className="space-y-3 text-xs text-muted-foreground list-decimal pl-4">
              {REFERENCES.map(r => <li key={r}>{r}</li>)}
            </ol>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

/* ---------- building blocks ---------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Gauge className="size-4" />
          </span>
          <span>cruise_control.sim</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-xs font-mono text-muted-foreground">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-surface-elevated transition">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="https://github.com" target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-surface-elevated transition">
          <Github className="size-3.5" /> Repo
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-mono text-muted-foreground">
          <span className="size-1.5 rounded-full bg-[color:var(--success)] animate-pulse" />
          CONTROL SYSTEMS · MINI-PROJECT
        </div>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight max-w-4xl">
          <span className="text-gradient">Design & Simulation</span> of an Automotive Cruise Control System
          <span className="text-muted-foreground"> using MATLAB Simulink.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          A generic, vehicle-agnostic study of closed-loop longitudinal speed control —
          transfer-function modeling, PID tuning, disturbance rejection, and a head-to-head
          benchmark of P, PI, PD and PID controllers.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/cruise_control_report.md" download
             className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 ring-glow transition">
            <Download className="size-4" /> Download Report
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium hover:bg-surface-elevated transition">
            <Github className="size-4" /> GitHub Repository
          </a>
          <a href="#results"
             className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition">
            See results <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map(a => (
            <div key={a.v} className="glass rounded-xl p-4">
              <div className="font-mono text-2xl text-primary">{a.k}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TECH.map(t => (
            <span key={t} className="text-xs font-mono rounded-md border border-border bg-surface/60 px-2.5 py-1 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-20 border-t border-border/60 scroll-mt-20">
      <div className="mb-10">
        <div className="font-mono text-xs text-primary mb-3">{eyebrow}</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <Icon className="size-5 text-primary mb-4" />
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function Equation({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-xs text-primary mb-2">{label}</div>
      <div className="rounded-xl border border-border bg-background/50 px-5 py-4 font-mono text-base md:text-lg text-foreground">
        {children}
      </div>
    </div>
  );
}

function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="glass rounded-2xl p-3 sm:p-4 overflow-hidden">
      <div className="rounded-xl overflow-hidden bg-white">
        <img src={src} alt={caption} className="w-full h-auto block" loading="lazy" />
      </div>
      <figcaption className="text-xs text-muted-foreground mt-3 px-2">{caption}</figcaption>
    </figure>
  );
}

function Insight({ tone, title, children }: { tone: "ok" | "warn"; title: string; children: React.ReactNode }) {
  const Icon = tone === "ok" ? CheckCircle2 : AlertTriangle;
  const color = tone === "ok" ? "text-[color:var(--success)]" : "text-[color:var(--warning)]";
  return (
    <div className="glass rounded-2xl p-6">
      <div className={`flex items-center gap-2 mb-2 ${color}`}>
        <Icon className="size-4" />
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function ListCard({ icon: Icon, title, items, tone }: { icon: any; title: string; items: string[]; tone: "ok" | "warn" | "primary" }) {
  const color = tone === "ok" ? "text-[color:var(--success)]" : tone === "warn" ? "text-[color:var(--warning)]" : "text-primary";
  return (
    <div className="glass rounded-2xl p-6">
      <div className={`flex items-center gap-2 mb-4 ${color}`}>
        <Icon className="size-4" />
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map(i => (
          <li key={i} className="flex gap-2"><span className={`mt-1.5 size-1 rounded-full bg-current ${color}`} />{i}</li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-2">
          <Target className="size-4 text-primary" />
          <span>cruise_control.sim · Control Systems Mini-Project</span>
        </div>
        <div>Built with MATLAB · Simulink · Control System Toolbox</div>
      </div>
    </footer>
  );
}
