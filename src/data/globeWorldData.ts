/**
 * Comprehensive World & India Geographic Dataset for Three.js 3D Globe
 * Includes continental outlines, country coordinates, bilateral skilling corridors,
 * and 22+ meticulously distributed Indian industrial cluster nodes.
 */

export interface GlobalCountry {
  id: string;
  name: string;
  flag: string;
  lat: number;
  lng: number;
  continent: string;
  partnershipType: string;
  talentDemand: string;
  keySectors: string[];
  description: string;
  color: string;
}

export interface IndiaClusterData {
  id: string;
  name: string;
  state: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'North-East';
  sector: string;
  vacancies: string;
  growthRate: string;
  trainingCapacity: string;
  deficit: string;
  lat: number;
  lng: number;
  color: string;
  description: string;
  employers: string[];
  interventions: string[];
}

export interface SkillCorridorArc {
  id: string;
  name: string;
  from: { lat: number; lng: number; label: string };
  to: { lat: number; lng: number; label: string };
  annualMobility: string;
  framework: string;
  color: string;
}

// 22+ Meticulously distributed industrial clusters across ALL regions of India
export const INDIA_INDUSTRIAL_CLUSTERS: IndiaClusterData[] = [
  // --- NORTH REGION ---
  {
    id: 'ncr',
    name: 'Delhi-NCR Techno-Financial Hub',
    state: 'Delhi / Haryana / UP',
    region: 'North',
    sector: 'Fintech, Logistics & Retail',
    vacancies: '740,000',
    growthRate: '+16.0% YoY',
    trainingCapacity: '245,000 seats',
    deficit: '-3.5% (Balanced)',
    lat: 28.6139,
    lng: 77.2090,
    color: '#8B5CF6',
    description: 'National policy center, e-commerce supply chain logistics, drone warehousing, and IT services.',
    employers: ['Maruti Suzuki Gurgaon', 'Delhivery', 'Paytm', 'Noida Tech Parks', 'Hero MotoCorp'],
    interventions: ['Multi-Modal Logistics Park Skilling Mission', 'Green Energy Technician Upskilling Drive']
  },
  {
    id: 'ludhiana',
    name: 'Ludhiana & Jalandhar Industrial Belt',
    state: 'Punjab',
    region: 'North',
    sector: 'Textiles, Hosiery & Light Engineering',
    vacancies: '185,000',
    growthRate: '+9.4% YoY',
    trainingCapacity: '65,000 seats',
    deficit: '-4.8% (Specialized Weaving)',
    lat: 30.9010,
    lng: 75.8573,
    color: '#06B6D4',
    description: 'Premier hub for woolens, bicycle parts, agricultural equipment, and sports goods manufacturing.',
    employers: ['Hero Cycles', 'Oswal Group', 'Trident Group', 'Avon Cycles'],
    interventions: ['Textile Machinery Automation Course', 'Apparel Training & Design Centre (ATDC) Upgrade']
  },
  {
    id: 'chandigarh-baddi',
    name: 'Baddi & Chandigarh Pharma Hub',
    state: 'Himachal Pradesh / Chandigarh',
    region: 'North',
    sector: 'Pharmaceuticals & Formulations',
    vacancies: '142,000',
    growthRate: '+13.2% YoY',
    trainingCapacity: '52,000 seats',
    deficit: '-5.6% (Quality Assurance & Chemist)',
    lat: 30.9578,
    lng: 76.7914,
    color: '#10B981',
    description: 'Largest pharma formulation cluster in Asia, producing 35% of India domestic formulations.',
    employers: ['Cipla', 'Sun Pharma', 'Dr. Reddy Labs Baddi', 'Abbott India'],
    interventions: ['Cleanroom Protocol & GMP Certification', 'Pharma Skill Council Special Apprenticeship']
  },
  {
    id: 'dehradun-haridwar',
    name: 'Haridwar-SIDCUL Manufacturing Belt',
    state: 'Uttarakhand',
    region: 'North',
    sector: 'Automotive, FMCG & Precision Electronics',
    vacancies: '118,000',
    growthRate: '+10.5% YoY',
    trainingCapacity: '44,000 seats',
    deficit: '-3.8% (CNC Machining)',
    lat: 29.9457,
    lng: 78.1642,
    color: '#3B82F6',
    description: 'Major industrial corridor housing heavy electronics, FMCG manufacturing, and auto sub-assemblies.',
    employers: ['Hero MotoCorp Haridwar', 'ITC Limited', 'Hindustan Unilever', 'Havells India'],
    interventions: ['PMKVY 4.0 SIDCUL Skilling Cell', 'Renewable Energy Technician Drive']
  },
  {
    id: 'srinagar-jammu',
    name: 'Jammu & Kashmir Valley Cluster',
    state: 'Jammu & Kashmir',
    region: 'North',
    sector: 'Agri-Tech, Food Processing & Handicrafts',
    vacancies: '76,000',
    growthRate: '+12.1% YoY',
    trainingCapacity: '38,000 seats',
    deficit: '-6.2% (Cold-Chain Management)',
    lat: 34.0837,
    lng: 74.7973,
    color: '#F59E0B',
    description: 'Himalayan organic agriculture, saffron/apple processing, cold-chain logistics, and GI handicrafts.',
    employers: ['JK Agro Industries', 'Fil Industries', 'Kashmir Artisan Guilds', 'Himalayan Cold Stores'],
    interventions: ['Special Industrial Skilling Scheme for J&K (UDAAN 2.0)', 'GI-Craft Certification & Digital Market Linkage']
  },

  // --- WEST REGION ---
  {
    id: 'mumbai',
    name: 'Mumbai MMR Financial & Port Corridor',
    state: 'Maharashtra',
    region: 'West',
    sector: 'BFSI, FinTech, Media & Logistics',
    vacancies: '580,000',
    growthRate: '+15.8% YoY',
    trainingCapacity: '190,000 seats',
    deficit: '-2.1% (Cybersecurity & Risk)',
    lat: 19.0760,
    lng: 72.8777,
    color: '#38BDF8',
    description: 'Financial capital of India, JNPT container transshipment, global banking operations, and media tech.',
    employers: ['State Bank of India', 'HDFC Bank', 'TCS MMR', 'JNPA Port Trust', 'Reliance Industries'],
    interventions: ['Fintech & Blockchain National Skilling Academy', 'Port Logistics Dual Training Scheme']
  },
  {
    id: 'pune-mumbai',
    name: 'Pune Chakan-Talegaon Corridor',
    state: 'Maharashtra',
    region: 'West',
    sector: 'Automotive, EV & Precision Robotics',
    vacancies: '428,500',
    growthRate: '+14.2% YoY',
    trainingCapacity: '124,000 seats',
    deficit: '-4.2% (Critical Shortage)',
    lat: 18.5204,
    lng: 73.8567,
    color: '#F28C28',
    description: 'Primary EV manufacturing, automotive robotics, precision machining, and software tech parks.',
    employers: ['Tata Motors', 'Bharat Forge', 'Bajaj Auto', 'Mahindra & Mahindra', 'Infosys Pune'],
    interventions: ['PMKVY 4.0 EV Robotics Sanctioned (+15,000 seats)', 'MSDE-ITI Dual Apprenticeship MoU Signed']
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad & Sanand EV-Chemical Belt',
    state: 'Gujarat',
    region: 'West',
    sector: 'Semiconductors, Chemicals & EV',
    vacancies: '290,000',
    growthRate: '+12.7% YoY',
    trainingCapacity: '92,000 seats',
    deficit: '-6.4% (Urgent Demand)',
    lat: 23.0225,
    lng: 72.5714,
    color: '#F59E0B',
    description: 'Special Economic Zones (SEZ), semiconductor packaging sites, chemical synthesis, and EV assembly.',
    employers: ['Tata Passenger Electric Mobility', 'Micron Sanand Facility', 'Adani Enterprises', 'Torrent Pharma'],
    interventions: ['Sanand Semiconductor Fab Skilling Consortium', 'GIDC District Vocational Training Expansion']
  },
  {
    id: 'surat',
    name: 'Surat & Hazira Heavy Port Cluster',
    state: 'Gujarat',
    region: 'West',
    sector: 'Diamond Tech, Man-made Textiles & Steel',
    vacancies: '245,000',
    growthRate: '+11.2% YoY',
    trainingCapacity: '86,000 seats',
    deficit: '-3.9% (Laser Cutting & Metallurgy)',
    lat: 21.1702,
    lng: 72.8311,
    color: '#EC4899',
    description: 'Global capital for gem processing, synthetic textiles, LNG terminals, and AM/NS heavy steelworks.',
    employers: ['ArcelorMittal Nippon Steel Hazira', 'L&T Heavy Engineering Hazira', 'Surat Diamond Bourse', 'Reliance Hazira'],
    interventions: ['Diamond Laser Polishing Technical Academy', 'Heavy Fabrication & Welder Certification']
  },
  {
    id: 'jaipur-bhiwadi',
    name: 'Jaipur & Bhiwadi Industrial Corridor',
    state: 'Rajasthan',
    region: 'West',
    sector: 'Automotive, Ceramics & Green Energy',
    vacancies: '195,000',
    growthRate: '+11.5% YoY',
    trainingCapacity: '78,000 seats',
    deficit: '-4.5% (Solar Tech & Die-Casting)',
    lat: 26.9124,
    lng: 75.7873,
    color: '#F97316',
    description: 'Automobile manufacturing hub near NCR, Japanese Industrial Zone Neemrana, and solar park tech.',
    employers: ['Hero MotoCorp Neemrana', 'Honda Cars Tapukara', 'Daikin India', 'Havells Alwar'],
    interventions: ['Solar PV Installation & Grid Maintenance Training', 'Indo-Japanese Technical Training Institute (JIM)']
  },

  // --- SOUTH REGION ---
  {
    id: 'bengaluru',
    name: 'Bengaluru Silicon Valley & Aerospace',
    state: 'Karnataka',
    region: 'South',
    sector: 'AI, Aerospace & Deep Tech',
    vacancies: '612,300',
    growthRate: '+18.5% YoY',
    trainingCapacity: '210,000 seats',
    deficit: '-2.8% (High Tech Demand)',
    lat: 12.9716,
    lng: 77.5946,
    color: '#38BDF8',
    description: 'India premier semiconductor design, aerospace avionics, AI research, and software engineering cluster.',
    employers: ['ISRO Contractors', 'HAL', 'Wipro', 'TCS', 'Bosch India', 'Texas Instruments'],
    interventions: ['National Semiconductor Mission Skilling Cell', 'AI/ML NCVET Advanced Certification Launch']
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad Genome & Defense Valley',
    state: 'Telangana',
    region: 'South',
    sector: 'Biotech, Pharma, Defense & IT',
    vacancies: '315,000',
    growthRate: '+15.4% YoY',
    trainingCapacity: '110,000 seats',
    deficit: '-1.9% (Surplus Ready)',
    lat: 17.3850,
    lng: 78.4867,
    color: '#EC4899',
    description: 'Global vaccine manufacturing hub, life sciences, clinical research, aerospace composites, and cloud corridor.',
    employers: ['Dr. Reddy Laboratories', 'Bharat Biotech', 'DRDO Contractors', 'Tata Boeing Aerospace', 'Amazon Hyderabad'],
    interventions: ['Bio-Pharma Cleanroom Technologist Certification', 'Telangana Academy for Skill and Knowledge (TASK) Linkage']
  },
  {
    id: 'chennai',
    name: 'Chennai Automotive & Maritime Hub',
    state: 'Tamil Nadu',
    region: 'South',
    sector: 'EV, Heavy Manufacturing & Maritime',
    vacancies: '385,000',
    growthRate: '+11.8% YoY',
    trainingCapacity: '98,000 seats',
    deficit: '-5.1% (Skilled Welding & CNC)',
    lat: 13.0827,
    lng: 80.2707,
    color: '#10B981',
    description: 'Detroit of India; rapid expansion in EV battery assembly, shipbuilding, electronics, and port cargo.',
    employers: ['Hyundai India', 'Royal Enfield', 'TVS Motor', 'Foxconn Sriperumbudur', 'Ashok Leyland'],
    interventions: ['DSDC District War Room Intervention: CNC Operator Fast-Track', 'Tamil Nadu Skill Development Corp Partnership']
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore Precision Engineering Hub',
    state: 'Tamil Nadu',
    region: 'South',
    sector: 'Motors, Pumps, Foundries & Textiles',
    vacancies: '175,000',
    growthRate: '+10.2% YoY',
    trainingCapacity: '62,000 seats',
    deficit: '-4.6% (Foundry Metallurgy)',
    lat: 11.0168,
    lng: 76.9558,
    color: '#059669',
    description: 'Engineering capital supplying 40% of India pumps and motors, auto components, and technical textiles.',
    employers: ['LMW Group', 'Pricol Limited', 'Texmo Industries', 'C.R.I. Pumps'],
    interventions: ['Smart Foundry Modernization & CNC Skilling', 'Technical Textile Apprenticeship Program']
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam Steel & Maritime Corridor',
    state: 'Andhra Pradesh',
    region: 'South',
    sector: 'Port Logistics, Steel & Shipbuilding',
    vacancies: '162,000',
    growthRate: '+12.4% YoY',
    trainingCapacity: '58,000 seats',
    deficit: '-4.0% (Marine Fabrication)',
    lat: 17.6868,
    lng: 83.2185,
    color: '#2563EB',
    description: 'Major eastern naval dockyard, coastal steel production, petroleum refining, and bulk cargo port.',
    employers: ['Rashtriya Ispat Nigam (Vizag Steel)', 'Hindustan Shipyard', 'HPCL Vizag Refinery', 'Adani Gangavaram Port'],
    interventions: ['Marine Welder & Underwater Inspection Certification', 'Coastal Logistics Skill War Room']
  },
  {
    id: 'kochi',
    name: 'Kochi Marine & Electronics Corridor',
    state: 'Kerala',
    region: 'South',
    sector: 'Shipbuilding, Marine Tech & Spices',
    vacancies: '135,000',
    growthRate: '+10.8% YoY',
    trainingCapacity: '50,000 seats',
    deficit: '-3.2% (Avionics & Cold Chain)',
    lat: 9.9312,
    lng: 76.2673,
    color: '#14B8A6',
    description: 'Home of indigenous aircraft carrier construction (Cochin Shipyard), LNG transshipment, and IT parks.',
    employers: ['Cochin Shipyard Limited', 'BPCL Kochi Refinery', 'Infopark Kochi', 'Synthite Industries'],
    interventions: ['Autonomous Vessel Navigation & Marine IT', 'Kerala Knowledge Economy Mission Integration']
  },

  // --- CENTRAL & EAST REGION ---
  {
    id: 'indore-pithampur',
    name: 'Indore-Pithampur Auto-Pharma Belt',
    state: 'Madhya Pradesh',
    region: 'Central',
    sector: 'Commercial Vehicles & Formulations',
    vacancies: '210,000',
    growthRate: '+13.5% YoY',
    trainingCapacity: '80,000 seats',
    deficit: '-4.9% (Precision Tooling)',
    lat: 22.7196,
    lng: 75.8577,
    color: '#D97706',
    description: 'Detroit of Central India; robust presence of commercial vehicle OEMs, contract pharma, and dry ports.',
    employers: ['VE Commercial Vehicles (Eicher-Volvo)', 'Mahle Engine Components', 'Lupin Pharma', 'Cipla SEZ'],
    interventions: ['Central India Automotive Skilling Center of Excellence', 'Vocational ITI Dual Certification']
  },
  {
    id: 'nagpur',
    name: 'Nagpur MIHAN Multi-Modal Logistics',
    state: 'Maharashtra',
    region: 'Central',
    sector: 'Aerospace MRO, Logistics & Defense',
    vacancies: '158,000',
    growthRate: '+14.8% YoY',
    trainingCapacity: '60,000 seats',
    deficit: '-3.7% (Aircraft Maintenance & Supply Chain)',
    lat: 21.1458,
    lng: 79.0882,
    color: '#EA580C',
    description: 'Geographic Zero Mile of India; multi-modal cargo transit, Boeing & Air India MRO, and defense ordnance.',
    employers: ['Dassault Reliance Aerospace Limited (DRAL)', 'Air India MRO', 'TCS Nagpur', 'Solar Industries India'],
    interventions: ['Aerospace Structural Assembly & MRO Technician Course', 'National Multi-Modal Logistics Skilling Cell']
  },
  {
    id: 'kolkata-durgapur',
    name: 'Kolkata & Durgapur Heavy Metal Belt',
    state: 'West Bengal',
    region: 'East',
    sector: 'Heavy Foundry, Rail Equipment & Logistics',
    vacancies: '310,000',
    growthRate: '+8.9% YoY',
    trainingCapacity: '115,000 seats',
    deficit: '-5.2% (Hydraulics & Casting)',
    lat: 22.5726,
    lng: 88.3639,
    color: '#9333EA',
    description: 'Historic engineering cradle, rolling stock components, Haldia petrochem, and port transit to ASEAN.',
    employers: ['SAIL Durgapur Steel Plant', 'Titagarh Rail Systems', 'Tata Metaliks', 'Haldia Petrochemicals'],
    interventions: ['Modern Rail Wagon Manufacturing & Robotics Skilling', 'Port Multi-Skilling Program']
  },
  {
    id: 'jamshedpur',
    name: 'Jamshedpur Steel & Heavy Engineering',
    state: 'Jharkhand',
    region: 'East',
    sector: 'Primary Metallurgy, Automotive & Mining Gear',
    vacancies: '180,000',
    growthRate: '+10.1% YoY',
    trainingCapacity: '68,000 seats',
    deficit: '-4.7% (Furnace Operations & Heavy Welding)',
    lat: 22.8046,
    lng: 86.2029,
    color: '#DC2626',
    description: 'First planned industrial city of India; integrated steel plants, truck manufacturing, and industrial bearings.',
    employers: ['Tata Steel Jamshedpur', 'Tata Motors Heavy Commercial Vehicles', 'Timken India', 'Tata Cummins'],
    interventions: ['Green Steel & Blast Furnace Carbon Abatement Skilling', 'Apprenticeship Model under NAPS']
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar & Paradip Port Corridor',
    state: 'Odisha',
    region: 'East',
    sector: 'Minerals, Green Hydrogen & Deep Sea Port',
    vacancies: '192,000',
    growthRate: '+15.2% YoY',
    trainingCapacity: '72,000 seats',
    deficit: '-5.0% (Chemical Plant & Mineral Processing)',
    lat: 20.2961,
    lng: 85.8245,
    color: '#0284C7',
    description: 'Fastest growing industrial state in eastern India, aluminum smelters, Paradip refinery, and IT hubs.',
    employers: ['Tata Steel Kalinganagar', 'Mahanadi Coalfields', 'IOCL Paradip Refinery', 'Vedanta Aluminium'],
    interventions: ['World Skill Center (WSC) Bhubaneswar Advanced Mechatronics', 'Green Ammonia Operations Certification']
  },

  // --- NORTH-EAST REGION ---
  {
    id: 'guwahati',
    name: 'Guwahati North-East Gateway',
    state: 'Assam',
    region: 'North-East',
    sector: 'Hydrocarbons, Agro-Processing & Logistics',
    vacancies: '125,000',
    growthRate: '+14.0% YoY',
    trainingCapacity: '48,000 seats',
    deficit: '-5.8% (Petrochemical Operations & Cold Storage)',
    lat: 26.1445,
    lng: 91.7362,
    color: '#16A34A',
    description: 'Gateway to ASEAN and Act East policy, oil refineries, tea auctions, and multimodal logistics parks.',
    employers: ['Oil India Limited', 'Numaligarh Refinery Limited', 'Indian Oil Guwahati', 'Amul Assam Dairy'],
    interventions: ['North East Skill Development Mission (NESDM)', 'Cross-Border Logistics & Multi-Modal Transit Skilling']
  }
];

