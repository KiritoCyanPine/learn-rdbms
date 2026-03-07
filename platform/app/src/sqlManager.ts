import initSqlJs, { Database, SqlJsStatic, QueryExecResult } from 'sql.js';
import { QueryResult, ResultTable } from './types';

/**
 * SQLManager - Manages SQL.js database instance and query execution
 */
export class SQLManager {
  private db: Database | null = null;
  private SQL: SqlJsStatic | null = null;
  private currentSchema: string | null = null;

  /**
   * Initialize SQL.js library
   */
  async init(): Promise<boolean> {
    try {
      // Load SQL.js - will automatically find wasm file
      this.SQL = await initSqlJs({
        locateFile: (file: string) => {
          // In both dev and production, wasm file is served from root
          return `./${file}`;
        },
      });
      return true;
    } catch (error) {
      console.error('Failed to initialize SQL.js:', error);
      throw new Error('Failed to load SQL database engine');
    }
  }

  /**
   * Create a new database instance with optional schema
   */
  createDatabase(schema: string | null = null): boolean {
    try {
      if (!this.SQL) {
        throw new Error('SQL.js not initialized');
      }

      // Close existing database if any
      if (this.db) {
        this.db.close();
      }

      // Create new database
      this.db = new this.SQL.Database();
      this.currentSchema = schema;

      // Execute schema if provided
      if (schema) {
        this.db.run(schema);
      }

      return true;
    } catch (error) {
      console.error('Failed to create database:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Database creation failed: ${message}`);
    }
  }

  /**
   * Reset database to initial state with current schema
   */
  resetDatabase(): boolean {
    return this.createDatabase(this.currentSchema);
  }

  /**
   * Execute SQL query and return results
   */
  executeQuery(query: string): QueryResult {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const results: ResultTable[] = [];

      // Execute query - SQL.js can handle multiple statements
      const statements: QueryExecResult[] = this.db.exec(query);

      // Process results
      for (const statement of statements) {
        results.push({
          columns: statement.columns || [],
          values: statement.values || [],
          rowsAffected: statement.values ? statement.values.length : 0,
        });
      }

      // If no results (INSERT, UPDATE, DELETE), return metadata
      if (results.length === 0) {
        // Try to get changes count for DML statements
        const changes = this.db.getRowsModified();
        return {
          success: true,
          results: [],
          message:
            changes > 0
              ? `${changes} row(s) affected`
              : 'Query executed successfully',
          rowsAffected: changes,
        };
      }

      return {
        success: true,
        results: results,
        rowsAffected: results.reduce((sum, r) => sum + r.rowsAffected, 0),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: message,
        message: `SQL Error: ${message}`,
        results: [],
        rowsAffected: 0,
      };
    }
  }

  /**
   * Get all tables in the database
   */
  getTables(): string[] {
    if (!this.db) return [];

    try {
      const result = this.db.exec(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
      );

      if (result.length > 0 && result[0].values) {
        return result[0].values.map((row: any[]) => row[0] as string);
      }
      return [];
    } catch (error) {
      console.error('Failed to get tables:', error);
      return [];
    }
  }

  /**
   * Get schema information for a table
   */
  getTableSchema(tableName: string): Array<{
    id: number;
    name: string;
    type: string;
    notNull: boolean;
    defaultValue: any;
    primaryKey: boolean;
  }> {
    if (!this.db) return [];

    try {
      const result = this.db.exec(`PRAGMA table_info(${tableName})`);

      if (result.length > 0) {
        return result[0].values.map((row: any[]) => ({
          id: row[0] as number,
          name: row[1] as string,
          type: row[2] as string,
          notNull: row[3] === 1,
          defaultValue: row[4],
          primaryKey: row[5] === 1,
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to get table schema:', error);
      return [];
    }
  }

  /**
   * Export database as SQL
   */
  exportSQL(): Uint8Array | string {
    if (!this.db) return '';

    try {
      return this.db.export();
    } catch (error) {
      console.error('Failed to export database:', error);
      return '';
    }
  }

  /**
   * Close database connection
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export default SQLManager;
