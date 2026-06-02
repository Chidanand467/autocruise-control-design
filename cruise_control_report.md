# Design and Simulation of an Automotive Cruise Control System Using MATLAB Simulink

## Abstract
This report presents the design, modeling, simulation, and comparative analysis of an
automotive cruise control system using MATLAB / Simulink. A generic first-order
longitudinal vehicle model is regulated by P, PI, PD, and PID controllers, and the
closed-loop performance is evaluated against rise time, overshoot, settling time,
steady-state error, and disturbance rejection.

## 1. Introduction
Cruise control automatically maintains a driver-selected speed by modulating throttle
effort through a closed-loop feedback controller. It improves comfort, fuel economy,
and safety on highways and forms the foundation for ADAS and autonomous driving.

## 2. Problem Statement
A passenger vehicle must hold a target speed despite road slopes, payload variation,
aerodynamic drag, and sensor noise. A pure open-loop throttle map cannot reject these
disturbances; feedback control is required.

## 3. Objectives
- Derive a generic longitudinal transfer function for a passenger vehicle.
- Implement closed-loop cruise control in Simulink.
- Tune and compare P, PI, PD, PID controllers.
- Inject terrain disturbance and quantify rejection.
- Recommend a controller based on time-domain metrics.

## 4. Mathematical Model
Vehicle longitudinal dynamics:  M (dv/dt) + B v = F
Plant transfer function:        G(s) = 1 / (M s + B)
where M is effective mass, B is damping (drag + rolling), F is tractive force.
The methodology is vehicle-agnostic; example test parameters M = 2000, B = 35
are used purely for simulation.

## 5. System Design
Reference -> Error -> Controller -> Actuator (gain 600) -> Plant 1/(2000s+35)
-> measured speed -> feedback (with additive noise) -> Error.
A step disturbance models an uphill grade.

## 6. PID Tuning
PID parameters obtained via Simulink PID Tuner (parallel form, continuous-time):
P = 0.3395, I = 0.01534, D = 0.7035, N = 0.1947.

## 7. Results
| Controller | Rise Time | Overshoot | Settling Time | SSE   |
|------------|-----------|-----------|---------------|-------|
| P          | 18.38     | 0         | 32.74         | 0.146 |
| PI         | 14.59     | 9.05      | 74.40         | 0     |
| PD         | 21.02     | 0         | 37.33         | 0.146 |
| PID        | 17.53     | 8.54      | 79.40         | 0     |

## 8. Discussion
P and PD leave a steady-state error because the plant is type-0. PI eliminates SSE
through the integral action. PID adds limited benefit for this first-order plant and
introduces noise sensitivity through the derivative term. PI is therefore the
recommended controller for this application.

## 9. Conclusion
A generic, well-tuned PI controller delivers fast tracking, zero steady-state error,
and acceptable disturbance rejection for automotive cruise control. The framework
extends naturally to adaptive cruise control and model predictive control.

## References
[1] K. Ogata, Modern Control Engineering, 5th ed., Pearson, 2010.
[2] G. F. Franklin et al., Feedback Control of Dynamic Systems, 8th ed., Pearson, 2019.
[3] R. Rajamani, Vehicle Dynamics and Control, 2nd ed., Springer, 2012.
[4] MathWorks, Simulink Control Design Documentation.