// Strategic Global Partner Countries with bilateral skilling and talent mobility agreements
export const GLOBAL_PARTNER_COUNTRIES: GlobalCountry[] = [
  {
    id: 'india',
    name: 'India (Mission Command)',
    flag: '🇮🇳',
    lat: 20.5937,
    lng: 78.9629,
    continent: 'Asia',
    partnershipType: 'National Command Center',
    talentDemand: '4.82M Active Domestic Vacancies',
    keySectors: ['Semiconductors', 'AI & Deep Tech', 'EV & Automotive', 'Pharma & Biotech', 'Renewable Energy'],
    description: 'Central nerve center for national workforce planning, Bayesian demand forecasting, and PMKVY 4.0 execution across 742 districts.',
    color: '#F28C28'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    lat: 51.1657,
    lng: 10.4515,
    continent: 'Europe',
    partnershipType: 'Comprehensive Migration & Mobility Partnership (MMPA)',
    talentDemand: '400,000 Annual Technical Gap',
    keySectors: ['Mechatronics', 'Automotive Engineering', 'Healthcare / Nursing', 'Renewable Tech'],
    description: 'Bilateral agreement for technical workforce mobility with German Federal Ministry of Education & Research (BMBF).',
    color: '#38BDF8'
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    lat: 36.2048,
    lng: 138.2529,
    continent: 'Asia',
    partnershipType: 'Technical Intern Training Program (TITP) & SSW',
    talentDemand: '345,000 Specified Skilled Workers',
    keySectors: ['Robotics', 'Elderly Caregiving', 'Precision Machining', 'Construction & Agriculture'],
    description: 'MoU signed with Japan International Training Cooperation Organization (JITCO) for skilled Indian youth deployment.',
    color: '#EC4899'
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    lat: 23.4241,
    lng: 53.8478,
    continent: 'Middle East',
    partnershipType: 'G2G Qualifications Harmonization Agreement',
    talentDemand: '250,000 Infrastructure & Tech Roles',
    keySectors: ['Port Logistics', 'Fintech', 'Civil Infrastructure', 'Aviation Maintenance'],
    description: 'Direct alignment of National Skills Qualification Framework (NSQF) with UAE National Qualifications Authority.',
    color: '#10B981'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    lat: 55.3781,
    lng: -3.4360,
    continent: 'Europe',
    partnershipType: 'India-UK Young Professionals Scheme & NHS Talent Link',
    talentDemand: '180,000 Clinical & Tech Personnel',
    keySectors: ['NHS Nursing & Clinical', 'Data Science', 'Civil Aviation', 'Green Architecture'],
    description: 'Reciprocal scheme granting 3,000 visas annually for degree-educated professionals, plus mutual recognition of qualifications.',
    color: '#8B5CF6'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    lat: 1.3521,
    lng: 103.8198,
    continent: 'Asia',
    partnershipType: 'India-Singapore Joint Ministerial Committee on Skills',
    talentDemand: '65,000 Advanced Maritime & Digital Roles',
    keySectors: ['Maritime Operations', 'Cybersecurity', 'Financial Engineering', 'Smart Port Logistics'],
    description: 'Partnership with Institute of Technical Education (ITE) Singapore for Center of Excellence in technical skilling.',
    color: '#06B6D4'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    lat: -25.2744,
    lng: 133.7751,
    continent: 'Oceania',
    partnershipType: 'Australia-India Migration & Mobility Partnership (MATES)',
    talentDemand: '150,000 Clean Energy & Mining Roles',
    keySectors: ['Critical Minerals', 'Renewable Grid Engineering', 'Agricultural Science', 'Early Childhood Education'],
    description: 'Mobility Arrangement for Talented Early-professionals Scheme (MATES) providing pathways for Indian STEM graduates.',
    color: '#F59E0B'
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    lat: 37.0902,
    lng: -95.7129,
    continent: 'North America',
    partnershipType: 'Critical and Emerging Technology (iCET) Skilling Pact',
    talentDemand: '550,000 STEM & AI Engineering Shortage',
    keySectors: ['Semiconductor Fabrication', 'Quantum Computing', 'AI Research', 'Aerospace Avionics'],
    description: 'White House iCET bilateral initiative linking US semiconductor manufacturers with Indian technical universities and ITIs.',
    color: '#3B82F6'
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    lat: 46.2276,
    lng: 2.2137,
    continent: 'Europe',
    partnershipType: 'Indo-French Strategic Aerospace & Nuclear Partnership',
    talentDemand: '95,000 Precision Mechanics & Nuclear Tech',
    keySectors: ['Civil Nuclear Energy', 'Aeronautics', 'Luxury Craftsmanship', 'AI Ethics'],
    description: 'Bilateral skill certification between MSDE and French Ministry of National Education for Rafale & civil aviation MRO.',
    color: '#6366F1'
  },
  {
    id: 'saudi',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    lat: 23.8859,
    lng: 45.0792,
    continent: 'Middle East',
    partnershipType: 'Vision 2030 Skill Verification Program (SVP)',
    talentDemand: '320,000 Giga-Project Specialists',
    keySectors: ['NEOM Mega-Construction', 'Desalination Operations', 'Renewable Solar', 'Hospitality Management'],
    description: 'Mandatory professional skill verification implemented jointly by Takamol and MSDE across 23 trade disciplines.',
    color: '#D97706'
  },
  {
    id: 'south_korea',
    name: 'South Korea',
    flag: '🇰🇷',
    lat: 35.9078,
    lng: 127.7669,
    continent: 'Asia',
    partnershipType: 'Employment Permit System (EPS) & EV Battery Consortium',
    talentDemand: '85,000 Semiconductor & Battery Technicians',
    keySectors: ['Lithium-ion Battery Chemistry', 'Display Fabrication', 'Shipbuilding Automation', 'Robotics'],
    description: 'Direct bilateral exchange linking Korean battery giants with Indian precision ITI trainees.',
    color: '#14B8A6'
  },
  {
    id: 'south_africa',
    name: 'South Africa',
    flag: '🇿🇦',
    lat: -30.5595,
    lng: 22.9375,
    continent: 'Africa',
    partnershipType: 'BRICS Skills Development Working Group',
    talentDemand: '110,000 Mining & Green Energy Jobs',
    keySectors: ['Deep-Shaft Mining Safety', 'Solar PV', 'Agri-processing', 'Railway Engineering'],
    description: 'Harmonized standards for vocational trades under BRICS Future Skills Challenge framework.',
    color: '#E11D48'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    lat: -14.2350,
    lng: -51.9253,
    continent: 'South America',
    partnershipType: 'IBSA & Bio-Economy Skilling Initiative',
    talentDemand: '140,000 Biofuels & Aviation Specialists',
    keySectors: ['Bio-Ethanol Technology', 'Commercial Aviation (Embraer)', 'Tropical Agriculture', 'Hydro-Electric Operations'],
    description: 'Trilateral cooperation linking Indian biofuel researchers with Brazilian bio-refinery engineering programs.',
    color: '#16A34A'
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    lat: 56.1304,
    lng: -106.3468,
    continent: 'North America',
    partnershipType: 'Indo-Canadian Higher Education & Agritech Compact',
    talentDemand: '220,000 Precision Agritech & Mining Specialists',
    keySectors: ['Clean Agritech', 'Mining Geophysics', 'Cloud Computing', 'Cold-Climate Construction'],
    description: 'Mobility frameworks for vocational diploma holders with Colleges and Institutes Canada (CICan).',
    color: '#EF4444'
  }
];

