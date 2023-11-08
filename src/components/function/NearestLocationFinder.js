import React, { useState } from "react";
import { getDistance } from "geolib";

const foodbankAddresses = {
  "7140 Goreway Dr, Mississauga, ON L4T 2T6": {
    name: "Sai Dham Food Bank",
    coords: { latitude: 43.7085, longitude: -79.623 },
  },
  "157 Byng Ave, Scarborough, ON M1L3P3": {
    name: "Scarborough Food Security Initiative",
    coords: { latitude: 43.6915, longitude: -79.3288 },
  },
  "191 New Toronto Street Toronto, ON M8V 2E7": {
    name: "Daily Bread Food Bank",
    coords: { latitude: 43.6007, longitude: -79.5053 },
  },
  "9680 Ninth Line, Markham, ON L6B 1A8": {
    name: "Cornerstone food bank",
    coords: { latitude: 43.8965, longitude: -79.2334 },
  },
};

const NearestLocationFinder = ({ setSelectedFoodBank }) => {
  const [myCoords, setMyCoords] = useState(null);
  const [nearestFoodBank, setNearestFoodBank] = useState("");
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(`ERROR(${err.code}): ${err.message}`);
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const findNearestFoodBank = () => {
    if (!myCoords) {
      setError("Current location is not available.");
      return;
    }

    let closestDistance = Infinity;
    let closestFoodBank = null;

    Object.entries(foodbankAddresses).forEach(([address, { name, coords }]) => {
      const distance = getDistance(myCoords, coords);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestFoodBank = { name, address };
      }
    });
    setNearestFoodBank(closestFoodBank);
    localStorage.setItem("fookBank", closestFoodBank.name);
    setSelectedFoodBank(closestFoodBank.name);
    window.location.reload();
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={getLocation}
        style={{ marginRight: "10px" }}
      >
        Get My Location
      </button>
      <button
        className="btn btn-success"
        onClick={findNearestFoodBank}
        disabled={!myCoords}
      >
        Find Nearest Food Bank
      </button>
      {nearestFoodBank && (
        <div>
          Nearest Food Bank: {nearestFoodBank.name} ({nearestFoodBank.address})
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default NearestLocationFinder;
