import { Flight, AddOn, LoyaltyTier, FlightStatusInfo } from '../types';

export const AIRPORTS = [
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport (Terminal 5 Sub-Basement)', country: 'Singapore' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'KLIA2 (Outer Cargo Pad)', country: 'Malaysia' },
  { code: 'BKK', city: 'Bangkok', name: 'Don Mueang International', country: 'Thailand' },
  { code: 'DPS', city: 'Bali (Denpasar)', name: 'Ngurah Rai International', country: 'Indonesia' },
  { code: 'PEN', city: 'Penang', name: 'Penang International', country: 'Malaysia' },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong International (Apron Zone C)', country: 'Hong Kong' },
  { code: 'TYO', city: 'Tokyo', name: 'Narita International (Bus Shelter Gate 99)', country: 'Japan' },
  { code: 'LON', city: 'London', name: 'Gatwick Airport (Grassy Field Runway)', country: 'United Kingdom' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith (Outback Hangar 4)', country: 'Australia' }
];

export const SAMPLE_FLIGHTS: Flight[] = [
  {
    id: 'fl-101',
    flightNumber: 'CP 101',
    origin: 'Singapore',
    originCode: 'SIN',
    destination: 'Kuala Lumpur',
    destinationCode: 'KUL',
    departureTime: '07:15',
    arrivalTime: '08:15',
    duration: '1h 00m',
    basePriceSGD: 12.00,
    availableSeats: 14,
    aircraft: 'Boeing 737-100 (Assembled 1982)',
    stops: 0,
    notes: 'Engine may coast mid-flight to conserve jet fuel.'
  },
  {
    id: 'fl-102',
    flightNumber: 'CP 103',
    origin: 'Singapore',
    originCode: 'SIN',
    destination: 'Bangkok',
    destinationCode: 'BKK',
    departureTime: '10:30',
    arrivalTime: '12:00',
    duration: '2h 30m',
    basePriceSGD: 39.00,
    availableSeats: 8,
    aircraft: 'Airbus A320 (Slightly dented left wing)',
    stops: 0,
    notes: 'Standing passengers please hold overhead straps tightly during banking.'
  },
  {
    id: 'fl-103',
    flightNumber: 'CP 205',
    origin: 'Singapore',
    originCode: 'SIN',
    destination: 'Bali (Denpasar)',
    destinationCode: 'DPS',
    departureTime: '13:00',
    arrivalTime: '15:45',
    duration: '2h 45m',
    basePriceSGD: 45.00,
    availableSeats: 21,
    aircraft: 'ATR 72 Turboprop (Manual propeller hand-cranked)',
    stops: 0,
    notes: 'Tailwind dependent arrival time.'
  },
  {
    id: 'fl-104',
    flightNumber: 'CP 308',
    origin: 'Singapore',
    originCode: 'SIN',
    destination: 'Tokyo',
    destinationCode: 'TYO',
    departureTime: '23:55',
    arrivalTime: '07:30',
    duration: '6h 35m',
    basePriceSGD: 119.00,
    availableSeats: 5,
    aircraft: 'Boeing 767 (Repurposed Cargo Hauler)',
    stops: 1,
    notes: 'Technical refueling stop at unpaved strip in Manila.'
  },
  {
    id: 'fl-105',
    flightNumber: 'CP 501',
    origin: 'Singapore',
    originCode: 'SIN',
    destination: 'London',
    destinationCode: 'LON',
    departureTime: '01:10',
    arrivalTime: '11:45',
    duration: '15h 35m',
    basePriceSGD: 299.00,
    availableSeats: 3,
    aircraft: 'Douglas DC-10 Classic (Vintage charm, no air-con included)',
    stops: 2,
    notes: '2 stops to allow pilot to sleep in budget hotel.'
  },
  {
    id: 'fl-106',
    flightNumber: 'CP 602',
    origin: 'Singapore',
    originCode: 'SIN',
    destination: 'Sydney',
    destinationCode: 'SYD',
    departureTime: '15:20',
    arrivalTime: '01:10',
    duration: '7h 50m',
    basePriceSGD: 188.00,
    availableSeats: 11,
    aircraft: 'Airbus A330 (Economy seats replaced with bench seating)',
    stops: 0,
    notes: 'Bring your own blanket or buy our $3 newspaper wrap.'
  }
];

export const ADDONS: AddOn[] = [
  {
    id: 'add-air',
    name: 'Personal Oxygen Vent Jet',
    description: 'Direct air stream to your face for 2 hours (otherwise cabin ambient breath applies).',
    priceSGD: 4.50,
    category: 'air',
    iconName: 'Wind'
  },
  {
    id: 'add-pad',
    name: 'Foam Seat Pad Cushion',
    description: 'Protects tailbone from bare plastic shell chair.',
    priceSGD: 6.00,
    category: 'seat',
    iconName: 'Armchair'
  },
  {
    id: 'add-armrest',
    name: 'Armrest Lease Permission',
    description: 'Exclusive right to use the shared middle armrest for 45 minutes.',
    priceSGD: 3.50,
    category: 'seat',
    iconName: 'Maximize2'
  },
  {
    id: 'add-recline',
    name: '1-Inch Seat Recline Unlock',
    description: 'Crew unlatches your seat pin so you can lean back 2.5 degrees.',
    priceSGD: 8.00,
    category: 'seat',
    iconName: 'CornerDownRight'
  },
  {
    id: 'add-hotwater',
    name: 'Hot Water Tax (Per Cup)',
    description: 'Pouring 80°C hot water into your own cup noodles.',
    priceSGD: 2.50,
    category: 'food',
    iconName: 'Coffee'
  },
  {
    id: 'add-peanuts',
    name: 'Recycled Peanuts (3 Pieces)',
    description: 'Salted peanuts rescued from previous flight tray table.',
    priceSGD: 1.20,
    category: 'food',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'add-tapwater',
    name: 'Artisanal Tap Water (100ml)',
    description: 'Freshly drawn from Changi Terminal 5 staff toilet tap.',
    priceSGD: 3.00,
    category: 'food',
    iconName: 'Droplets'
  },
  {
    id: 'add-smell',
    name: 'Aroma of Pilot Meal',
    description: 'Flight attendant opens pilot cabin door for 10 seconds so you can smell chicken rice.',
    priceSGD: 0.80,
    category: 'food',
    iconName: 'Sparkles'
  },
  {
    id: 'add-luggage',
    name: 'Cabin Pocket Storage (Max 500g)',
    description: 'Right to store a small wallet in seatback mesh pocket.',
    priceSGD: 5.00,
    category: 'luggage',
    iconName: 'Briefcase'
  },
  {
    id: 'add-window-view',
    name: 'Window Unblind Service',
    description: 'Flight attendant rolls down window shade so you can see clouds.',
    priceSGD: 2.00,
    category: 'entertainment',
    iconName: 'Eye'
  }
];

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Cardboard Member',
    badge: '📦 Cardboard',
    minPoints: 0,
    color: '#a87e50',
    benefits: [
      'Access to standard standing area near toilet',
      'Free air breathing (subject to cabin pressure)',
      '1x wave from ground staff at boarding'
    ]
  },
  {
    name: 'Copper Penny Pincer',
    badge: '🪙 Copper',
    minPoints: 500,
    color: '#b87333',
    benefits: [
      'Complimentary smell of warm toast during landing',
      'Priority access to flight attendant eye contact',
      '5% discount on hot water pouring tax'
    ]
  },
  {
    name: 'Aluminium Saver',
    badge: '🥈 Aluminium',
    minPoints: 2000,
    color: '#a1a8b3',
    benefits: [
      '1x Free plastic cup (empty)',
      'Guaranteed seat with at least 50% intact padding',
      'Boarding ahead of passengers wearing 10 jackets'
    ]
  },
  {
    name: 'Tin Foil Elite',
    badge: '⚡ Tin Foil',
    minPoints: 5000,
    color: '#e5e7eb',
    benefits: [
      'Dedicated handle-strap in standing zone',
      'Free 15-minute armrest privilege',
      'Captain calls you "Boss" over the loudspeaker'
    ]
  },
  {
    name: 'Stainless Steel Solitaire',
    badge: '👑 Stainless Steel',
    minPoints: 12000,
    color: '#0284c7',
    benefits: [
      'Lounge access (1 bench seat near Terminal 5 bus stop)',
      'Free choice of seat in Baggage Hold Suite',
      'Unlimited tap water refills during delay'
    ]
  }
];