// Great Circle Skill Mobility Flight Corridors connecting India to World Partners
export const SKILL_MOBILITY_ARCS: SkillCorridorArc[] = [
  {
    id: 'arc-delhi-berlin',
    name: 'Indo-German Dual VET & Mechatronics Corridor',
    from: { lat: 28.6139, lng: 77.2090, label: 'New Delhi' },
    to: { lat: 51.1657, lng: 10.4515, label: 'Germany' },
    annualMobility: '24,500 Specialists/Yr',
    framework: 'MMPA Bilateral Agreement',
    color: '#38BDF8'
  },
  {
    id: 'arc-delhi-tokyo',
    name: 'Indo-Japan TITP & SSW Robotics Corridor',
    from: { lat: 28.6139, lng: 77.2090, label: 'New Delhi' },
    to: { lat: 36.2048, lng: 138.2529, label: 'Japan' },
    annualMobility: '18,200 Trainees/Yr',
    framework: 'TITP & Specified Skilled Worker',
    color: '#EC4899'
  },
  {
    id: 'arc-mumbai-dubai',
    name: 'India-UAE NSQF Mutual Recognition Corridor',
    from: { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
    to: { lat: 23.4241, lng: 53.8478, label: 'UAE' },
    annualMobility: '62,000 Certified Workers/Yr',
    framework: 'G2G Qualifications Harmonization',
    color: '#10B981'
  },
  {
    id: 'arc-bangalore-london',
    name: 'India-UK Young Professionals & NHS STEM Corridor',
    from: { lat: 12.9716, lng: 77.5946, label: 'Bengaluru' },
    to: { lat: 55.3781, lng: -3.4360, label: 'United Kingdom' },
    annualMobility: '16,400 Professionals/Yr',
    framework: 'UK-India YPS Scheme',
    color: '#8B5CF6'
  },
  {
    id: 'arc-chennai-singapore',
    name: 'India-Singapore Maritime & Deep Tech Corridor',
    from: { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
    to: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
    annualMobility: '12,800 Engineers/Yr',
    framework: 'ITE Center of Excellence MoU',
    color: '#06B6D4'
  },
  {
    id: 'arc-hyderabad-us',
    name: 'India-US iCET Semiconductor & AI Corridor',
    from: { lat: 17.3850, lng: 78.4867, label: 'Hyderabad' },
    to: { lat: 37.0902, lng: -95.7129, label: 'United States' },
    annualMobility: '35,000 STEM Researchers/Yr',
    framework: 'White House iCET Initiative',
    color: '#F28C28'
  },
  {
    id: 'arc-pune-sydney',
    name: 'India-Australia MATES Clean Energy Corridor',
    from: { lat: 18.5204, lng: 73.8567, label: 'Pune' },
    to: { lat: -25.2744, lng: 133.7751, label: 'Australia' },
    annualMobility: '14,000 Early Professionals/Yr',
    framework: 'MATES Scheme under ECTA',
    color: '#F59E0B'
  }
];

/**
 * Procedurally generates a high-definition, glowing world map texture on an offscreen HTML5 canvas.
 * Draws world continents, country boundaries, latitude/longitude graticules,
 * and prominently accents India with glowing golden-saffron national borders and internal subdivisions.
 */
export function generateWorldMapCanvasTexture(): HTMLCanvasElement {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Deep Ocean Base with Radial Glow
  const oceanGradient = ctx.createLinearGradient(0, 0, width, height);
  oceanGradient.addColorStop(0, '#041527');
  oceanGradient.addColorStop(0.5, '#07243e');
  oceanGradient.addColorStop(1, '#031120');
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, width, height);

  // Helper coordinate projection
  const toCanvasX = (lng: number) => ((lng + 180) / 360) * width;
  const toCanvasY = (lat: number) => ((90 - lat) / 180) * height;

  // 2. Graticule Lines (Parallels & Meridians every 15 degrees)
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'; // subtle cyan grid

  // Longitude meridians
  for (let lng = -180; lng <= 180; lng += 15) {
    const x = toCanvasX(lng);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Latitude parallels
  for (let lat = -90; lat <= 90; lat += 15) {
    const y = toCanvasY(lat);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Major Geographic Lines (Equator, Tropics)
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)'; // Equator
  ctx.beginPath();
  ctx.moveTo(0, toCanvasY(0));
  ctx.lineTo(width, toCanvasY(0));
  ctx.stroke();

  ctx.strokeStyle = 'rgba(242, 140, 40, 0.2)'; // Tropic of Cancer (23.4° N) passing through India
  ctx.beginPath();
  ctx.moveTo(0, toCanvasY(23.4365));
  ctx.lineTo(width, toCanvasY(23.4365));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, toCanvasY(-23.4365)); // Tropic of Capricorn
  ctx.lineTo(width, toCanvasY(-23.4365));
  ctx.stroke();

  // 3. World Continental Polygons (Accurate continental mass vectors)
  const continentPolygons: [number, number][][] = [
    // North America
    [
      [-168, 65], [-160, 71], [-140, 70], [-120, 75], [-90, 73], [-80, 70],
      [-65, 60], [-55, 50], [-60, 44], [-70, 42], [-75, 35], [-80, 25],
      [-82, 23], [-89, 21], [-88, 16], [-83, 9], [-77, 8], [-80, 14],
      [-96, 16], [-105, 20], [-110, 24], [-115, 30], [-124, 38], [-124, 48],
      [-130, 55], [-140, 60], [-160, 58], [-168, 65]
    ],
    // South America
    [
      [-77, 8], [-73, 11], [-60, 10], [-50, 2], [-40, -2], [-35, -6],
      [-37, -12], [-39, -18], [-44, -23], [-50, -30], [-58, -35], [-65, -42],
      [-68, -53], [-74, -52], [-74, -45], [-72, -35], [-71, -25], [-76, -15],
      [-81, -5], [-79, 1], [-77, 8]
    ],
    // Europe & Scandinavia
    [
      [-10, 36], [-9, 43], [0, 44], [3, 47], [5, 53], [8, 55],
      [5, 62], [15, 68], [25, 71], [30, 68], [32, 60], [28, 55],
      [22, 54], [18, 48], [14, 45], [12, 38], [18, 36], [24, 38],
      [28, 41], [30, 46], [36, 46], [40, 50], [50, 55], [60, 56],
      [55, 45], [45, 42], [38, 41], [30, 41], [24, 35], [15, 37],
      [-5, 36], [-10, 36]
    ],
    // British Isles
    [
      [-5, 50], [1, 51], [0, 53], [-1, 56], [-3, 58], [-6, 56], [-4, 52], [-5, 50]
    ],
    // Africa
    [
      [-5, 36], [10, 37], [20, 32], [30, 31], [33, 28], [35, 22],
      [42, 13], [51, 12], [47, 8], [42, 2], [40, -5], [38, -12],
      [35, -20], [33, -28], [26, -34], [18, -34], [14, -28], [12, -20],
      [10, -10], [9, 4], [3, 5], [-5, 5], [-15, 12], [-17, 16],
      [-13, 27], [-8, 33], [-5, 36]
    ],
    // Madagascar
    [
      [44, -12], [50, -14], [48, -25], [44, -25], [44, -12]
    ],
    // Northern Asia / Russia / Siberia
    [
      [60, 56], [70, 68], [80, 73], [100, 75], [120, 73], [140, 71],
      [160, 69], [175, 66], [178, 62], [165, 58], [155, 55], [140, 50],
      [135, 45], [130, 42], [125, 40], [115, 38], [100, 40], [90, 45],
      [80, 48], [70, 50], [60, 56]
    ],
    // East Asia & China
    [
      [75, 37], [85, 40], [100, 40], [115, 40], [120, 35], [122, 30],
      [120, 25], [115, 22], [108, 18], [105, 10], [100, 5], [98, 10],
      [90, 22], [88, 27], [80, 30], [75, 37]
    ],
    // Japan
    [
      [130, 32], [135, 35], [140, 38], [142, 44], [145, 44], [141, 40],
      [137, 35], [131, 31], [130, 32]
    ],
    // Southeast Asia & Indonesia
    [
      [100, 5], [104, 1], [108, -7], [115, -8], [120, -9], [128, -8],
      [135, -5], [130, -2], [122, 1], [118, 5], [110, 4], [100, 5]
    ],
    // Australia
    [
      [114, -22], [120, -18], [130, -12], [137, -12], [142, -10],
      [145, -15], [150, -22], [153, -28], [150, -37], [142, -38],
      [135, -35], [125, -33], [115, -34], [113, -27], [114, -22]
    ],
    // New Zealand
    [
      [167, -45], [172, -42], [175, -37], [177, -39], [174, -43], [168, -46]
    ],
    // Middle East / Arabian Peninsula
    [
      [35, 30], [42, 32], [48, 30], [55, 25], [60, 22], [55, 15],
      [45, 12], [43, 14], [38, 22], [35, 30]
    ]
  ];

  // Draw Continents Base Fill
  ctx.fillStyle = '#0a2e4c';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 1.2;

  continentPolygons.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([lng, lat], idx) => {
      const x = toCanvasX(lng);
      const y = toCanvasY(lat);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // 4. Detailed Highlighting of Key World Countries
  const keyCountryHighlights: { name: string; poly: [number, number][]; color: string; fill: string }[] = [
    // United States
    {
      name: 'USA',
      color: 'rgba(59, 130, 246, 0.7)',
      fill: 'rgba(30, 58, 138, 0.35)',
      poly: [[-124, 48], [-72, 45], [-75, 35], [-80, 25], [-97, 26], [-117, 32], [-124, 38], [-124, 48]]
    },
    // Germany
    {
      name: 'GERMANY',
      color: 'rgba(56, 189, 248, 0.8)',
      fill: 'rgba(14, 116, 144, 0.4)',
      poly: [[6, 54], [14, 54], [14, 48], [7, 49], [6, 54]]
    },
    // United Kingdom
    {
      name: 'UK',
      color: 'rgba(139, 92, 246, 0.8)',
      fill: 'rgba(109, 40, 217, 0.4)',
      poly: [[-5, 50], [1, 51], [0, 54], [-3, 58], [-5, 55], [-5, 50]]
    },
    // Japan
    {
      name: 'JAPAN',
      color: 'rgba(236, 72, 153, 0.8)',
      fill: 'rgba(190, 24, 93, 0.4)',
      poly: [[130, 32], [137, 35], [142, 43], [144, 40], [136, 34], [130, 32]]
    },
    // UAE / Gulf
    {
      name: 'UAE',
      color: 'rgba(16, 185, 129, 0.8)',
      fill: 'rgba(5, 150, 105, 0.4)',
      poly: [[51, 24], [56, 25], [56, 22], [52, 22], [51, 24]]
    },
    // Australia
    {
      name: 'AUSTRALIA',
      color: 'rgba(245, 158, 11, 0.7)',
      fill: 'rgba(180, 83, 9, 0.3)',
      poly: [[115, -22], [130, -14], [145, -15], [152, -28], [148, -37], [135, -34], [115, -33], [115, -22]]
    },
    // Brazil
    {
      name: 'BRAZIL',
      color: 'rgba(22, 163, 74, 0.7)',
      fill: 'rgba(21, 128, 61, 0.3)',
      poly: [[-65, -5], [-45, -2], [-35, -6], [-40, -20], [-52, -30], [-60, -20], [-65, -5]]
    }
  ];

  keyCountryHighlights.forEach((country) => {
    ctx.beginPath();
    country.poly.forEach(([lng, lat], idx) => {
      const x = toCanvasX(lng);
      const y = toCanvasY(lat);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = country.fill;
    ctx.fill();
    ctx.strokeStyle = country.color;
    ctx.lineWidth = 1.0;
    ctx.stroke();
  });

  // 5. INDIA NATIONAL BOUNDARY ACCENTUATION (Distinct Indian Subcontinent Polygon)
  // Kashmir/Ladakh (top), Punjab, Rajasthan, Gujarat (west), Konkan/Kerala (southwest),
  // Kanyakumari (tip), Tamil Nadu/Andhra/Odisha/Bengal (east coast),
  // Assam/Arunachal/North-East, Himalayas (north)
  const indiaPolygon: [number, number][] = [
    [74.5, 35.5],  // Northern Kashmir
    [77.8, 35.5],  // Ladakh / Karakoram
    [80.0, 31.0],  // Uttarakhand border
    [88.0, 27.5],  // Sikkim
    [93.0, 28.5],  // Arunachal Pradesh
    [96.5, 28.0],  // Easternmost tip
    [94.0, 24.5],  // Manipur / Nagaland
    [92.0, 24.0],  // Tripura / Meghalaya
    [89.5, 22.0],  // Sundarbans / Bengal delta
    [86.5, 20.0],  // Odisha coast / Paradip
    [82.0, 16.5],  // Andhra coast / Godavari
    [80.2, 13.0],  // Chennai / Coromandel
    [79.8, 10.0],  // Palk Strait
    [77.5, 8.1],   // Cape Comorin / Kanyakumari (Southern Tip)
    [76.0, 10.0],  // Kerala coast / Kochi
    [74.5, 14.5],  // Karnataka coast / Goa
    [73.0, 18.5],  // Maharashtra Konkan / Mumbai
    [72.5, 21.0],  // Gulf of Khambhat / Surat
    [70.0, 22.5],  // Kathiawar / Saurashtra
    [68.7, 23.8],  // Kutch / Rann of Kutch (Westernmost Tip)
    [70.5, 26.5],  // Thar Desert / Jaisalmer
    [74.0, 30.5],  // Punjab border
    [74.5, 35.5]   // Back to Kashmir
  ];

  // Draw Glowing Golden/Saffron Landmass for India
  ctx.save();
  ctx.shadowColor = '#F28C28';
  ctx.shadowBlur = 18;

  ctx.beginPath();
  indiaPolygon.forEach(([lng, lat], idx) => {
    const x = toCanvasX(lng);
    const y = toCanvasY(lat);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();

  // Vibrant national gradient fill
  const indiaFillGradient = ctx.createRadialGradient(
    toCanvasX(78.5), toCanvasY(22.0), 5,
    toCanvasX(78.5), toCanvasY(22.0), 120
  );
  indiaFillGradient.addColorStop(0, 'rgba(242, 140, 40, 0.65)'); // Government Saffron
  indiaFillGradient.addColorStop(0.6, 'rgba(10, 61, 98, 0.85)'); // Navy Blue
  indiaFillGradient.addColorStop(1, 'rgba(16, 185, 129, 0.5)'); // Tricolour Emerald Green
  ctx.fillStyle = indiaFillGradient;
  ctx.fill();

  // Bright double outline for India border
  ctx.strokeStyle = '#F28C28';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 1.0;
  ctx.stroke();
  ctx.restore();

  // Internal State Division Lines for India (clean schematic vectors)
  ctx.strokeStyle = 'rgba(242, 140, 40, 0.4)';
  ctx.lineWidth = 0.8;
  const internalStateSegments: [number, number][][] = [
    [[70.5, 26.5], [76.0, 27.5], [80.0, 26.0]], // Rajasthan / UP
    [[72.5, 21.0], [77.0, 22.0], [82.0, 22.0]], // MP / Maharashtra
    [[73.0, 18.5], [78.5, 17.5], [82.0, 16.5]], // Maharashtra / Telangana
    [[74.5, 14.5], [78.0, 13.0], [80.2, 13.0]], // Karnataka / Tamil Nadu
    [[82.0, 22.0], [85.5, 23.5], [89.5, 22.0]], // Jharkhand / Bengal
    [[88.0, 26.0], [92.0, 26.0]]                 // Assam corridor
  ];
  internalStateSegments.forEach(seg => {
    ctx.beginPath();
    seg.forEach(([lng, lat], i) => {
      const x = toCanvasX(lng);
      const y = toCanvasY(lat);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });

  // Country Labels painted on map canvas
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#F28C28';
  ctx.textAlign = 'center';
  ctx.fillText('INDIA', toCanvasX(78.5), toCanvasY(21.5));

  ctx.font = '9px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('USA', toCanvasX(-98), toCanvasY(38));
  ctx.fillText('GERMANY', toCanvasX(10), toCanvasY(52));
  ctx.fillText('JAPAN', toCanvasX(138), toCanvasY(36));
  ctx.fillText('UK', toCanvasX(-2), toCanvasY(55));
  ctx.fillText('AUSTRALIA', toCanvasX(134), toCanvasY(-25));
  ctx.fillText('BRAZIL', toCanvasX(-53), toCanvasY(-14));
  ctx.fillText('UAE', toCanvasX(54), toCanvasY(24));

  return canvas;
}
