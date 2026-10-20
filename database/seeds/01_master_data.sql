-- ============================================================================
-- SOVEREIGN LABOUR MARKET INTELLIGENCE SYSTEM (LMIS 2.0)
-- MASTER SEED DATA: STATES, SSCS, INDUSTRIAL CORRIDORS & ALERT RULES
-- ============================================================================

-- 1. States & UTs
INSERT INTO master_states (state_code, name, name_hi, region, capital, total_districts) VALUES
('MH', 'Maharashtra', 'महाराष्ट्र', 'West', 'Mumbai', 36),
('GJ', 'Gujarat', 'गुजरात', 'West', 'Gandhinagar', 33),
('TN', 'Tamil Nadu', 'तमिलनाडु', 'South', 'Chennai', 38),
('KA', 'Karnataka', 'कर्नाटक', 'South', 'Bengaluru', 31),
('TS', 'Telangana', 'तेलंगाना', 'South', 'Hyderabad', 33),
('UP', 'Uttar Pradesh', 'उत्तर प्रदेश', 'North', 'Lucknow', 75),
('HR', 'Haryana', 'हरियाणा', 'North', 'Chandigarh', 22),
('RJ', 'Rajasthan', 'राजस्थान', 'North', 'Jaipur', 50),
('WB', 'West Bengal', 'पश्चिम बंगाल', 'East', 'Kolkata', 23),
('OR', 'Odisha', 'ओडिशा', 'East', 'Bhubaneswar', 30),
('MP', 'Madhya Pradesh', 'मध्य प्रदेश', 'Central', 'Bhopal', 55)
ON CONFLICT (state_code) DO NOTHING;

-- 2. Priority Districts
INSERT INTO master_districts (district_id, state_code, district_name, district_name_hi, latitude, longitude, is_aspirational, industrial_zone_classification) VALUES
(101, 'MH', 'Pune', 'पुणे', 18.5204, 73.8567, FALSE, 'Tier-1 Auto, Heavy Eng & Precision Tooling Cluster'),
(102, 'GJ', 'Ahmedabad (Dholera SIR)', 'धोलेरा एसआईआर', 22.2500, 72.2000, FALSE, 'Semiconductor ATMP Fab & Green Energy Corridor'),
(103, 'TN', 'Kanchipuram (Sriperumbudur)', 'श्रीपेरंबुदूर', 12.9667, 79.9500, FALSE, 'Electronics Hardware & EV Assembly Corridor'),
(104, 'KA', 'Bengaluru Urban', 'बेंगलुरु शहरी', 12.9716, 77.5946, FALSE, 'Aerospace, Avionics & FinTech Innovation Hub'),
(105, 'GJ', 'Sanand', 'साणंद', 22.9833, 72.3833, FALSE, 'Electric Vehicle Gigafactory & Lithium Battery Hub'),
(106, 'TS', 'Hyderabad (Genome Valley)', 'हैदराबाद', 17.3850, 78.4867, FALSE, 'Pharma, Biologics & Medical Devices Hub'),
(107, 'UP', 'Gautam Buddha Nagar (Noida)', 'नोएडा', 28.5355, 77.3910, FALSE, 'IT Hardware, Mobile Assembly & Electronics'),
(108, 'HR', 'Gurugram', 'गुरुग्राम', 28.4595, 77.0266, FALSE, 'Automotive R&D, Corporate Services & Logistics')
ON CONFLICT (district_id) DO NOTHING;

-- 3. Sector Skill Councils
INSERT INTO master_sector_skill_councils (ssc_id, code, name, name_hi, focus_industry, nodal_ministry, is_pli_beneficiary) VALUES
('auto_ssc', 'ASDC', 'Automotive Skills Development Council', 'ऑटोमोटिव कौशल विकास परिषद', 'Automotive, EVs & Precision Components', 'Ministry of Heavy Industries', TRUE),
('esdm_ssc', 'ESSCI', 'Electronics Sector Skills Council of India', 'भारतीय इलेक्ट्रॉनिक्स क्षेत्र कौशल परिषद', 'Semiconductor ATMP, Electronics Hardware, Displays', 'MeitY', TRUE),
('aero_ssc', 'AASSC', 'Aerospace and Aviation Sector Skill Council', 'एयरोस्पेस एवं विमानन क्षेत्र कौशल परिषद', 'Aerospace Precision Eng, MRO, Drones', 'Ministry of Civil Aviation', TRUE),
('pharma_ssc', 'LSSSDC', 'Life Sciences Sector Skill Development Council', 'लाइफ साइंसेज कौशल परिषद', 'Active Pharmaceutical Ingredients, Biologics', 'Ministry of Chemicals & Fertilizers', TRUE),
('capital_goods_ssc', 'CGSSC', 'Capital Goods Skill Council', 'कैपिटल गुड्स कौशल परिषद', 'Heavy Machining, CNC Systems, Industrial Robotics', 'Ministry of Heavy Industries', TRUE),
('logistics_ssc', 'LSC', 'Logistics Sector Skill Council', 'लॉजिस्टिक्स कौशल परिषद', 'Cold Chain, Multi-Modal Hubs, Automated Warehousing', 'Ministry of Commerce & Industry', TRUE)
ON CONFLICT (ssc_id) DO NOTHING;

