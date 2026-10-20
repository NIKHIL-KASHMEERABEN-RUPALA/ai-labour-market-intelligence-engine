import { Language } from '../types';

export interface LocalizedString {
  en: string;
  hi: string;
  gu: string;
  ta: string;
  mr: string;
}

/**
 * Helper to safely extract localized text for any of the 5 supported languages
 */
export function getLangText(
  localized: { en: string; hi?: string; gu?: string; ta?: string; mr?: string },
  lang: Language
): string {
  if (lang === 'en') return localized.en;
  if (lang === 'hi' && localized.hi) return localized.hi;
  if (lang === 'gu') return localized.gu || localized.hi || localized.en;
  if (lang === 'ta') return localized.ta || localized.en;
  if (lang === 'mr') return localized.mr || localized.hi || localized.en;
  return localized.en;
}

/**
 * Universal Navigation Bar Items (13 Sovereign Modules)
 */
export const NAV_TRANSLATIONS: Record<string, LocalizedString> = {
  home: {
    en: 'Home Landing',
    hi: 'होम लैंडिंग',
    gu: 'હોમ લેન્ડિંગ',
    ta: 'முகப்பு பக்கம்',
    mr: 'मुख्य पान (होम)',
  },
  mission: {
    en: 'Mission Cockpit',
    hi: 'मिशन कॉकपिट',
    gu: 'મિશન કૉકપિટ',
    ta: 'பணி கட்டுப்பாட்டு அறை',
    mr: 'मिशन कॉकपिट',
  },
  command: {
    en: 'National Command Center',
    hi: 'राष्ट्रीय कमान केंद्र',
    gu: 'રાષ્ટ્રીય કમાન્ડ સેન્ટર',
    ta: 'தேசிய கட்டளை மையம்',
    mr: 'राष्ट्रीय कमान केंद्र',
  },
  sector: {
    en: 'Sector Intelligence',
    hi: 'क्षेत्रीय आसूचना',
    gu: 'ક્ષેત્રીય ઇન્ટેલિજન્સ',
    ta: 'துறைசார் நுண்ணறிவு',
    mr: 'क्षेत्रीय बुद्धिमत्ता',
  },
  district: {
    en: 'District War Room',
    hi: 'जिला वार-रूम',
    gu: 'જિલ્લા વૉર રૂમ',
    ta: 'மாவட்ட களப்பணி அறை',
    mr: 'जिल्हा वॉर-रूम',
  },
  forecasting: {
    en: 'Forecasting & Scenario Lab',
    hi: 'पूर्वानुमान एवं परिदृश्य',
    gu: 'આગાહી અને પરિદ્રશ્ય',
    ta: 'முன்னறிவிப்பு & காட்சிகள்',
    mr: 'अंदाज आणि परिस्थिती मॉडेल',
  },
  situational: {
    en: 'Situational & Early Warnings',
    hi: 'स्थिति एवं प्रारंभिक चेतावनी',
    gu: 'પરિસ્થિતિ અને પ્રારંભિક ચેતવણી',
    ta: 'சூழ்நிலை & ஆரம்ப எச்சரிக்கைகள்',
    mr: 'परिस्थिती आणि पूर्वसूचना',
  },
  saturation: {
    en: 'Situational & Early Warnings',
    hi: 'स्थिति एवं प्रारंभिक चेतावनी',
    gu: 'પરિસ્થિતિ અને પ્રારંભિક ચેતવણી',
    ta: 'சூழ்நிலை & ஆரம்ப எச்சரிக்கைகள்',
    mr: 'परिस्थिती आणि पूर्वसूचना',
  },
  capacity: {
    en: 'Capacity Planner & Optimiser',
    hi: 'क्षमता एवं लक्ष्य अनुकूलक',
    gu: 'ક્ષમતા અને લક્ષ્ય સેટિંગ',
    ta: 'திறன் & இலக்கு நிர்ணயம்',
    mr: 'क्षमता व उद्दिष्ट निर्धारण',
  },
  copilot: {
    en: 'AI Policy Copilot',
    hi: 'एआई नीति कोपायलट',
    gu: 'એઆઈ પોલિસી કોપાયલોટ',
    ta: 'AI கொள்கை வழிகாட்டி',
    mr: 'एआय धोरण कोपायलट',
  },
  talent: {
    en: 'Talent Mobility & Corridors',
    hi: 'प्रतिभा प्रवासन गलियारे',
    gu: 'ટેલેન્ટ મોબિલિટી કોરિડોર',
    ta: 'திறன் இயக்கம் & வழித்தடங்கள்',
    mr: 'कौशल्य स्थलांतर कॉरिडॉर',
  },
  data: {
    en: 'Data Observatory',
    hi: 'डेटा वेधशाला',
    gu: 'ડેટા વેધશાળા',
    ta: 'தரவு ஆய்வு மையம்',
    mr: 'डेटा वेधशाळा',
  },
  alerts: {
    en: 'Reports & Alerts',
    hi: 'रिपोर्ट्स एवं अलर्ट्स',
    gu: 'અહેવાલો અને ચેતવણીઓ',
    ta: 'அறிக்கைகள் & எச்சரிக்கைகள்',
    mr: 'अहवाल आणि सूचना',
  },
  reports: {
    en: 'Briefs & Cabinet Notes',
    hi: 'रिपोर्ट एवं कैबिनेट नोट्स',
    gu: 'અહેવાલો અને કેબિનેટ નોંધો',
    ta: 'அறிக்கைகள் & அமைச்சரவை குறிப்புகள்',
    mr: 'अहवाल आणि मंत्रिमंडळ टिपणे',
  },
  api: {
    en: 'Government OpenAPI Console',
    hi: 'ओपन एपीआई कंसोल',
    gu: 'ઓપન API કન્સોલ',
    ta: 'அரசு OpenAPI முனையம்',
    mr: 'शासकीय ओपन एपीआय कन्सोल',
  },
  methodology: {
    en: 'Demand Index Methodology',
    hi: 'मांग सूचकांक कार्यप्रणाली',
    gu: 'માંગ સૂચકાંક કાર્યપદ્ધતિ',
    ta: 'தேவை குறியீட்டு முறை',
    mr: 'मागणी निर्देशांक कार्यप्रणाली',
  },
  settings: {
    en: 'Accessibility & Audit Trail',
    hi: 'पहुंच एवं ऑडिट ट्रेल',
    gu: 'સુલભતા અને ઓડિટ ટ્રાયલ',
    ta: 'அணுகல்தன்மை & தணிக்கை பதிவு',
    mr: 'सुलभता आणि लेखापरीक्षण नोंद',
  },
  enablement: {
    en: 'Officer Enablement',
    hi: 'अधिकारी सक्षमीकरण',
    gu: 'અધિકારી સક્ષમીકરણ',
    ta: 'அதிகாரிகள் மேம்பாடு',
    mr: 'अधिकारी सक्षमीकरण',
  },
};

