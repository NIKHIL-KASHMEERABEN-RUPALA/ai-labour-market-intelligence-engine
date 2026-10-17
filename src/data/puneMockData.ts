import {
  PuneTradeLedgerItem,
  TrainingCenterMarker,
  IndustryVoiceItem,
  DistrictForecastPoint,
  DistrictIntervention,
} from '../types';

export const PUNE_KPIS = {
  tradesTracked: 14,
  tradesSub: '+2 new trades under trial',
  tradesSubHi: '+2 नए ट्रेड परीक्षण में',
  criticalAlerts: 38,
  alertsSub: 'on-farm / on-field industrial outliers',
  alertsSubHi: 'औद्योगिक मांग में गंभीर असंतुलन',
  activeSeats: 42500,
  seatsSub: '+8.2% YoY • Sanctioned cap',
  seatsSubHi: '+8.2% वार्षिक • स्वीकृत क्षमता',
  placementRate: 78.4,
  placementSub: '+3.2% YoY • 6-Mo retention',
  placementSubHi: '+3.2% वार्षिक • 6-माह प्रतिधारण',
};

export const PUNE_FORECAST_DATA: DistrictForecastPoint[] = [
  { period: 'Current (Q3 26)', periodLabel: 'Current (Q3 26)', projectedDemand: 44200, sanctionedSupply: 42500, deficitGap: 1700, isForecast: false },
  { period: '+6 Months (Q1 27)', periodLabel: '+6 Months (Q1 27)', projectedDemand: 49800, sanctionedSupply: 43100, deficitGap: 6700, isForecast: true },
  { period: '+12 Months (Q3 27)', periodLabel: '+12 Months (Q3 27)', projectedDemand: 58700, sanctionedSupply: 42500, deficitGap: 16200, isForecast: true },
  { period: '+18 Months (Q1 28)', periodLabel: '+18 Months (Q1 28)', projectedDemand: 63400, sanctionedSupply: 44000, deficitGap: 19400, isForecast: true },
];

export const PUNE_TRADE_LEDGER: PuneTradeLedgerItem[] = [
  {
    id: 'pt-1',
    trade: 'CNC Machinist & 5-Axis Programmer',
    tradeHi: 'सीएनसी मशीनिस्ट एवं 5-एक्सिस प्रोग्रामर',
    focusArea: 'Automotive Powertrain, Precision Tooling',
    nsqfLevel: 4,
    currentSeats: 1180,
    projectedDemand: 2280,
    netGap: -1100,
    gapPercent: -48.2,
    severity: 'Acute Shortage',
    severityType: 'acute',
    recommendedAction: 'Sanction 3-Shift ITI Batches',
    actionBtnText: 'Request PMKVY Seats',
  },
  {
    id: 'pt-2',
    trade: 'Industrial Automation & Robotics Tech',
    tradeHi: 'औद्योगिक स्वचालन एवं रोबोटिक्स तकनीशियन',
    focusArea: 'Cobot Assembly, Sensor & PLC Logic',
    nsqfLevel: 5,
    currentSeats: 820,
    projectedDemand: 2120,
    netGap: -1300,
    gapPercent: -61.3,
    severity: 'Acute Shortage',
    severityType: 'acute',
    recommendedAction: 'Tie-up with Tata Motors & ABB',
    actionBtnText: 'Urgent Re-Allocation',
  },
  {
    id: 'pt-3',
    trade: 'Quality Control Inspector (CMM & Metrology)',
    tradeHi: 'गुणवत्ता नियंत्रण निरीक्षक (सीएमएम व मेट्रोलॉजी)',
    focusArea: 'Sub-micron Metrology & NDT Testing',
    nsqfLevel: 4,
    currentSeats: 1150,
    projectedDemand: 1600,
    netGap: -450,
    gapPercent: -28.1,
    severity: 'Moderate Deficit',
    severityType: 'moderate',
    recommendedAction: 'Calibrate CMM Lab Equipment',
    actionBtnText: 'Curriculum Update',
  },
  {
    id: 'pt-4',
    trade: 'Core Wiring & General Electrician',
    tradeHi: 'कोर वायरिंग एवं सामान्य इलेक्ट्रीशियन',
    focusArea: 'Standard Domestic & Building Power',
    nsqfLevel: 3,
    currentSeats: 4100,
    projectedDemand: 3750,
    netGap: 350,
    gapPercent: 8.5,
    severity: 'Balanced / Oversupply',
    severityType: 'balanced',
    recommendedAction: 'Re-divert 350 seats to EV Battery',
    actionBtnText: 'Freeze & Divert',
  },
  {
    id: 'pt-5',
    trade: 'Agro-Processing Plant Technician',
    tradeHi: 'कृषि प्रसंस्करण संयंत्र तकनीशियन',
    focusArea: 'Cold-Chain Packaging & Grading Lines',
    nsqfLevel: 4,
    currentSeats: 780,
    projectedDemand: 1220,
    netGap: -440,
    gapPercent: -36.1,
    severity: 'Moderate Deficit',
    severityType: 'moderate',
    recommendedAction: 'Partner with Baramati Agro Cluster',
    actionBtnText: 'New Training Pod',
  },
  {
    id: 'pt-6',
    trade: 'EV Powertrain & Cell Assembly Specialist',
    tradeHi: 'ईवी पावरट्रेन एवं सेल असेंबली विशेषज्ञ',
    focusArea: 'High-Voltage DC & Immersion Testing',
    nsqfLevel: 5,
    currentSeats: 640,
    projectedDemand: 1980,
    netGap: -1340,
    gapPercent: -67.7,
    severity: 'Acute Shortage',
    severityType: 'acute',
    recommendedAction: 'Deploy 500V DC Safety Pods',
    actionBtnText: 'Request PMKVY Seats',
  },
  {
    id: 'pt-7',
    trade: 'Tool & Die Maker (Press Tools & Plastic Molds)',
    tradeHi: 'टूल एंड डाई मेकर (प्रेस टूल्स व मोल्ड्स)',
    focusArea: 'Sheet Metal Stamping, Precision Jigs',
    nsqfLevel: 5,
    currentSeats: 890,
    projectedDemand: 1480,
    netGap: -590,
    gapPercent: -39.9,
    severity: 'Moderate Deficit',
    severityType: 'moderate',
    recommendedAction: 'Dual-training with Sandvik & Bharat Forge',
    actionBtnText: 'MoU Apprenticeship',
  },
  {
    id: 'pt-8',
    trade: 'Mechatronics Maintenance Fitter',
    tradeHi: 'मेकाट्रॉनिक्स रखरखाव फिटर',
    focusArea: 'Hydraulics, Pneumatics & Drive Servicing',
    nsqfLevel: 5,
    currentSeats: 920,
    projectedDemand: 1750,
    netGap: -830,
    gapPercent: -47.4,
    severity: 'Acute Shortage',
    severityType: 'acute',
    recommendedAction: 'Fast-track PLC Lab Certification',
    actionBtnText: 'Sanction Extra Cohort',
  },
];

