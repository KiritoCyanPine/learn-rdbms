-- Airtel Network - Sample Data
-- This file populates the database with realistic test data

-- ================================
-- Service Plans
-- ================================

INSERT INTO service_plans (plan_name, plan_type, description, monthly_fee, voice_minutes, data_gb, sms_count, validity_days) VALUES
    -- Prepaid Plans
    ('Prepaid Basic', 'prepaid', 'Basic prepaid plan with essential services', 199.00, 300, 1, 100, 28),
    ('Prepaid Plus', 'prepaid', 'Enhanced prepaid with more data', 399.00, 1000, 3, 300, 28),
    ('Prepaid Premium', 'prepaid', 'Premium prepaid with unlimited calling', 599.00, 999999, 10, 1000, 28),
    ('Prepaid Data', 'prepaid', 'Data-focused plan for internet users', 299.00, 100, 5, 50, 28),
    
    -- Postpaid Plans
    ('Postpaid Starter', 'postpaid', 'Entry-level postpaid plan', 499.00, 1500, 5, 500, 30),
    ('Postpaid Family', 'postpaid', 'Family plan with shared benefits', 999.00, 5000, 20, 2000, 30),
    ('Postpaid Business', 'postpaid', 'Business plan with priority support', 1499.00, 999999, 50, 5000, 30),
    ('Postpaid Enterprise', 'postpaid', 'Enterprise solution', 2999.00, 999999, 100, 999999, 30);

-- ================================
-- Network Towers
-- ================================

INSERT INTO network_towers (tower_code, location_name, address, city, state, latitude, longitude, coverage_radius_km, technology, capacity, status, installed_date) VALUES
    ('DEL-001', 'Connaught Place', 'CP, Central Delhi', 'Delhi', 'Delhi', 28.631160, 77.219330, 2.5, '5G', 1000, 'active', '2022-01-15'),
    ('DEL-002', 'Nehru Place', 'Nehru Place Metro', 'Delhi', 'Delhi', 28.549490, 77.250700, 2.0, '4G', 800, 'active', '2021-06-20'),
    ('MUM-001', 'Bandra West', 'Linking Road', 'Mumbai', 'Maharashtra', 19.059980, 72.829560, 3.0, '5G', 1200, 'active', '2022-03-10'),
    ('MUM-002', 'Andheri East', 'MIDC Area', 'Mumbai', 'Maharashtra', 19.118870, 72.868020, 2.5, '4G', 900, 'active', '2021-08-15'),
    ('BLR-001', 'Koramangala', '80 Feet Road', 'Bangalore', 'Karnataka', 12.935150, 77.625480, 2.0, '5G', 1000, 'active', '2022-05-20'),
    ('BLR-002', 'Whitefield', 'ITPL Main Road', 'Bangalore', 'Karnataka', 12.969910, 77.749080, 3.5, '4G', 1100, 'active', '2021-09-10'),
    ('CHN-001', 'T Nagar', 'Pondy Bazaar', 'Chennai', 'Tamil Nadu', 13.041540, 80.234380, 2.2, '4G', 850, 'active', '2021-07-25'),
    ('HYD-001', 'Hitec City', 'Cyber Towers', 'Hyderabad', 'Telangana', 17.443440, 78.377690, 2.8, '5G', 1050, 'active', '2022-02-14');

-- ================================
-- Customers
-- ================================

INSERT INTO customers (phone_number, name, email, address, city, state, pin_code, date_of_birth, registration_date, status, current_balance) VALUES
    ('+919876543210', 'Rajesh Kumar', 'rajesh.kumar@email.com', '123 MG Road', 'Delhi', 'Delhi', '110001', '1985-03-15', '2022-01-10', 'active', 250.00),
    ('+919876543211', 'Priya Sharma', 'priya.sharma@email.com', '45 Linking Road', 'Mumbai', 'Maharashtra', '400050', '1990-07-22', '2022-02-15', 'active', 500.00),
    ('+919876543212', 'Amit Patel', 'amit.patel@email.com', '78 Ring Road', 'Bangalore', 'Karnataka', '560001', '1988-11-30', '2022-03-20', 'active', 150.00),
    ('+919876543213', 'Sneha Reddy', 'sneha.reddy@email.com', '90 Jubilee Hills', 'Hyderabad', 'Telangana', '500033', '1992-05-18', '2022-04-25', 'active', 750.00),
    ('+919876543214', 'Vikram Singh', 'vikram.singh@email.com', '12 Park Street', 'Delhi', 'Delhi', '110002', '1987-09-08', '2022-05-30', 'active', 300.00),
    ('+919876543215', 'Anjali Desai', 'anjali.desai@email.com', '34 Marine Drive', 'Mumbai', 'Maharashtra', '400020', '1995-02-14', '2022-06-10', 'active', 450.00),
    ('+919876543216', 'Rahul Verma', 'rahul.verma@email.com', '56 Brigade Road', 'Bangalore', 'Karnataka', '560025', '1989-12-25', '2022-07-15', 'active', 200.00),
    ('+919876543217', 'Kavya Iyer', 'kavya.iyer@email.com', '67 Anna Nagar', 'Chennai', 'Tamil Nadu', '600040', '1991-08-03', '2022-08-20', 'active', 600.00),
    ('+919876543218', 'Arjun Mehta', 'arjun.mehta@email.com', '89 Sector 29', 'Delhi', 'Delhi', '110003', '1986-04-17', '2023-01-05', 'active', 100.00),
    ('+919876543219', 'Pooja Gupta', 'pooja.gupta@email.com', '101 Banjara Hills', 'Hyderabad', 'Telangana', '500034', '1993-06-29', '2023-02-10', 'active', 350.00),
    ('+919876543220', 'Karan Malhotra', 'karan.m@email.com', '23 Golf Course Road', 'Delhi', 'Delhi', '110004', '1984-10-12', '2023-03-15', 'suspended', -50.00),
    ('+919876543221', 'Neha Kapoor', 'neha.kapoor@email.com', '45 Indiranagar', 'Bangalore', 'Karnataka', '560038', '1994-01-20', '2023-04-20', 'active', 800.00);