/**
 * Top Sovereign Header UI Texts
 */
export const HEADER_TRANSLATIONS: Record<string, LocalizedString> = {
  portalName: {
    en: 'National Labour & Skill Observatory',
    hi: 'राष्ट्रीय श्रम एवं कौशल वेधशाला',
    gu: 'રાષ્ટ્રીય શ્રમ અને કૌશલ્ય વેધશાળા',
    ta: 'தேசிய தொழிலாளர் மற்றும் திறன் ஆய்வு மையம்',
    mr: 'राष्ट्रीय श्रम व कौशल्य वेधशाळा',
  },
  portalShort: {
    en: 'LMIS 2.0',
    hi: 'एलएमआईएस 2.0',
    gu: 'LMIS 2.0',
    ta: 'LMIS 2.0',
    mr: 'LMIS 2.0',
  },
  systemSub: {
    en: 'Labour Market Intelligence System',
    hi: 'श्रम बाजार आसूचना प्रणाली',
    gu: 'શ્રમ બજાર ઇન્ટેલિજન્સ સિસ્ટમ',
    ta: 'தொழிலாளர் சந்தை நுண்ணறிவு அமைப்பு',
    mr: 'श्रम बाजार बुद्धिमत्ता प्रणाली',
  },
  ministry: {
    en: 'Ministry of Skill Development & Entrepreneurship',
    hi: 'कौशल विकास एवं उद्यमिता मंत्रालय, भारत सरकार',
    gu: 'કૌશલ્ય વિકાસ અને સાહસિકતા મંત્રાલય',
    ta: 'திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம்',
    mr: 'कौशल्य विकास आणि उद्योजकता मंत्रालय',
  },
  notificationsTitle: {
    en: 'Ministerial Intelligence Alerts',
    hi: 'मंत्रालयीन सूचना अलर्ट',
    gu: 'મંત્રાલય ચેતવણીઓ',
    ta: 'அமைச்சக நுண்ணறிவு எச்சரிக்கைகள்',
    mr: 'मंत्रालयीन सतर्कता सूचना',
  },
  markAllRead: {
    en: 'Mark all as read',
    hi: 'सभी पढ़ा हुआ चिह्नित करें',
    gu: 'બધું વાંચ્યું માર્ક કરો',
    ta: 'அனைத்தையும் படித்ததாக குறிக்கவும்',
    mr: 'सर्व वाचलेले चिन्हांकित करा',
  },
  quickCabinet: {
    en: 'Generate 1-Page Cabinet Note',
    hi: 'कैबिनेट नोट उत्पन्न करें',
    gu: 'કેબિનેટ નોંધ બનાવો',
    ta: 'அமைச்சரவை குறிப்பு உருவாக்குக',
    mr: 'कॅबिनेट टिपण तयार करा',
  },
  copilotBtn: {
    en: 'AI Copilot',
    hi: 'एआई कोपायलट',
    gu: 'એઆઈ કોપાયલોટ',
    ta: 'AI வழிகாட்டி',
    mr: 'एआय कोपायलट',
  },
  searchBtn: {
    en: 'Search',
    hi: 'खोजें',
    gu: 'શોધો',
    ta: 'தேடுக',
    mr: 'शोधा',
  },
  liveSync: {
    en: 'Live Telemetry Inflow Synced',
    hi: 'लाइव टेलीमेट्री इनफ्लो समन्वित',
    gu: 'લાઈવ ટેલિમેટ્રી સમન્વયિત',
    ta: 'நேரலை தொலை அளவீடு ஒத்திசைக்கப்பட்டது',
    mr: 'थेट टेलिमेट्री समक्रमित',
  },
};

