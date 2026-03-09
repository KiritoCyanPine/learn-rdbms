import { SQLManager } from './sqlManager';
import { Module, Exercise, MCQ } from './types';
import { parseMarkdown } from './markdownRenderer';
import { roadmapData } from './roadmapData';
import { ProgressManager } from './progressManager';

/**
 * UIController - Manages UI rendering and interactions
 */
export class UIController {
  private sqlManager: SQLManager;
  private currentModule: Module | null = null;
  private currentExercise: Exercise | null = null;
  private completedExercises: Set<string> = new Set();
  private mcqAnswers: Map<
    string,
    { selectedAnswer: number; isCorrect: boolean }
  > = new Map();

  // Sidebar elements
  private sidebarNav!: HTMLElement;
  private sidebarToggle: HTMLButtonElement | null = null;
  private sidebar!: HTMLElement;
  private progressText!: HTMLElement;
  private progressFill!: HTMLElement;

  // Content elements
  private moduleTitle!: HTMLElement;
  private moduleDescription!: HTMLElement;
  private exercisesContainer!: HTMLElement;

  // Modal elements
  private queryModal!: HTMLElement;
  private modalOverlay!: HTMLElement;
  private modalClose!: HTMLButtonElement;
  private queryInput!: HTMLTextAreaElement;
  private runQueryBtn!: HTMLButtonElement;
  private clearQueryBtn!: HTMLButtonElement;
  private resetDbBtn!: HTMLButtonElement;
  private queryResults!: HTMLElement;

  constructor(sqlManager: SQLManager) {
    this.sqlManager = sqlManager;
    this.loadProgressFromStorage();
    this.initializeElements();
    this.attachEventListeners();
  }

  /**
   * Load progress from localStorage
   */
  private loadProgressFromStorage(): void {
    const progress = ProgressManager.loadProgress();

    // Restore completed exercises
    this.completedExercises = new Set(progress.completedExercises);

    // Restore MCQ answers
    this.mcqAnswers = new Map(
      Object.entries(progress.mcqAnswers).map(([key, value]) => [
        key,
        { selectedAnswer: value.selectedAnswer, isCorrect: value.isCorrect },
      ]),
    );

    console.log('Progress loaded:', {
      exercises: this.completedExercises.size,
      mcqs: this.mcqAnswers.size,
    });
  }

  private initializeElements(): void {
    // Sidebar elements
    this.sidebarNav = this.getElement('sidebarNav');
    this.sidebarToggle = document.getElementById(
      'sidebarToggle',
    ) as HTMLButtonElement | null;
    this.sidebar = this.getElement('sidebar');
    this.progressText = this.getElement('progressText');
    this.progressFill = this.getElement('progressFill');

    // Content elements
    this.moduleTitle = this.getElement('moduleTitle');
    this.moduleDescription = this.getElement('moduleDescription');
    this.exercisesContainer = this.getElement('exercisesContainer');

    // Modal elements
    this.queryModal = this.getElement('queryModal');
    this.modalOverlay = this.getElement('modalOverlay');
    this.modalClose = this.getElement('modalClose') as HTMLButtonElement;
    this.queryInput = this.getElement('queryInput') as HTMLTextAreaElement;
    this.runQueryBtn = this.getElement('runQueryBtn') as HTMLButtonElement;
    this.clearQueryBtn = this.getElement('clearQueryBtn') as HTMLButtonElement;
    this.resetDbBtn = this.getElement('resetDbBtn') as HTMLButtonElement;
    this.queryResults = this.getElement('queryResults');
  }

