-- ============================================================================
-- SOVEREIGN LABOUR MARKET INTELLIGENCE SYSTEM (LMIS 2.0)
-- TIME-SERIES SEED DATA: LIVE VACANCIES & EPFO ENROLMENT SIGNALS
-- ============================================================================

-- Generate 100 historical vacancy arrival signals spanning recent days
INSERT INTO telemetry_vacancy_signals (recorded_at, source_portal, qp_code, district_id, raw_job_title, vacancies_count, offered_salary_min, offered_salary_max, experience_required_years, pli_eligible)
SELECT
    NOW() - (i || ' hours')::INTERVAL AS recorded_at,
    CASE (i % 4)
        WHEN 0 THEN 'NCS'
        WHEN 1 THEN 'e-Shram'
        WHEN 2 THEN 'State-Portal'
        ELSE 'Private-Aggregator'
    END AS source_portal,
    CASE (i % 5)
        WHEN 0 THEN 'ASC/Q3501'
        WHEN 1 THEN 'ELE/Q0104'
        WHEN 2 THEN 'AAS/Q1102'
        WHEN 3 THEN 'ELE/Q7303'
        ELSE 'CSC/Q0401'
    END AS qp_code,
    CASE (i % 4)
        WHEN 0 THEN 101 -- Pune
        WHEN 1 THEN 102 -- Dholera
        WHEN 2 THEN 103 -- Sriperumbudur
        ELSE 105       -- Sanand
    END AS district_id,
    'Precision Technical Specialist Grade-' || (i % 3 + 1),
    (15 + (i * 7) % 180) AS vacancies_count,
    24000.00 + (i * 250),
    38000.00 + (i * 400),
    2.5,
    TRUE
FROM generate_series(1, 100) AS i;

-- EPFO Net Payroll Additions Stream
INSERT INTO telemetry_formal_employment (recorded_at, state_code, ssc_id, net_epfo_additions, active_apprenticeships, naps_stipend_disbursed_inr)
VALUES
(NOW() - INTERVAL '30 days', 'MH', 'auto_ssc', 24200, 18400, 27600000.00),
(NOW() - INTERVAL '60 days', 'MH', 'auto_ssc', 21800, 16200, 24300000.00),
(NOW() - INTERVAL '30 days', 'GJ', 'esdm_ssc', 19400, 12500, 18750000.00),
(NOW() - INTERVAL '60 days', 'GJ', 'esdm_ssc', 16100, 10800, 16200000.00),
(NOW() - INTERVAL '30 days', 'TN', 'esdm_ssc', 28100, 21900, 32850000.00),
(NOW() - INTERVAL '60 days', 'TN', 'esdm_ssc', 25400, 19200, 28800000.00);

-- Training Capacity Records
INSERT INTO training_center_capacity (recorded_at, center_id, district_id, qp_code, scheme_name, sanctioned_seats, enrolled_candidates, certified_candidates, placement_verified, utilization_rate)
VALUES
(NOW() - INTERVAL '15 days', 'TC-MH-PUN-01', 101, 'ASC/Q3501', 'PMKVY 4.0', 1200, 1150, 980, 910, 95.8),
(NOW() - INTERVAL '15 days', 'TC-GJ-DHO-02', 102, 'ELE/Q0104', 'PMKVY 4.0 Special Drive', 800, 720, 640, 620, 90.0),
(NOW() - INTERVAL '15 days', 'TC-TN-SRI-03', 103, 'ELE/Q7303', 'Craftsmen Training Scheme (CTS)', 1500, 1420, 1310, 1240, 94.6);