/**
 * Home Landing Page Comprehensive Translations
 */
export const HOME_TRANSLATIONS: Record<string, LocalizedString> = {
  heroTag: {
    en: 'MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP • GOVT. OF INDIA',
    hi: 'कौशल विकास एवं उद्यमिता मंत्रालय • भारत सरकार',
    gu: 'કૌશલ્ય વિકાસ અને સાહસિકતા મંત્રાલય • ભારત સરકાર',
    ta: 'திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம் • இந்திய அரசு',
    mr: 'कौशल्य विकास आणि उद्योजकता मंत्रालय • भारत सरकार',
  },
  heroTitle: {
    en: 'National Labour & Skill Observatory',
    hi: 'राष्ट्रीय श्रम एवं कौशल वेधशाला',
    gu: 'રાષ્ટ્રીય શ્રમ અને કૌશલ્ય વેધશાળા',
    ta: 'தேசிய தொழிலாளர் மற்றும் திறன் ஆய்வு மையம்',
    mr: 'राष्ट्रीय श्रम व कौशल्य वेधशाळा',
  },
  heroSubtitle: {
    en: 'High-stakes Bayesian decision support system, real-time vacancy telemetry, and predictive workforce optimization across 22+ key industrial corridors, 742 districts & global mobility corridors.',
    hi: 'भारत के 742 जिलों और 38 सेक्टर स्किल काउंसिल को संचालित करने वाला उच्च-स्तरीय बायेसियन निर्णय समर्थन प्रणाली, वास्तविक समय रिक्ति टेलीमेट्री एवं कार्यबल अनुकूलन।',
    gu: '22+ ઔદ્યોગિક કોરિડોર અને 742 જિલ્લાઓમાં વાસ્તવિક સમયની વેકેન્સી ટેલિમેટ્રી અને કાર્યબળ ઑપ્ટિમાઇઝેશન માટે બેયસિયન નિર્ણય પ્રણાલી.',
    ta: '22+ முக்கிய தொழில்துறை வழித்தடங்கள் மற்றும் 742 மாவட்டங்களில் நிகழ்நேர வேலைவாய்ப்பு மற்றும் பணியாளர் உகப்பாக்கத்திற்கான அரசு முடிவு ஆதரவு அமைப்பு.',
    mr: '२२+ औद्योगिक कॉरिडॉर आणि ७४२ जिल्ह्यांमध्ये थेट रिक्त पदांची माहिती आणि मनुष्यबळ नियोजनासाठी बायेसियन निर्णय साहाय्य प्रणाली.',
  },
  liveVacancies: {
    en: 'Live Vacancies',
    hi: 'सक्रिय रिक्तियां',
    gu: 'લાઇવ ખાલી જગ્યાઓ',
    ta: 'நேரலை காலியிடங்கள்',
    mr: 'थेट रिक्त जागा',
  },
  corridors: {
    en: 'Industrial Corridors',
    hi: 'औद्योगिक गलियारे',
    gu: 'ઔદ્યોગિક કોરિડોર',
    ta: 'தொழில்துறை வழித்தடங்கள்',
    mr: 'औद्योगिक कॉरिडॉर',
  },
  partnerNations: {
    en: 'Partner Nations',
    hi: 'सहयोगी राष्ट्र',
    gu: 'ભાગીદાર દેશો',
    ta: 'பங்குதாரர் நாடுகள்',
    mr: 'भागीदार देश',
  },
  accuracy: {
    en: 'Bayesian Accuracy',
    hi: 'बायेसियन सटीकता',
    gu: 'ચોકસાઈ દર',
    ta: 'துல்லிய விகிதம்',
    mr: 'अचूकता दर',
  },
  launchCockpit: {
    en: 'Launch National Cockpit',
    hi: 'राष्ट्रीय कॉकपिट प्रारंभ करें',
    gu: 'નેશનલ કૉકપિટ શરૂ કરો',
    ta: 'தேசிய கட்டுப்பாட்டு அறையை திறக்க',
    mr: 'राष्ट्रीय कॉकपिट सुरू करा',
  },
  officialLogin: {
    en: 'Official Secure Login',
    hi: 'आधिकारिक सुरक्षित लॉगिन',
    gu: 'સુરક્ષિત લૉગિન',
    ta: 'அதிகாரப்பூர்வ உள்நுழைவு',
    mr: 'शासकीय सुरक्षित लॉगिन',
  },
  corridorsSectionTitle: {
    en: 'India Industrial Corridors & Global Skilling Partners',
    hi: 'भारत के औद्योगिक गलियारे एवं वैश्विक कौशल भागीदार',
    gu: 'ભારતના ઔદ્યોગિક કોરિડોર અને વૈશ્વિક ભાગીદારો',
    ta: 'இந்திய தொழில்துறை வழித்தடங்கள் & உலகளாவிய கூட்டாளர்கள்',
    mr: 'भारतातील औद्योगिक कॉरिडॉर आणि जागतिक भागीदार',
  },
  enterpriseModulesTitle: {
    en: 'Enterprise Decision Modules',
    hi: 'संस्थागत निर्णय मॉड्यूल',
    gu: 'એન્ટરપ્રાઇઝ નિર્ણય મોડ્યુલ્સ',
    ta: 'முக்கிய ஆளுகை தொகுதிகள்',
    mr: 'मुख्य प्रशासकीय मॉड्यूल्स',
  },
  enterpriseModulesSub: {
    en: 'Select any operational hub to inspect telemetry, deficit forecasts, and policy action matrices.',
    hi: 'टेलीमेट्री, कमी पूर्वानुमान एवं नीतिगत कार्ययोजना देखने हेतु किसी भी परिचालन केंद्र का चयन करें।',
    gu: 'ટેલિમેટ્રી, ખાધની આગાહીઓ અને નીતિ વિશ્લેષણ માટે મોડ્યુલ પસંદ કરો.',
    ta: 'தொலை அளவீடு, பற்றாக்குறை முன்னறிவிப்பு மற்றும் கொள்கை பகுப்பாய்வை ஆராய ஒரு மையத்தைத் தேர்ந்தெடுக்கவும்.',
    mr: 'माहिती, तूट अंदाज आणि धोरणात्मक निर्णय पाहण्यासाठी योग्य मॉड्यूल निवडा.',
  },
  cagCertified: {
    en: 'NIC MEGHRAJ CLOUD INFRASTRUCTURE • SECURE GOV-NET',
    hi: 'एनआईसी मेघराज क्लाउड अवसंरचना • सुरक्षित सरकारी नेटवर्क',
    gu: 'એનઆઈસી મેઘરાજ ક્લાઉડ • સુરક્ષિત ગવર્નમેન્ટ નેટવર્ક',
    ta: 'NIC மேக்ராஜ் கிளவுட் கட்டமைப்பு • பாதுகாப்பான Gov-Net',
    mr: 'एनआयसी मेघराज क्लाउड पायाभूत सुविधा • सुरक्षित सरकारी नेटवर्क',
  },
  cagAuditText: {
    en: 'All reports and analytics embed SHA-256 cryptographic non-repudiation hashes, ensuring absolute data integrity for Comptroller and Auditor General (CAG) audits and Cabinet Secretariat reviews.',
    hi: 'सभी रिपोर्ट एवं विश्लेषण SHA-256 क्रिप्टोग्राफिक हैश एम्बेड करते हैं, जो नियंत्रक एवं महालेखापरीक्षक (CAG) ऑडिट तथा कैबिनेट समीक्षा हेतु पूर्ण डेटा अखंडता सुनिश्चित करते हैं।',
    gu: 'બધા અહેવાલો SHA-256 ક્રિપ્ટોગ્રાફિક સીલ ધરાવે છે, જે CAG ઓડિટ માટે સંપૂર્ણ ડેટા અખંડિતતાની ખાતરી આપે છે.',
    ta: 'அனைத்து அறிக்கைகளும் SHA-256 முத்திரையை கொண்டுள்ளன, இது CAG தணிக்கைக்கான முழுமையான தரவு பாதுகாப்பை உறுதி செய்கிறது.',
    mr: 'सर्व अहवाल SHA-256 सुरक्षित डिजिटल स्वाक्षरीने युक्त आहेत, जे CAG लेखापरीक्षणासाठी पूर्ण डेटा सुरक्षिततेची खात्री देतात.',
  },
  exportPdfBtn: {
    en: 'Export Official PDF Dossier',
    hi: 'आधिकारिक पीडीएफ दस्तावेज निर्यात करें',
    gu: 'સત્તાવાર પીડીએફ ડાઉનલોડ કરો',
    ta: 'அதிகாரப்பூர்வ PDF கோப்பை பதிவிறக்குக',
    mr: 'अधिकृत पीडीएफ अहवाल डाउनलोड करा',
  },
  openApiBtn: {
    en: 'OpenAPI Console',
    hi: 'ओपनएपीआई कंसोल',
    gu: 'OpenAPI કન્સોલ',
    ta: 'OpenAPI முனையம்',
    mr: 'OpenAPI कन्सोल',
  },
};

