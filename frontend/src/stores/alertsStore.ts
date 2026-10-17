import { create } from 'zustand';
import {
  SituationalAlert,
  AlertSeverity,
  AlertStatus,
  PendingAcknowledgmentItem,
  EscalationPathwayTier,
} from '../types/situational';

export interface AlertFilterState {
  severity: AlertSeverity | 'all';
  status: AlertStatus | 'all';
  sector: string;
  state: string;
  timeRange: '1h' | '6h' | '24h' | '7d' | 'all';
  searchQuery: string;
}

export interface AlertsState {
  alerts: SituationalAlert[];
  historicalAlerts: SituationalAlert[];
  pendingAcknowledgments: PendingAcknowledgmentItem[];
  escalationTiers: EscalationPathwayTier[];
  selectedAlert: SituationalAlert | null;
  isDetailSheetOpen: boolean;
  isCreateModalOpen: boolean;
  filters: AlertFilterState;
  lastSyncTime: string;

  // Actions
  setFilters: (filters: Partial<AlertFilterState>) => void;
  resetFilters: () => void;
  setSelectedAlert: (alert: SituationalAlert | null) => void;
  setIsDetailSheetOpen: (open: boolean) => void;
  setIsCreateModalOpen: (open: boolean) => void;

  acknowledgeAlert: (id: string, acknowledgedBy?: string) => void;
  acknowledgeAllCritical: (acknowledgedBy?: string) => number;
  escalateAlert: (id: string, targetLevel: number, note?: string) => void;
  resolveAlert: (id: string, resolutionNote: string, resolvedBy?: string) => void;
  addNote: (id: string, text: string, author?: string) => void;
  createManualAlert: (newAlert: Partial<SituationalAlert>) => void;
  nudgeOfficial: (officialId: string) => void;
  triggerSimulatedAlert: () => void;
}