  private getElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element with id "${id}" not found`);
    }
    return element;
  }

  private attachEventListeners(): void {
    // Sidebar toggle (mobile)
    this.sidebarToggle?.addEventListener('click', () => {
      this.sidebar.classList.toggle('is-open');
    });

    // Modal controls
    this.modalClose.addEventListener('click', () => this.closeModal());
    this.modalOverlay.addEventListener('click', () => this.closeModal());

    // Query controls
    this.runQueryBtn.addEventListener('click', () => this.executeQuery());
    this.clearQueryBtn.addEventListener('click', () => this.clearQuery());
    this.resetDbBtn.addEventListener('click', () => this.resetDatabase());

    // Keyboard shortcuts
    this.queryInput.addEventListener('keydown', (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to run query
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.executeQuery();
      }
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.queryModal.classList.contains('is-open')) {
        this.closeModal();
      }
    });
  }

  /**
   * Close off-canvas sidebar after selecting a navigation destination.
   */
  private closeSidebarAfterNavigation(): void {
    const isMobileLayout = window.matchMedia('(max-width: 768px)').matches;
    if (isMobileLayout || this.sidebar.classList.contains('is-open')) {
      this.sidebar.classList.remove('is-open');
    }
  }

  /**
   * Render navigation from modules
   */
  renderNavigation(modules: Module[]): void {
    // Add Roadmap link at the top
    const roadmapLink = `
      <div class="nav-module">
        <h4 class="nav-module-title">Overview</h4>
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link" data-view="roadmap">
              <span class="nav-link-icon">🗺️</span>
              Learning Roadmap
            </a>
          </li>
        </ul>
      </div>
    `;

    const moduleLinks = modules
      .map(
        (module, index) => `
      <div class="nav-module">
        <h4 class="nav-module-title">Module ${index + 1}</h4>
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link" data-module-id="${module.id}">
              <span class="nav-link-icon">📚</span>
              ${module.title}
            </a>
          </li>
        </ul>
      </div>
    `,
      )
      .join('');

    this.sidebarNav.innerHTML = roadmapLink + moduleLinks;

    // Attach roadmap link listener
    const roadmapNavLink = this.sidebarNav.querySelector(
      '[data-view="roadmap"]',
    );
    if (roadmapNavLink) {
      roadmapNavLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.closeSidebarAfterNavigation();
        this.renderRoadmap();

        // Update active state
        this.sidebarNav
          .querySelectorAll('.nav-link')
          .forEach((l) => l.classList.remove('is-active'));
        roadmapNavLink.classList.add('is-active');
      });
    }

    // Attach module nav link listeners
    this.sidebarNav.querySelectorAll('[data-module-id]').forEach((link) => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.closeSidebarAfterNavigation();
        const moduleId = (link as HTMLElement).dataset.moduleId;
        const module = modules.find((m) => m.id === moduleId);
        if (module) {
          this.loadModule(module);

          // Update active state
          this.sidebarNav
            .querySelectorAll('.nav-link')
            .forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    });
  }

  /**
   * Render the learning roadmap view
   */
  renderRoadmap(): void {
    this.currentModule = null;

    // Update header
    this.moduleTitle.textContent = 'Learning Roadmap';
    this.moduleDescription.textContent =
      'Your complete guide to mastering SQL and relational databases';

    // Hide progress bar for roadmap view
    const progressBar = document.querySelector('.progress-section');
    if (progressBar) {
      (progressBar as HTMLElement).style.display = 'none';
    }

    // Render roadmap content
    const introHtml = parseMarkdown(roadmapData.learningPathIntro);
    const sectionsHtml = roadmapData.sections
      .map((section) => {
        const moduleLink = section.relatedModuleId
          ? `<a href="#" class="roadmap-module-link" data-module-id="${section.relatedModuleId}">Go to Exercises →</a>`
          : '';

        return `
          <div class="roadmap-section">
            <div class="roadmap-section-header">
              <h2 class="roadmap-section-title">${section.title}</h2>
              <span class="roadmap-week-badge">Week ${section.weekRange}</span>
            </div>
            <div class="study-content">
              ${parseMarkdown(section.content)}
            </div>
            ${moduleLink}
          </div>
        `;
      })
      .join('');

    this.exercisesContainer.innerHTML = `
      <div class="roadmap-view">
        <div class="roadmap-intro">
          ${introHtml}
        </div>
        ${sectionsHtml}
      </div>
    `;

    // Attach click handlers to module links
    this.exercisesContainer
      .querySelectorAll('.roadmap-module-link')
      .forEach((link) => {
        link.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const moduleId = (link as HTMLElement).dataset.moduleId;
          // Find module and trigger its nav link
          const navLink = this.sidebarNav.querySelector(
            `[data-module-id="${moduleId}"]`,
          );
          if (navLink) {
            (navLink as HTMLElement).click();
          }
        });
      });
  }

  /**
   * Load and display a module
   */
  loadModule(module: Module): void {
    this.currentModule = module;

    // Update header
    this.moduleTitle.textContent = module.title;
    this.moduleDescription.textContent = module.description;

    // Show progress bar for module view
    const progressBar = document.querySelector('.progress-section');
    if (progressBar) {
      (progressBar as HTMLElement).style.display = 'block';
    }

    // Initialize database with module schema
    try {
      this.sqlManager.createDatabase(module.schema);

      // Render study content before exercises
      this.renderModuleStudyContent(module);

      this.renderExercises(module.exercises);

      // Render MCQs if available
      if (module.mcqs && module.mcqs.length > 0) {
        this.renderMCQs(module.mcqs);
      }

      this.updateProgress();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.showError('Failed to load module: ' + message);
    }
  }

  /**
   * Render module-specific study content (theory)
   */
  private renderModuleStudyContent(module: Module): void {
    if (!module.studyContent) {
      return; // No study content for this module
    }

    const studyContentHtml = parseMarkdown(module.studyContent);
    const studyContainer = document.createElement('div');
    studyContainer.className = 'study-content';
    studyContainer.innerHTML = studyContentHtml;

    // Add divider before exercises
    const divider = document.createElement('hr');
    divider.className = 'study-divider';

    // Clear and prepend to exercises container
    this.exercisesContainer.innerHTML = '';
    this.exercisesContainer.appendChild(studyContainer);
    this.exercisesContainer.appendChild(divider);
  }

  /**
   * Render exercise cards
   */
  private renderExercises(exercises: Exercise[]): void {
    if (!this.currentModule) return;

    this.exercisesContainer.innerHTML = exercises
      .map((exercise) => {
        const isCompleted = this.completedExercises.has(
          `${this.currentModule!.id}-${exercise.id}`,
        );

        return `
        <div class="exercise-card ${isCompleted ? 'is-completed' : ''}" data-exercise-id="${exercise.id}">
          <div class="exercise-header">
            <div class="exercise-title-group">
              <div class="exercise-number">Exercise ${exercise.id}</div>
              <h3 class="exercise-title">${exercise.title}</h3>
            </div>
            <span class="exercise-difficulty difficulty-${exercise.difficulty}">
              ${exercise.difficulty}
            </span>
          </div>
          