export const PUNE_CENTERS: TrainingCenterMarker[] = [
  {
    id: 'pc-1',
    name: 'Govt ITI Pimpri-Chinchwad',
    taluka: 'Haveli / PCMC',
    type: 'Govt ITI',
    seats: 3800,
    tradesCount: 22,
    topTrade: 'CNC Machinist & Tool Die',
    coordinates: [130, 160],
    status: 'Critical Deficit',
  },
  {
    id: 'pc-2',
    name: 'PMKK Chakan Auto Cluster Hub',
    taluka: 'Khed (Chakan)',
    type: 'PMKK',
    seats: 1850,
    tradesCount: 8,
    topTrade: 'Robotic Welding & EV Assembly',
    coordinates: [140, 95],
    status: 'Critical Deficit',
  },
  {
    id: 'pc-3',
    name: 'Tata Motors Dual-Training Academy',
    taluka: 'Bhosari MIDC',
    type: 'Industry COE',
    seats: 1200,
    tradesCount: 6,
    topTrade: 'Mechatronics & EV Powertrain',
    coordinates: [180, 155],
    status: 'Near Capacity',
  },
  {
    id: 'pc-4',
    name: 'Govt ITI Aundh',
    taluka: 'Pune City',
    type: 'Govt ITI',
    seats: 2400,
    tradesCount: 18,
    topTrade: 'Industrial Electrician & Wireman',
    coordinates: [175, 205],
    status: 'Optimal',
  },
  {
    id: 'pc-5',
    name: 'PMKK Talegaon Dabhade',
    taluka: 'Maval',
    type: 'PMKK',
    seats: 950,
    tradesCount: 5,
    topTrade: 'Precision CNC & Milling',
    coordinates: [90, 130],
    status: 'Critical Deficit',
  },
  {
    id: 'pc-6',
    name: 'PMKK Ranjangaon Electronics Zone',
    taluka: 'Shirur',
    type: 'PMKK',
    seats: 1600,
    tradesCount: 7,
    topTrade: 'SMT Assembly & Quality Testing',
    coordinates: [290, 140],
    status: 'Near Capacity',
  },
  {
    id: 'pc-7',
    name: 'Baramati Agro-Tech Training Hub',
    taluka: 'Baramati',
    type: 'Private ITI',
    seats: 1350,
    tradesCount: 9,
    topTrade: 'Agro Processing & Cold Chain',
    coordinates: [280, 275],
    status: 'Optimal',
  },
];