const INITIAL_ALERTS: SituationalAlert[] = [
  {
    id: 'CRIT-2026-089',
    title: 'Acute CNC 5-Axis Machinist Shortage in Pune Industrial Belt',
    titleHi: 'पुणे औद्योगिक क्षेत्रात 5-अक्ष सीएनसी मशीनिस्टची तीव्र टंचाई',
    description: 'Tier-1 automotive OEMs report 51,400 unfilled precision machinist requisitions threatening Q3 transmission ramp-ups. Local ITIs operating at 87% capacity with outdated 3-axis controllers.',
    descriptionHi: 'टियर-१ ऑटोमोबाईल ओईएमने ५१,४०० रिक्त जागांची नोंद केली आहे. स्थानिक आयटीआय जुन्या उपकरणांसह ८७% क्षमतेवर कार्यरत आहेत.',
    severity: 'critical',
    status: 'unacknowledged',
    sector: 'Capital Goods & Automotive',
    sectorCode: 'mfg',
    state: 'Maharashtra',
    stateCode: 'MH',
    district: 'Pune',
    cluster: 'Chakan-Talegaon-Pimpri Belt',
    raisedAt: '14 mins ago',
    raisedTimestamp: Date.now() - 14 * 60 * 1000,
    currentEscalationLevel: 1,
    shortageSeats: 51400,
    shortageGapPct: -48.2,
    primaryTrade: 'CNC 5-Axis Specialist',
    affectedOems: ['Tata Motors', 'Bharat Forge', 'Bajaj Auto', 'Mahindra Auto'],
    assignedWarRoom: 'Pune District Skill Committee (DSC) & ASDC Apex',
    slaBreachInMinutes: 38,
    slaBreached: false,
    priorityScheme: 'PMKVY 4.0 Special Drive',
    notes: [
      {
        id: 'n1',
        author: 'NCS Live Telemetry Engine',
        role: 'Automated Vacancy Aggregator',
        timestamp: '14 mins ago',
        text: 'Automated vacancy surge triggered alert: Active postings on NCS and employer portals spiked by 34% within 72 hours.',
      },
    ],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'District Collector & DSC Chairman',
        name: 'Dr. Suhas Diwase, IAS',
        contact: '+91-20-2612-4001',
        notifiedAt: '14 mins ago',
        status: 'pending',
        slaMinutes: 60,
        remainingMinutes: 38,
      },
      {
        level: 2,
        levelName: 'State Skill Development Mission',
        role: 'Mission Director, Maharashtra SSDM',
        name: 'Smt. Deepa Nair, IAS',
        contact: '+91-22-2287-3400',
        notifiedAt: 'Scheduled in 38m',
        status: 'pending',
        slaMinutes: 120,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Automotive Skills Council (ASDC)',
        name: 'Anil Verma',
        contact: '+91-11-4186-8000',
        notifiedAt: 'Pending Level 2',
        status: 'pending',
        slaMinutes: 180,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending Level 3',
        status: 'pending',
        slaMinutes: 240,
      },
    ],
  },
  {
    id: 'CRIT-2026-094',
    title: 'Semiconductor Fab Cleanroom Technician Shortfall in Dholera SIR',
    titleHi: 'ધોલેરા એસઆઇઆરમાં સેમિકન્ડક્ટર ક્લીનરૂમ ટેકનિશિયનની તીવ્ર અછત',
    description: 'Upcoming commercial ATMP packaging plant requires 28,600 certified class-100 cleanroom technicians by Q4. Zero accredited training facilities currently operational within 60km corridor.',
    descriptionHi: 'ધોલેરામાં ક્લીનરૂમ ટેકનિશિયનની ૨૮,૬૦૦ જગ્યાઓની તાત્કાલિક જરૂરિયાત છે.',
    severity: 'critical',
    status: 'escalated',
    sector: 'Electronics & Semiconductor (ESCI)',
    sectorCode: 'semi',
    state: 'Gujarat',
    stateCode: 'GJ',
    district: 'Ahmedabad (Dholera)',
    cluster: 'Dholera Special Investment Region',
    raisedAt: '42 mins ago',
    raisedTimestamp: Date.now() - 42 * 60 * 1000,
    escalatedAt: '12 mins ago',
    escalatedTo: 'Level 2: Gujarat State Skill Mission (GSDM)',
    currentEscalationLevel: 2,
    shortageSeats: 28600,
    shortageGapPct: -52.0,
    primaryTrade: 'Cleanroom Packaging Operator',
    affectedOems: ['Micron Technology', 'Tata Electronics', 'CG Power / Renesas'],
    assignedWarRoom: 'Dholera Industrial Development Authority & ESSCI',
    slaBreachInMinutes: 18,
    slaBreached: false,
    priorityScheme: 'India Semiconductor Mission (ISM) Manpower Pool',
    notes: [
      {
        id: 'n2a',
        author: 'Dholera War Room Agent',
        role: 'Special Investment Region Desk',
        timestamp: '42 mins ago',
        text: 'Automated early warning triggered: Anchor fab foundation stone laid without local accredited feeder ITI.',
      },
      {
        id: 'n2b',
        author: 'District Collector Ahmedabad',
        role: 'DSC Lead',
        timestamp: '12 mins ago',
        text: 'Escalated to State Secretary. Sanction of mobile cleanroom training container units recommended.',
      },
    ],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'District Collector, Ahmedabad',
        name: 'Shri Pravin Solanki, IAS',
        contact: '+91-79-2755-1000',
        notifiedAt: '42 mins ago',
        status: 'escalated',
        slaMinutes: 60,
      },
      {
        level: 2,
        levelName: 'State Skill Development Mission',
        role: 'Principal Secretary (Labour & Skills), Gujarat',
        name: 'Dr. Rajiv Kumar Gupta, IAS',
        contact: '+91-79-2325-1400',
        notifiedAt: '12 mins ago',
        status: 'pending',
        slaMinutes: 60,
        remainingMinutes: 18,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Electronics SSC (ESSCI)',
        name: 'Abhilasha Gaur',
        contact: '+91-11-4603-5050',
        notifiedAt: 'Pending Level 2',
        status: 'pending',
        slaMinutes: 120,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending Level 3',
        status: 'pending',
        slaMinutes: 180,
      },
    ],
  },
  {
    id: 'CRIT-2026-107',
    title: 'Solar PV Rooftop & Substation Grid Technicians Shortage in Thar Parks',
    titleHi: 'थार सोलर पार्क में सोलर पीवी रूफटॉप एवं सबस्टेशन ग्रिड तकनीशियन की गंभीर कमी',
    description: 'PM Surya Ghar scheme installations face 74,000 installer shortfall across western Rajasthan. Contractors report delays in high-voltage net-metering grid synchronizations.',
    descriptionHi: 'पीएम सूर्य घर योजना के तहत ७४,००० कुशल कामगारों की भारी कमी दर्ज की गई है।',
    severity: 'critical',
    status: 'unacknowledged',
    sector: 'Green Hydrogen & Clean Energy',
    sectorCode: 'green',
    state: 'Rajasthan',
    stateCode: 'RJ',
    district: 'Jodhpur & Jaisalmer',
    cluster: 'Bhadla & Thar Mega Solar Park',
    raisedAt: '1 hr ago',
    raisedTimestamp: Date.now() - 65 * 60 * 1000,
    currentEscalationLevel: 1,
    shortageSeats: 74000,
    shortageGapPct: -42.8,
    primaryTrade: 'Solar PV Grid Specialist',
    affectedOems: ['Adani Green Energy', 'ReNew Power', 'Tata Power Solar', 'NTPC REL'],
    assignedWarRoom: 'Rajasthan Skill Mission (RSLDC) & SCGJ',
    slaBreachInMinutes: 0,
    slaBreached: true,
    priorityScheme: 'PM Surya Ghar Muft Bijli Yojana Drive',
    notes: [
      {
        id: 'n3',
        author: 'MNRE Regional Coordinator',
        role: 'Solar Mission Lead',
        timestamp: '1 hr ago',
        text: 'SLA breach imminent: Net metering connection backlog now exceeds 35 days in Jodhpur discom circle.',
      },
    ],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'Chairman DSC Jodhpur',
        name: 'Gaurav Agrawal, IAS',
        contact: '+91-291-265-0010',
        notifiedAt: '65 mins ago',
        status: 'pending',
        slaMinutes: 60,
        remainingMinutes: 0,
      },
      {
        level: 2,
        levelName: 'State Skill Development Mission',
        role: 'Secretary (RSLDC), Rajasthan',
        name: 'Smt. Shreya Guha, IAS',
        contact: '+91-141-222-7700',
        notifiedAt: 'Auto-Triggered (SLA Breached)',
        status: 'pending',
        slaMinutes: 60,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Skill Council for Green Jobs',
        name: 'Dr. Praveen Saxena',
        contact: '+91-11-4175-8500',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 120,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 180,
      },
    ],
  },
  {
    id: 'HIGH-2026-102',
    title: 'EV Battery Management System Technician Deficit in Sriperumbudur',
    titleHi: 'श्रीपेरुंबुदूर ईवी क्लस्टर में बैटरी मैनेजमेंट सिस्टम तकनीशियनों की कमी',
    description: 'Electric 2-wheeler and battery pack manufacturing lines in Sriperumbudur-Hosur corridor face 35,500 technician deficit under PLI-Auto expansion commitments.',
    descriptionHi: 'श्रीपेरुंबुदूर-होसूर पट्ट्यातील ईव्ही बॅटरी तंत्रज्ञांची ३५,५०० तूट.',
    severity: 'high',
    status: 'acknowledged',
    sector: 'Automotive & Clean Mobility (EV)',
    sectorCode: 'auto',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Kanchipuram (Sriperumbudur)',
    cluster: 'Sriperumbudur-Oragadam EV Corridor',
    raisedAt: '2 hrs ago',
    raisedTimestamp: Date.now() - 120 * 60 * 1000,
    acknowledgedAt: '45 mins ago',
    acknowledgedBy: 'Smt. M. Jayanthi, IAS (TN Skill Development Corp)',
    currentEscalationLevel: 2,
    shortageSeats: 35500,
    shortageGapPct: -36.4,
    primaryTrade: 'EV Powertrain & BMS Quality Tech',
    affectedOems: ['Hyundai Motor India', 'Ola Electric', 'Ather Energy', 'Foxconn EV'],
    assignedWarRoom: 'Tamil Nadu SSDM & Automotive SSC',
    slaBreachInMinutes: 105,
    slaBreached: false,
    priorityScheme: 'PLI Auto Ancillary Training Mandate',
    notes: [
      {
        id: 'n4a',
        author: 'TN SSDM Mission Director',
        role: 'State Nodal Officer',
        timestamp: '45 mins ago',
        text: 'Acknowledged. Directed 14 Govt ITIs in Kanchipuram and Chengalpattu to convert mechanical bays to EV battery testing labs.',
      },
    ],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'District Collector, Kanchipuram',
        name: 'M. S. Prasanth, IAS',
        contact: '+91-44-2723-7433',
        notifiedAt: '2 hrs ago',
        status: 'acknowledged',
        slaMinutes: 60,
      },
      {
        level: 2,
        levelName: 'State Skill Mission',
        role: 'Managing Director, TNSDC',
        name: 'Smt. M. Jayanthi, IAS',
        contact: '+91-44-2250-0100',
        notifiedAt: '45 mins ago',
        status: 'acknowledged',
        slaMinutes: 120,
        remainingMinutes: 105,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'ASDC National Lead',
        name: 'Anil Verma',
        contact: '+91-11-4186-8000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 180,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 240,
      },
    ],
  },
  {
    id: 'HIGH-2026-115',
    title: 'Avionics Wire Harness Specialist Shortfall in Bengaluru Hub',
    titleHi: 'बेंगलुरु एयरोस्पेस क्लस्टर में एवियोनिक्स वायर हार्नेस विशेषज्ञों की कमी',
    description: 'Defense aircraft assembly and commercial aerospace exports bottlenecked by 16,800 IPC/WHMA-A-620 certified wire harness technicians.',
    descriptionHi: 'एवियोनिक्स हार्नेस तंत्रज्ञांची १६,८०० जागांची तीव्र कमतरता.',
    severity: 'high',
    status: 'acknowledged',
    sector: 'Aerospace & Aviation',
    sectorCode: 'aero',
    state: 'Karnataka',
    stateCode: 'KA',
    district: 'Bengaluru Urban',
    cluster: 'Peenya & Whitefield Aerospace SEZ',
    raisedAt: '3 hrs ago',
    raisedTimestamp: Date.now() - 180 * 60 * 1000,
    acknowledgedAt: '1 hr ago',
    acknowledgedBy: 'Dr. Naveen Raj Singh, IAS (Karnataka Skill Mission)',
    currentEscalationLevel: 2,
    shortageSeats: 16800,
    shortageGapPct: -31.2,
    primaryTrade: 'Avionics Wire Harness Specialist',
    affectedOems: ['Hindustan Aeronautics Limited (HAL)', 'Boeing India', 'Airbus Engineering', 'Dynamatic Tech'],
    assignedWarRoom: 'Karnataka SSDM & Aerospace SSC (AASSC)',
    slaBreachInMinutes: 180,
    slaBreached: false,
    priorityScheme: 'National Aerospace Skilling Corridor',
    notes: [
      {
        id: 'n5',
        author: 'HAL Liaison Officer',
        role: 'Defense PSU Representative',
        timestamp: '1 hr ago',
        text: 'Bilateral dual-training cohort with GTTC Bengaluru initiated for 2,400 apprentice candidates.',
      },
    ],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'DC Bengaluru Urban',
        name: 'K. A. Dayananda, IAS',
        contact: '+91-80-2221-1292',
        notifiedAt: '3 hrs ago',
        status: 'acknowledged',
        slaMinutes: 60,
      },
      {
        level: 2,
        levelName: 'State Skill Mission',
        role: 'Secretary (Skills), Karnataka',
        name: 'Dr. Naveen Raj Singh, IAS',
        contact: '+91-80-2203-4500',
        notifiedAt: '1 hr ago',
        status: 'acknowledged',
        slaMinutes: 120,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Aerospace & Aviation SSC',
        name: 'Peter Immanuel',
        contact: '+91-80-2237-0050',
        notifiedAt: 'Notified',
        status: 'pending',
        slaMinutes: 180,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 240,
      },
    ],
  },
  {
    id: 'HIGH-2026-128',
    title: 'Cold Chain Logistics & Cryogenic Tech Shortfall in NCR Corridor',
    titleHi: 'एनसीआर कॉरिडोर में कोल्ड चेन एवं क्रायोजेनिक तकनीशियनों की कमी',
    description: 'Rapid expansion of pharmaceutical vaccine storage and quick-commerce refrigerated fulfillment centers has created a 19,400 skilled technician shortfall across Gurugram and Manesar.',
    descriptionHi: 'कोल्ड चेन लॉजिस्टिक्स तंत्रज्ञांची १९,४०० तूट.',
    severity: 'high',
    status: 'escalated',
    sector: 'Logistics & Supply Chain',
    sectorCode: 'logistics',
    state: 'Haryana',
    stateCode: 'HR',
    district: 'Gurugram & Rewari',
    cluster: 'Gurugram-Manesar-Bawal Freight Corridor',
    raisedAt: '4 hrs ago',
    raisedTimestamp: Date.now() - 240 * 60 * 1000,
    escalatedAt: '45 mins ago',
    escalatedTo: 'Level 3: Logistics Sector Skill Council',
    currentEscalationLevel: 3,
    shortageSeats: 19400,
    shortageGapPct: -28.9,
    primaryTrade: 'Cryogenic Refrigeration Technician',
    affectedOems: ['Delhivery', 'Snowman Logistics', 'DHL Express', 'Reliance Retail Supply'],
    assignedWarRoom: 'Haryana Skill Development Mission & LSC',
    slaBreachInMinutes: 45,
    slaBreached: false,
    priorityScheme: 'PM Gati Shakti Logistics Capacity Accelerator',
    notes: [
      {
        id: 'n6',
        author: 'Haryana Skill Mission Director',
        role: 'HSDM Lead',
        timestamp: '45 mins ago',
        text: 'Escalated to national Logistics SSC due to inter-state workforce mobility requirements from UP and Rajasthan.',
      },
    ],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'DC Gurugram',
        name: 'Nishant Kumar Yadav, IAS',
        contact: '+91-124-232-1144',
        notifiedAt: '4 hrs ago',
        status: 'escalated',
        slaMinutes: 60,
      },
      {
        level: 2,
        levelName: 'State Skill Mission',
        role: 'Mission Director, HSDM',
        name: 'Vivek Atray, IAS',
        contact: '+91-172-258-3000',
        notifiedAt: '2 hrs ago',
        status: 'escalated',
        slaMinutes: 120,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Logistics Sector Skill Council',
        name: 'Capt. T. S. Ramanujam',
        contact: '+91-44-4286-9900',
        notifiedAt: '45 mins ago',
        status: 'pending',
        slaMinutes: 180,
        remainingMinutes: 45,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 240,
      },
    ],
  },
  {
    id: 'MED-2026-121',
    title: 'Heavy Welder & Boiler Fabricator Bottleneck in UP Defence Corridor',
    titleHi: 'उत्तर प्रदेश रक्षा गलियारे में हेवी वेल्डर एवं बॉयलर फैब्रिकेटर की कमी',
    description: 'Armoured vehicle chassis manufacturing and artillery barrel forging nodes in Kanpur require 14,200 structural ASME-IX certified welders.',
    descriptionHi: 'कानपूर संरक्षण कॉरिडोअरमध्ये हेवी वेल्डरची १४,२०० कमतरता.',
    severity: 'medium',
    status: 'acknowledged',
    sector: 'Capital Goods & Defence',
    sectorCode: 'mfg',
    state: 'Uttar Pradesh',
    stateCode: 'UP',
    district: 'Kanpur Nagar & Lucknow',
    cluster: 'UP Defence Industrial Corridor (Kanpur Node)',
    raisedAt: '5 hrs ago',
    raisedTimestamp: Date.now() - 300 * 60 * 1000,
    acknowledgedAt: '3 hrs ago',
    acknowledgedBy: 'Shri Abhishek Prakash, IAS (UPSDM Mission Director)',
    currentEscalationLevel: 2,
    shortageSeats: 14200,
    shortageGapPct: -22.5,
    primaryTrade: 'TIG/MIG Structural Welder',
    affectedOems: ['Armoured Vehicles Nigam Limited', 'BHEL Kanpur', 'L&T Defence', 'Adani Defence'],
    assignedWarRoom: 'UP Skill Development Mission (UPSDM)',
    slaBreachInMinutes: 210,
    slaBreached: false,
    priorityScheme: 'Defence Manufacturing Skill Enhancement Mission',
    notes: [],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'DM Kanpur Nagar',
        name: 'Rakesh Kumar Singh, IAS',
        contact: '+91-512-230-5500',
        notifiedAt: '5 hrs ago',
        status: 'acknowledged',
        slaMinutes: 120,
      },
      {
        level: 2,
        levelName: 'State Skill Mission',
        role: 'Mission Director, UPSDM',
        name: 'Abhishek Prakash, IAS',
        contact: '+91-522-223-9000',
        notifiedAt: '3 hrs ago',
        status: 'acknowledged',
        slaMinutes: 240,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Capital Goods SSC',
        name: 'Shalini Singh',
        contact: '+91-11-4502-3000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 360,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 480,
      },
    ],
  },
  {
    id: 'MED-2026-134',
    title: 'Clinical Dialysis & Biomedical Allied Technicians Shortfall in Hyderabad',
    titleHi: 'हैदराबाद जीनोम वैली में बायोमेडिकल एवं डायलिसिस तकनीशियनों की कमी',
    description: 'Multispecialty hospital chains and medical device parks in Genome Valley report 12,100 allied healthcare technicians shortfall for acute care and dialysis centers.',
    descriptionHi: 'हैदराबाद जीनोम व्हॅलीमध्ये १२,१०० वैद्यकीय तंत्रज्ञांची कमतरता.',
    severity: 'medium',
    status: 'acknowledged',
    sector: 'Healthcare & Allied Medical',
    sectorCode: 'health',
    state: 'Telangana',
    stateCode: 'TS',
    district: 'Hyderabad & Medchal',
    cluster: 'Genome Valley & Pharma City Hub',
    raisedAt: '6 hrs ago',
    raisedTimestamp: Date.now() - 360 * 60 * 1000,
    acknowledgedAt: '4 hrs ago',
    acknowledgedBy: 'Dr. G. Ravi Babu, IAS (Telangana SSDM)',
    currentEscalationLevel: 2,
    shortageSeats: 12100,
    shortageGapPct: -19.4,
    primaryTrade: 'Dialysis Therapy Technician',
    affectedOems: ['Apollo Hospitals', 'Yashoda Healthcare', 'Dr. Reddy Labs MedTech', 'Biological E'],
    assignedWarRoom: 'Telangana State Skill Mission & HSSC',
    slaBreachInMinutes: 300,
    slaBreached: false,
    priorityScheme: 'National Allied & Healthcare Professions Directive',
    notes: [],
    escalationPath: [
      {
        level: 1,
        levelName: 'District Skill Committee',
        role: 'Collector Hyderabad',
        name: 'Anudeep Durishetty, IAS',
        contact: '+91-40-2320-2833',
        notifiedAt: '6 hrs ago',
        status: 'acknowledged',
        slaMinutes: 120,
      },
      {
        level: 2,
        levelName: 'State Skill Mission',
        role: 'Mission Director, TSSDM',
        name: 'Dr. G. Ravi Babu, IAS',
        contact: '+91-40-2345-0011',
        notifiedAt: '4 hrs ago',
        status: 'acknowledged',
        slaMinutes: 240,
      },
      {
        level: 3,
        levelName: 'Sector Skill Council',
        role: 'CEO, Healthcare SSC',
        name: 'Ashish Jain',
        contact: '+91-11-4101-7000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 360,
      },
      {
        level: 4,
        levelName: 'Central Apex War Room',
        role: 'Joint Secretary, MSDE GOI',
        name: 'Dr. Rajesh Sharma, IAS',
        contact: '+91-11-2346-5000',
        notifiedAt: 'Pending',
        status: 'pending',
        slaMinutes: 480,
      },
    ],
  },
];

