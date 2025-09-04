import React, { useState } from "react";

export default function WeatherNow() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      setWeather(null);

      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Get weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch weather.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="text-4xl font-bold mb-6"> Weather Now🌤</h1>
      <p className="mb-4 text-lg">Get current weather information for any city.</p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-64 shadow"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {weather && (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center text-black ">
          <h2 className="text-xl font-semibold ">
            {weather.name}, {weather.country}
          </h2>
          <p className="text-2xl mt-2">{weather.temp}°C</p>
          <p className="text-gray-900">Wind: {weather.wind} km/h</p>
        </div>
      )}
    </div>
  );
}