import  { useState, useEffect } from "react";
import "../App.css";

const API_BASE = "https://crio-location-selector.onrender.com";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err.message));
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    if (country) {
      try {
        const res = await fetch(`${API_BASE}/country=${country}/states`);
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("Error fetching states:", err.message);
      }
    }
  };

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    if (state) {
      try {
        const res = await fetch(
          `${API_BASE}/country=${selectedCountry}/state=${state}/cities`
        );
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities:", err.message);
      }
    }
  };

  return (
    <div className="container">
      <h2>Location Selector</h2>

      <div className="dropdowns">
        {/* Country Dropdown */}
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Location */}
   {/* Display Selected Location */}
      {selectedCity && (
        <div className="location-display" data-testid="location-display">
          <p>{selectedCity},</p>
          <p>{selectedState},</p>
          <p>{selectedCountry}</p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