/**
 * Bottom Status Bar Translations
 */
export const STATUS_BAR_TRANSLATIONS: Record<string, LocalizedString> = {
  dataSources: {
    en: 'Live data sources: NCS • e-Shram • Monster & Naukri Aggregator • PLFS (MoSPI) • SSC Inputs • EPFO Monthly Payrolls',
    hi: 'लाइव डेटा स्रोत: एनसीएस • ई-श्रम • प्रमुख जॉब पोर्टल • पीएलएफएस (सांख्यिकी मंत्रालय) • एसएससी इनपुट्स • ईपीएफओ पेरोल',
    gu: 'લાઇવ ડેટા સ્ત્રોતો: NCS • e-Shram • જોબ પોર્ટલ • PLFS • SSC ઇનપુટ્સ • EPFO માસિક પેરોલ',
    ta: 'நேரலை தரவு ஆதாரங்கள்: NCS • e-Shram • வேலைவாய்ப்பு தளங்கள் • PLFS • SSC தரவுகள் • EPFO ஊதிய பதிவுகள்',
    mr: 'थेट डेटा स्रोत: NCS • e-Shram • जॉब पोर्टल्स • PLFS (सांख्यिकी मंत्रालय) • SSC माहिती • EPFO मासिक पेरोल',
  },
  modelRefresh: {
    en: 'Last model refresh: 14:32 IST',
    hi: 'अंतिम मॉडल अद्यतन: 14:32 भारतीय समय',
    gu: 'છેલ્લું મોડેલ અપડેટ: 14:32 IST',
    ta: 'கடைசி மாதிரி புதுப்பிப்பு: 14:32 IST',
    mr: 'शेवटचे मॉडेल अपडेट: 14:32 IST',
  },
  coverage: {
    en: 'Coverage: 98.7% of districts (742 / 766)',
    hi: 'कवरेज: 98.7% जिले (742 / 766)',
    gu: 'કવરેજ: 98.7% જિલ્લાઓ (742 / 766)',
    ta: 'முழுமை: 98.7% மாவட்டங்கள் (742 / 766)',
    mr: 'व्याप्ती: ९८.७% जिल्हे (७४२ / ७६६)',
  },
  engine: {
    en: 'Engine: Bayesian Labour Forecasting v3.2',
    hi: 'इंजन: बायेसियन श्रम पूर्वानुमान v3.2',
    gu: 'એન્જિન: બેયસિયન લેબર ફોરકાસ્ટિંગ v3.2',
    ta: 'இயந்திரம்: பேய்சியன் தொழிலாளர் முன்னறிவிப்பு v3.2',
    mr: 'प्रणाली: बायेसियन कामगार अंदाज मॉडेल v3.2',
  },
};

