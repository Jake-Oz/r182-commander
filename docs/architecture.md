# R182 Commander - Technical Architecture

# Overview

R182 Commander is a scenario-driven aircraft training platform designed around the 1978 Cessna R182RG.

The system is built around a structured knowledge base rather than static lessons.

Lessons, assessments, scenarios, AI tutoring, and future voice examination capabilities are generated from the same underlying knowledge model.

---

# Design Principles

## Principle 1

Knowledge is the foundation.

Everything references Knowledge Items.

---

## Principle 2

Traceability is mandatory.

Every aircraft fact must reference a source.

---

## Principle 3

Scenarios teach command.

The application prioritises operational decision making over memorisation.

---

## Principle 4

Content and software remain separated.

Aircraft knowledge is stored as data.

Application logic consumes that data.

---

# Technology Stack

## Front End

- Next.js 15
- TypeScript
- React
- Tailwind CSS
- shadcn/ui

## Back End

- Next.js Server Actions
- Prisma ORM

## Database

- PostgreSQL

Recommended:

- Neon PostgreSQL

## Hosting

- Vercel

---

# High-Level Architecture

```text
Knowledge Base
        │
        ▼
Database
        │
        ▼
Application Services
        │
 ┌──────┼──────┐
 ▼      ▼      ▼

Lessons Scenarios Assessments
        │
        ▼
 Dashboard/UI
```

---

# Repository Structure

```text
r182-commander/

├── app/
├── components/
├── lib/
├── prisma/
├── data/
├── docs/
├── public/
└── tests/
```

---

# App Router Structure

```text
/

dashboard

aircraft

aircraft/[system]

missions

missions/[mission]

missions/[mission]/lesson/[lesson]

scenarios

scenarios/[scenario]

assessment

progress

settings

admin
```

---

# Data Architecture

All aircraft content originates from structured data.

```text
Aircraft
Mission
Lesson
Knowledge Item
Threat
Scenario
Competency
Assessment
```

Knowledge Items are the central entity.

---

# Knowledge Flow

```text
Knowledge Item
      │
      ▼

Lesson

Scenario

Assessment

AI Tutor

Voice Examiner
```

A single Knowledge Item may support multiple lessons and scenarios.

---

# State Architecture

The application maintains five independent state models.

## Aircraft State

Represents the aircraft configuration.

```text
Aircraft

Configuration

Systems
```

---

## Pilot State

Represents user progress.

```text
Commander Score

Completed Lessons

Competencies
```

---

## Mission State

Tracks curriculum progression.

```text
Locked

Available

Active

Completed
```

---

## Scenario State

Tracks current scenario execution.

```text
Context

Aircraft State

Decision History

Outcome
```

---

## Competency State

Tracks pilot capability.

```text
Knowledge

Application

Command
```

---

# Service Architecture

## Knowledge Service

Responsibilities:

- Load Knowledge Items
- Search Knowledge Items
- Retrieve source references

---

## Mission Service

Responsibilities:

- Mission progress
- Lesson progression
- Graduation criteria

---

## Scenario Service

Responsibilities:

- Execute scenarios
- Evaluate decisions
- Generate outcomes

---

## Assessment Service

Responsibilities:

- Calculate scores
- Update competencies
- Generate debriefs

---

## Competency Service

Responsibilities:

- Track progression
- Calculate commander score
- Recommend training

---

# Database Architecture

Core tables:

```text
Aircraft

Mission

Lesson

KnowledgeItem

Scenario

Threat

Competency

UserCompetency
```

Future tables:

```text
SourceReference

VoiceAssessment

InstructorReview

AircraftConfiguration
```

---

# AI Architecture

AI must never invent aircraft-specific facts.

AI responses may only use:

- Knowledge Items
- Source References
- Scenario Context

If information is unavailable:

```text
The current knowledge base does not contain
that information.
```

must be returned.

---

# Source Traceability

Every aircraft fact shall contain:

```text
Source Section

Source Page

Verification Status
```

Future support:

```text
POH

Supplement

Aircraft Configuration

Instructor Note
```

---

# Security Principles

- Private repository
- Server-side database access only
- No client-side database credentials
- All assessments stored server-side

---

# Deployment Architecture

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
PostgreSQL
```

Deployment workflow:

```text
Commit

Push

Automatic Build

Automatic Deployment
```

---

# Future Architecture

The architecture must support:

## Multi-Aircraft

Example:

```text
R182RG

C182S

C210

Bonanza
```

---

## Avionics Modules

Example:

```text
Garmin G3X

G500

Aspen
```

---

## Voice Examiner

AI oral examination.

---

## Instructor Portal

Student monitoring and assessment.

---

# Architectural Goal

The system should support a pilot progressing from:

```text
Knowledge
```

to:

```text
Aircraft Command
```

using a single, traceable, and maintainable knowledge architecture.