const INITIAL_HISTORICAL_LOG: SituationalAlert[] = [
  {
    id: 'HIST-2026-042',
    title: 'Cryogenic Liquid Oxygen Tanker Drivers Shortfall in Bokaro',
    severity: 'critical',
    status: 'resolved',
    sector: 'Logistics & Heavy Transport',
    sectorCode: 'logistics',
    state: 'Jharkhand',
    stateCode: 'JH',
    district: 'Bokaro',
    cluster: 'Bokaro Steel Industrial Cluster',
    raisedAt: '12 Oct 2026 09:30',
    raisedTimestamp: Date.now() - 5 * 86400 * 1000,
    acknowledgedAt: '12 Oct 2026 09:55',
    acknowledgedBy: 'Dr. K. N. Rao, IAS',
    escalatedAt: '12 Oct 2026 10:40',
    escalatedTo: 'Central Ministry (MoRTH & MSDE)',
    resolvedAt: '13 Oct 2026 16:20',
    resolvedBy: 'Dr. Rajesh Sharma, IAS',
    resolutionNote: 'Special driver certification drive with SAIL and Indian Oil accredited 4,200 heavy vehicle drivers.',
    currentEscalationLevel: 4,
    shortageSeats: 4200,
    shortageGapPct: -38.5,
    primaryTrade: 'Cryogenic Tanker Pilot',
    affectedOems: ['SAIL Bokaro', 'Linde India', 'Inox Air Products'],
    assignedWarRoom: 'Jharkhand SSDM & Logistics SSC',
    slaBreachInMinutes: 0,
    slaBreached: false,
    priorityScheme: 'National Hazardous Cargo Skilling Protocol',
    description: 'Emergency allocation of hazardous materials driver training modules.',
    notes: [],
    escalationPath: [],
  },
  {
    id: 'HIST-2026-039',
    title: 'Subsea Pipe Welder Deficit for KG-D6 Offshore Operations',
    severity: 'high',
    status: 'resolved',
    sector: 'Oil & Gas and Marine Fabrication',
    sectorCode: 'mfg',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    district: 'Kakinada',
    cluster: 'Kakinada Deep Water Energy Port',
    raisedAt: '08 Oct 2026 14:15',
    raisedTimestamp: Date.now() - 9 * 86400 * 1000,
    acknowledgedAt: '08 Oct 2026 15:00',
    acknowledgedBy: 'Shri J. Nivas, IAS',
    escalatedAt: '08 Oct 2026 16:30',
    escalatedTo: 'Hydrocarbon SSC & Ministry of Petroleum',
    resolvedAt: '10 Oct 2026 11:45',
    resolvedBy: 'Joint Secretary MSDE',
    resolutionNote: 'Navy Dockyard Visakhapatnam simulation facilities mobilized for 1,800 hyperbaric certified welders.',
    currentEscalationLevel: 3,
    shortageSeats: 1800,
    shortageGapPct: -29.0,
    primaryTrade: 'Hyperbaric Underwater Welder',
    affectedOems: ['Reliance Industries', 'ONGC Eastern Offshore', 'L&T Hydrocarbon'],
    assignedWarRoom: 'AP State Skill Mission & Hydrocarbon SSC',
    slaBreachInMinutes: 0,
    slaBreached: false,
    priorityScheme: 'National Deep Sea Energy Skilling Drive',
    description: 'Offshore pipeline fabrication specialist shortage.',
    notes: [],
    escalationPath: [],
  },
  {
    id: 'HIST-2026-031',
    title: 'High-Speed Rail Track Inspection Tech Deficit for MAHSR Corridor',
    severity: 'high',
    status: 'resolved',
    sector: 'Railway Infrastructure & High-Speed Transit',
    sectorCode: 'mfg',
    state: 'Gujarat',
    stateCode: 'GJ',
    district: 'Surat & Vadodara',
    cluster: 'Mumbai-Ahmedabad Bullet Train Corridor',
    raisedAt: '03 Oct 2026 11:00',
    raisedTimestamp: Date.now() - 14 * 86400 * 1000,
    acknowledgedAt: '03 Oct 2026 11:30',
    acknowledgedBy: 'Managing Director NHSRCL',
    escalatedAt: '03 Oct 2026 13:00',
    escalatedTo: 'Railway Board & MSDE Apex',
    resolvedAt: '05 Oct 2026 17:00',
    resolvedBy: 'Apex Cabinet Committee',
    resolutionNote: 'JR East Japan training cohort deployed at Vadodara High-Speed Training Institute for 3,600 track ballast inspectors.',
    currentEscalationLevel: 3,
    shortageSeats: 3600,
    shortageGapPct: -24.5,
    primaryTrade: 'Shinkansen Slab Track Inspector',
    affectedOems: ['NHSRCL', 'L&T Construction Heavy Civil', 'Japan International Consultants'],
    assignedWarRoom: 'NHSRCL Vadodara War Room',
    slaBreachInMinutes: 0,
    slaBreached: false,
    priorityScheme: 'MAHSR Bilateral Japan Tech Protocol',
    description: 'Specialized high speed rail track inspection workforce requirement.',
    notes: [],
    escalationPath: [],
  },
  {
    id: 'HIST-2026-024',
    title: 'Textile Automated Loom Weavers Bottleneck in Tirupur Export Hub',
    severity: 'medium',
    status: 'resolved',
    sector: 'Apparel & Garment Manufacturing',
    sectorCode: 'textiles',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    district: 'Tirupur',
    cluster: 'Tirupur Knitwear Export Cluster',
    raisedAt: '28 Sep 2026 16:20',
    raisedTimestamp: Date.now() - 19 * 86400 * 1000,
    acknowledgedAt: '28 Sep 2026 17:10',
    acknowledgedBy: 'District Collector Tirupur',
    resolvedAt: '30 Sep 2026 12:30',
    resolvedBy: 'TNSDC Regional Director',
    resolutionNote: 'NAPS apprenticeship stipend sanction of 8,500 slots approved for Tirupur Exporters Association.',
    currentEscalationLevel: 2,
    shortageSeats: 8500,
    shortageGapPct: -18.2,
    primaryTrade: 'Circular Knitting & Automated Loom Operator',
    affectedOems: ['Shahi Exports', 'KPR Mill', 'Eastman Exports'],
    assignedWarRoom: 'Tirupur District Skill Committee',
    slaBreachInMinutes: 0,
    slaBreached: false,
    priorityScheme: 'PM MITRA Mega Textile Park Skilling Scheme',
    description: 'Automated circular knitting machine operator shortfall.',
    notes: [],
    escalationPath: [],
  },
];