export const PUNE_INDUSTRY_VOICE: IndustryVoiceItem[] = [
  {
    id: 'iv-1',
    companyName: 'Tata Motors Passenger Vehicles Unit',
    cluster: 'Pimpri-Chakan Hub',
    openSeatsCount: 180,
    timeAgo: '4 hours ago',
    quote: 'Severe shortage of multi-axis CNC operators trained on new Fanuc/Siemens controls. Willing to co-sponsor 50% stipend for 6-month dual apprenticeships with local ITIs.',
    quoteHi: 'नए फानुक/सीमेंस नियंत्रणों पर प्रशिक्षित मल्टी-एक्सिस सीएनसी ऑपरेटरों की भारी कमी। स्थानीय आईटीआई के साथ 6 महीने के दोहरे शिक्षुता हेतु 50% वजीफा देने को तैयार।',
    primaryTrade: 'CNC Operator & 5-Axis Tech',
    statusBadge: '180 Open Seats',
  },
  {
    id: 'iv-2',
    companyName: 'Bharat Forge Limited',
    cluster: 'Mundhwa & Chakan Units',
    openSeatsCount: 210,
    timeAgo: 'Yesterday',
    quote: 'Immediate requirement for certified induction heat treatment and metallurgical quality inspectors. Current ITI pass-outs lack ultrasonic non-destructive testing training.',
    quoteHi: 'प्रमाणित इंडक्शन हीट ट्रीटमेंट और धातुकर्म गुणवत्ता निरीक्षकों की तत्काल आवश्यकता। वर्तमान आईटीआई पास-आउट में अल्ट्रासोनिक एनडीटी प्रशिक्षण की कमी है।',
    primaryTrade: 'Quality & NDT Inspection',
    statusBadge: '210 Open Seats',
  },
  {
    id: 'iv-3',
    companyName: 'Cummins India Limited',
    cluster: 'Kothrud Engine Facility',
    openSeatsCount: 120,
    timeAgo: '2 days ago',
    quote: 'Need 40 Mechatronics technicians capable of operating automated AGV charging hubs and SCADA telemetry lines in our export heavy diesel assembly plant.',
    quoteHi: 'निर्यात भारी डीजल असेंबली प्लांट में स्वचालित एजीवी चार्जिंग हब और स्काडा लाइनों के संचालन हेतु 40 मेकाट्रॉनिक्स तकनीशियनों की आवश्यकता है।',
    primaryTrade: 'Mechatronics & AGV Tech',
    statusBadge: '120 Open Seats',
  },
];

export const PUNE_INTERVENTIONS: DistrictIntervention[] = [
  {
    id: 'pi-1',
    title: 'Augment CNC Operator Seats by 18% in Chakan Belt',
    titleHi: 'चाकन क्षेत्र में सीएनसी ऑपरेटर सीटें 18% बढ़ाएं',
    cluster: 'Chakan-Talegaon Industrial Corridor',
    impactMetric: 'Expected Gap Reduction: 42%',
    timeframe: 'Immediate Cycle (30 Days)',
    description: 'Sanction 2nd and 3rd shifts at Govt ITI Pimpri & PMKK Chakan using existing capital machinery under PMKVY 4.0 Special Drive funding.',
    descriptionHi: 'पीएमकेवीवाई 4.0 विशेष अभियान के तहत मौजूदा मशीनरी का उपयोग करके दूसरी और तीसरी पाली स्वीकृत करें।',
    actionText: 'Execute 3-Shift Order',
  },
  {
    id: 'pi-2',
    title: 'Fast-Track 500V DC High-Voltage EV Certification',
    titleHi: '500V डीसी हाई-वोल्टेज ईवी प्रमाणन त्वरित करें',
    cluster: 'Bhosari & Chakan Tier-1 EV Hub',
    impactMetric: 'Expected Gap Reduction: 58%',
    timeframe: 'Target Rollout: 45 Days',
    description: 'Deploy NCVET approved 60-hour safety booster module with Tata Motors Academy for all electrical and motor mechanic trainees.',
    descriptionHi: 'टाटा मोटर्स अकादमी के साथ सभी इलेक्ट्रिकल प्रशिक्षुओं हेतु 60-घंटे का सुरक्षा बूस्टर मॉड्यूल तैनात करें।',
    actionText: 'Notify Training Centers',
  },
  {
    id: 'pi-3',
    title: 'Incentivize Tool & Die Apprenticeships with MIDC Anchor OEMs',
    titleHi: 'एमआईडीसी एंकर ओईएम के साथ टूल एंड डाई शिक्षुता को प्रोत्साहित करें',
    cluster: 'Mundhwa, Pimpri & Bhosari MIDC',
    impactMetric: 'Expected Gap Reduction: 34%',
    timeframe: 'Target Rollout: 60 Days',
    description: 'Re-divert unutilized NAPS flexi-funds to co-finance ₹4,500/month stipend top-up for 600 precision tool & die apprentices.',
    descriptionHi: '600 प्रिसिजन टूल एंड डाई प्रशिक्षुओं हेतु ₹4,500/माह वजीफा सह-वित्तपोषण के लिए एनएपीएस फंड का उपयोग करें।',
    actionText: 'Sanction NAPS Stipend',
  },
];

export interface DistrictWarRoomData {
  districtId: string;
  districtName: string;
  districtNameHi: string;
  stateName: string;
  stateCode: string;
  districtCode: string;
  priorityRank: string;
  clusterSubtitle: string;
  clusterSubtitleHi: string;
  priorityBadge: string;
  kpis: {
    tradesTracked: number;
    tradesSub: string;
    tradesSubHi: string;
    criticalAlerts: number;
    alertsSub: string;
    alertsSubHi: string;
    activeSeats: number;
    seatsSub: string;
    seatsSubHi: string;
    placementRate: number;
    placementSub: string;
    placementSubHi: string;
  };
  forecastData: DistrictForecastPoint[];
  tradeLedger: PuneTradeLedgerItem[];
  trainingCenters: TrainingCenterMarker[];
  industryVoices: IndustryVoiceItem[];
  directives: {
    title: string;
    titleHi: string;
    d1: string;
    d1Hi: string;
    d2: string;
    d2Hi: string;
    d3: string;
    d3Hi: string;
  };
  interventions: DistrictIntervention[];
}