/**
 * KPI Metric Labels Translations
 */
export const KPI_TRANSLATIONS: Record<string, Record<Language, { label: string; subtext: string }>> = {
  seats: {
    en: { label: 'Active Training Seats', subtext: '+53,100 vs last quarter' },
    hi: { label: 'सक्रिय प्रशिक्षण सीटें', subtext: 'पिछली तिमाही की तुलना में +53,100' },
    gu: { label: 'સક્રિય તાલીમ બેઠકો', subtext: 'છેલ્લા ક્વાર્ટર કરતાં +53,100' },
    ta: { label: 'செயலில் உள்ள பயிற்சி இடங்கள்', subtext: 'கடந்த காலாண்டை விட +53,100' },
    mr: { label: 'सक्रिय प्रशिक्षण जागा', subtext: 'मागील तिमाहीच्या तुलनेत +५३,१००' },
  },
  demand: {
    en: { label: 'National Demand Index', subtext: 'Strong industrial pull' },
    hi: { label: 'राष्ट्रीय मांग सूचकांक', subtext: 'मजबूत औद्योगिक मांग' },
    gu: { label: 'રાષ્ટ્રીય માંગ સૂચકાંક', subtext: 'મજબૂત ઔદ્યોગિક વૃદ્ધિ' },
    ta: { label: 'தேசிய தேவை குறியீடு', subtext: 'வலுவான தொழில்துறை தேவை' },
    mr: { label: 'राष्ट्रीय मागणी निर्देशांक', subtext: 'मजबूत औद्योगिक मागणी' },
  },
  gap: {
    en: { label: 'Aggregate Gap Score', subtext: 'Deficit widening in 5 sectors' },
    hi: { label: 'समग्र कौशल अंतराल', subtext: '5 क्षेत्रों में अंतर बढ़ रहा है' },
    gu: { label: 'કુલ કૌશલ્ય ખાધ સ્કોર', subtext: '5 ક્ષેત્રોમાં ખાધ વધી રહી છે' },
    ta: { label: 'மொத்த திறன் இடைவெளி', subtext: '5 துறைகளில் பற்றாக்குறை அதிகரிக்கிறது' },
    mr: { label: 'एकूण कौशल्य तूट स्कोअर', subtext: '५ क्षेत्रांमध्ये तूट वाढत आहे' },
  },
  acute: {
    en: { label: 'Trades in Acute Shortage', subtext: '+6 new trades flagged' },
    hi: { label: 'तीव्र कमी वाले व्यवसाय', subtext: '+6 नए ट्रेड चिह्नित' },
    gu: { label: 'ગંભીર અછત ધરાવતા ટ્રેડ્સ', subtext: '+6 નવા ટ્રેડ ફ્લેગ કર્યા' },
    ta: { label: 'கடுமையான பற்றாக்குறை தொழிற்பிரிவுகள்', subtext: '+6 புதிய தொழிற்பிரிவுகள்' },
    mr: { label: 'तीव्र तुटवड्यातील व्यवसाय', subtext: '+६ नवीन ट्रेड्स चिन्हांकित' },
  },
  districts: {
    en: { label: 'High-Priority Districts', subtext: 'Critical war-room focus' },
    hi: { label: 'उच्च-प्राथमिकता वाले जिले', subtext: 'वार-रूम हस्तक्षेप सक्रिय' },
    gu: { label: 'ઉચ્ચ અગ્રતા ધરાવતા જિલ્લાઓ', subtext: 'વોર રૂમ ફોકસ સક્રિય' },
    ta: { label: 'முன்னுரிமை மாவட்டங்கள்', subtext: 'களப்பணி அறை கண்காணிப்பு' },
    mr: { label: 'उच्च-प्राधान्य जिल्हे', subtext: 'वॉर-रूम हस्तक्षेप सुरू' },
  },
  saturation: {
    en: { label: 'Capacity Saturation', subtext: 'Within optimal threshold' },
    hi: { label: 'क्षमता संतृप्ति स्तर', subtext: 'इष्टतम सीमा के भीतर' },
    gu: { label: 'ક્ષમતા સંતૃપ્તિ સ્તર', subtext: 'યોગ્ય મર્યાદામાં' },
    ta: { label: 'திறன் நிறைவு நிலை', subtext: 'உகந்த வரம்பிற்குள் உள்ளது' },
    mr: { label: 'क्षमता संतृप्ति पातळी', subtext: 'इष्टतम मर्यादेत' },
  },
};