const INITIAL_PENDING_ACKNOWLEDGMENTS: PendingAcknowledgmentItem[] = [
  {
    id: 'pa-1',
    officialName: 'Dr. Suhas Diwase, IAS',
    officialRole: 'District Collector & Chairman DSC',
    department: 'Pune District Administration, Maharashtra',
    alertId: 'CRIT-2026-089',
    alertTitle: 'Acute CNC 5-Axis Machinist Shortage in Pune Industrial Belt',
    severity: 'critical',
    pendingSinceMinutes: 38,
    phone: '+91-20-2612-4001',
    email: 'collector.pune@maharashtra.gov.in',
  },
  {
    id: 'pa-2',
    officialName: 'Dr. Rajiv Kumar Gupta, IAS',
    officialRole: 'Principal Secretary (Labour & Skills)',
    department: 'Government of Gujarat, Gandhinagar',
    alertId: 'CRIT-2026-094',
    alertTitle: 'Semiconductor Fab Cleanroom Technician Shortfall in Dholera SIR',
    severity: 'critical',
    pendingSinceMinutes: 18,
    phone: '+91-79-2325-1400',
    email: 'sec-labour@gujarat.gov.in',
  },
  {
    id: 'pa-3',
    officialName: 'Gaurav Agrawal, IAS',
    officialRole: 'District Collector & DSC Chairman',
    department: 'Jodhpur District Administration, Rajasthan',
    alertId: 'CRIT-2026-107',
    alertTitle: 'Solar PV Rooftop & Substation Grid Technicians Shortage in Thar Parks',
    severity: 'critical',
    pendingSinceMinutes: 65,
    phone: '+91-291-265-0010',
    email: 'dm-jodhpur@rajasthan.gov.in',
  },
  {
    id: 'pa-4',
    officialName: 'Capt. T. S. Ramanujam',
    officialRole: 'Chief Executive Officer',
    department: 'Logistics Sector Skill Council (LSC)',
    alertId: 'HIGH-2026-128',
    alertTitle: 'Cold Chain Logistics & Cryogenic Tech Shortfall in NCR Corridor',
    severity: 'high',
    pendingSinceMinutes: 45,
    phone: '+91-44-4286-9900',
    email: 'ceo@lsc-india.com',
  },
  {
    id: 'pa-5',
    officialName: 'Shalini Singh',
    officialRole: 'Chief Executive Officer',
    department: 'Capital Goods Skill Council (CGSC)',
    alertId: 'MED-2026-121',
    alertTitle: 'Heavy Welder & Boiler Fabricator Bottleneck in UP Defence Corridor',
    severity: 'medium',
    pendingSinceMinutes: 120,
    phone: '+91-11-4502-3000',
    email: 'shalini.singh@cgsc.in',
  },
];

