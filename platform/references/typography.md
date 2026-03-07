# Typography System Reference

## Font Stack

### Primary (Body & Headings)

```css
font-family:
  'Ubuntu',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  system-ui,
  Roboto,
  sans-serif;
```

**Why Ubuntu?**

- Clean, modern, highly legible
- Distinct personality without being distracting
- Excellent for long-form reading
- Free and open source

**Loading (Google Fonts)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

### Monospace (Code)

```css
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
```

## Type Scale

Using **Perfect Fourth (1.333)** ratio for clear hierarchy.

### Desktop (Base: 18px)

```css
:root {
  --font-size-xs: 0.75rem; /* 13.5px - metadata, captions */
  --font-size-sm: 0.875rem; /* 15.75px - small text */
  --font-size-base: 1rem; /* 18px - body text */
  --font-size-md: 1.125rem; /* 20.25px - emphasized body */
  --font-size-lg: 1.333rem; /* 24px - h3 */
  --font-size-xl: 1.777rem; /* 32px - h2 */
  --font-size-2xl: 2.369rem; /* 42.6px - h1 */
  --font-size-3xl: 3.157rem; /* 56.8px - hero/display (use sparingly) */
}
```

### Mobile (Base: 16px)

```css
@media (max-width: 768px) {
  :root {
    --font-size-xs: 0.75rem; /* 12px */
    --font-size-sm: 0.875rem; /* 14px */
    --font-size-base: 1rem; /* 16px */
    --font-size-md: 1.125rem; /* 18px */
    --font-size-lg: 1.25rem; /* 20px */
    --font-size-xl: 1.563rem; /* 25px */
    --font-size-2xl: 1.953rem; /* 31px */
    --font-size-3xl: 2.441rem; /* 39px */
  }
}
```

## Line Height

```css
:root {
  --line-height-tight: 1.2; /* Headings, page titles */
  --line-height-snug: 1.375; /* Subheadings, UI text */
  --line-height-normal: 1.6; /* Body text - optimal for reading */
  --line-height-relaxed: 1.75; /* Long-form content, documentation */
  --line-height-loose: 2; /* Special emphasis, poetry, quotes */
}
```

## Font Weights

```css
:root {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

**Usage:**

- Light (300): Rarely used, perhaps for hero text
- Normal (400): Body text, paragraphs
- Medium (500): Emphasis within text, labels
- Bold (700): Headings, strong emphasis

## Complete Heading System

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--font-weight-bold);
  margin-top: 0;
  line-height: var(--line-height-tight);
}

h1 {
  font-size: var(--font-size-2xl);
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: -0.02em; /* Tighten slightly for large text */
}

h2 {
  font-size: var(--font-size-xl);
  line-height: 1.25;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary-dark); /* Add color for hierarchy */
}

h3 {
  font-size: var(--font-size-lg);
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

h4 {
  font-size: var(--font-size-md);
  line-height: var(--line-height-snug);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: var(--font-weight-medium);
}

h5,
h6 {
  font-size: var(--font-size-base);
  line-height: var(--line-height-snug);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}
```

## Body Text

```css
body {
  font-family: 'Ubuntu', system-ui, sans-serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  font-weight: var(--font-weight-normal);
  color: var(--color-text);
}

p {
  margin-bottom: 1.25rem;
}

/* Optimal line length for readability */
p,
article,
section {
  max-width: 70ch; /* ~70 characters per line */
}

/* Emphasized text */
strong,
b {
  font-weight: var(--font-weight-bold);
}

em,
i {
  font-style: italic;
}
```

## Code Typography

```css
code,
pre {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.9em; /* Slightly smaller than body */
}

/* Inline code */
code {
  font-size: 0.875em;
  padding: 0.125rem 0.375rem;
  background: rgba(79, 70, 229, 0.08);
  border-radius: 3px;
  font-weight: var(--font-weight-medium);
}

/* Code blocks */
pre {
  font-size: 0.875rem;
  line-height: 1.6;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 6px;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
}

pre code {
  padding: 0;
  background: none;
  font-weight: var(--font-weight-normal);
}
```

## Lists

```css
ul,
ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: var(--line-height-normal);
}

/* Nested lists */
li ul,
li ol {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
```

## Links

```css
a {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
  font-weight: var(--font-weight-medium);
}

a:hover {
  border-bottom-color: var(--color-primary);
}

a:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## Utility Classes

```css
/* Text sizes */
.text-xs {
  font-size: var(--font-size-xs);
}
.text-sm {
  font-size: var(--font-size-sm);
}
.text-base {
  font-size: var(--font-size-base);
}
.text-lg {
  font-size: var(--font-size-lg);
}
.text-xl {
  font-size: var(--font-size-xl);
}

/* Text colors */
.text-primary {
  color: var(--color-primary);
}
.text-secondary {
  color: var(--color-text-secondary);
}
.text-muted {
  color: var(--color-text-muted);
}

/* Font weights */
.font-light {
  font-weight: var(--font-weight-light);
}
.font-normal {
  font-weight: var(--font-weight-normal);
}
.font-medium {
  font-weight: var(--font-weight-medium);
}
.font-bold {
  font-weight: var(--font-weight-bold);
}

/* Line heights */
.leading-tight {
  line-height: var(--line-height-tight);
}
.leading-normal {
  line-height: var(--line-height-normal);
}
.leading-relaxed {
  line-height: var(--line-height-relaxed);
}
```

## Responsive Typography

```css
/* Fluid typography (optional, more advanced) */
h1 {
  font-size: clamp(1.953rem, 4vw + 1rem, 2.369rem);
}

h2 {
  font-size: clamp(1.563rem, 3vw + 1rem, 1.777rem);
}

body {
  font-size: clamp(1rem, 2vw + 0.5rem, 1.125rem);
}
```

## Vertical Rhythm

Maintain consistent spacing using a base unit:

```css
:root {
  --spacing-unit: 0.5rem; /* 8px */
}

/* Spacing scale */
--space-xs: calc(var(--spacing-unit) * 1); /* 8px */
--space-sm: calc(var(--spacing-unit) * 2); /* 16px */
--space-md: calc(var(--spacing-unit) * 3); /* 24px */
--space-lg: calc(var(--spacing-unit) * 4); /* 32px */
--space-xl: calc(var(--spacing-unit) * 6); /* 48px */
--space-2xl: calc(var(--spacing-unit) * 8); /* 64px */
```

## Anti-patterns

❌ Too many font sizes (more than 6-7)  
❌ Line length over 80 characters  
❌ Body text below 16px  
❌ Line height below 1.4 for body text  
❌ Mixing too many font families

✅ Consistent scale  
✅ Optimal line length (60-70 characters)  
✅ Generous line height  
✅ Clear hierarchy  
✅ Single font family with weights
