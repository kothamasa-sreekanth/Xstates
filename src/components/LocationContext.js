import { useEffect, useState } from "react";
import styles from "../App.css";
import axios from "axios";

const XStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectCountry(country);
    setSelectState("");
    setSelectCity("");
    setStates([]);

    if (country) {
      try {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    }
  };

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectState(state);
    setSelectCity("");
    setCities([]);
    if (state) {
      try {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${state}/cities`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
  };

  const handleCityChange = (e) => {
    setSelectCity(e.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <div className={styles.select}>
        <select value={selectCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        &ensp;
        <select
          value={selectState}
          onChange={handleStateChange}
          disabled={!selectCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        &ensp;
        <select
          value={selectCity}
          onChange={handleCityChange}
          disabled={!selectState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectCity ? (
        <p>
          You selected <span style={{ fontSize: 20 }}>{selectCity}</span>,{" "}
          <span style={{ color: "grey" }}>
            {selectState}, {selectCountry}
          </span>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default XStates;