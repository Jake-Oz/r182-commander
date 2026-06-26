# R182 Commander - Mission Framework

# Purpose

The Mission Framework defines how pilots progress through the curriculum.

A mission is a structured training package that develops competence in a specific aircraft domain.

Examples:

- Fuel Commander
- Landing Gear Commander
- Emergency Commander

Missions provide the primary learning experience within the application.

---

# Mission Philosophy

Traditional aviation training often focuses on:

```text
Lesson
Quiz
Lesson
Quiz
```

R182 Commander uses:

```text
Learn

Understand

Apply

Command
```

The objective is operational competence rather than information retention.

---

# Mission Structure

Every mission contains:

```text
Mission
 ├── Lessons
 ├── Knowledge Items
 ├── Practice Activities
 ├── Scenarios
 ├── Assessment
 └── Graduation Criteria
```

---

# Mission Components

## Lessons

Lessons introduce knowledge and understanding.

Purpose:

- Explain concepts
- Introduce systems
- Build understanding

Lessons should not be long.

Target:

```text
5–15 minutes
```

per lesson.

---

## Practice Activities

Practice activities reinforce learning.

Examples:

- System exploration
- Interactive diagrams
- Component identification
- Failure recognition

---

## Scenarios

Scenarios develop application and command skills.

Scenarios place the pilot in realistic operational situations.

Example:

```text
Canberra

8 NM Final

145 KIAS

Gear Up

ATC:
Maintain best speed until 5 NM
```

The pilot must make decisions.

---

## Assessments

Assessments measure competence.

Assessments are based on:

- Knowledge
- Understanding
- Application
- Command

---

## Graduation Criteria

Each mission defines minimum competence requirements.

Example:

```yaml
minimumCompetency: 3

minimumCommanderScore: 70
```

---

# Mission Lifecycle

Each mission progresses through:

```text
Locked
  ↓
Available
  ↓
Active
  ↓
Completed
```

Future enhancement:

```text
Mastered
```

---

# Mission Definition Schema

Example:

```json
{
  "code": "M05",

  "title": "Landing Gear Commander",

  "description": "Master normal and emergency landing gear operations and associated command decisions.",

  "competencies": ["C01", "C02", "C05", "C07", "C08"],

  "lessons": [],

  "scenarios": [],

  "graduationCriteria": {}
}
```

---

# Learning Progression

Every mission follows the same progression model.

## Stage 1 - Knowledge

Pilot can recognise information.

Example:

```text
VLE = 140 KIAS
```

---

## Stage 2 - Understanding

Pilot understands why it exists.

Example:

```text
Protects landing gear structure.
```

---

## Stage 3 - Application

Pilot applies knowledge correctly.

Example:

```text
Adjusts approach profile to remain below VLE.
```

---

## Stage 4 - Command

Pilot makes sound operational decisions.

Example:

```text
Manages a high-energy arrival while complying with aircraft limitations.
```

---

# Lesson Framework

Every lesson should answer:

## What is it?

## How does it work?

## Why does it matter?

## What can go wrong?

## What should the pilot do?

This structure should remain consistent throughout the application.

---

# Mission Types

## Systems Missions

Purpose:

Understand aircraft systems.

Examples:

```text
Engine Commander

Fuel Commander

Landing Gear Commander

Electrical Commander
```

---

## Operational Missions

Purpose:

Apply aircraft knowledge.

Examples:

```text
Performance Commander

Weight & Balance Commander
```

---

## Emergency Missions

Purpose:

Develop emergency management competence.

Examples:

```text
Emergency Commander
```

---

## Integrated Missions

Purpose:

Combine all competencies.

Examples:

```text
Aircraft Commander Checkride
```

---

# Commander Scenarios

Every mission must include scenarios.

Scenario objectives:

- Recognition
- Diagnosis
- Prioritisation
- Decision Making
- POH Compliance

Scenarios are the primary mechanism for developing command competence.

---

# Assessment Framework

Every assessment may include:

## Knowledge Questions

Fact-based.

---

## Oral Examination Questions

Explanation-based.

---

## Scenario Decisions

Application and command.

---

## Commander Evaluation

Judgement and prioritisation.

---

# Competency Contribution

Each mission contributes to one or more competencies.

Example:

## Landing Gear Commander

Contributes to:

```text
Aircraft Systems

Configuration Management

Emergency Management

Decision Making

Aircraft Command
```

---

# Mission Completion

Mission completion requires:

### Lesson Completion

### Assessment Completion

### Scenario Completion

### Minimum Competency Achievement

Completion is competency-driven rather than activity-driven.

---

# Mission Mastery

Future capability.

A mission is considered mastered when:

```text
Knowledge Level = 4

Application Level = 4

Command Level = 4
```

and scenario performance remains consistently high.

---

# Mission Priority

Missions should be completed in the following order:

```text
M01 Meet Your Aircraft

M02 Aircraft Limitations

M03 Engine Commander

M04 Fuel Commander

M05 Landing Gear Commander

M06 Electrical Commander

M07 Weight & Balance Commander

M08 Performance Commander

M09 Emergency Commander

M10 Aircraft Commander Checkride
```

This progression mirrors the development of a newly endorsed R182RG pilot.

---

# Mission Framework Goal

The purpose of the Mission Framework is to guide a pilot from:

```text
Knowledge of the aircraft
```

to:

```text
Confident aircraft command
```

through structured, measurable, scenario-driven learning experiences.