-- 4. Standard Qualification Packs
INSERT INTO master_qualification_packs (qp_code, ssc_id, title, title_hi, nsqf_level, is_critical_shortage, estimated_training_duration_hours) VALUES
('ASC/Q3501', 'auto_ssc', 'CNC Operator - Turning & Machining', 'सीएनसी ऑपरेटर - टर्निंग एवं मशीनिंग', 4.0, TRUE, 450),
('ELE/Q0104', 'esdm_ssc', 'Semiconductor Cleanroom ATMP Technician', 'सेमीकंडक्टर क्लीनरूम एटीएमपी तकनीशियन', 5.0, TRUE, 600),
('AAS/Q1102', 'aero_ssc', 'Aerospace Structural Assembly Specialist', 'एयरोस्पेस संरचनात्मक असेंबली विशेषज्ञ', 5.0, TRUE, 550),
('ELE/Q7303', 'esdm_ssc', 'BMS Battery Pack Assembly Inspector', 'बीएमएस बैटरी पैक असेंबली निरीक्षक', 4.5, TRUE, 480),
('CSC/Q0401', 'capital_goods_ssc', 'Industrial Robotics Automation Technician', 'औद्योगिक रोबोटिक्स स्वचालन तकनीशियन', 6.0, TRUE, 650)
ON CONFLICT (qp_code) DO NOTHING;

-- 5. Priority Industrial Corridors
INSERT INTO master_industrial_corridors (corridor_id, name, state_code, primary_district_id, focus_sector, anchor_companies, latitude, longitude, is_semiconductor_hub) VALUES
('CORR-PUNE', 'Pune-Chakan-Talegaon Corridor', 'MH', 101, 'Automotive & Tooling', ARRAY['Tata Motors', 'Bajaj Auto', 'Bharat Forge', 'Mahindra'], 18.7500, 73.8500, FALSE),
('CORR-DHOLERA', 'Dholera Special Investment Region', 'GJ', 102, 'Semiconductors & ATMP', ARRAY['Tata Electronics Fab', 'CG Power ATMP', 'ReNew'], 22.2500, 72.2000, TRUE),
('CORR-SRIPER', 'Sriperumbudur-Oragadam Corridor', 'TN', 103, 'ESDM & EV Assembly', ARRAY['Foxconn', 'Pegatron', 'Hyundai', 'BYD'], 12.9667, 79.9500, FALSE),
('CORR-SANAND', 'Sanand Industrial Hub', 'GJ', 105, 'EVs & Gigafactory', ARRAY['Micron ATMP', 'Tata Passenger EVs', 'Corning'], 22.9833, 72.3833, TRUE)
ON CONFLICT (corridor_id) DO NOTHING;

-- 6. Statutory Alert Rules
INSERT INTO statutory_alert_rules (rule_code, name, ssc_id, state_code, deficit_threshold_percent, escalation_tier, is_active, created_by_officer) VALUES
('RULE-AUTO-40', 'Critical Automotive Machining Deficit (>40%)', 'auto_ssc', 'MH', 40.0, 'Cabinet Secretariat', TRUE, 'Dr. Rajesh Sharma, IAS'),
('RULE-SEMI-50', 'Semiconductor Cleanroom Specialist Shortage (>50%)', 'esdm_ssc', 'GJ', 50.0, 'PMO', TRUE, 'Dr. Rajesh Sharma, IAS'),
('RULE-BATT-35', 'Lithium Battery Assembly Deficit Warning (>35%)', 'esdm_ssc', 'TN', 35.0, 'SSDM', TRUE, 'Dr. Rajesh Sharma, IAS')
ON CONFLICT (rule_code) DO NOTHING;
