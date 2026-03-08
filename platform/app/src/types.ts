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

export interface Module {
  id: string;
  title: string;
  description: string;
  schema: string;
  exercises: Exercise[];
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
