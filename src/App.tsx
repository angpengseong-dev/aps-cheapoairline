import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { FlightSearchResults } from './components/FlightSearchResults';
import { BookingModal } from './components/BookingModal';
import { ManageBooking } from './components/ManageBooking';
import { FlightStatus } from './components/FlightStatus';
import { KiamSiapClub } from './components/KiamSiapClub';
import { InflightExperience } from './components/InflightExperience';
import { CheapoConciergeAI } from './components/CheapoConciergeAI';
import { Footer } from './components/Footer';
import { SAMPLE_FLIGHTS } from './data/mockData';
import { Flight, Booking, CabinClass } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function MainApp() {
  const { theme, classes } = useTheme();
  const [activeTab, setActiveTab] = useState('book');
  const [currency, setCurrency] = useState('SGD');

  // Search state
  const [searchParams, setSearchParams] = useState({
    origin: 'SIN',
    destination: 'KUL',
    departureDate: '2026-08-20',
    returnDate: '2026-08-27',
    tripType: 'round-trip' as 'one-way' | 'round-trip',
    cabinClass: 'cardboard' as CabinClass,
    passengers: 1,
    sharingSeat: false,
    promoCode: '',
  });

  const [hasSearched, setHasSearched] = useState(true);

  // Booking Modal
  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState<Flight | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  // AI Concierge
  const [conciergeOpen, setConciergeOpen] = useState(false);

  const handleSearch = (params: typeof searchParams) => {
    setSearchParams(params);
    setHasSearched(true);
    // Smooth scroll down to results
    const resultsEl = document.getElementById('search-results');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setUserBookings([newBooking, ...userBookings]);
  };

  // Filter flights matching origin and destination
  const filteredFlights = SAMPLE_FLIGHTS.filter((f) => {
    // If exact match or show default list
    if (searchParams.origin && searchParams.destination) {
      return (
        f.originCode === searchParams.origin && f.destinationCode === searchParams.destination
      );
    }
    return true;
  });

  // Fallback to all flights if no exact route matched
  const displayedFlights = filteredFlights.length > 0 ? filteredFlights : SAMPLE_FLIGHTS;

  return (
    <div className={`min-h-screen ${classes.bg} flex flex-col font-sans transition-colors duration-300 selection:bg-amber-400 selection:text-blue-950`}>
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        
        {/* TAB 1: BOOK FLIGHT */}
        {activeTab === 'book' && (
          <div>
            <HeroSearch onSearch={handleSearch} currency={currency} />

            <div id="search-results">
              <FlightSearchResults
                flights={displayedFlights}
                origin={searchParams.origin}
                destination={searchParams.destination}
                currency={currency}
                cabinClass={searchParams.cabinClass}
                passengers={searchParams.passengers}
                sharingSeat={searchParams.sharingSeat}
                onSelectFlight={(flight) => setSelectedFlightForBooking(flight)}
              />
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE BOOKING & CHECK-IN */}
        {activeTab === 'manage' && (
          <ManageBooking userBookings={userBookings} currency={currency} />
        )}

        {/* TAB 3: FLIGHT STATUS */}
        {activeTab === 'status' && <FlightStatus />}

        {/* TAB 4: KIAMSIAP CLUB LOYALTY */}
        {activeTab === 'loyalty' && <KiamSiapClub />}

        {/* TAB 5 & 6: INFLIGHT EXPERIENCE & SHOP */}
        {(activeTab === 'inflight' || activeTab === 'shop') && <InflightExperience />}

      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal Wizard */}
      {selectedFlightForBooking && (
        <BookingModal
          flight={selectedFlightForBooking}
          currency={currency}
          cabinClass={searchParams.cabinClass}
          passengersCount={searchParams.passengers}
          sharingSeat={searchParams.sharingSeat}
          onClose={() => setSelectedFlightForBooking(null)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* AI Auntie KiamSiap Concierge Modal */}
      <CheapoConciergeAI
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
