-- Airtel Network Management System - Database Schema
-- SQLite version (will be adapted for PostgreSQL later)

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- ================================
-- Core Tables
-- ================================

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    address TEXT,
    city TEXT,
    state TEXT,
    pin_code TEXT,
    date_of_birth DATE,
    registration_date DATE DEFAULT CURRENT_DATE,
    status TEXT CHECK(status IN ('active', 'suspended', 'terminated')) DEFAULT 'active',
    current_balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service plans table
CREATE TABLE IF NOT EXISTS service_plans (
    plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_name TEXT NOT NULL UNIQUE,
    plan_type TEXT CHECK(plan_type IN ('prepaid', 'postpaid')) NOT NULL,
    description TEXT,
    monthly_fee DECIMAL(10, 2) NOT NULL CHECK(monthly_fee >= 0),
    voice_minutes INTEGER DEFAULT 0,
    data_gb INTEGER DEFAULT 0,
    sms_count INTEGER DEFAULT 0,
    validity_days INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customer plan subscriptions (junction table)
CREATE TABLE IF NOT EXISTS customer_plans (
    subscription_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    status TEXT CHECK(status IN ('active', 'expired', 'cancelled')) DEFAULT 'active',
    auto_renew BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (plan_id) REFERENCES service_plans(plan_id)
);

-- Billing records table
CREATE TABLE IF NOT EXISTS billing_records (
    bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    subscription_id INTEGER,
    billing_period TEXT NOT NULL, -- Format: YYYY-MM
    plan_charges DECIMAL(10, 2) DEFAULT 0.00,
    usage_charges DECIMAL(10, 2) DEFAULT 0.00,
    taxes DECIMAL(10, 2) DEFAULT 0.00,
    discounts DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    payment_method TEXT,
    status TEXT CHECK(status IN ('pending', 'paid', 'overdue', 'cancelled')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (subscription_id) REFERENCES customer_plans(subscription_id),
    UNIQUE(customer_id, billing_period)
);

-- Network towers table
CREATE TABLE IF NOT EXISTS network_towers (
    tower_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tower_code TEXT NOT NULL UNIQUE,
    location_name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    coverage_radius_km DECIMAL(5, 2),
    technology TEXT CHECK(technology IN ('2G', '3G', '4G', '5G')) DEFAULT '4G',
    capacity INTEGER, -- Max concurrent connections
    status TEXT CHECK(status IN ('active', 'maintenance', 'offline')) DEFAULT 'active',
    installed_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Call Detail Records (CDR) table
CREATE TABLE IF NOT EXISTS call_records (
    call_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    call_type TEXT CHECK(call_type IN ('voice', 'sms', 'data')) NOT NULL,
    destination_number TEXT,
    tower_id INTEGER,
    start_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME,
    duration_seconds INTEGER, -- For voice calls
    data_mb DECIMAL(10, 3), -- For data sessions
    sms_count INTEGER DEFAULT 1, -- For SMS
    cost DECIMAL(10, 4) DEFAULT 0.00,
    billing_status TEXT CHECK(billing_status IN ('unbilled', 'billed', 'free')) DEFAULT 'unbilled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (tower_id) REFERENCES network_towers(tower_id)
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    bill_id INTEGER,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method TEXT CHECK(payment_method IN ('credit_card', 'debit_card', 'upi', 'net_banking', 'cash', 'wallet')) NOT NULL,
    transaction_reference TEXT UNIQUE,
    transaction_status TEXT CHECK(transaction_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (bill_id) REFERENCES billing_records(bill_id)
);

-- Usage quotas tracking table
CREATE TABLE IF NOT EXISTS usage_quotas (
    quota_id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription_id INTEGER NOT NULL,
    billing_period TEXT NOT NULL, -- Format: YYYY-MM
    voice_minutes_used INTEGER DEFAULT 0,
    data_mb_used INTEGER DEFAULT 0,
    sms_used INTEGER DEFAULT 0,
    voice_overage_minutes INTEGER DEFAULT 0,
    data_overage_mb INTEGER DEFAULT 0,
    sms_overage INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES customer_plans(subscription_id),
    UNIQUE(subscription_id, billing_period)
);

-- ================================
-- Indexes for Performance
-- ================================

-- Customer indexes
CREATE INDEX idx_customers_phone ON customers(phone_number);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);

-- Customer plans indexes
CREATE INDEX idx_customer_plans_customer ON customer_plans(customer_id);
CREATE INDEX idx_customer_plans_plan ON customer_plans(plan_id);
CREATE INDEX idx_customer_plans_status ON customer_plans(status);
CREATE INDEX idx_customer_plans_dates ON customer_plans(start_date, end_date);

-- Billing indexes
CREATE INDEX idx_billing_customer ON billing_records(customer_id);
CREATE INDEX idx_billing_period ON billing_records(billing_period);
CREATE INDEX idx_billing_status ON billing_records(status);
CREATE INDEX idx_billing_due_date ON billing_records(due_date);

-- Call records indexes (critical for performance)
CREATE INDEX idx_call_records_customer ON call_records(customer_id);
CREATE INDEX idx_call_records_time ON call_records(start_time);
CREATE INDEX idx_call_records_customer_time ON call_records(customer_id, start_time);
CREATE INDEX idx_call_records_type ON call_records(call_type);
CREATE INDEX idx_call_records_tower ON call_records(tower_id);
CREATE INDEX idx_call_records_billing_status ON call_records(billing_status);

-- Tower indexes
CREATE INDEX idx_towers_status ON network_towers(status);
CREATE INDEX idx_towers_city ON network_towers(city);

-- Payment indexes
CREATE INDEX idx_payments_customer ON payment_transactions(customer_id);
CREATE INDEX idx_payments_bill ON payment_transactions(bill_id);
CREATE INDEX idx_payments_date ON payment_transactions(transaction_date);
CREATE INDEX idx_payments_status ON payment_transactions(transaction_status);

-- ================================
-- Triggers for Automatic Updates
-- ================================

-- Update customer updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_customer_timestamp 
AFTER UPDATE ON customers
FOR EACH ROW
BEGIN
    UPDATE customers SET updated_at = CURRENT_TIMESTAMP WHERE customer_id = NEW.customer_id;
END;

-- Update current_balance when payment is made
CREATE TRIGGER IF NOT EXISTS update_balance_on_payment
AFTER INSERT ON payment_transactions
FOR EACH ROW
WHEN NEW.transaction_status = 'completed'
BEGIN
    UPDATE customers 
    SET current_balance = current_balance + NEW.amount
    WHERE customer_id = NEW.customer_id;
END;

-- ================================
-- Views for Common Queries
-- ================================

-- Active customers with their current plan
CREATE VIEW IF NOT EXISTS vw_active_customers AS
SELECT 
    c.customer_id,
    c.phone_number,
    c.name,
    c.email,
    c.status AS customer_status,
    c.current_balance,
    cp.subscription_id,
    sp.plan_name,
    sp.plan_type,
    sp.monthly_fee,
    cp.start_date,
    cp.end_date,
    cp.status AS subscription_status
FROM customers c
LEFT JOIN customer_plans cp ON c.customer_id = cp.customer_id AND cp.status = 'active'
LEFT JOIN service_plans sp ON cp.plan_id = sp.plan_id
WHERE c.status = 'active';

-- Monthly revenue summary
CREATE VIEW IF NOT EXISTS vw_monthly_revenue AS
SELECT 
    billing_period,
    COUNT(DISTINCT customer_id) AS customers_billed,
    COUNT(*) AS total_bills,
    SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS revenue_collected,
    SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) AS revenue_pending,
    SUM(CASE WHEN status = 'overdue' THEN total_amount ELSE 0 END) AS revenue_overdue,
    SUM(total_amount) AS total_revenue
FROM billing_records
GROUP BY billing_period;

-- Tower usage statistics
CREATE VIEW IF NOT EXISTS vw_tower_stats AS
SELECT 
    t.tower_id,
    t.tower_code,
    t.location_name,
    t.city,
    t.status,
    COUNT(cr.call_id) AS total_calls,
    SUM(CASE WHEN cr.call_type = 'voice' THEN 1 ELSE 0 END) AS voice_calls,
    SUM(CASE WHEN cr.call_type = 'sms' THEN 1 ELSE 0 END) AS sms_count,
    SUM(CASE WHEN cr.call_type = 'data' THEN 1 ELSE 0 END) AS data_sessions,
    SUM(cr.data_mb) AS total_data_mb
FROM network_towers t
LEFT JOIN call_records cr ON t.tower_id = cr.tower_id
GROUP BY t.tower_id, t.tower_code, t.location_name, t.city, t.status;

-- ================================
-- Comments for Documentation
-- ================================

-- This schema is designed for:
-- 1. Customer management and relationship
-- 2. Flexible plan subscriptions (customers can have multiple plans)
-- 3. Detailed CDR tracking for accurate billing
-- 4. Network infrastructure monitoring
-- 5. Financial transactions and billing cycles
-- 6. Usage tracking and quota management

-- Key design decisions:
-- - Soft deletes using status fields (preserve historical data)
-- - Separate usage tracking from call records for performance
-- - Indexed heavily on time-based queries (most common in telecom)
-- - Normalized to 3NF to prevent data anomalies
-- - Views for complex queries used frequently in reporting
