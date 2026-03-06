package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// Config holds database configuration
type Config struct {
	Driver   string // "sqlite3" or "postgres"
	DSN      string // Data Source Name / Connection String
	MaxConns int    // Maximum open connections
	MaxIdle  int    // Maximum idle connections
	ConnTTL  time.Duration
}

// NewConnection creates a new database connection
// TODO: Implement this function to accept Config and return *sql.DB
func NewConnection(config Config) (*sql.DB, error) {
	// TODO: Open database connection
	// db, err := sql.Open(config.Driver, config.DSN)
	// if err != nil {
	//     return nil, fmt.Errorf("failed to open database: %w", err)
	// }

	// TODO: Configure connection pool
	// db.SetMaxOpenConns(config.MaxConns)
	// db.SetMaxIdleConns(config.MaxIdle)
	// db.SetConnMaxLifetime(config.ConnTTL)

	// TODO: Test the connection
	// if err := db.Ping(); err != nil {
	//     return nil, fmt.Errorf("failed to ping database: %w", err)
	// }

	return nil, fmt.Errorf("not implemented")
}

// DefaultSQLiteConfig returns default configuration for SQLite
func DefaultSQLiteConfig(dbPath string) Config {
	return Config{
		Driver:   "sqlite3",
		DSN:      dbPath,
		MaxConns: 25,
		MaxIdle:  5,
		ConnTTL:  5 * time.Minute,
	}
}

// DefaultPostgresConfig returns default configuration for PostgreSQL
func DefaultPostgresConfig(host, port, user, password, dbname string) Config {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)
	return Config{
		Driver:   "postgres",
		DSN:      dsn,
		MaxConns: 25,
		MaxIdle:  5,
		ConnTTL:  5 * time.Minute,
	}
}

// HealthCheck performs a database health check
// TODO: Implement this function
func HealthCheck(db *sql.DB) error {
	// TODO: Ping the database
	// TODO: Optionally run a simple query
	// TODO: Check connection pool stats
	return fmt.Errorf("not implemented")
}

// Close gracefully closes the database connection
func Close(db *sql.DB) error {
	if db == nil {
		return nil
	}
	return db.Close()
}

// ExecuteInTransaction executes a function within a transaction
// Automatically commits on success, rolls back on error
// TODO: Implement this helper function
func ExecuteInTransaction(db *sql.DB, fn func(*sql.Tx) error) error {
	// TODO: Begin transaction
	// tx, err := db.Begin()
	// if err != nil {
	//     return fmt.Errorf("failed to begin transaction: %w", err)
	// }

	// TODO: Defer rollback (will be no-op if committed)
	// defer tx.Rollback()

	// TODO: Execute the provided function
	// if err := fn(tx); err != nil {
	//     return err
	// }

	// TODO: Commit transaction
	// if err := tx.Commit(); err != nil {
	//     return fmt.Errorf("failed to commit transaction: %w", err)
	// }

	return fmt.Errorf("not implemented")
}
