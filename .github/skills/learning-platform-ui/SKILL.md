---
name: learning-platform-ui
description: 'Create elegant static learning platform UIs with minimal design. Use when: building web interfaces for educational content, creating course pages, designing tutorial layouts. Specializes in: Ubuntu-style typography, indigo color schemes (2-3 colors max), strategic web component integration, preserving existing learning content while enhancing presentation.'
argument-hint: 'Describe the learning content or page section to create'
---

# Learning Platform UI Builder

Creates elegant, minimal static web interfaces for educational content with strategic component integration and refined typography.

## Design Principles

1. **Typography First**: Ubuntu-style fonts (Ubuntu, system-ui fallbacks), clear hierarchy, generous line-height (1.6-1.8)
2. **Minimal Color Palette**: 2-3 indigo shades maximum, monotonous and calming
3. **Strategic Components**: Each component serves a purpose, no decorative clutter
4. **Content Preservation**: Build on existing content structure, never modify learning material
5. **Progressive Enhancement**: Start with semantic HTML, layer CSS, add interactivity only where beneficial

## Color System

Use the indigo-based palette from [platform/references/colors.md](../../../platform/references/colors.md):

- **Primary**: Indigo shades for emphasis and interactive elements
- **Neutral**: Grays for text and backgrounds
- **Maximum 2-3 colors** across the entire interface

## Typography Scale

Refer to [platform/references/typography.md](../../../platform/references/typography.md) for the complete system:

- Base font: 16-18px
- Scale ratio: 1.25 (Major Third) or 1.333 (Perfect Fourth)
- Font stack: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui
- Line height: 1.6 for body, 1.2-1.3 for headings

## Component Library

Core components for learning platforms (see [platform/references/components.md](../../../platform/references/components.md)):

- **Exercise Cards**: Practice problems with collapsible solutions
- **Code Blocks**: Syntax-highlighted SQL/code with copy button
- **Progress Tracker**: Visual breadcrumbs or progress indicators
- **Content Sections**: Chapters, topics with clear hierarchy
- **Navigation**: Simple, unobtrusive menu/sidebar

## Procedure

### 1. Analyze Existing Content

- Read all relevant `.md` files in the learning content
- Identify content structure: sections, exercises, code examples
- Note relationships between topics/modules
- **Never modify the learning content itself**

### 2. Plan Information Architecture

- Map content hierarchy (e.g., roadmap → sections → exercises → solutions)
- Determine navigation pattern (sidebar, tabs, accordion, sequential)
- Identify where interactive components add value

### 3. Create HTML Structure

- Start with semantic HTML5 (`<main>`, `<article>`, `<section>`, `<nav>`)
- Use `<details>`/`<summary>` for expandable content (solutions, hints)
- Include proper heading hierarchy (`h1` → `h2` → `h3`)
- Add `data-*` attributes for enhancement hooks

### 4. Apply Minimal Styling

- Link to [typography system](../../../platform/references/typography.md) stylesheet or inline critical CSS
- Apply [color palette](../../../platform/references/colors.md) consistently
- Use CSS Grid/Flexbox for layout
- Ensure responsive design with mobile-first approach
- Keep total CSS under 500 lines if possible

### 5. Enhance with Web Components

- Code syntax highlighting (e.g., Prism.js, Highlight.js)
- Copy-to-clipboard for code examples
- Exercise solution toggles (can use native `<details>` first)
- SQL query testers (integrate SQL.js if needed)
- Keep JavaScript minimal and progressive

### 6. Test & Refine

- Verify content accuracy preserved
- Check typography rhythm and readability
- Ensure color contrast meets WCAG AA (4.5:1 for text)
- Test on mobile viewport
- Validate HTML semantics

## Example Workflow

For a SQL learning roadmap site:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SQL Learning Roadmap</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>
      /* Minimal Indigo Color System */
      :root {
        --color-primary: #4f46e5; /* Indigo 600 */
        --color-primary-dark: #3730a3; /* Indigo 800 */
        --color-bg: #fafafa; /* Neutral 50 */
        --color-text: #1f2937; /* Gray 800 */
        --color-text-muted: #6b7280; /* Gray 500 */
      }

      /* Typography */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          'Ubuntu',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          system-ui,
          sans-serif;
        font-size: 18px;
        line-height: 1.7;
        color: var(--color-text);
        background: var(--color-bg);
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
      }

      h1 {
        font-size: 2.369rem;
        line-height: 1.2;
        margin-bottom: 1rem;
      }
      h2 {
        font-size: 1.777rem;
        line-height: 1.25;
        margin: 2.5rem 0 1rem;
        color: var(--color-primary-dark);
      }
      h3 {
        font-size: 1.333rem;
        line-height: 1.3;
        margin: 2rem 0 0.75rem;
      }

      code {
        font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        background: rgba(79, 70, 229, 0.08);
        padding: 0.125rem 0.375rem;
        border-radius: 3px;
        font-size: 0.9em;
      }

      pre code {
        display: block;
        padding: 1rem;
        overflow-x: auto;
      }

      a {
        color: var(--color-primary);
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: border-color 0.2s;
      }

      a:hover {
        border-bottom-color: var(--color-primary);
      }
    </style>
  </head>
  <body>
    <article>
      <h1>SQL Learning Roadmap</h1>
      <!-- Content extracted from README.md -->
    </article>
  </body>
</html>
```

## When NOT to Use

- Complex web applications requiring frameworks (React, Vue, etc.)
- Dynamic server-side rendering needs
- When design system already exists (follow existing patterns instead)
- User explicitly requests different visual style

## Integration Points

- Works with SQL.js for browser-based SQL testing
- Compatible with static site generators (11ty, Hugo, Jekyll)
- Can export individual HTML pages or single-page application
- Markdown content easily converted via marked.js or similar

## Quality Checklist

Before completion, verify:

- [ ] All learning content preserved accurately
- [ ] Maximum 3 colors used throughout
- [ ] Typography scale consistent and readable
- [ ] No decorative elements that don't serve learning goals
- [ ] Mobile responsive (test at 375px width minimum)
- [ ] Semantic HTML structure
- [ ] Color contrast ratios meet accessibility standards
- [ ] Code examples properly formatted and copyable
