/**
 * Type definitions for SQL Learning Platform
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  hint?: string;
  solution: string;
  expectedOutput: string;
}

export interface MCQ {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-based)
  explanation?: string; // Optional explanation shown after answering
  difficulty: Difficulty;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  schema: string;
  exercises: Exercise[];
  mcqs?: MCQ[]; // Optional multiple choice questions for practice
  studyContent?: string; // Markdown content for theory/study material
}

export interface ResultTable {
  columns: string[];
  values: any[][];
  rowsAffected: number;
}

export interface QueryResult {
  success: boolean;
  results: ResultTable[];
  error?: string;
  message?: string;
  rowsAffected: number;
}

export interface QueryExecutionResult {
  columns: string[];
  values: any[][];
}

export interface RoadmapSection {
  id: string;
  title: string;
  content: string; // Markdown content
  weekRange: string; // e.g., "1-2", "3", "7-8"
  relatedModuleId?: string; // Links to exercise module if applicable
}

export interface Roadmap {
  learningPathIntro: string; // Markdown content for the learning path overview
  sections: RoadmapSection[];
}

/**
 * Progress tracking types for localStorage
 */
export interface MCQAnswer {
  selectedAnswer: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface UserProgress {
  completedExercises: string[]; // Exercise keys: "moduleId-exerciseId"
  mcqAnswers: Record<string, MCQAnswer>; // MCQ keys: "moduleId-mcq-mcqId"
  lastUpdated: number; // Timestamp
}
