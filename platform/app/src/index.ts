/**
 * SQL Learning Platform - Main Entry Point
 * Interactive database learning with client-side SQL execution
 */
import './styles.css';
import SQLManager from './sqlManager';
import UIController from './uiController';
import exerciseModules from './exerciseData';
import { ProgressManager } from './progressManager';

// Extend Window interface for debugging
declare global {
  interface Window {
    sqlManager?: SQLManager;
    uiController?: UIController;
    progressManager?: typeof ProgressManager;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Show loading state
    showLoadingState();

    // Initialize SQL.js
    const sqlManager = new SQLManager();
    await sqlManager.init();

    // Initialize UI controller
    const uiController = new UIController(sqlManager);

    // Render navigation
    uiController.renderNavigation(exerciseModules);

    // Load first module by default
    if (exerciseModules.length > 0) {
      uiController.loadModule(exerciseModules[0]);

      // Set first nav link as active
      const firstLink = document.querySelector('.nav-link');
      if (firstLink) {
        firstLink.classList.add('is-active');
      }
    }

    // Hide loading state
    hideLoadingState();

    // Store instances globally for debugging (dev only)
    if (process.env.NODE_ENV === 'development') {
      window.sqlManager = sqlManager;
      window.uiController = uiController;
      window.progressManager = ProgressManager;

      console.log('🛠️ Debug tools available:');
      console.log('  - window.sqlManager');
      console.log('  - window.uiController');
      console.log('  - window.progressManager');
      console.log('');
      console.log('📊 Progress commands:');
      console.log('  - window.progressManager.getProgressStats()');
      console.log('  - window.progressManager.exportProgress()');
      console.log('  - window.progressManager.clearProgress()');
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    showErrorState(message);
  }
});

/**
 * Show loading state while initializing
 */
function showLoadingState(): void {
  const moduleTitle = document.getElementById('moduleTitle');
  const moduleDescription = document.getElementById('moduleDescription');
  const exercisesContainer = document.getElementById('exercisesContainer');

  if (moduleTitle) moduleTitle.textContent = 'Loading SQL Engine...';
  if (moduleDescription)
    moduleDescription.textContent = 'Initializing database and exercises';
  if (exercisesContainer) {
    exercisesContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 40vh; flex-direction: column;">
        <div class="loading" style="width: 40px; height: 40px; border-width: 4px;"></div>
        <p style="margin-top: 1rem; color: var(--color-text-secondary);">Loading...</p>
      </div>
    `;
  }
}

/**
 * Hide loading state
 */
function hideLoadingState(): void {
  // Content will be replaced by module loading
}

/**
 * Show error state if initialization fails
 */
function showErrorState(message: string): void {
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="content-container">
        <div class="results-message error" style="max-width: 600px; margin: 2rem auto;">
          <h3 style="margin: 0 0 0.5rem;">Failed to Load Application</h3>
          <p>${message}</p>
          <p style="margin-top: 1rem;">Please refresh the page to try again.</p>
        </div>
      </div>
    `;
  }
}

// Handle visibility change to close modal
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    const modal = document.getElementById('queryModal');
    if (modal && modal.classList.contains('is-open')) {
      modal.classList.remove('is-open');
    }
  }
});

// Handle window resize for responsive behavior
let resizeTimeout: NodeJS.Timeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768 && sidebar) {
      sidebar.classList.remove('is-open');
    }
  }, 150);
});
