package plans

import (
	"database/sql"
	"fmt"
	"time"
)

// ServicePlan represents a service plan
type ServicePlan struct {
	PlanID       int
	PlanName     string
	PlanType     string // 'prepaid' or 'postpaid'
	MonthlyFee   float64
	ValidityDays int
	VoiceMinutes int
	SMSCount     int
	DataMB       int
	Description  string
	IsActive     bool
	CreatedAt    time.Time
}

// CustomerPlan represents a customer's subscription to a plan
type CustomerPlan struct {
	SubscriptionID int
	CustomerID     int
	PlanID         int
	StartDate      time.Time
	EndDate        *time.Time
	Status         string // 'active', 'expired', 'cancelled'
	AutoRenew      bool
	CreatedAt      time.Time
}

// Service handles service plan operations
type Service struct {
	db *sql.DB
}

// NewService creates a new plans service
func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

// ListPlans retrieves all active service plans
// TODO: Implement this function
func (s *Service) ListPlans() ([]*ServicePlan, error) {
	// TODO: SELECT * FROM service_plans WHERE is_active = 1 ORDER BY monthly_fee
	return nil, fmt.Errorf("not implemented")
}

// ListPlansByType retrieves plans filtered by type (prepaid/postpaid)
// TODO: Implement this function
func (s *Service) ListPlansByType(planType string) ([]*ServicePlan, error) {
	// TODO: SELECT with WHERE plan_type = ? AND is_active = 1
	return nil, fmt.Errorf("not implemented")
}

// GetPlanByID retrieves a specific plan
// TODO: Implement this function
func (s *Service) GetPlanByID(planID int) (*ServicePlan, error) {
	// TODO: SELECT * FROM service_plans WHERE plan_id = ?
	return nil, fmt.Errorf("not implemented")
}

// SubscribeToPlan subscribes a customer to a plan
// TODO: Implement this function
func (s *Service) SubscribeToPlan(customerID, planID int, autoRenew bool) error {
	// TODO: Begin transaction
	// TODO: Check if customer already has an active subscription
	// TODO: Fetch plan details to calculate end_date (start_date + validity_days)
	// TODO: Insert into customer_plans with status = 'active'
	// TODO: If prepaid, deduct monthly_fee from customer balance
	// TODO: Commit transaction
	return fmt.Errorf("not implemented")
}

// UnsubscribeFromPlan cancels a customer's subscription
// TODO: Implement this function
func (s *Service) UnsubscribeFromPlan(subscriptionID int) error {
	// TODO: UPDATE customer_plans SET status = 'cancelled', end_date = CURRENT_TIMESTAMP
	// WHERE subscription_id = ?
	return fmt.Errorf("not implemented")
}

// GetCustomerActivePlans retrieves all active plans for a customer
// TODO: Implement this function
func (s *Service) GetCustomerActivePlans(customerID int) ([]*CustomerPlan, error) {
	// TODO: SELECT * FROM customer_plans
	// WHERE customer_id = ? AND status = 'active'
	// ORDER BY start_date DESC
	return nil, fmt.Errorf("not implemented")
}

// GetCustomerPlanHistory retrieves plan history for a customer
// TODO: Implement this function
func (s *Service) GetCustomerPlanHistory(customerID int) ([]*CustomerPlan, error) {
	// TODO: SELECT * FROM customer_plans WHERE customer_id = ? ORDER BY start_date DESC
	return nil, fmt.Errorf("not implemented")
}

// GetPlanDetails retrieves plan details for a subscription
// TODO: Implement this function using JOIN
func (s *Service) GetPlanDetails(subscriptionID int) (*ServicePlan, error) {
	// TODO: SELECT sp.* FROM service_plans sp
	// JOIN customer_plans cp ON sp.plan_id = cp.plan_id
	// WHERE cp.subscription_id = ?
	return nil, fmt.Errorf("not implemented")
}

// CheckPlanExpiry checks and updates expired plans
// TODO: Implement this function
func (s *Service) CheckPlanExpiry() error {
	// TODO: UPDATE customer_plans SET status = 'expired'
	// WHERE status = 'active' AND end_date < CURRENT_TIMESTAMP
	// TODO: Optionally send notifications for expired plans
	return fmt.Errorf("not implemented")
}

// RenewPlan renews a customer's plan for another cycle
// TODO: Implement this function
func (s *Service) RenewPlan(subscriptionID int) error {
	// TODO: Begin transaction
	// TODO: Get current subscription and plan details
	// TODO: Check customer balance (for prepaid)
	// TODO: Calculate new end_date
	// TODO: Update subscription with new end_date and status = 'active'
	// TODO: Deduct fee from balance
	// TODO: Commit transaction
	return fmt.Errorf("not implemented")
}

// GetPlanPopularity returns plans ordered by number of active subscriptions
// TODO: Implement this function
func (s *Service) GetPlanPopularity() (map[string]int, error) {
	// TODO: SELECT sp.plan_name, COUNT(cp.subscription_id) as subscriber_count
	// FROM service_plans sp
	// LEFT JOIN customer_plans cp ON sp.plan_id = cp.plan_id AND cp.status = 'active'
	// GROUP BY sp.plan_id, sp.plan_name
	// ORDER BY subscriber_count DESC
	return nil, fmt.Errorf("not implemented")
}

// GetPlanRevenue calculates total revenue per plan
// TODO: Implement this function
func (s *Service) GetPlanRevenue() (map[string]float64, error) {
	// TODO: Use JOIN between service_plans, customer_plans, and billing_records
	// TODO: SUM(total_amount) grouped by plan_name
	return nil, fmt.Errorf("not implemented")
}