const INITIAL_ESCALATION_TIERS: EscalationPathwayTier[] = [
  {
    tier: 1,
    tierName: 'District Skill Committee (DSC)',
    jurisdiction: 'District Level (Collector & GM-DIC)',
    leadOfficer: 'District Magistrate / Collector',
    leadRole: 'Statutory Local Chairman',
    targetResponseHours: 1,
    activeIncidentsCount: 3,
    status: 'critical',
  },
  {
    tier: 2,
    tierName: 'State Skill Development Mission (SSDM)',
    jurisdiction: 'State Skill Secretariat',
    leadOfficer: 'Mission Director / Principal Secretary',
    leadRole: 'State Operational Authority',
    targetResponseHours: 2,
    activeIncidentsCount: 4,
    status: 'alert',
  },
  {
    tier: 3,
    tierName: 'Sector Skill Council (SSC)',
    jurisdiction: 'National Industry Sector Board',
    leadOfficer: 'Chief Executive Officer (SSC)',
    leadRole: 'Curriculum & Qualification Lead',
    targetResponseHours: 4,
    activeIncidentsCount: 1,
    status: 'nominal',
  },
  {
    tier: 4,
    tierName: 'Central MSDE Apex War Room',
    jurisdiction: 'Ministry of Skill Development & Entrepreneurship',
    leadOfficer: 'Dr. Rajesh Sharma, IAS',
    leadRole: 'Joint Secretary (Policy & Planning)',
    targetResponseHours: 6,
    activeIncidentsCount: 0,
    status: 'nominal',
  },
];

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: INITIAL_ALERTS,
  historicalAlerts: INITIAL_HISTORICAL_LOG,
  pendingAcknowledgments: INITIAL_PENDING_ACKNOWLEDGMENTS,
  escalationTiers: INITIAL_ESCALATION_TIERS,
  selectedAlert: INITIAL_ALERTS[0],
  isDetailSheetOpen: false,
  isCreateModalOpen: false,
  filters: {
    severity: 'all',
    status: 'all',
    sector: 'all',
    state: 'all',
    timeRange: 'all',
    searchQuery: '',
  },
  lastSyncTime: '15:14:28 IST',

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        severity: 'all',
        status: 'all',
        sector: 'all',
        state: 'all',
        timeRange: 'all',
        searchQuery: '',
      },
    });
  },

  setSelectedAlert: (alert) => set({ selectedAlert: alert }),
  setIsDetailSheetOpen: (open) => set({ isDetailSheetOpen: open }),
  setIsCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

  acknowledgeAlert: (id, acknowledgedBy = 'Dr. Rajesh Sharma, IAS') => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST`;

    set((state) => {
      const updatedAlerts = state.alerts.map((alert) => {
        if (alert.id === id) {
          const updatedPath = alert.escalationPath.map((step) => {
            if (step.level === alert.currentEscalationLevel) {
              return { ...step, status: 'acknowledged' as const };
            }
            return step;
          });

          return {
            ...alert,
            status: 'acknowledged' as AlertStatus,
            acknowledgedAt: `Just now (${timeStr})`,
            acknowledgedBy,
            escalationPath: updatedPath,
            notes: [
              {
                id: `n-${Date.now()}`,
                author: acknowledgedBy,
                role: 'Ministerial Authority',
                timestamp: 'Just now',
                text: 'Official ministerial acknowledgment recorded. Remediation plan initiated.',
              },
              ...alert.notes,
            ],
          };
        }
        return alert;
      });

      // Remove from pending acknowledgments
      const updatedPending = state.pendingAcknowledgments.filter((p) => p.alertId !== id);

      // If selected alert was updated, update it too
      const currentSelected = state.selectedAlert?.id === id
        ? updatedAlerts.find((a) => a.id === id) || null
        : state.selectedAlert;

      return {
        alerts: updatedAlerts,
        pendingAcknowledgments: updatedPending,
        selectedAlert: currentSelected,
        lastSyncTime: timeStr,
      };
    });
  },

  acknowledgeAllCritical: (acknowledgedBy = 'Dr. Rajesh Sharma, IAS') => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST`;

    let count = 0;
    set((state) => {
      const updatedAlerts = state.alerts.map((alert) => {
        if (alert.severity === 'critical' && alert.status === 'unacknowledged') {
          count++;
          return {
            ...alert,
            status: 'acknowledged' as AlertStatus,
            acknowledgedAt: `Just now (${timeStr})`,
            acknowledgedBy,
            notes: [
              {
                id: `n-${Date.now()}-${count}`,
                author: acknowledgedBy,
                role: 'Ministerial Authority',
                timestamp: 'Just now',
                text: 'Bulk executive acknowledgment executed via Situation Room.',
              },
              ...alert.notes,
            ],
          };
        }
        return alert;
      });

      const updatedPending = state.pendingAcknowledgments.filter((p) => p.severity !== 'critical');

      return {
        alerts: updatedAlerts,
        pendingAcknowledgments: updatedPending,
        lastSyncTime: timeStr,
      };
    });

    return count;
  },

  escalateAlert: (id, targetLevel, note = 'Escalated by Ministerial Command Centre.') => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST`;

    set((state) => {
      const updatedAlerts = state.alerts.map((alert) => {
        if (alert.id === id) {
          const nextLevel = Math.min(4, Math.max(alert.currentEscalationLevel + 1, targetLevel));
          const levelNames = ['', 'District Skill Committee', 'State Skill Mission', 'Sector Skill Council', 'Central Apex War Room'];

          const updatedPath = alert.escalationPath.map((step) => {
            if (step.level === nextLevel) {
              return { ...step, status: 'pending' as const, notifiedAt: `Just now (${timeStr})` };
            }
            if (step.level < nextLevel) {
              return { ...step, status: 'escalated' as const };
            }
            return step;
          });

          return {
            ...alert,
            status: 'escalated' as AlertStatus,
            currentEscalationLevel: nextLevel,
            escalatedAt: `Just now (${timeStr})`,
            escalatedTo: `Level ${nextLevel}: ${levelNames[nextLevel]}`,
            escalationPath: updatedPath,
            notes: [
              {
                id: `n-esc-${Date.now()}`,
                author: 'Dr. Rajesh Sharma, IAS',
                role: 'Joint Secretary, MSDE',
                timestamp: 'Just now',
                text: `Escalated to Level ${nextLevel} (${levelNames[nextLevel]}): ${note}`,
              },
              ...alert.notes,
            ],
          };
        }
        return alert;
      });

      const currentSelected = state.selectedAlert?.id === id
        ? updatedAlerts.find((a) => a.id === id) || null
        : state.selectedAlert;

      return {
        alerts: updatedAlerts,
        selectedAlert: currentSelected,
        lastSyncTime: timeStr,
      };
    });
  },

  resolveAlert: (id, resolutionNote, resolvedBy = 'Dr. Rajesh Sharma, IAS') => {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    set((state) => {
      const targetAlert = state.alerts.find((a) => a.id === id);
      if (!targetAlert) return state;

      const resolvedItem: SituationalAlert = {
        ...targetAlert,
        status: 'resolved',
        resolvedAt: timeStr,
        resolvedBy,
        resolutionNote,
        notes: [
          {
            id: `n-res-${Date.now()}`,
            author: resolvedBy,
            role: 'Resolving Authority',
            timestamp: 'Just now',
            text: `Incident resolved: ${resolutionNote}`,
          },
          ...targetAlert.notes,
        ],
      };

      const updatedAlerts = state.alerts.filter((a) => a.id !== id);
      const updatedHistory = [resolvedItem, ...state.historicalAlerts];
      const updatedPending = state.pendingAcknowledgments.filter((p) => p.alertId !== id);

      return {
        alerts: updatedAlerts,
        historicalAlerts: updatedHistory,
        pendingAcknowledgments: updatedPending,
        selectedAlert: updatedAlerts[0] || null,
        isDetailSheetOpen: false,
        lastSyncTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST`,
      };
    });
  },

  addNote: (id, text, author = 'Dr. Rajesh Sharma, IAS') => {
    const newNote = {
      id: `n-${Date.now()}`,
      author,
      role: 'Joint Secretary, MSDE',
      timestamp: 'Just now',
      text,
    };

    set((state) => {
      const updatedAlerts = state.alerts.map((alert) => {
        if (alert.id === id) {
          return {
            ...alert,
            notes: [newNote, ...alert.notes],
          };
        }
        return alert;
      });

      const currentSelected = state.selectedAlert?.id === id
        ? updatedAlerts.find((a) => a.id === id) || null
        : state.selectedAlert;

      return {
        alerts: updatedAlerts,
        selectedAlert: currentSelected,
      };
    });
  },

  createManualAlert: (newAlertData) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST`;
    const newId = `MAN-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const alert: SituationalAlert = {
      id: newId,
      title: newAlertData.title || 'Manual Ministerial Situation Directive',
      description: newAlertData.description || 'Manually logged situational incident requiring immediate ground verification.',
      severity: newAlertData.severity || 'high',
      status: 'unacknowledged',
      sector: newAlertData.sector || 'Capital Goods & Manufacturing',
      sectorCode: newAlertData.sectorCode || 'mfg',
      state: newAlertData.state || 'Maharashtra',
      stateCode: newAlertData.stateCode || 'MH',
      district: newAlertData.district || 'Pune',
      cluster: newAlertData.cluster || 'District Skill Hub',
      raisedAt: 'Just now',
      raisedTimestamp: Date.now(),
      currentEscalationLevel: 1,
      shortageSeats: newAlertData.shortageSeats || 12500,
      shortageGapPct: newAlertData.shortageGapPct || -30.0,
      primaryTrade: newAlertData.primaryTrade || 'Core Industrial Operations',
      affectedOems: newAlertData.affectedOems || ['Local MSME & Industrial Clusters'],
      assignedWarRoom: `${newAlertData.district || 'District'} Skill Committee & State Directorate`,
      slaBreachInMinutes: 60,
      slaBreached: false,
      priorityScheme: newAlertData.priorityScheme || 'PMKVY 4.0 Special Drive',
      notes: [
        {
          id: `n-init-${Date.now()}`,
          author: 'Dr. Rajesh Sharma, IAS',
          role: 'Joint Secretary, MSDE',
          timestamp: 'Just now',
          text: 'Incident manually dispatched from Central Situational & Monitoring Console.',
        },
      ],
      escalationPath: [
        {
          level: 1,
          levelName: 'District Skill Committee',
          role: 'District Collector',
          name: 'Nodal Officer',
          contact: '+91-11-2346-5000',
          notifiedAt: 'Just now',
          status: 'pending',
          slaMinutes: 60,
          remainingMinutes: 60,
        },
      ],
    };

    set((state) => ({
      alerts: [alert, ...state.alerts],
      selectedAlert: alert,
      isCreateModalOpen: false,
      lastSyncTime: timeStr,
    }));
  },

  nudgeOfficial: (officialId) => {
    set((state) => ({
      pendingAcknowledgments: state.pendingAcknowledgments.map((p) => {
        if (p.id === officialId) {
          return {
            ...p,
            pendingSinceMinutes: Math.max(1, p.pendingSinceMinutes - 5),
          };
        }
        return p;
      }),
    }));
  },

  triggerSimulatedAlert: () => {
    const id = `INC-${Date.now().toString().slice(-4)}`;
    const newSimAlert: SituationalAlert = {
      id,
      title: 'Real-time Telemetry Inflow: CNC Assembly Shortage Detected in Chakan',
      description: 'Automated EPFO and NCS crawler detected 4,800 fresh unfilled openings across automotive Tier-2 ancillaries.',
      severity: 'high',
      status: 'unacknowledged',
      sector: 'Automotive & Clean Mobility',
      sectorCode: 'auto',
      state: 'Maharashtra',
      stateCode: 'MH',
      district: 'Pune',
      cluster: 'Chakan MIDC Phase 2',
      raisedAt: 'Just now',
      raisedTimestamp: Date.now(),
      currentEscalationLevel: 1,
      shortageSeats: 4800,
      shortageGapPct: -26.5,
      primaryTrade: 'Assembly Line Tech',
      affectedOems: ['Chakan Auto Ancillaries', 'Pimpri Forging Hub'],
      assignedWarRoom: 'Pune District Skill Committee',
      slaBreachInMinutes: 60,
      slaBreached: false,
      priorityScheme: 'PMKVY 4.0 Special Drive',
      notes: [],
      escalationPath: [
        {
          level: 1,
          levelName: 'District Skill Committee',
          role: 'DC Pune',
          name: 'Dr. Suhas Diwase, IAS',
          contact: '+91-20-2612-4001',
          notifiedAt: 'Just now',
          status: 'pending',
          slaMinutes: 60,
          remainingMinutes: 60,
        },
      ],
    };

    set((state) => ({
      alerts: [newSimAlert, ...state.alerts],
      lastSyncTime: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} IST`,
    }));
  },
}));
