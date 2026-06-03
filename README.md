# Automotive Cruise Control System — Control Systems Mini-Project

> **Course:** Control Systems  
> **Course Code:** 25EARC203  
> **By:** Chidanand S Karennavar  
> **Teammate:** Pavanashree Kamat  
> **Mentor:** Madhusudahn HK

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-GitHub%20Pages-blue?style=flat-square&logo=github)](https://chidanandkarennavar.github.io/control-systems-portfolio)
[![MATLAB](https://img.shields.io/badge/MATLAB-R2023b-orange?style=flat-square&logo=mathworks)](https://mathworks.com)
[![Simulink](https://img.shields.io/badge/Simulink-Control%20Design-blue?style=flat-square&logo=mathworks)](https://mathworks.com/products/simulink.html)

---

## Overview

This repository contains the design, simulation, and analysis of an **automotive cruise control system** using MATLAB Simulink. The project is a vehicle-agnostic study of closed-loop longitudinal speed control — we derive a generic transfer-function model, design and tune P, PI, PD, and PID controllers, and benchmark them on rise time, overshoot, settling time, steady-state error, and disturbance rejection.

**Key result:** A **PI controller** delivers zero steady-state error with the fastest rise time, making it the recommended choice for this first-order (type-0) plant class.

---

## What is Cruise Control?

Cruise control is a closed-loop longitudinal controller that automatically modulates throttle effort to hold a driver-selected vehicle speed. It reduces driver fatigue, improves fuel economy, and forms the foundation for modern ADAS features like adaptive cruise control.

---

## Mathematical Model

### Vehicle Dynamics (Newton's 2nd Law)

```
M · dv/dt + B · v = F
```

### Plant Transfer Function (Laplace Domain)

```
G(s) = 1 / (M·s + B)
```

Where:
- **M** = Effective vehicle mass (example: 2000 kg)
- **B** = Lumped damping coefficient (example: 35 N·s/m)
- **F** = Applied tractive force
- **v** = Longitudinal velocity

> The controller methodology is fully generic. Specific numerical values for M and B are used purely as example test cases during simulation and do not target any particular vehicle.

---

## Project Objectives

1. Derive a generic longitudinal vehicle model and transfer function
2. Build a closed-loop cruise control architecture in Simulink
3. Design and tune P, PI, PD, and PID controllers
4. Inject terrain disturbance and quantify rejection
5. Benchmark controllers on rise time, overshoot, settling time, and SSE
6. Recommend the most suitable controller for the plant class

---

## Methodology

| Step | Activity |
|------|----------|
| 01 | **Vehicle Dynamics Modeling** — Apply Newton's second law to longitudinal motion with damping |
| 02 | **Transfer Function Development** — Take Laplace transform to derive first-order plant G(s) = 1/(Ms + B) |
| 03 | **Controller Design** — Construct P, PI, PD, and PID compensators in parallel form |
| 04 | **Simulation Environment** — Build closed-loop Simulink model with reference, error, actuator, plant, and feedback |
| 05 | **Disturbance Injection** — Apply step terrain disturbance and additive sensor noise |
| 06 | **Performance Evaluation** — Measure rise time, overshoot, settling time, SSE, and rejection |

---

## Simulation Setup

### Tuned PID Parameters

| Parameter | Value |
|-----------|-------|
| P (Proportional) | 0.3395 |
| I (Integral) | 0.01534 |
| D (Derivative) | 0.7035 |
| N (Filter coefficient) | 0.1947 |

### Test Conditions

- Continuous-time simulation, 0–700 s
- Reference step from 0 to target speed
- Step disturbance applied mid-simulation
- Sensor noise injected on feedback path

---

## Controller Comparison Results

| Controller | Rise Time (s) | Overshoot (%) | Settling Time (s) | SSE |
|------------|---------------|---------------|-------------------|-----|
| **P** | 18.38 | 0 | 32.74 | 0.146 |
| **PI** | **14.59** | 9.05 | 74.40 | **✓ 0** |
| **PD** | 21.02 | 0 | 37.33 | 0.146 |
| **PID** | 17.53 | 8.54 | 79.40 | **✓ 0** |

### Key Insights

- **Why P & PD leave steady-state error:** The plant is type-0 (no free integrator). Pure proportional or PD action cannot generate the constant force required to fully cancel a constant disturbance.
- **Why PI eliminates SSE:** The integral term accumulates error over time and drives it to zero.
- **Why PID adds limited benefit:** For a first-order plant, the derivative term contributes little to stability and amplifies sensor noise — settling time worsens slightly versus PI.
- **Recommendation: PI controller** — delivers zero steady-state error, the fastest rise time, and clean disturbance rejection without derivative noise sensitivity.

---

## Files in this Repository

| File | Description |
|------|-------------|
| `index.html` | Standalone portfolio website (GitHub Pages ready) |
| `cruise_control_report.md` | Full technical report in Markdown |
| `images/simulink-model.png` | Overall Simulink model screenshot |
| `images/plant-subsystem.png` | Plant subsystem detail |
| `images/pid-tuner.png` | PID Tuner configuration |
| `images/step-response.png` | Closed-loop step response plot |
| `images/disturbance-response.png` | Disturbance rejection plot |
| `images/controller-comparison.png` | P vs PI vs PD vs PID comparison |

---

## MATLAB Snippet

```matlab
% Generic vehicle plant
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
title('Cruise Control Comparison')
```

---

## References (IEEE Style)

1. K. Ogata, *Modern Control Engineering*, 5th ed. Pearson, 2010.
2. G. F. Franklin, J. D. Powell and A. Emami-Naeini, *Feedback Control of Dynamic Systems*, 8th ed. Pearson, 2019.
3. R. Rajamani, *Vehicle Dynamics and Control*, 2nd ed. Springer, 2012.
4. MathWorks, "PID Controller Tuning in Simulink," Simulink Control Design Documentation.
5. Å. Aström and T. Hägglund, *Advanced PID Control*, ISA, 2006.

---

## Future Scope

- Adaptive Cruise Control with radar-based headway
- Model Predictive Control for constraint handling
- Full state-space and observer-based design
- Nonlinear vehicle dynamics with tire and grade models
- Sensor fusion with IMU + GPS + wheel speed
- AI-assisted longitudinal control policies

---

## Connect

- **LinkedIn:** [Chidanand S Karennavar](https://www.linkedin.com/in/chidanand-s-karennavar-096b21332)
- **Email:** [chidanandkarennavar36@gmail.com](mailto:chidanandkarennavar36@gmail.com)
- **GitHub:** [@chidanandkarennavar](https://github.com/chidanandkarennavar)

---

*Built with MATLAB · Simulink · Control System Toolbox*
