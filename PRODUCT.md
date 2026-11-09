# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: React and Vite for a static, GitHub Pages-compatible SPA; no backend or runtime data services.

## Users

People with diabetes or caregivers exploring how a hypothetical emergency card could separate public and private information; people who scan a demonstration QR code; and facilitators observing usability without identifying participants.

## Product Purpose

Provide a public, synthetic-only prototype to evaluate whether people understand which parts of a hypothetical emergency card would be public or private, and whether they recognize simulated updates and withdrawal as non-operational.

## Positioning

This is an isolated demonstration for validating comprehension before any operational service is considered. Its public view and QR code use only generic demonstration content; simulated changes exist only in the current browser session.

## Operating Context

The prototype is opened on mobile or desktop during facilitated usability sessions. Participants may have low digital familiarity, and the emergency-view scenario is intentionally evaluated under time pressure. The prototype is hosted independently on GitHub Pages.

## Capabilities and Constraints

- Uses only predefined synthetic content and choices; no free-text entry, uploads, authentication, backend, database, or persistence.
- Shows public/private labels, a public emergency view, a generic QR code, and in-memory update and withdrawal simulations.
- A facilitator can record only predefined observations in temporary in-memory state, without participant identifiers or free text.
- No clinical advice, diagnosis, treatment instructions, real emergency service, or effective access revocation.
- The existing website, repository, deployment, URL, and QR codes are outside scope and must remain unchanged.
- Product facts in this record are derived from the approved PRD and SDD because the user was unavailable for a separate interview; no additional product claims are assumed.

## Evidence on Hand

- Product requirements: `./_reversa_sdd/prd.md`
- Feature specifications: `./_reversa_sdd/sdd/`
- Facilitator onboarding: `./_reversa_forward/001-validar-prototipo-emergencia/onboarding.md`
- No real patient data, operational service, brand assets, or existing application UI are available or permitted.

## Product Principles

- Make public and private information distinguishable before any simulated action.
- Make the demonstration status and its non-operational limits persistently clear.
- Use synthetic, predefined content only.
- Keep observation non-identifying and ephemeral.
- Isolate the prototype from the existing website and its deployment.

## Accessibility & Inclusion

Prioritize mobile usability, clear language, visible labels, and low-complexity interactions for people with low digital familiarity and for emergency-view scenarios evaluated under stress. The QR code must have a readable text URL alternative.
