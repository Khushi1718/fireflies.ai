# AI / Vibe Coding Rules

## Goal
Use AI heavily for speed while keeping full understanding of submitted code.

## Rule 1 — Architecture First
Do not ask an AI coding agent to "build the whole Fireflies clone" in one prompt.

First lock:
1. schema
2. API contract
3. folder architecture
4. data flow
5. UI routes

## Rule 2 — Small Tasks
Give AI one bounded task at a time:
- model
- schema
- repository
- service
- route
- component
- test

## Rule 3 — Never Accept Unknown Code
For every generated module, understand:
- inputs
- outputs
- dependencies
- state
- error handling
- database interaction

## Rule 4 — No Architecture Drift
AI must not silently:
- change API response shape
- rename database fields
- introduce Redux
- introduce another ORM
- change REST to GraphQL
- create microservices
- add unnecessary dependencies

## Rule 5 — Test After Each Vertical Slice
Recommended slices:
1. meeting list API + UI
2. meeting detail API + UI
3. transcript + player synchronization
4. transcript search
5. action items
6. create/edit/delete
7. polish

## Rule 6 — Keep Dependencies Minimal
Before installing a package, ask:
- Is it necessary?
- Can native/browser/FastAPI functionality handle it?
- Does it increase deployment risk?

## Rule 7 — Security Basics
Never:
- commit API keys
- hard-code secrets
- trust raw uploaded content
- construct unsafe SQL
- expose internal stack traces to users

## Rule 8 — Interview Understanding
Be able to explain:
- request lifecycle
- REST endpoint design
- SQL relationships
- ORM
- Pydantic vs SQLAlchemy
- service/repository separation
- transcript synchronization
- search implementation
- deployment architecture
- production scaling trade-offs

## Recommended AI Prompt Pattern

```text
Context:
[existing architecture]

Task:
[one bounded task]

Constraints:
[files allowed to change]
[API contract]
[database schema]

Requirements:
[functional behavior]

Do not:
[architecture changes]

After implementation:
1. summarize files changed
2. explain key decisions
3. list edge cases
4. provide tests
```
