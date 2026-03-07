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
