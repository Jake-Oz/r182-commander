# R182 Commander - Knowledge Model

# Purpose

The Knowledge Model is the foundation of the entire application.

Everything in R182 Commander is built from Knowledge Items.

The following components are generated from Knowledge Items:

- Lessons
- Flash Cards
- Assessments
- Oral Examination Questions
- Scenarios
- AI Tutor Responses
- Competency Scoring

The Knowledge Model is therefore the single source of truth for the platform.

---

# Design Philosophy

Traditional training systems are lesson-centric.

R182 Commander is knowledge-centric.

Instead of:

```text
Lesson
  └── Quiz
```

the system uses:

```text
Knowledge Item
     │
 ┌───┼────┬─────┐
 ▼   ▼    ▼     ▼

Lesson Scenario Quiz AI Tutor
```

This prevents duplication and improves maintainability.

---

# Knowledge Item Lifecycle

Every Knowledge Item progresses through:

```text
Draft
  ↓
Extracted
  ↓
Verified
  ↓
Commander Enhanced
```

Only Verified items may be used in:

- Assessments
- AI Tutor Responses
- Competency Evaluation
- Commander Scenarios

---

# Knowledge Item Structure

Each Knowledge Item contains:

```yaml
code:
title:

knowledge:
understanding:
application:
command:

memoryRequired:
referenceRequired:

criticality:

operationalFrequency:

source:

verification:
```

---

# Core Knowledge Framework

Every item is structured into four learning layers.

## Knowledge

What is it?

Example:

```text
VLE = 140 KIAS
```

---

## Understanding

Why does it exist?

Example:

```text
Protects the landing gear structure from excessive loads.
```

---

## Application

When does it matter?

Example:

```text
Approach and descent planning.
```

---

## Command

What decision is required?

Example:

```text
ATC requests 160 knots until 5 NM.
How will you safely configure the aircraft?
```

---

# Knowledge Item Schema

Example:

```json
{
  "code": "LIM-003",

  "title": "Maximum Landing Gear Extended Speed",

  "category": "Limitation",

  "knowledge": "Maximum speed with landing gear extended.",

  "understanding": "Protects gear structure from excessive loads.",

  "application": "Used during descent and approach planning.",

  "command": "ATC requests 160 knots until 5 NM. How do you safely configure the aircraft?",

  "memoryRequired": true,

  "referenceRequired": false,

  "criticality": "High",

  "operationalFrequency": "Every Flight"
}
```

---

# Categories

Every Knowledge Item belongs to a category.

## Limitation

Examples:

```text
VNE

VNO

VLO

VLE
```

---

## Procedure

Examples:

```text
Normal Extension

Emergency Extension

Engine Restart
```

---

## System

Examples:

```text
Fuel System

Electrical System

Landing Gear System
```

---

## Performance

Examples:

```text
Takeoff Distance

Climb Performance

Landing Distance
```

---

## Emergency

Examples:

```text
Engine Failure

Electrical Failure

Gear Failure
```

---

# Criticality

Every item receives a criticality level.

## Low

Useful knowledge.

---

## Medium

Frequently used operational knowledge.

---

## High

Important operational knowledge.

---

## Critical

Safety-critical knowledge.

Examples:

```text
VNE

Engine Failure After Takeoff

Emergency Extension
```

---

# Operational Frequency

Knowledge should be prioritised according to use.

Allowed values:

```text
Every Flight

Frequent

Occasional

Rare

Emergency Only
```

Examples:

```text
VLE
  Every Flight

Emergency Gear Extension
  Emergency Only
```

---

# Memory vs Reference

The system distinguishes between:

## Memory Required

The pilot should know it.

Examples:

```text
VNE

VLO

VLE

Fuel Selector Usage
```

---

## Reference Required

The pilot should consult the POH.

Examples:

```text
Takeoff Distance

Landing Distance

Weight & Balance Envelope
```

---

# Source Model

Every Knowledge Item requires a source.

```yaml
source:
  section:
  page:
  sourceType:
```

---

# Source Types

## POH

Primary source.

---

## Supplement

Aircraft supplement.

---

## Aircraft Configuration

Aircraft-specific modification.

Example:

```text
88 US gallon usable fuel
```

---

## Instructor Note

Future capability.

---

# Verification Model

Every item requires verification.

```yaml
verification:
  status:
  verifiedBy:
  verifiedDate:
```

---

# Verification Status Values

```text
Draft

Extracted

Verified

Deprecated
```

Only Verified items may be used for assessment.

---

# Threat Links

Every Knowledge Item may link to threats.

Example:

```text
LIM-003

VLE
```

Linked threats:

```text
High Energy Arrival
```

---

# Competency Links

Every Knowledge Item contributes to one or more competencies.

Example:

```text
VLE

Configuration Management

Aircraft Command
```

---

# Scenario Links

Knowledge Items are reusable.

Example:

```text
VLE
```

Supports:

```text
Lesson

Quiz

Scenario

Oral Exam

AI Tutor
```

simultaneously.

---

# Commander Enhancement

The final stage of content development is Commander Enhancement.

Every verified item should answer:

## What is it?

## Why does it matter?

## What can go wrong?

## What decision does the pilot need to make?

This transforms information into operational competence.

---

# Knowledge Model Goal

The objective of the Knowledge Model is to transform:

```text
Aircraft Facts
```

into:

```text
Aircraft Command Capability
```

through a structured, traceable, reusable, and verifiable content architecture.
