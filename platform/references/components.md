# Component Patterns Reference

Essential UI components for learning platforms, designed with minimal, elegant aesthetics.

## 1. Exercise Card

Displays practice problems with collapsible solutions.

```html
<div class="exercise-card">
  <div class="exercise-header">
    <span class="exercise-number">Exercise 1</span>
    <span class="exercise-difficulty">Beginner</span>
  </div>

  <div class="exercise-content">
    <h3>Write a SELECT query</h3>
    <p>
      Retrieve all customers from the 'customers' table where country is 'USA'.
    </p>

    <pre><code class="language-sql">-- Write your query here</code></pre>
  </div>

  <details class="solution">
    <summary>Show Solution</summary>
    <pre><code class="language-sql">SELECT * FROM customers
WHERE country = 'USA';</code></pre>
    <p class="solution-note">This uses a WHERE clause to filter results.</p>
  </details>
</div>
```

### Styling

```css
.exercise-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.exercise-number {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.exercise-difficulty {
  font-size: var(--font-size-xs);
  padding: 0.25rem 0.75rem;
  background: rgba(79, 70, 229, 0.1);
  color: var(--color-primary-dark);
  border-radius: 12px;
  font-weight: var(--font-weight-medium);
}

.solution {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.solution summary {
  cursor: pointer;
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  user-select: none;
  padding: 0.5rem 0;
}

.solution summary:hover {
  color: var(--color-primary-dark);
}

.solution-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(79, 70, 229, 0.05);
  border-left: 3px solid var(--color-primary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
```

## 2. Code Block with Copy Button

Enhanced code display with syntax highlighting and copy functionality.

```html
<div class="code-block">
  <div class="code-header">
    <span class="code-language">SQL</span>
    <button class="copy-button" data-copy-target="code-1">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5 2V0h9v12h-2V2H5z" fill="currentColor" />
        <path d="M0 4v12h9V4H0z" fill="currentColor" opacity="0.5" />
      </svg>
      Copy
    </button>
  </div>
  <pre><code id="code-1" class="language-sql">SELECT name, email
FROM users
WHERE created_at > '2024-01-01'
ORDER BY name;</code></pre>
</div>
```

### Styling

```css
.code-block {
  position: relative;
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border);
}

.code-language {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background: var(--color-bg-elevated);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.copy-button:active {
  transform: scale(0.95);
}

.code-block pre {
  margin: 0;
  border: none;
  border-radius: 0;
}
```

### JavaScript Functionality

```javascript
// Progressive enhancement for copy buttons
document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.dataset.copyTarget;
    const code = document.getElementById(targetId).textContent;

    try {
      await navigator.clipboard.writeText(code);
      button.textContent = '✓ Copied!';
      setTimeout(() => {
        button.innerHTML = '<svg>...</svg> Copy';
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  });
});
```

## 3. Progress Tracker

Visual indicator of learning progress through sections.

```html
<nav class="progress-nav" aria-label="Course progress">
  <ol class="progress-steps">
    <li class="step completed">
      <a href="#basics">
        <span class="step-number">1</span>
        <span class="step-title">SQL Basics</span>
      </a>
    </li>
    <li class="step completed">
      <a href="#retrieval">
        <span class="step-number">2</span>
        <span class="step-title">Data Retrieval</span>
      </a>
    </li>
    <li class="step current">
      <a href="#joins">
        <span class="step-number">3</span>
        <span class="step-title">Joins</span>
      </a>
    </li>
    <li class="step">
      <a href="#aggregation">
        <span class="step-number">4</span>
        <span class="step-title">Aggregation</span>
      </a>
    </li>
  </ol>
</nav>
```

### Styling

```css
.progress-nav {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--color-bg-elevated);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.progress-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.step {
  position: relative;
}

.step a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s;
}

.step a:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-elevated);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--color-bg-subtle);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.step-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Completed state */
.step.completed .step-number {
  background: var(--color-primary);
  color: white;
}

.step.completed a {
  border-color: var(--color-primary);
  color: var(--color-text);
}

/* Current state */
.step.current a {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.step.current .step-number {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.step.current .step-title {
  color: white;
}
```