-- ================================
-- Customer Plan Subscriptions
-- ================================

INSERT INTO customer_plans (customer_id, plan_id, start_date, end_date, status, auto_renew) VALUES
    -- Active subscriptions
    (1, 3, '2024-01-01', '2024-01-29', 'active', 1),
    (2, 6, '2024-01-10', '2024-02-10', 'active', 1),
    (3, 4, '2024-01-15', '2024-02-12', 'active', 1),
    (4, 7, '2024-01-20', '2024-02-20', 'active', 1),
    (5, 2, '2024-02-01', '2024-03-01', 'active', 1),
    (6, 5, '2024-02-05', '2024-03-05', 'active', 1),
    (7, 3, '2024-02-10', '2024-03-10', 'active', 1),
    (8, 8, '2024-02-15', '2024-03-15', 'active', 1),
    (9, 1, '2024-02-20', '2024-03-20', 'active', 1),
    (10, 6, '2024-02-25', '2024-03-25', 'active', 1),
    (11, 2, '2024-01-01', '2024-01-29', 'expired', 0),
    (12, 7, '2024-01-15', '2024-02-15', 'active', 1),
    
    -- Historical subscriptions
    (1, 1, '2022-01-10', '2022-12-31', 'expired', 0),
    (2, 5, '2022-02-15', '2023-12-31', 'cancelled', 0);

-- ================================
-- Call Records (CDR)
-- ================================

-- Voice calls
INSERT INTO call_records (customer_id, call_type, destination_number, tower_id, start_time, end_time, duration_seconds, cost, billing_status) VALUES
    (1, 'voice', '+919999999001', 1, '2024-02-01 09:15:00', '2024-02-01 09:20:30', 330, 0.00, 'free'),
    (1, 'voice', '+919999999002', 1, '2024-02-02 14:30:00', '2024-02-02 14:45:15', 915, 0.00, 'free'),
    (2, 'voice', '+919999999003', 3, '2024-02-01 10:00:00', '2024-02-01 10:25:00', 1500, 0.00, 'free'),
    (3, 'voice', '+919999999004', 5, '2024-02-01 16:20:00', '2024-02-01 16:28:45', 525, 0.00, 'free'),
    (4, 'voice', '+919999999005', 8, '2024-02-02 11:30:00', '2024-02-02 12:00:30', 1830, 0.00, 'free'),
    (5, 'voice', '+919999999006', 2, '2024-02-02 15:45:00', '2024-02-02 15:52:20', 440, 0.00, 'free'),
    
    -- SMS
    (1, 'sms', '+919999999010', 1, '2024-02-01 08:30:00', '2024-02-01 08:30:01', NULL, 0.00, 'free'),
    (2, 'sms', '+919999999011', 3, '2024-02-01 12:15:00', '2024-02-01 12:15:01', NULL, 0.00, 'free'),
    (3, 'sms', '+919999999012', 5, '2024-02-02 09:45:00', '2024-02-02 09:45:01', NULL, 0.00, 'free'),
    (4, 'sms', '+919999999013', 8, '2024-02-02 14:20:00', '2024-02-02 14:20:01', NULL, 0.00, 'free'),
    
    -- Data sessions
    (1, 'data', NULL, 1, '2024-02-01 07:00:00', '2024-02-01 07:30:00', 1800, 0.00, 'free'),
    (1, 'data', NULL, 1, '2024-02-01 19:00:00', '2024-02-01 20:15:00', 4500, 0.00, 'free'),
    (2, 'data', NULL, 3, '2024-02-01 10:30:00', '2024-02-01 11:45:00', 4500, 0.00, 'free'),
    (3, 'data', NULL, 5, '2024-02-01 15:00:00', '2024-02-01 16:30:00', 5400, 0.00, 'free'),
    (4, 'data', NULL, 8, '2024-02-02 08:00:00', '2024-02-02 09:30:00', 5400, 0.00, 'free');

