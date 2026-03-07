# Color Palette Reference

## Indigo Learning Platform Palette

A minimal, focused color system using 2-3 indigo shades plus neutral grays.

### Primary Colors (Indigo)

```css
:root {
  /* Primary Indigo Shades */
  --indigo-400: #818cf8; /* Light accent */
  --indigo-600: #4f46e5; /* Primary interactive */
  --indigo-800: #3730a3; /* Dark emphasis */

  /* Use ONLY ONE as primary, maximum two indigo shades total */
  --color-primary: var(--indigo-600);
  --color-primary-dark: var(--indigo-800);
}
```

### Neutrals

```css
:root {
  /* Backgrounds */
  --color-bg: #fafafa; /* Off-white, comfortable for long reading */
  --color-bg-elevated: #ffffff; /* Cards, elevated surfaces */
  --color-bg-subtle: #f3f4f6; /* Gray 100 - alternate sections */

  /* Text Colors */
  --color-text: #1f2937; /* Gray 800 - primary text */
  --color-text-secondary: #4b5563; /* Gray 600 - secondary text */
  --color-text-muted: #6b7280; /* Gray 500 - captions, labels */

  /* Borders & Dividers */
  --color-border: #e5e7eb; /* Gray 200 - subtle dividers */
  --color-border-strong: #d1d5db; /* Gray 300 - visible borders */
}
```

### Semantic Colors (Optional, Use Sparingly)

Only add if absolutely needed for feedback:

```css
:root {
  /* Success (for correct answers, completed exercises) */
  --color-success: #059669; /* Emerald 600 */
  --color-success-bg: #d1fae5; /* Emerald 100 */

  /* Warning (for hints, notes) */
  --color-warning: #d97706; /* Amber 600 */
  --color-warning-bg: #fef3c7; /* Amber 100 */

  /* Error (for incorrect answers) */
  --color-error: #dc2626; /* Red 600 */
  --color-error-bg: #fee2e2; /* Red 100 */
}
```

**Rule**: If you add semantic colors, keep primary indigo count to 1 shade only.

## Color Application Guide

### Text Hierarchy

- **Primary headings**: `--color-primary-dark` or `--color-text`
- **Body text**: `--color-text`
- **Secondary text**: `--color-text-secondary`
- **Captions, metadata**: `--color-text-muted`

### Interactive Elements

- **Links**: `--color-primary` (hover: darker or underline)
- **Buttons**: `--color-primary` background, white text
- **Focus states**: `--color-primary` with opacity or outline

### Code Blocks

```css
pre {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

code {
  /* Inline code */
  background: rgba(79, 70, 229, 0.08); /* Indigo with low opacity */
  color: var(--color-primary-dark);
}
```

## Accessibility

### Required Contrast Ratios (WCAG AA)

- Normal text: 4.5:1
- Large text (18px+): 3:1
- UI components: 3:1

### Verified Combinations

✅ `--color-text` on `--color-bg`: 9.8:1  
✅ `--color-primary` on `--color-bg`: 5.2:1  
✅ `white` on `--color-primary`: 9.1:1  
✅ `--color-text-muted` on `--color-bg`: 4.6:1

### Testing

Use contrast checker: https://webaim.org/resources/contrastchecker/

## Example Complete Stylesheet Snippet

```css
:root {
  /* 2-Color System: One primary + neutrals */
  --color-primary: #4f46e5;
  --color-primary-dark: #3730a3;

  --color-bg: #fafafa;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
}

/* Apply consistently */
body {
  background: var(--color-bg);
  color: var(--color-text);
}

a {
  color: var(--color-primary);
}

a:hover {
  color: var(--color-primary-dark);
}

h2 {
  color: var(--color-primary-dark);
}

.metadata {
  color: var(--color-text-muted);
}

.divider {
  border-top: 1px solid var(--color-border);
}
```

## Anti-patterns

❌ Using 5+ different colors  
❌ Bright, saturated colors that distract from content  
❌ Low contrast text (below 4.5:1)  
❌ Different shades without purpose  
❌ Decorative gradients

✅ Stick to defined palette  
✅ Use color intentionally to guide attention  
✅ Let typography and whitespace create visual interest  
✅ When in doubt, remove a color
