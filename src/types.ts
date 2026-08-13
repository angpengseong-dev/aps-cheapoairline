export type CabinClass = 'standing' | 'cardboard' | 'premium_cardboard' | 'baggage_suite';

export interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  basePriceSGD: number;
  availableSeats: number;
  aircraft: string;
  stops: number;
  notes: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  priceSGD: number;
  category: 'air' | 'seat' | 'food' | 'luggage' | 'entertainment';
  iconName: string;
}

export interface Passenger {
  fullName: string;
  passportNumber: string;
  weightKg: number;
  jacketLayers: number;
  cabinClass: CabinClass;
  selectedSeatId?: string;
  addons: string[]; // addon IDs
}

export interface Booking {
  bookingRef: string;
  flight: Flight;
  returnFlight?: Flight;
  passenger: Passenger;
  tripType: 'one-way' | 'round-trip';
  totalPriceSGD: number;
  bookingDate: string;
  checkedIn: boolean;
  seatNumber: string;
  feeBreakdown: {
    baseFare: number;
    breathingTax: number;
    runwayLandingFee: number;
    armrestTax: number;
    addonsTotal: number;
  };
}

export interface LoyaltyTier {
  name: string;
  badge: string;
  minPoints: number;
  color: string;
  benefits: string[];
}

export interface FlightStatusInfo {
  flightNumber: string;
  route: string;
  status: 'On Time' | 'Gliding (Saving Fuel)' | 'Waiting for Wind' | 'Delayed (Pilot Bargaining For Petrol)' | 'Boarding (Weight Check)';
  altitudeFt: number;
  speedKts: number;
  eta: string;
  remarks: string;
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