-- Update data_mb for data sessions
UPDATE call_records SET data_mb = 150.5 WHERE call_id = 11;
UPDATE call_records SET data_mb = 320.75 WHERE call_id = 12;
UPDATE call_records SET data_mb = 280.25 WHERE call_id = 13;
UPDATE call_records SET data_mb = 410.50 WHERE call_id = 14;
UPDATE call_records SET data_mb = 380.90 WHERE call_id = 15;

-- ================================
-- Usage Quotas
-- ================================

INSERT INTO usage_quotas (subscription_id, billing_period, voice_minutes_used, data_mb_used, sms_used) VALUES
    (1, '2024-02', 45, 471, 12),
    (2, '2024-02', 128, 280, 8),
    (3, '2024-02', 32, 411, 5),
    (4, '2024-02', 156, 381, 15),
    (5, '2024-02', 22, 125, 7);

-- ================================
-- Billing Records
-- ================================

INSERT INTO billing_records (customer_id, subscription_id, billing_period, plan_charges, usage_charges, taxes, discounts, total_amount, due_date, payment_date, payment_method, status) VALUES
    -- January 2024 bills (all paid)
    (1, 1, '2024-01', 599.00, 0.00, 107.82, 0.00, 706.82, '2024-02-05', '2024-02-03', 'upi', 'paid'),
    (2, 2, '2024-01', 999.00, 0.00, 179.82, 0.00, 1178.82, '2024-02-10', '2024-02-08', 'credit_card', 'paid'),
    (3, 3, '2024-01', 299.00, 0.00, 53.82, 0.00, 352.82, '2024-02-15', '2024-02-12', 'debit_card', 'paid'),
    (4, 4, '2024-01', 1499.00, 0.00, 269.82, 0.00, 1768.82, '2024-02-20', '2024-02-18', 'net_banking', 'paid'),
    
    -- February 2024 bills (mixed status)
    (1, 1, '2024-02', 599.00, 0.00, 107.82, 0.00, 706.82, '2024-03-05', NULL, NULL, 'pending'),
    (2, 2, '2024-02', 999.00, 0.00, 179.82, 0.00, 1178.82, '2024-03-10', '2024-03-08', 'upi', 'paid'),
    (3, 3, '2024-02', 299.00, 0.00, 53.82, 0.00, 352.82, '2024-03-15', NULL, NULL, 'pending'),
    (4, 4, '2024-02', 1499.00, 0.00, 269.82, 0.00, 1768.82, '2024-03-20', NULL, NULL, 'pending'),
    (5, 5, '2024-02', 399.00, 0.00, 71.82, 0.00, 470.82, '2024-03-01', NULL, NULL, 'overdue'),
    (11, 11, '2024-01', 399.00, 0.00, 71.82, 0.00, 470.82, '2024-02-01', NULL, NULL, 'overdue');

-- ================================
-- Payment Transactions
-- ================================

INSERT INTO payment_transactions (customer_id, bill_id, amount, payment_method, transaction_reference, transaction_status, transaction_date) VALUES
    (1, 1, 706.82, 'upi', 'UPI2024020312345', 'completed', '2024-02-03 14:30:00'),
    (2, 2, 1178.82, 'credit_card', 'CC2024020867890', 'completed', '2024-02-08 10:15:00'),
    (3, 3, 352.82, 'debit_card', 'DC2024021234567', 'completed', '2024-02-12 16:45:00'),
    (4, 4, 1768.82, 'net_banking', 'NB2024021898765', 'completed', '2024-02-18 09:20:00'),
    (2, 6, 1178.82, 'upi', 'UPI2024030854321', 'completed', '2024-03-08 11:30:00'),
    
    -- Failed transaction example
    (5, 9, 470.82, 'credit_card', 'CC2024030112345', 'failed', '2024-03-01 18:00:00');

-- ================================
-- Data Verification Queries
-- ================================

-- These queries help verify the data was inserted correctly

-- Total customers by status
-- SELECT status, COUNT(*) FROM customers GROUP BY status;

-- Active subscriptions summary
-- SELECT sp.plan_name, sp.plan_type, COUNT(*) as subscribers
-- FROM customer_plans cp
-- JOIN service_plans sp ON cp.plan_id = sp.plan_id
-- WHERE cp.status = 'active'
-- GROUP BY sp.plan_id, sp.plan_name, sp.plan_type;

-- Call records summary
-- SELECT call_type, COUNT(*) as count FROM call_records GROUP BY call_type;

-- Revenue summary by period
-- SELECT billing_period, status, COUNT(*) as bills, SUM(total_amount) as revenue
-- FROM billing_records
-- GROUP BY billing_period, status
-- ORDER BY billing_period DESC, status;

-- Tower usage summary
-- SELECT t.tower_code, t.city, COUNT(cr.call_id) as calls
-- FROM network_towers t
-- LEFT JOIN call_records cr ON t.tower_id = cr.tower_id
-- GROUP BY t.tower_id, t.tower_code, t.city;