export function getDistrictWarRoomData(
  districtId = 'pune',
  sectorId = 'all',
  scenario = 'baseline',
  horizon = '12m'
): DistrictWarRoomData {
  const normDist = districtId.toLowerCase();

  // Multipliers
  let scenarioMult = 1.0;
  if (scenario === 'optimistic') scenarioMult = 1.25;
  else if (scenario === 'conservative') scenarioMult = 0.85;

  let horizonMult = 1.0;
  if (horizon === '24m') horizonMult = 1.2;
  else if (horizon === '36m') horizonMult = 1.35;

  if (normDist === 'ahmedabad' || normDist === 'dholera' || normDist === 'gj') {
    return {
      districtId: 'ahmedabad',
      districtName: 'Dholera & Sanand Industrial Nexus',
      districtNameHi: 'धोलेरा एवं साणंद औद्योगिक गलियारा, गुजरात',
      stateName: 'Gujarat (State Code: 24)',
      stateCode: 'GJ',
      districtCode: '24-474',
      priorityRank: '#01',
      clusterSubtitle: 'Semiconductor Fabrication, Electric Mobility & Heavy Engineering Corridor • Gujarat',
      clusterSubtitleHi: 'सेमीकंडक्टर फैब्रिकेशन, इलेक्ट्रिक मोबिलिटी एवं भारी इंजीनियरिंग हब • गुजरात',
      priorityBadge: 'ISM MEGA-CLUSTER • RANK: #01 • District Code: 24-474',
      kpis: {
        tradesTracked: 18,
        tradesSub: '+4 ISM Cleanroom trades inducted',
        tradesSubHi: '+4 नए आईएसएम क्लीनरूम ट्रेड शामिल',
        criticalAlerts: 46,
        alertsSub: 'Fab & ATMP construction urgency',
        alertsSubHi: 'फैब और एटीएमपी निर्माण तात्कालिकता',
        activeSeats: Math.round(56200 * scenarioMult),
        seatsSub: '+16.4% YoY • ISM Hubs',
        seatsSubHi: '+16.4% वार्षिक • आईएसएम हब',
        placementRate: 84.6,
        placementSub: '+5.2% YoY • 6-Mo retention',
        placementSubHi: '+5.2% वार्षिक • 6-माह प्रतिधारण',
      },
      forecastData: [
        { period: 'Current (Q3 26)', periodLabel: 'Current (Q3 26)', projectedDemand: Math.round(58400 * horizonMult), sanctionedSupply: Math.round(56200 * scenarioMult), deficitGap: 2200, isForecast: false },
        { period: '+6 Months (Q1 27)', periodLabel: '+6 Months (Q1 27)', projectedDemand: Math.round(68900 * horizonMult), sanctionedSupply: Math.round(58100 * scenarioMult), deficitGap: 10800, isForecast: true },
        { period: '+12 Months (Q3 27)', periodLabel: '+12 Months (Q3 27)', projectedDemand: Math.round(84200 * horizonMult), sanctionedSupply: Math.round(61000 * scenarioMult), deficitGap: 23200, isForecast: true },
        { period: '+18 Months (Q1 28)', periodLabel: '+18 Months (Q1 28)', projectedDemand: Math.round(96500 * horizonMult), sanctionedSupply: Math.round(64500 * scenarioMult), deficitGap: 32000, isForecast: true },
      ],
      tradeLedger: [
        {
          id: 'gt-1',
          trade: 'Cleanroom Class 100/1000 HVAC & Gas Tech',
          tradeHi: 'क्लीनरूम क्लास 100/1000 एचवीएसी व गैस विशेषज्ञ',
          focusArea: 'Micron ATMP & Tata Fab Dholera',
          nsqfLevel: 5,
          currentSeats: 1400,
          projectedDemand: 3800,
          netGap: -2400,
          gapPercent: -63.1,
          severity: 'Acute Shortage',
          severityType: 'acute',
          recommendedAction: 'Sanction 3-Shift Cleanroom Lab Training',
          actionBtnText: 'Request ISM Seats',
        },
        {
          id: 'gt-2',
          trade: 'Photolithography & Stepper Operator',
          tradeHi: 'फोटोलीथोग्राफी व स्टेपर उपकरण ऑपरेटर',
          focusArea: 'Silicon Wafer Exposure Lines',
          nsqfLevel: 6,
          currentSeats: 850,
          projectedDemand: 2600,
          netGap: -1750,
          gapPercent: -67.3,
          severity: 'Acute Shortage',
          severityType: 'acute',
          recommendedAction: 'Tie-up with Tata Electronics & ESSCI',
          actionBtnText: 'Urgent Fast-Track',
        },
        {
          id: 'gt-3',
          trade: 'EV Battery Pack & BMS Tech',
          tradeHi: 'ईवी बैटरी पैक एवं बीएमएस तकनीशियन',
          focusArea: 'Tata Passenger Electric & Wardwizard',
          nsqfLevel: 5,
          currentSeats: 1650,
          projectedDemand: 3200,
          netGap: -1550,
          gapPercent: -48.4,
          severity: 'Acute Shortage',
          severityType: 'acute',
          recommendedAction: 'Add 600 Apprenticeship Quota',
          actionBtnText: 'Sanction NAPS Seats',
        },
        {
          id: 'gt-4',
          trade: 'Sub-Micron SEM Quality Metrologist',
          tradeHi: 'सब-माइक्रोन एसईएम गुणवत्ता मेट्रोलॉजिस्ट',
          focusArea: 'Optical Defect Review & Metrology',
          nsqfLevel: 5,
          currentSeats: 920,
          projectedDemand: 1650,
          netGap: -730,
          gapPercent: -44.2,
          severity: 'Moderate Deficit',
          severityType: 'moderate',
          recommendedAction: 'Equip Govt ITI Sanand Lab',
          actionBtnText: 'Curriculum Update',
        },
      ],
      trainingCenters: [
        { id: 'gc-1', name: 'Dholera SIR Mega Training Hub', taluka: 'Dholera', type: 'Industry COE', seats: 2800, tradesCount: 8, topTrade: 'Cleanroom HVAC & Litho', coordinates: [180, 220], status: 'Critical Deficit' },
        { id: 'gc-2', name: 'Govt ITI Sanand GIDC', taluka: 'Sanand', type: 'Govt ITI', seats: 1950, tradesCount: 11, topTrade: 'EV Assembly & Metrology', coordinates: [130, 90], status: 'Near Capacity' },
        { id: 'gc-3', name: 'PMKK Mandal Industrial Belt', taluka: 'Mandal', type: 'PMKK', seats: 1200, tradesCount: 6, topTrade: 'Heavy Machining & CNC', coordinates: [80, 50], status: 'Optimal' },
      ],
      industryVoices: [
        {
          id: 'giv-1',
          companyName: 'Micron Technology ATMP Facility',
          cluster: 'Sanand Phase-2 Hub',
          openSeatsCount: 320,
          timeAgo: '2 hours ago',
          quote: 'Urgent demand for certified cleanroom protocol technicians and silicon substrate handlers. Prepared to sponsor customized 4-month bridge modules.',
          quoteHi: 'प्रमाणित क्लीनरूम तकनीशियनों की भारी मांग। 4 महीने के अनुकूलित मॉड्यूल को प्रायोजित करने हेतु तैयार।',
          primaryTrade: 'Cleanroom Protocol & ATMP',
          statusBadge: '320 Open Seats',
        },
        {
          id: 'giv-2',
          companyName: 'Tata Electronics Semiconductor Fab',
          cluster: 'Dholera SIR Zone',
          openSeatsCount: 450,
          timeAgo: 'Yesterday',
          quote: 'Need 450 technicians with sub-micron wafer handling training before equipment commissioning.',
          quoteHi: 'उपकरण स्थापना से पहले सब-माइक्रोन वेफर हैंडलिंग प्रशिक्षण वाले 450 तकनीशियनों की आवश्यकता है।',
          primaryTrade: 'Wafer Fab Equipment Tech',
          statusBadge: '450 Open Seats',
        },
      ],
      directives: {
        title: 'Gujarat Industrial Development Directives',
        titleHi: 'गुजरात औद्योगिक विकास निगम निर्देश',
        d1: 'Authorize 24/7 training cohorts at Sanand and Dholera ITIs for ISM certification.',
        d1Hi: 'आईएसएम प्रमाणन हेतु साणंद और धोलेरा आईटीआई में 24/7 प्रशिक्षण बैच स्वीकृत करें।',
        d2: 'Fast-track ₹24 Cr equipment grants for cleanroom simulation chambers.',
        d2Hi: 'क्लीनरूम सिमुलेशन कक्षों के लिए ₹24 करोड़ का उपकरण अनुदान त्वरित करें।',
        d3: 'Mandate 1,500 industry-sponsored apprenticeships across GIDC tier-1 suppliers.',
        d3Hi: 'जीआईडीसी आपूर्तिकर्ताओं में 1,500 उद्योग-प्रायोजित शिक्षुता अनिवार्य करें।',
      },
      interventions: [
        {
          id: 'gi-1',
          title: 'Establish Cleanroom Class 100/1000 Training Facility at Dholera',
          titleHi: 'धोलेरा में क्लीनरूम क्लास 100/1000 प्रशिक्षण केंद्र स्थापित करें',
          cluster: 'Dholera SIR Node',
          impactMetric: 'Expected Gap Reduction: 68%',
          timeframe: 'Target Rollout: 45 Days',
          description: 'Deploy state-of-the-art particulate filter simulators with ISM and ESSCI funding.',
          descriptionHi: 'आईएसएम और ईएसएससीआई वित्तपोषण के साथ आधुनिक सिमुलेटर स्थापित करें।',
          actionText: 'Execute Setup Order',
        },
      ],
    };
  }

  if (normDist === 'chennai' || normDist === 'sriperumbudur' || normDist === 'tn') {
    return {
      districtId: 'chennai',
      districtName: 'Sriperumbudur & Oragadam Auto-EV Belt',
      districtNameHi: 'श्रीपेरंबदूर एवं ओरागडम ऑटो-ईवी गलियारा, तमिलनाडु',
      stateName: 'Tamil Nadu (State Code: 33)',
      stateCode: 'TN',
      districtCode: '33-603',
      priorityRank: '#01',
      clusterSubtitle: 'Automotive, Advanced Electronics (Foxconn/Pegatron) & Gigafactory Cluster • Tamil Nadu',
      clusterSubtitleHi: 'ऑटोमोटिव, उन्नत इलेक्ट्रॉनिक्स एवं गीगाफैक्ट्री हब • तमिलनाडु',
      priorityBadge: 'TN EV CAPITAL • RANK: #01 • District Code: 33-603',
      kpis: {
        tradesTracked: 16,
        tradesSub: '+3 EV Battery Gigafactory trades',
        tradesSubHi: '+3 नए ईवी बैटरी गीगाफैक्ट्री ट्रेड',
        criticalAlerts: 41,
        alertsSub: 'Electronics & EV ramp-up stress',
        alertsSubHi: 'इलेक्ट्रॉनिक्स व ईवी तीव्र विस्तार तनाव',
        activeSeats: Math.round(62400 * scenarioMult),
        seatsSub: '+12.8% YoY • Auto Belt',
        seatsSubHi: '+12.8% वार्षिक • ऑटो बेल्ट',
        placementRate: 86.2,
        placementSub: '+4.8% YoY • 6-Mo retention',
        placementSubHi: '+4.8% वार्षिक • 6-माह प्रतिधारण',
      },
      forecastData: [
        { period: 'Current (Q3 26)', periodLabel: 'Current (Q3 26)', projectedDemand: Math.round(66000 * horizonMult), sanctionedSupply: Math.round(62400 * scenarioMult), deficitGap: 3600, isForecast: false },
        { period: '+6 Months (Q1 27)', periodLabel: '+6 Months (Q1 27)', projectedDemand: Math.round(76500 * horizonMult), sanctionedSupply: Math.round(64000 * scenarioMult), deficitGap: 12500, isForecast: true },
        { period: '+12 Months (Q3 27)', periodLabel: '+12 Months (Q3 27)', projectedDemand: Math.round(92800 * horizonMult), sanctionedSupply: Math.round(66200 * scenarioMult), deficitGap: 26600, isForecast: true },
        { period: '+18 Months (Q1 28)', periodLabel: '+18 Months (Q1 28)', projectedDemand: Math.round(104000 * horizonMult), sanctionedSupply: Math.round(69000 * scenarioMult), deficitGap: 35000, isForecast: true },
      ],
      tradeLedger: [
        {
          id: 'tt-1',
          trade: 'EV Powertrain & Battery Cell Assembly',
          tradeHi: 'ईवी पावरट्रेन एवं बैटरी सेल असेंबली',
          focusArea: 'Ola Gigafactory, Hyundai EV & TVS',
          nsqfLevel: 5,
          currentSeats: 1800,
          projectedDemand: 4600,
          netGap: -2800,
          gapPercent: -60.8,
          severity: 'Acute Shortage',
          severityType: 'acute',
          recommendedAction: 'Sanction 1,200 High-Voltage PMKVY Seats',
          actionBtnText: 'Request EV Seats',
        },
        {
          id: 'tt-2',
          trade: 'Advanced SMT & Electronics Placement Tech',
          tradeHi: 'उन्नत एसएमटी एवं इलेक्ट्रॉनिक्स असेंबली',
          focusArea: 'Foxconn & Pegatron Mega Campus',
          nsqfLevel: 4,
          currentSeats: 2200,
          projectedDemand: 4800,
          netGap: -2600,
          gapPercent: -54.1,
          severity: 'Acute Shortage',
          severityType: 'acute',
          recommendedAction: 'Expand 3-Shift ITI Operations',
          actionBtnText: 'Fast-Track Sanction',
        },
      ],
      trainingCenters: [
        { id: 'tc-1', name: 'Sriperumbudur Advanced EV COE', taluka: 'Sriperumbudur', type: 'Industry COE', seats: 3200, tradesCount: 9, topTrade: 'EV Powertrain & Cell Tech', coordinates: [150, 160], status: 'Critical Deficit' },
        { id: 'tc-2', name: 'Govt ITI Guindy Technical Campus', taluka: 'Chennai South', type: 'Govt ITI', seats: 2400, tradesCount: 14, topTrade: 'CNC 5-Axis & Precision Tooling', coordinates: [240, 120], status: 'Near Capacity' },
      ],
      industryVoices: [
        {
          id: 'tiv-1',
          companyName: 'Foxconn Hon Hai Technology Group',
          cluster: 'Sriperumbudur Electronics SEZ',
          openSeatsCount: 650,
          timeAgo: '3 hours ago',
          quote: 'Need 650 certified Surface Mount Technology (SMT) operators and optical inspection leads for high-speed smartphone assembly lines.',
          quoteHi: 'हाई-स्पीड स्मार्टफोन असेंबली लाइनों के लिए 650 प्रमाणित एसएमटी ऑपरेटरों की आवश्यकता।',
          primaryTrade: 'SMT & Optical Testing',
          statusBadge: '650 Open Seats',
        },
      ],
      directives: {
        title: 'Tamil Nadu Skill Development Directives',
        titleHi: 'तमिलनाडु कौशल विकास निगम रणनीतिक निर्देश',
        d1: 'Mandate 1,800 EV battery cell dual-training seats with Sriperumbudur OEMs.',
        d1Hi: 'श्रीपेरंबदूर ओईएम के साथ 1,800 ईवी बैटरी सेल दोहरे प्रशिक्षण सीटें अनिवार्य करें।',
        d2: 'Sanction ₹18 Cr equipment modernizations across 14 state ITIs.',
        d2Hi: '14 राज्य आईटीआई में ₹18 करोड़ के उपकरण आधुनिकीकरण स्वीकृत करें।',
        d3: 'Fast-track women-in-manufacturing housing and shift safety incentives.',
        d3Hi: 'विनिर्माण में महिला कामगारों के लिए आवास व शिफ्ट सुरक्षा प्रोत्साहन त्वरित करें।',
      },
      interventions: [
        {
          id: 'ti-1',
          title: 'Augment High-Voltage EV Powertrain Curriculum in Tamil Nadu ITIs',
          titleHi: 'तमिलनाडु आईटीआई में हाई-वोल्टेज ईवी पावरट्रेन पाठ्यक्रम बढ़ाएं',
          cluster: 'Sriperumbudur & Oragadam Belt',
          impactMetric: 'Expected Gap Reduction: 54%',
          timeframe: '30 Days Cycle',
          description: 'Deploy 60-hour OEM verified high-voltage safety standard.',
          descriptionHi: '60 घंटे का ओईएम प्रमाणित हाई-वोल्टेज सुरक्षा मानक लागू करें।',
          actionText: 'Execute State Order',
        },
      ],
    };
  }

  if (normDist === 'bengaluru' || normDist === 'ka') {
    return {
      districtId: 'bengaluru',
      districtName: 'Bengaluru Tech & Aerospace Corridor',
      districtNameHi: 'बेंगलुरु प्रौद्योगिकी एवं एयरोस्पेस गलियारा, कर्नाटक',
      stateName: 'Karnataka (State Code: 29)',
      stateCode: 'KA',
      districtCode: '29-572',
      priorityRank: '#01',
      clusterSubtitle: 'Aerospace Precision Machining, Industrial IoT & AI Hardware • Karnataka',
      clusterSubtitleHi: 'एयरोस्पेस सटीक मशीनिंग, औद्योगिक IoT एवं AI हार्डवेयर • कर्नाटक',
      priorityBadge: 'AEROSPACE & TECH CAPITAL • RANK: #01 • District Code: 29-572',
      kpis: {
        tradesTracked: 20,
        tradesSub: '+5 Aerospace & AI hardware trades',
        tradesSubHi: '+5 एयरोस्पेस व एआई हार्डवेयर ट्रेड',
        criticalAlerts: 39,
        alertsSub: 'Precision sub-micron deficit',
        alertsSubHi: 'सटीक सब-माइक्रोन मशीनिंग कमी',
        activeSeats: Math.round(58900 * scenarioMult),
        seatsSub: '+11.2% YoY • Aero COE',
        seatsSubHi: '+11.2% वार्षिक • एयरो हब',
        placementRate: 88.4,
        placementSub: '+4.1% YoY • High wage',
        placementSubHi: '+4.1% वार्षिक • उच्च वेतन',
      },
      forecastData: [
        { period: 'Current (Q3 26)', periodLabel: 'Current (Q3 26)', projectedDemand: Math.round(62000 * horizonMult), sanctionedSupply: Math.round(58900 * scenarioMult), deficitGap: 3100, isForecast: false },
        { period: '+6 Months (Q1 27)', periodLabel: '+6 Months (Q1 27)', projectedDemand: Math.round(71000 * horizonMult), sanctionedSupply: Math.round(60500 * scenarioMult), deficitGap: 10500, isForecast: true },
        { period: '+12 Months (Q3 27)', periodLabel: '+12 Months (Q3 27)', projectedDemand: Math.round(84000 * horizonMult), sanctionedSupply: Math.round(62500 * scenarioMult), deficitGap: 21500, isForecast: true },
        { period: '+18 Months (Q1 28)', periodLabel: '+18 Months (Q1 28)', projectedDemand: Math.round(94000 * horizonMult), sanctionedSupply: Math.round(65000 * scenarioMult), deficitGap: 29000, isForecast: true },
      ],
      tradeLedger: [
        {
          id: 'kt-1',
          trade: 'Aerospace 5-Axis Titanium Milling Tech',
          tradeHi: 'एयरोस्पेस 5-एक्सिस टाइटेनियम मिलिंग तकनीशियन',
          focusArea: 'HAL, Dynamatic & Boeing Suppliers',
          nsqfLevel: 6,
          currentSeats: 1100,
          projectedDemand: 2800,
          netGap: -1700,
          gapPercent: -60.7,
          severity: 'Acute Shortage',
          severityType: 'acute',
          recommendedAction: 'Sanction Aerospace Machining COE Batches',
          actionBtnText: 'Request Aero Seats',
        },
      ],
      trainingCenters: [
        { id: 'kc-1', name: 'Peenya Industrial Training Center', taluka: 'Peenya', type: 'Govt ITI', seats: 2100, tradesCount: 12, topTrade: 'Aerospace CNC & Tooling', coordinates: [120, 110], status: 'Critical Deficit' },
      ],
      industryVoices: [
        {
          id: 'kiv-1',
          companyName: 'Dynamatic Technologies Ltd',
          cluster: 'Peenya Aerospace Hub',
          openSeatsCount: 190,
          timeAgo: '5 hours ago',
          quote: 'Need 190 precision aerospace machinists trained on sub-micron tolerance titanium slicing for export airframe components.',
          quoteHi: 'निर्यात एयरफ्रेम घटकों के लिए सब-माइक्रोन टाइटेनियम स्लाइसिंग में 190 सटीक एयरोस्पेस मशीनिस्टों की आवश्यकता है।',
          primaryTrade: 'Aerospace Titanium Machining',
          statusBadge: '190 Open Seats',
        },
      ],
      directives: {
        title: 'Karnataka Skill Mission Directives',
        titleHi: 'कर्नाटक कौशल विकास मिशन निर्देश',
        d1: 'Integrate AS9100 aerospace quality standards into 8 Bangalore ITIs.',
        d1Hi: '8 बैंगलोर आईटीआई में AS9100 एयरोस्पेस गुणवत्ता मानकों को शामिल करें।',
        d2: 'Deploy ₹15 Cr co-financing for advanced CNC simulation labs.',
        d2Hi: 'उन्नत सीएनसी सिमुलेशन लैब के लिए ₹15 करोड़ का सह-वित्तपोषण तैनात करें।',
        d3: 'Mandate AI prompt engineering booster courses for IT diploma holders.',
        d3Hi: 'आईटी डिप्लोमा धारकों के लिए एआई प्रॉम्प्ट इंजीनियरिंग बूस्टर कोर्स अनिवार्य करें।',
      },
      interventions: [
        {
          id: 'ki-1',
          title: 'Deploy Aerospace Machining Micro-Credentials in Peenya',
          titleHi: 'पीन्या में एयरोस्पेस मशीनिंग माइक्रो-क्रेडेंशियल तैनात करें',
          cluster: 'Peenya-Bommasandra Corridor',
          impactMetric: 'Expected Gap Reduction: 48%',
          timeframe: '45 Days Cycle',
          description: 'Deploy titanium 5-axis tooling modules.',
          descriptionHi: 'टाइटेनियम 5-एक्सिस टूलिंग मॉड्यूल लागू करें।',
          actionText: 'Execute Order',
        },
      ],
    };
  }

  // Default fallback: Pune / Maharashtra
  return {
    districtId: 'pune',
    districtName: 'District War-Room: Pune',
    districtNameHi: 'जिला वार-रूम: पुणे, महाराष्ट्र',
    stateName: 'Maharashtra (State Code: 27)',
    stateCode: 'MH',
    districtCode: '27-522',
    priorityRank: '#01',
    clusterSubtitle: 'Automotive, IT-Hardware & Agro-Processing Industrial Nexus • Maharashtra',
    clusterSubtitleHi: 'ऑटोमोटिव, आईटी-हार्डवेयर एवं कृषि प्रसंस्करण औद्योगिक हब • महाराष्ट्र',
    priorityBadge: 'STATE PRIORITY CLUSTER • RANK: #01 • District Code: 27-522',
    kpis: {
      tradesTracked: PUNE_KPIS.tradesTracked,
      tradesSub: PUNE_KPIS.tradesSub,
      tradesSubHi: PUNE_KPIS.tradesSubHi,
      criticalAlerts: PUNE_KPIS.criticalAlerts,
      alertsSub: PUNE_KPIS.alertsSub,
      alertsSubHi: PUNE_KPIS.alertsSubHi,
      activeSeats: Math.round(PUNE_KPIS.activeSeats * scenarioMult),
      seatsSub: PUNE_KPIS.seatsSub,
      seatsSubHi: PUNE_KPIS.seatsSubHi,
      placementRate: PUNE_KPIS.placementRate,
      placementSub: PUNE_KPIS.placementSub,
      placementSubHi: PUNE_KPIS.placementSubHi,
    },
    forecastData: PUNE_FORECAST_DATA.map((f) => ({
      ...f,
      projectedDemand: Math.round(f.projectedDemand * horizonMult),
      sanctionedSupply: Math.round(f.sanctionedSupply * scenarioMult),
      deficitGap: Math.max(0, Math.round(f.projectedDemand * horizonMult - f.sanctionedSupply * scenarioMult)),
    })),
    tradeLedger: PUNE_TRADE_LEDGER,
    trainingCenters: PUNE_CENTERS,
    industryVoices: PUNE_INDUSTRY_VOICE,
    directives: {
      title: 'District Collector Directives',
      titleHi: 'जिला कलेक्टर रणनीतिक निर्देश',
      d1: 'Sanction 3-shift operational orders for 18 accredited ITIs across Chakan & Bhosari.',
      d1Hi: 'चाकन और भोसरी के 18 मान्यता प्राप्त आईटीआई के लिए 3-शिफ्ट संचालन आदेश स्वीकृत करें।',
      d2: 'Reallocate 3,400 under-performing general electrical seats to EV & 5-axis CNC by Q1 FY27.',
      d2Hi: '3,400 कम प्रदर्शन वाली सामान्य सीटों को Q1 FY27 तक ईवी और सीएनसी में पुनरावंटित करें।',
      d3: 'Mandate direct employer-linked dual-apprenticeship MoUs with MIDC anchor OEMs.',
      d3Hi: 'एमआईडीसी एंकर ओईएम के साथ सीधे शिक्षुता समझौता ज्ञापनों को अनिवार्य करें।',
    },
    interventions: PUNE_INTERVENTIONS,
  };
}
