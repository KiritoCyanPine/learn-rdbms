# Airtel Network Management System - Makefile

# Variables
DB_NAME=airtel.db
DB_DIR=database
GO=go
SQLITE=sqlite3

# Default target
.PHONY: help
help:
	@echo "Airtel Network Management System"
	@echo ""
	@echo "Available targets:"
	@echo "  make setup-db    - Create database and tables"
	@echo "  make seed-db     - Populate database with sample data"
	@echo "  make reset-db    - Drop and recreate database"
	@echo "  make clean-db    - Delete database file"
	@echo "  make query-db    - Open interactive SQL shell"
	@echo "  make deps        - Install Go dependencies"
	@echo "  make build       - Build the application"
	@echo "  make run         - Run the application"
	@echo "  make test        - Run tests"
	@echo "  make test-verbose - Run tests with verbose output"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make fmt         - Format Go code"
	@echo "  make lint        - Run linter (requires golangci-lint)"

# Database operations
.PHONY: setup-db
setup-db:
	@echo "Creating database and tables..."
	@$(SQLITE) $(DB_NAME) < $(DB_DIR)/schema.sql
	@echo "Database created successfully!"
	@echo "Tables:"
	@$(SQLITE) $(DB_NAME) ".tables"

.PHONY: seed-db
seed-db:
	@echo "Populating database with sample data..."
	@$(SQLITE) $(DB_NAME) < $(DB_DIR)/seed-data.sql
	@echo "Sample data loaded successfully!"
	@echo "Record counts:"
	@$(SQLITE) $(DB_NAME) "SELECT 'Customers: ' || COUNT(*) FROM customers; \
		SELECT 'Service Plans: ' || COUNT(*) FROM service_plans; \
		SELECT 'Network Towers: ' || COUNT(*) FROM network_towers; \
		SELECT 'Call Records: ' || COUNT(*) FROM call_records; \
		SELECT 'Billing Records: ' || COUNT(*) FROM billing_records;"

.PHONY: reset-db
reset-db: clean-db setup-db seed-db
	@echo "Database reset complete!"

.PHONY: clean-db
clean-db:
	@echo "Deleting database..."
	@rm -f $(DB_NAME)
	@echo "Database deleted!"

.PHONY: query-db
query-db:
	@echo "Opening interactive SQL shell..."
	@echo "Use .quit to exit, .help for commands, .tables to list tables"
	@$(SQLITE) $(DB_NAME)

# Go operations
.PHONY: deps
deps:
	@echo "Installing dependencies..."
	@$(GO) mod download
	@$(GO) mod tidy
	@echo "Dependencies installed!"

.PHONY: build
build: deps
	@echo "Building application..."
	@$(GO) build -o bin/airtel-network cmd/main.go
	@echo "Build complete! Binary: bin/airtel-network"

.PHONY: run
run:
	@echo "Running application..."
	@$(GO) run cmd/main.go

.PHONY: test
test:
	@echo "Running tests..."
	@$(GO) test ./... -cover

.PHONY: test-verbose
test-verbose:
	@echo "Running tests with verbose output..."
	@$(GO) test -v ./... -cover

.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf bin/
	@$(GO) clean
	@echo "Clean complete!"

.PHONY: fmt
fmt:
	@echo "Formatting code..."
	@$(GO) fmt ./...
	@echo "Format complete!"

.PHONY: lint
lint:
	@echo "Running linter..."
	@which golangci-lint > /dev/null || (echo "golangci-lint not installed. Install from https://golangci-lint.run/usage/install/" && exit 1)
	@golangci-lint run
	@echo "Lint complete!"

# Development helpers
.PHONY: dev-setup
dev-setup: deps reset-db
	@echo "Development environment setup complete!"
	@echo "Run 'make run' to start the application"

.PHONY: quick-test
quick-test: reset-db
	@echo "Running quick integration test..."
	@$(GO) test ./internal/customer -v

# Database queries for monitoring
.PHONY: show-customers
show-customers:
	@$(SQLITE) $(DB_NAME) "SELECT customer_id, phone_number, name, status, current_balance FROM customers;"

.PHONY: show-plans
show-plans:
	@$(SQLITE) $(DB_NAME) "SELECT plan_id, plan_name, plan_type, monthly_fee FROM service_plans WHERE is_active = 1;"

.PHONY: show-revenue
show-revenue:
	@$(SQLITE) $(DB_NAME) "SELECT billing_period, COUNT(*) as bills, SUM(total_amount) as revenue FROM billing_records GROUP BY billing_period ORDER BY billing_period DESC;"

.PHONY: show-usage
show-usage:
	@$(SQLITE) $(DB_NAME) "SELECT c.name, COUNT(cr.call_id) as total_calls, SUM(cr.duration_seconds)/60 as minutes FROM customers c LEFT JOIN call_records cr ON c.customer_id = cr.customer_id GROUP BY c.customer_id, c.name ORDER BY total_calls DESC LIMIT 10;"
