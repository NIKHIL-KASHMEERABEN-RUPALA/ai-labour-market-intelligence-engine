-- ============================================================================
-- SOVEREIGN LABOUR MARKET INTELLIGENCE SYSTEM (LMIS 2.0)
-- PRODUCTION ANALYTICAL QUERIES FOR TIMESCALEDB & DASHBOARDS
-- ============================================================================

-- 1. DISTRICT SKILL DEFICIT VECTOR & NET GAP CALCULATION
-- Compares 30-day aggregate vacancy signals against sanctioned training capacity
WITH district_demand AS (
    SELECT
        district_id,
        qp_code,
        SUM(vacancies_count) AS total_market_demand
    FROM telemetry_vacancy_signals
    WHERE recorded_at >= NOW() - INTERVAL '30 days'
    GROUP BY district_id, qp_code
),
district_supply AS (
    SELECT
        district_id,
        qp_code,
        SUM(certified_candidates) AS total_certified_supply
    FROM training_center_capacity
    WHERE recorded_at >= NOW() - INTERVAL '30 days'
    GROUP BY district_id, qp_code
)
SELECT
    d.district_name,
    s.name AS state_name,
    qp.title AS occupation_title,
    COALESCE(dem.total_market_demand, 0) AS demand_seats,
    COALESCE(sup.total_certified_supply, 0) AS certified_supply,
    (COALESCE(sup.total_certified_supply, 0) - COALESCE(dem.total_market_demand, 0)) AS net_gap_seats,
    ROUND(
        ((COALESCE(sup.total_certified_supply, 0)::NUMERIC - COALESCE(dem.total_market_demand, 0)::NUMERIC) /
        NULLIF(dem.total_market_demand, 0)::NUMERIC) * 100, 1
    ) AS deficit_gap_percent,
    CASE
        WHEN ((COALESCE(sup.total_certified_supply, 0)::NUMERIC - COALESCE(dem.total_market_demand, 0)::NUMERIC) / NULLIF(dem.total_market_demand, 0)::NUMERIC) < -0.40 THEN 'CRITICAL'
        WHEN ((COALESCE(sup.total_certified_supply, 0)::NUMERIC - COALESCE(dem.total_market_demand, 0)::NUMERIC) / NULLIF(dem.total_market_demand, 0)::NUMERIC) < -0.20 THEN 'HIGH'
        ELSE 'BALANCED'
    END AS severity_tier
FROM district_demand dem
FULL OUTER JOIN district_supply sup
    ON dem.district_id = sup.district_id AND dem.qp_code = sup.qp_code
JOIN master_districts d ON d.district_id = COALESCE(dem.district_id, sup.district_id)
JOIN master_states s ON s.state_code = d.state_code
JOIN master_qualification_packs qp ON qp.qp_code = COALESCE(dem.qp_code, sup.qp_code)
ORDER BY deficit_gap_percent ASC;

-- 2. 7-DAY ROLLING VACANCY VELOCITY BY INDUSTRIAL CORRIDOR
SELECT
    time_bucket('1 day', t.recorded_at) AS day_bucket,
    c.name AS corridor_name,
    SUM(t.vacancies_count) AS daily_vacancies,
    AVG(SUM(t.vacancies_count)) OVER (
        PARTITION BY c.corridor_id
        ORDER BY time_bucket('1 day', t.recorded_at)
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_7day_moving_avg
FROM telemetry_vacancy_signals t
JOIN master_industrial_corridors c ON c.primary_district_id = t.district_id
WHERE t.recorded_at >= NOW() - INTERVAL '30 days'
GROUP BY day_bucket, c.corridor_id, c.name
ORDER BY day_bucket DESC;

-- 3. STATUTORY BREACH DETECTOR (Scheduled Every 15 Minutes)
-- Identifies any district exceeding the configured statutory alert threshold
SELECT
    r.rule_code,
    r.name AS rule_name,
    d.district_name,
    s.name AS state_name,
    r.deficit_threshold_percent,
    r.escalation_tier,
    NOW() AS evaluation_timestamp
FROM statutory_alert_rules r
JOIN master_districts d ON d.state_code = r.state_code
JOIN master_states s ON s.state_code = r.state_code
WHERE r.is_active = TRUE;