          <p class="exercise-description">${exercise.description}</p>
          
          ${
            exercise.hint
              ? `
            <details class="exercise-hint">
              <summary>💡 Hint</summary>
              <p>${exercise.hint}</p>
            </details>
          `
              : ''
          }
          
          <div class="exercise-actions">
            <button class="btn btn-primary" data-action="try" data-exercise-id="${exercise.id}">
              <span class="btn-icon">▶</span>
              Try It
            </button>
            <button class="btn btn-secondary" data-action="solution" data-exercise-id="${exercise.id}">
              View Solution
            </button>
            ${isCompleted ? '<span class="completion-badge">✓ Completed</span>' : ''}
          </div>
          
          <div class="exercise-solution" id="solution-${exercise.id}" style="display: none;">
            <div class="solution-content">
              <pre><code>${exercise.solution}</code></pre>
            </div>
            <p style="margin-top: var(--space-sm); color: var(--color-text-secondary); font-size: var(--font-size-sm);">
              Expected: ${exercise.expectedOutput}
            </p>
          </div>
        </div>
      `;
      })
      .join('');

    // Attach exercise action listeners
    this.exercisesContainer
      .querySelectorAll('[data-action="try"]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const exerciseId = parseInt(
            (btn as HTMLElement).dataset.exerciseId || '0',
          );
          const exercise = exercises.find((e) => e.id === exerciseId);
          if (exercise) {
            this.openQueryModal(exercise);
          }
        });
      });

    this.exercisesContainer
      .querySelectorAll('[data-action="solution"]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const exerciseId = (btn as HTMLElement).dataset.exerciseId;
          const solutionEl = document.getElementById(`solution-${exerciseId}`);
          if (solutionEl) {
            const isVisible = solutionEl.style.display !== 'none';
            solutionEl.style.display = isVisible ? 'none' : 'block';
            btn.textContent = isVisible ? 'View Solution' : 'Hide Solution';
          }
        });
      });
  }

  /**
   * Render MCQ (Multiple Choice Questions) cards
   */
  private renderMCQs(mcqs: MCQ[]): void {
    if (!this.currentModule) return;

    // Add section header for MCQs
    const mcqSection = document.createElement('div');
    mcqSection.className = 'mcq-section';

    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    sectionHeader.innerHTML = `
      <h2 class="section-title">📝 Practice Quiz</h2>
      <p class="section-description">Test your understanding with these multiple choice questions</p>
    `;
    mcqSection.appendChild(sectionHeader);

    // Render each MCQ
    mcqs.forEach((mcq) => {
      const mcqKey = `${this.currentModule!.id}-mcq-${mcq.id}`;
      const savedAnswer = this.mcqAnswers.get(mcqKey);

      const mcqCard = document.createElement('div');
      mcqCard.className = `mcq-card ${savedAnswer ? (savedAnswer.isCorrect ? 'is-correct' : 'is-incorrect') : ''}`;
      mcqCard.dataset.mcqId = mcq.id.toString();

      mcqCard.innerHTML = `
        <div class="mcq-header">
          <div class="mcq-title-group">
            <div class="mcq-number">Question ${mcq.id}</div>
            <span class="mcq-difficulty difficulty-${mcq.difficulty}">
              ${mcq.difficulty}
            </span>
          </div>
        </div>
        