export const MOCK_FLIGHT_STATUSES: FlightStatusInfo[] = [
  {
    flightNumber: 'CP 101',
    route: 'SIN ➔ KUL',
    status: 'Gliding (Saving Fuel)',
    altitudeFt: 18000,
    speedKts: 290,
    eta: '08:18 AM',
    remarks: 'Pilot turned off Left Engine to save $45 in kerosene.'
  },
  {
    flightNumber: 'CP 103',
    route: 'SIN ➔ BKK',
    status: 'Waiting for Wind',
    altitudeFt: 0,
    speedKts: 0,
    eta: '01:15 PM',
    remarks: 'Awaiting favorable tailwind to reduce fuel consumption.'
  },
  {
    flightNumber: 'CP 308',
    route: 'SIN ➔ TYO',
    status: 'On Time',
    altitudeFt: 34000,
    speedKts: 440,
    eta: '07:30 AM',
    remarks: 'Passengers holding overhead straps smoothly in formation.'
  },
  {
    flightNumber: 'CP 501',
    route: 'SIN ➔ LON',
    status: 'Delayed (Pilot Bargaining For Petrol)',
    altitudeFt: 0,
    speedKts: 0,
    eta: '02:30 PM',
    remarks: 'Pilot currently negotiating discount fuel rate with airport vendor.'
  }
];

export const INFLIGHT_MENU = [
  {
    title: 'Artisanal Tap Water (Room Temp)',
    desc: 'Drawn from Changi Airport tap 2 hours prior to departure. Served in paper cup.',
    price: '$3.00',
    tag: 'Popular'
  },
  {
    title: 'DIY Cup Noodle Hot Water Tax',
    desc: 'You bring cup noodle, we provide 80°C hot water. Chopsticks sold separately ($0.50).',
    price: '$2.50',
    tag: 'Frugal Favorite'
  },
  {
    title: 'Single Salt Packet (Vintage 2024)',
    desc: 'Purified sodium chloride packet from leftover catering crates.',
    price: '$0.50',
    tag: 'Budget Chef'
  },
  {
    title: 'Aroma of Pilot Chicken Rice',
    desc: 'Flight attendant opens cockpit door for 10 seconds. Deep inhale allowed.',
    price: '$0.80',
    tag: 'Delicacy'
  },
  {
    title: 'Ice Cube (Single)',
    desc: 'Chilled ice cube made from boiled tap water. Melts in ~4 minutes.',
    price: '$1.00',
    tag: 'Luxury'
  }
];
