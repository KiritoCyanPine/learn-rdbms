# Setup Guide

This guide will help you set up your development environment for learning relational databases and SQL.

## Table of Contents

- [SQLite Installation](#sqlite-installation)
- [PostgreSQL Installation](#postgresql-installation)
- [Go Installation](#go-installation)
- [Database Drivers](#database-drivers)
- [IDE Setup](#ide-setup)
- [Verification](#verification)

---

## SQLite Installation

SQLite is a lightweight, file-based database that's perfect for learning and development.

### macOS

SQLite comes pre-installed on macOS. To verify or upgrade:

```bash
# Check if SQLite is installed
sqlite3 --version

# If you need the latest version, use Homebrew
brew install sqlite3
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install sqlite3 libsqlite3-dev
```

### Linux (Fedora/RHEL)

```bash
sudo dnf install sqlite sqlite-devel
```

### Windows

Download from the [official SQLite website](https://www.sqlite.org/download.html):

1. Download the "sqlite-tools" bundle
2. Extract to `C:\sqlite`
3. Add `C:\sqlite` to your PATH environment variable

### Verification

```bash
sqlite3 --version
# Expected output: 3.x.x (version number)
```

---

## PostgreSQL Installation

PostgreSQL is a production-grade relational database. We'll use it later in the learning path for advanced features.

### macOS

```bash
# Using Homebrew (recommended)
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Linux (Ubuntu/Debian)

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Install PostgreSQL
sudo apt update
sudo apt install postgresql-16 postgresql-contrib-16

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Linux (Fedora/RHEL)

```bash
sudo dnf install postgresql16-server postgresql16-contrib
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows

1. Download from [PostgreSQL official website](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Follow the installation wizard (default settings are fine)
4. Remember the password you set for the `postgres` user

### Initial PostgreSQL Setup

```bash
# Access PostgreSQL CLI (macOS/Linux)
psql postgres

# On Linux, you may need to switch to postgres user first
sudo -u postgres psql

# Inside psql, create a user and database
CREATE USER airtel_user WITH PASSWORD 'your_password';
CREATE DATABASE airtel_network OWNER airtel_user;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE airtel_network TO airtel_user;

# Exit psql
\q
```

### Verification

```bash
psql --version
# Expected output: psql (PostgreSQL) 16.x
```

---

## Go Installation

Go is required for the practical projects in this roadmap.

### macOS

```bash
# Using Homebrew (recommended)
brew install go

# Or download from official website
# https://go.dev/dl/
```

### Linux

```bash
# Download the latest version (check https://go.dev/dl/ for current version)
wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz

# Remove any previous Go installation and extract
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz

# Add to PATH
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export PATH=$PATH:$HOME/go/bin' >> ~/.bashrc
source ~/.bashrc
```

### Windows

1. Download installer from [Go official website](https://go.dev/dl/)
2. Run the MSI installer
3. Follow the installation wizard

### Go Environment Setup

```bash
# Set GOPATH (optional, defaults to ~/go)
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# Verify installation
go version
# Expected output: go version go1.21.x
```

---

## Database Drivers

Install Go database drivers for both SQLite and PostgreSQL.

### SQLite Driver

```bash
# Navigate to your project directory
cd /path/to/airtel-network

# Initialize Go module (if not already done)
go mod init github.com/yourusername/airtel-network

# Install SQLite driver
go get github.com/mattn/go-sqlite3

# Note: This requires gcc/clang to be installed
# macOS: Install Xcode Command Line Tools
xcode-select --install

# Linux: Install build-essential
sudo apt install build-essential  # Ubuntu/Debian
sudo dnf groupinstall "Development Tools"  # Fedora/RHEL
```

### PostgreSQL Driver

```bash
# Install PostgreSQL driver (pure Go, no C dependencies)
go get github.com/lib/pq

# Verify installation
go mod tidy
```

---

## IDE Setup

### VS Code (Recommended)

1. **Install VS Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install Extensions**
   - **SQLite Viewer**: `alexcvzz.vscode-sqlite`
   - **PostgreSQL**: `ckolkman.vscode-postgres`
   - **Go**: `golang.go`
   - **Database Client**: `cweijan.vscode-database-client2` (optional)

3. **Configure Go Extension**
   ```
   Open Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
   Type: "Go: Install/Update Tools"
   Select all tools and click OK
   ```

### Other IDEs

- **IntelliJ IDEA / GoLand**: Built-in database tools, excellent Go support
- **DataGrip**: JetBrains IDE specifically for databases
- **DBeaver**: Free, cross-platform database tool

---

## Verification

Run these commands to verify your setup:

```bash
# Check SQLite
sqlite3 --version

# Check PostgreSQL
psql --version

# Check Go
go version

# Check build tools (for SQLite CGO)
gcc --version  # or clang --version on macOS

# Test SQLite connection
sqlite3 test.db "SELECT 'SQLite works!';"
rm test.db

# Test PostgreSQL connection (replace with your credentials)
psql -U postgres -c "SELECT 'PostgreSQL works!';"

# Test Go environment
go env GOPATH
go env GOROOT
```

---

## Quick Start

Once everything is installed:

```bash
# Clone or navigate to the learning repository
cd /path/to/learn-rdbms

# Start with exercises
cd exercises/01-sql-basics
make setup-db  # If using provided Makefile
# Or manually:
sqlite3 bookstore.db < schema.sql

# For the Airtel project
cd projects/airtel-network
make deps        # Install Go dependencies
make setup-db    # Create database
make seed-db     # Load sample data
make run         # Run the application
```

---

## Troubleshooting

### SQLite CGO Issues

If you get errors about CGO when installing go-sqlite3:

```bash
# Enable CGO
export CGO_ENABLED=1

# macOS: Install Xcode Command Line Tools
xcode-select --install

# Linux: Install build tools
sudo apt install build-essential  # Ubuntu/Debian
```

### PostgreSQL Connection Issues

If you can't connect to PostgreSQL:

```bash
# Check if service is running
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Reset password if needed
# macOS/Linux
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'newpassword';
```

### Go Module Issues

If you encounter Go module errors:

```bash
# Clean module cache
go clean -modcache

# Re-download dependencies
go mod download
go mod tidy
```

---

## Next Steps

1. **Start with Exercises**: Begin with `exercises/01-sql-basics`
2. **Read the Main README**: Review concepts in the main `README.md`
3. **Practice Daily**: SQL skills improve with consistent practice
4. **Build the Project**: Work through the Airtel Network project step by step
5. **Join Community**: Ask questions on Stack Overflow, Reddit's r/SQL, or PostgreSQL forums

---

## Additional Resources

- **SQLite Documentation**: https://www.sqlite.org/docs.html
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Go Database/SQL Tutorial**: https://go.dev/doc/database/
- **SQL Learning Resources**: See main README.md for curated links
- **Practice Platforms**:
  - SQLZoo: https://sqlzoo.net/
  - LeetCode SQL: https://leetcode.com/problemset/database/
  - HackerRank SQL: https://www.hackerrank.com/domains/sql

---

## Support

If you encounter issues not covered here:

1. Check the main README.md FAQ section
2. Search existing issues on GitHub
3. Create a new issue with:
   - Your OS and versions
   - Complete error message
   - Steps to reproduce

Happy Learning! 🚀