## 4. Content Section with Anchor Links

Structured content sections with navigation.

```html
<article class="content-section" id="joins">
  <header class="section-header">
    <h2>
      <a href="#joins" class="anchor-link" aria-label="Link to Joins section"
        >#</a
      >
      Understanding JOINs
    </h2>
    <p class="section-meta">Estimated time: 30 minutes</p>
  </header>

  <div class="section-content">
    <p>SQL JOINs combine rows from two or more tables...</p>
    <!-- Content -->
  </div>
</article>
```

### Styling

```css
.content-section {
  margin-bottom: 3rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.anchor-link {
  opacity: 0;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-normal);
  transition: opacity 0.2s;
}

.section-header h2:hover .anchor-link {
  opacity: 1;
}

.section-meta {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}
```

## 5. Sidebar Navigation

Sticky navigation for multi-page content.

```html
<aside class="sidebar">
  <nav class="sidebar-nav">
    <h3 class="sidebar-title">Table of Contents</h3>
    <ul class="nav-list">
      <li><a href="#introduction" class="active">Introduction</a></li>
      <li>
        <a href="#basics">SQL Basics</a>
        <ul class="nav-sublist">
          <li><a href="#select">SELECT</a></li>
          <li><a href="#where">WHERE</a></li>
        </ul>
      </li>
      <li><a href="#joins">JOINs</a></li>
      <li><a href="#aggregation">Aggregation</a></li>
    </ul>
  </nav>
</aside>
```

### Styling

```css
.sidebar {
  position: sticky;
  top: 2rem;
  width: 16rem;
  height: fit-content;
}

.sidebar-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  color: var(--color-text);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 0.25rem;
}

.nav-list a {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 4px;
  font-size: var(--font-size-sm);
  transition: all 0.2s;
  border-left: 2px solid transparent;
}

.nav-list a:hover {
  background: var(--color-bg-subtle);
  color: var(--color-text);
}

.nav-list a.active {
  background: rgba(79, 70, 229, 0.1);
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.nav-sublist {
  margin-top: 0.25rem;
  margin-left: 1rem;
  padding-left: 0.75rem;
  border-left: 1px solid var(--color-border);
}
```

## 6. Callout/Note Box

Highlight important information.

```html
<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <strong>Note:</strong> Foreign keys ensure referential integrity between
    tables.
  </div>
</div>
```

### Styling

```css
.callout {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 6px;
  border-left: 3px solid var(--color-primary);
  background: rgba(79, 70, 229, 0.05);
}

.callout-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.callout-content {
  flex: 1;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.callout-content strong {
  color: var(--color-primary-dark);
}

/* Variants */
.callout-warning {
  border-left-color: var(--color-warning);
  background: var(--color-warning-bg);
}

.callout-success {
  border-left-color: var(--color-success);
  background: var(--color-success-bg);
}
```

## Layout Grid

Recommended page structure for learning platforms:

```html
<div class="page-container">
  <aside class="sidebar">
    <!-- Navigation -->
  </aside>

  <main class="main-content">
    <article>
      <!-- Learning content -->
    </article>
  </main>
</div>
```

```css
.page-container {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 3rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.main-content {
  min-width: 0; /* Prevent grid blowout */
  max-width: 70ch;
}

@media (max-width: 768px) {
  .page-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .sidebar {
    position: static;
    width: auto;
  }
}
```

## Best Practices

1. **Progressive Enhancement**: Components work without JavaScript
2. **Semantic HTML**: Use proper elements (`<details>`, `<nav>`, `<article>`)
3. **Accessibility**: Include ARIA labels, keyboard navigation
4. **Responsive**: Mobile-first, test at 375px
5. **Consistent Spacing**: Use the spacing scale from typography system
6. **Minimal**: Only include components that serve learning goals