        <div class="mcq-question">${mcq.question}</div>
        
        <div class="mcq-options">
          ${mcq.options
            .map(
              (option, index) => `
            <label class="mcq-option ${savedAnswer && savedAnswer.selectedAnswer === index ? 'is-selected' : ''} ${savedAnswer ? (index === mcq.correctAnswer ? 'is-correct-answer' : '') : ''}" data-option-index="${index}">
              <input 
                type="radio" 
                name="mcq-${this.currentModule!.id}-${mcq.id}" 
                value="${index}"
                ${savedAnswer ? 'disabled' : ''}
                ${savedAnswer && savedAnswer.selectedAnswer === index ? 'checked' : ''}
              />
              <span class="option-text">${option}</span>
              ${savedAnswer && index === mcq.correctAnswer ? '<span class="correct-indicator">✓</span>' : ''}
            </label>
          `,
            )
            .join('')}
        </div>
        
        ${
          !savedAnswer
            ? `
          <div class="mcq-actions">
            <button class="btn btn-primary" data-action="submit-mcq" data-mcq-id="${mcq.id}">
              Submit Answer
            </button>
          </div>
        `
            : ''
        }
        
        ${
          savedAnswer
            ? `
          <div class="mcq-feedback ${savedAnswer.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
            <div class="feedback-icon">${savedAnswer.isCorrect ? '✓' : '✗'}</div>
            <div class="feedback-content">
              <div class="feedback-message">
                ${savedAnswer.isCorrect ? 'Correct!' : 'Incorrect. The correct answer is highlighted above.'}
              </div>
              ${mcq.explanation ? `<div class="feedback-explanation">${mcq.explanation}</div>` : ''}
            </div>
          </div>
        `
            : ''
        }
      `;

      mcqSection.appendChild(mcqCard);
    });

    this.exercisesContainer.appendChild(mcqSection);

    // Attach MCQ submit listeners
    this.exercisesContainer
      .querySelectorAll('[data-action="submit-mcq"]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const mcqId = parseInt((btn as HTMLElement).dataset.mcqId || '0');
          this.handleMCQSubmit(mcqId, mcqs);
        });
      });
  }

  /**
   * Handle MCQ answer submission
   */
  private handleMCQSubmit(mcqId: number, mcqs: MCQ[]): void {
    if (!this.currentModule) return;

    const mcq = mcqs.find((m) => m.id === mcqId);
    if (!mcq) return;

    const mcqKey = `${this.currentModule.id}-mcq-${mcqId}`;
    const radioName = `mcq-${this.currentModule.id}-${mcqId}`;
    const selectedRadio = document.querySelector(
      `input[name="${radioName}"]:checked`,
    ) as HTMLInputElement;

    if (!selectedRadio) {
      alert('Please select an answer before submitting.');
      return;
    }

    const selectedAnswer = parseInt(selectedRadio.value);
    const isCorrect = selectedAnswer === mcq.correctAnswer;

    // Save answer in memory
    this.mcqAnswers.set(mcqKey, { selectedAnswer, isCorrect });

    // Save to localStorage
    ProgressManager.saveMCQAnswer(mcqKey, selectedAnswer, isCorrect);

    // Re-render to show feedback
    if (this.currentModule.mcqs) {
      this.loadModule(this.currentModule);
    }
  }

  /**
   * Open query modal with exercise context
   */
  private openQueryModal(exercise: Exercise | null = null): void {
    this.queryModal.classList.add('is-open');
    this.queryModal.setAttribute('aria-hidden', 'false');
    this.queryInput.value = '';
    this.queryResults.innerHTML = '';

    if (exercise) {
      this.queryInput.placeholder = `Try solving: ${exercise.title}`;
      this.currentExercise = exercise;
    }

    this.queryInput.focus();
  }

  /**
   * Close query modal
   */
  private closeModal(): void {
    this.queryModal.classList.remove('is-open');
    this.queryModal.setAttribute('aria-hidden', 'true');
    this.currentExercise = null;
  }

  /**
   * Execute SQL query
   */
  private executeQuery(): void {
    const query = this.queryInput.value.trim();

    if (!query) {
      this.showResultMessage('Please enter a SQL query', 'info');
      return;
    }

    try {
      const result = this.sqlManager.executeQuery(query);

      if (result.success) {
        this.displayResults(result);

        // Mark exercise as completed if applicable
        if (this.currentExercise && this.currentModule) {
          const exerciseKey = `${this.currentModule.id}-${this.currentExercise.id}`;
          this.completedExercises.add(exerciseKey);

          // Save to localStorage
          ProgressManager.addCompletedExercise(exerciseKey);

          this.updateProgress();

          // Update exercise card
          const card = this.exercisesContainer.querySelector(
            `[data-exercise-id="${this.currentExercise.id}"]`,
          );
          if (card && !card.classList.contains('is-completed')) {
            card.classList.add('is-completed');
            const actions = card.querySelector('.exercise-actions');
            if (actions && !actions.querySelector('.completion-badge')) {
              actions.insertAdjacentHTML(
                'beforeend',
                '<span class="completion-badge">✓ Completed</span>',
              );
            }
          }
        }
      } else {
        this.showResultMessage(result.message || 'Query failed', 'error');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.showResultMessage('Query execution failed: ' + message, 'error');
    }
  }

  /**
   * Display query results
   */
  private displayResults(result: any): void {
    this.queryResults.innerHTML = '';

    // Show success message
    if (result.results.length === 0) {
      this.showResultMessage(result.message || 'Success', 'success');
      return;
    }

    // Display result tables
    result.results.forEach((table: any) => {
      if (table.columns.length === 0) {
        return;
      }

      const tableHtml = `
        <div class="results-table-wrapper">
          <table class="results-table">
            <thead>
              <tr>
                ${table.columns.map((col: string) => `<th>${col}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${table.values
                .map(
                  (row: any[]) => `
                <tr>
                  ${row.map((cell) => `<td>${cell !== null ? cell : 'NULL'}</td>`).join('')}
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;

      this.queryResults.insertAdjacentHTML('beforeend', tableHtml);
    });

