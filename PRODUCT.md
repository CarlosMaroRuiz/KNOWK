# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Spanish-speaking English learners studying on their own, without a teacher. They choose a CEFR level, pick a module, practice, and get immediate feedback.

- Absolute beginners (A1)
- Intermediate learners consolidating grammar and vocabulary (A2–B1)
- Upper-intermediate learners aiming for grammatical precision and fluency (B2)
- People preparing for exams such as TOEFL ITP who want a complementary practice tool

## Product Purpose

A web app for learning English autonomously, progressively, and measurably, organized by CEFR levels A1–A2–B1–B2.

It started as a TOEFL ITP prep tool and is becoming a broader language-learning platform. Grammar is the primary focus. Success means the learner knows their level and module, practices with corrections they understand, and can advance through CEFR stages.

## Positioning

Structured, grammar-first self-study with immediate explanations, CEFR-leveled content, and a documented modular architecture (no black-box behavior). TOEFL ITP is a preserved but secondary module, not the center of the product.

## Operating Context

Typical loop: choose CEFR level → choose a module (grammar, vocabulary, practice, etc.) → study a lesson or complete exercises → receive correction and explanation → progress and repeat.

Content is static JSON under `public/api/`, edited through Content Manager (import, export, edit) without changing code. Dark and light themes are part of the shipped web experience. The app is a browser SPA with no install step.

## Capabilities and Constraints

Shipped or in active use:

- Grammar Review (primary): theoretical lessons and mini-quizzes by topic and level
- Sentence Structure
- Error Spotting
- Vocabulary Builder (academic flashcards with phonetics and synonyms)
- Resources / study guides
- TOEFL ITP mock exam and section practice, kept as an independent module
- Game Arena (impostor-word game)
- Content Manager and Admin panel (authenticated) for JSON in `public/api/`

Planned or incomplete (do not present as finished):

- Writing (in progress)
- Listening (future)
- A1 catalog content is a product goal; the current catalog still withholds A1 until `a1.json` exists
- Additional modules may be added later (Speaking, Pronunciation, spaced-repetition flashcards, placement test, etc.) following the same feature architecture

Technical: Angular SPA; practice modules are CEFR-leveled; TOEFL simulation uses a timer and 31–68 scoring. UI chrome is largely Spanish; learning content is English.

## Brand Commitments

Working name: ToeflExam. Product language in the interface: Spanish for orientation and module discovery (“Domina el inglés a tu ritmo”). Learning items and exam material stay in English. Visual identity is not defined in this file.

## Evidence on Hand

Real lesson, quiz, and exam data live as static JSON in `public/api/`. Hero study imagery exists at `img/eng.webp`. There are no confirmed testimonials, customer quotes, conversion metrics, or third-party endorsements; future work must not invent them.

## Product Principles

- Grammar-first, CEFR-leveled progression from A1 to B2
- Active practice with immediate, explained feedback
- Progress must be visible: level, module, and measurable results
- Self-serve: no teacher required to start or continue
- Modular and inspectable: new areas follow the same documented architecture; TOEFL stays complementary
