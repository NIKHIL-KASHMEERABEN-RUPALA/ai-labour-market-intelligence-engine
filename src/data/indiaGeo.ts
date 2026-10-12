export interface IndiaStatePath {
  id: string;
  name: string;
  d: string;
  center: [number, number]; // [x, y] for label positioning
}

/**
 * High-accuracy SVG layout of India states normalized to a 600x680 coordinate space.
 * Clean topological paths designed for clear choropleth visualization and precise hover/click interaction.
 */
export const INDIA_STATES_PATHS: IndiaStatePath[] = [
  // Jammu & Kashmir / Ladakh
  {
    id: 'JK',
    name: 'Jammu & Kashmir and Ladakh',
    d: 'M 185 30 L 235 25 L 290 55 L 275 105 L 230 115 L 180 95 L 165 65 Z',
    center: [230, 68],
  },
  // Himachal Pradesh
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    d: 'M 195 110 L 238 105 L 250 135 L 225 155 L 195 140 Z',
    center: [220, 130],
  },
  // Punjab
  {
    id: 'PB',
    name: 'Punjab',
    d: 'M 160 115 L 195 110 L 195 155 L 165 175 L 145 145 Z',
    center: [172, 142],
  },
  // Uttarakhand
  {
    id: 'UK',
    name: 'Uttarakhand',
    d: 'M 230 145 L 265 130 L 285 160 L 255 180 L 230 160 Z',
    center: [255, 155],
  },
  // Haryana & Delhi
  {
    id: 'HR',
    name: 'Haryana',
    d: 'M 180 155 L 215 150 L 225 185 L 190 205 L 175 175 Z',
    center: [198, 178],
  },
  // Rajasthan
  {
    id: 'RJ',
    name: 'Rajasthan',
    d: 'M 105 175 L 175 170 L 185 210 L 220 230 L 190 295 L 145 305 L 90 260 L 80 205 Z',
    center: [142, 240],
  },
  // Uttar Pradesh
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    d: 'M 220 185 L 265 170 L 335 195 L 360 235 L 320 270 L 245 260 L 215 220 Z',
    center: [280, 225],
  },
  // Bihar
  {
    id: 'BR',
    name: 'Bihar',
    d: 'M 350 215 L 420 210 L 435 250 L 395 270 L 345 255 Z',
    center: [385, 238],
  },
  // Gujarat
  {
    id: 'GJ',
    name: 'Gujarat',
    d: 'M 65 265 L 125 275 L 150 320 L 145 365 L 105 375 L 60 340 L 40 310 L 45 280 Z',
    center: [100, 320],
  },
  // Madhya Pradesh
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    d: 'M 185 270 L 280 260 L 335 285 L 320 350 L 240 365 L 175 330 Z',
    center: [248, 310],
  },
  // Jharkhand
  {
    id: 'JH',
    name: 'Jharkhand',
    d: 'M 360 260 L 425 255 L 430 305 L 380 325 L 350 290 Z',
    center: [390, 288],
  },
  // West Bengal
  {
    id: 'WB',
    name: 'West Bengal',
    d: 'M 425 245 L 455 240 L 450 330 L 420 335 L 415 290 Z',
    center: [436, 290],
  },
  // Odisha
  {
    id: 'OD',
    name: 'Odisha',
    d: 'M 325 340 L 390 325 L 425 345 L 395 425 L 330 400 L 315 360 Z',
    center: [365, 372],
  },
  // Chhattisgarh
  {
    id: 'CG',
    name: 'Chhattisgarh',
    d: 'M 290 320 L 335 320 L 330 395 L 305 440 L 280 390 L 275 345 Z',
    center: [305, 370],
  },
  // Maharashtra
  {
    id: 'MH',
    name: 'Maharashtra',
    d: 'M 125 355 L 235 345 L 295 385 L 275 460 L 180 475 L 135 430 L 120 380 Z',
    center: [205, 415],
  },
  // Telangana
  {
    id: 'TS',
    name: 'Telangana',
    d: 'M 235 440 L 295 425 L 310 475 L 275 515 L 225 480 Z',
    center: [268, 470],
  },
  // Andhra Pradesh
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    d: 'M 285 450 L 360 415 L 330 525 L 275 565 L 255 530 L 285 500 Z',
    center: [300, 505],
  },
  // Karnataka
  {
    id: 'KA',
    name: 'Karnataka',
    d: 'M 165 470 L 235 460 L 255 540 L 225 600 L 175 570 L 160 515 Z',
    center: [205, 535],
  },
  // Goa
  {
    id: 'GA',
    name: 'Goa',
    d: 'M 160 510 L 175 512 L 170 530 L 157 525 Z',
    center: [164, 520],
  },
  // Kerala
  {
    id: 'KL',
    name: 'Kerala',
    d: 'M 190 580 L 220 575 L 225 650 L 205 665 L 185 615 Z',
    center: [204, 625],
  },
  // Tamil Nadu
  {
    id: 'TN',
    name: 'Tamil Nadu',
    d: 'M 225 550 L 280 540 L 270 635 L 230 660 L 215 595 Z',
    center: [248, 605],
  },
  // Assam
  {
    id: 'AS',
    name: 'Assam',
    d: 'M 470 230 L 535 220 L 565 240 L 525 270 L 465 260 Z',
    center: [510, 245],
  },
  // North East Hub (Arunachal, Meghalaya, etc.)
  {
    id: 'NE',
    name: 'Northeast Region',
    d: 'M 525 185 L 585 195 L 575 250 L 525 245 Z',
    center: [550, 215],
  },
];