    // Show row count
    const totalRows = result.results.reduce(
      (sum: number, t: any) => sum + t.rowsAffected,
      0,
    );
    this.showResultMessage(`${totalRows} row(s) returned`, 'success');
  }

  /**
   * Show result message
   */
  private showResultMessage(
    message: string,
    type: 'info' | 'success' | 'error' = 'info',
  ): void {
    const messageHtml = `
      <div class="results-message ${type}">
        ${message}
      </div>
    `;

    // Remove existing messages
    const existing = this.queryResults.querySelector('.results-message');
    if (existing) {
      existing.remove();
    }

    this.queryResults.insertAdjacentHTML('afterbegin', messageHtml);
  }

  /**
   * Clear query input
   */
  private clearQuery(): void {
    this.queryInput.value = '';
    this.queryResults.innerHTML = '';
    this.queryInput.focus();
  }

  /**
   * Reset database to initial state
   */
  private resetDatabase(): void {
    try {
      this.sqlManager.resetDatabase();
      this.showResultMessage('Database reset to initial state', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.showResultMessage('Failed to reset database: ' + message, 'error');
    }
  }

  /**
   * Update progress indicator
   */
  private updateProgress(): void {
    if (!this.currentModule) return;

    const totalExercises = this.currentModule.exercises.length;
    const completedCount = this.currentModule.exercises.filter((ex) =>
      this.completedExercises.has(`${this.currentModule!.id}-${ex.id}`),
    ).length;

    const percentage = Math.round((completedCount / totalExercises) * 100);

    this.progressText.textContent = `${percentage}% Complete (${completedCount}/${totalExercises})`;
    this.progressFill.style.width = `${percentage}%`;
  }

  /**
   * Show error notification
   */
  showError(message: string): void {
    console.error(message);
    this.exercisesContainer.innerHTML = `
      <div class="results-message error">
        ${message}
      </div>
    `;
  }
}

export default UIController;
