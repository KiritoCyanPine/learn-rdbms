/**
 * ProgressManager - Handles localStorage persistence for user progress
 */
import { UserProgress, MCQAnswer } from './types';

const STORAGE_KEY = 'sql-learning-progress';

export class ProgressManager {
  /**
   * Load user progress from localStorage
   */
  static loadProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const progress: UserProgress = JSON.parse(stored);
        return progress;
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
    }

    // Return empty progress if nothing stored or error occurred
    return {
      completedExercises: [],
      mcqAnswers: {},
      lastUpdated: Date.now(),
    };
  }

  /**
   * Save user progress to localStorage
   */
  static saveProgress(progress: UserProgress): void {
    try {
      progress.lastUpdated = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }

  /**
   * Add a completed exercise
   */
  static addCompletedExercise(exerciseKey: string): void {
    const progress = this.loadProgress();

    if (!progress.completedExercises.includes(exerciseKey)) {
      progress.completedExercises.push(exerciseKey);
      this.saveProgress(progress);
    }
  }

  /**
   * Check if an exercise is completed
   */
  static isExerciseCompleted(exerciseKey: string): boolean {
    const progress = this.loadProgress();
    return progress.completedExercises.includes(exerciseKey);
  }

  /**
   * Save an MCQ answer
   */
  static saveMCQAnswer(
    mcqKey: string,
    selectedAnswer: number,
    isCorrect: boolean,
  ): void {
    const progress = this.loadProgress();

    progress.mcqAnswers[mcqKey] = {
      selectedAnswer,
      isCorrect,
      timestamp: Date.now(),
    };

    this.saveProgress(progress);
  }

  /**
   * Get an MCQ answer
   */
  static getMCQAnswer(mcqKey: string): MCQAnswer | null {
    const progress = this.loadProgress();
    return progress.mcqAnswers[mcqKey] || null;
  }

  /**
   * Get all completed exercises for a module
   */
  static getCompletedExercisesForModule(moduleId: string): Set<string> {
    const progress = this.loadProgress();
    const completed = progress.completedExercises.filter((key) =>
      key.startsWith(`${moduleId}-`),
    );
    return new Set(completed);
  }

  /**
   * Get all MCQ answers for a module
   */
  static getMCQAnswersForModule(
    moduleId: string,
  ): Map<string, { selectedAnswer: number; isCorrect: boolean }> {
    const progress = this.loadProgress();
    const answers = new Map<
      string,
      { selectedAnswer: number; isCorrect: boolean }
    >();

    Object.entries(progress.mcqAnswers).forEach(([key, value]) => {
      if (key.startsWith(`${moduleId}-mcq-`)) {
        answers.set(key, {
          selectedAnswer: value.selectedAnswer,
          isCorrect: value.isCorrect,
        });
      }
    });

    return answers;
  }

  /**
   * Clear all progress (useful for testing or reset)
   */
  static clearProgress(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  }

  /**
   * Export progress as JSON (for backup/debugging)
   */
  static exportProgress(): string {
    const progress = this.loadProgress();
    return JSON.stringify(progress, null, 2);
  }

  /**
   * Import progress from JSON (for restore)
   */
  static importProgress(jsonString: string): boolean {
    try {
      const progress: UserProgress = JSON.parse(jsonString);

      // Validate structure
      if (
        !progress.completedExercises ||
        !progress.mcqAnswers ||
        typeof progress.lastUpdated !== 'number'
      ) {
        throw new Error('Invalid progress data structure');
      }

      this.saveProgress(progress);
      return true;
    } catch (error) {
      console.error('Failed to import progress:', error);
      return false;
    }
  }

  /**
   * Get progress statistics
   */
  static getProgressStats(): {
    totalExercisesCompleted: number;
    totalMCQsAnswered: number;
    correctMCQs: number;
    lastUpdated: Date | null;
  } {
    const progress = this.loadProgress();

    const correctMCQs = Object.values(progress.mcqAnswers).filter(
      (answer) => answer.isCorrect,
    ).length;

    return {
      totalExercisesCompleted: progress.completedExercises.length,
      totalMCQsAnswered: Object.keys(progress.mcqAnswers).length,
      correctMCQs,
      lastUpdated: progress.lastUpdated ? new Date(progress.lastUpdated) : null,
    };
  }
}
