# Project Rules — Networking 1 Classroom

## Scope Clarification Before Editing
- **Always confirm single-slide vs. all-topics scope:** Whenever a prompt requests a UI/UX, layout, control, styling, content-pattern, or structural change while referencing a specific slide, topic, or screenshot, **always ask before editing** whether the change should apply:
  1. **Only** to that specific slide, simulation, or topic, or
  2. **Across all** matching slides, simulations, or topics in the curriculum.
- Never assume a slide-specific prompt is isolated when similar patterns exist elsewhere across the 14 topics (e.g., removing `.callout` banners, streamlining simulation playback controls, or converting tall single-column slides into multi-column grids).

## Stack & Commands (Windows PowerShell)
- **Tech stack:** Vanilla ES Modules (`src/`), Vite 8 (`vite.config.js`), Tailwind CSS 4 + `src/styles/main.css`, Lucide (`lucide`), self-hosted `@fontsource/inter`, Vitest + JSDOM. No client UI framework (React/Vue).
- **Shell invocations:** Always invoke `npm.cmd` and `npx.cmd` instead of `npm` / `npx` in PowerShell (host execution policy blocks `.ps1` wrappers).
- **Verification:** Run `npm.cmd test` (all 29 Vitest files) and `npm.cmd run build` after changes. Targeted checks can use `npx.cmd vitest run <test-file>`.
- **Line endings:** Preserve each file's existing line ending style (`CRLF` in most `src/` and `tests/` files; `LF` in some test files).

## Curriculum & Topic Pipeline
- `topics` in `src/topics/topicRegistry.js` registers **14 topics** and processes every topic through:
  `withAdditionalDemo` → `withVisualExamples` → `sequenceTopic` → `clarifyTopic` → `expandLessonTerms`.
- **Permanent IDs:** Topic `id` strings are permanent hash-route (`#/topic/<id>/slide/<n>`) and `localStorage` keys (`networking1-v1`). Never rename IDs; curriculum numbering (`topic.number`) is derived from array order in `topicRegistry.js`.
- **Slide structure:** Preserve **Learning Objectives** (`kind: 'objectives'`) at slide 2 and **Summary of the Discussion** (`kind: 'summary'`) as the final slide. `tests/counts.test.js`, `tests/sequenceTopics.test.js`, and `tests/app.test.js` enforce counts, adjacency, and clean DOM invariants.
- **No assessment UI:** Keep presentations strictly instructional—no quizzes, score counters, student checklists, completion gates, `footnote` properties, static takeaway `.callout` banners, or `.notes-panel` UI.

## Navigation, Layout & Scaling
- **Topic-to-topic flow:** Final slides of intermediate topics render a primary `"Next topic"` link (`#/topic/<nextTopic.id>/slide/1`), and `ArrowRight` / `Space` advances across topics (`src/app.js`). Only the final topic shows `"Back to Topics"` (`#/`). Keep the header's quiet `"Back to Topics"` link available.
- **Viewport fit (`src/components/fitSlide.js`):** Presentation slides inside `.slide-stage` use `fitSlide` (`frameWidth` min `1280px`; disabled below `768px`) to scale `.slide-body` uniformly from top-left (`transform-origin: top left`). Avoid tall single-column stacks on desktop simulation slides—use multi-column grids (`grid-template-columns`) and compact controls so content height stays within the viewport (`scale(1)`) without shrinking away from the right edge.
- **Keyboard routing (`src/router.js`):** Use `shouldHandleKey` so text inputs/selects stay protected, `ArrowLeft`/`ArrowRight` navigate slides even on focused buttons/links, and `Space` does not hijack focused buttons.

## Simulations, UI Helpers & Persistence
- **Simulation lifecycle (`src/simulations/index.js`):** Every simulation mount receives `(container, slide)` and **must** return a cleanup function that cancels intervals, timers, and animation frames on slide navigation. Timed scenes should use `createStepPlayback` (`src/simulations/playback.js`) and reserve stage height via `src/components/simulationSpace.js`.
- **HTML & UI helpers (`src/components/ui.js`):** Always escape dynamic strings with `esc()` and build controls via `select()`, `input()`, `button()`, `wire()`, and `read()` so labels match `id`/`for` attributes. Avoid bare text-string HTML injection.
- **Non-destructive progress (`src/utils/progress.js`):** Read/write `localStorage` under `networking1-v1` without deleting unknown/legacy fields (`resetProgress()` resets only `lastTopic` and `slide` indices).
