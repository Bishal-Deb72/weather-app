import { useState } from "react";

const Body = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError(null);
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=b61ab30a6d5e404c8d2172622250802&q=${city}&aqi=yes`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data",err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600 p-4 font-mono">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Weather App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>}
        {weather && (
          <div className="mt-4 text-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">{weather.location.name}, {weather.location.country}</h2>
            <p className="text-lg text-gray-700">{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="weather icon" className="mx-auto my-2" />
            <p className="text-2xl font-bold text-gray-900">{weather.current.temp_c}°C</p>
            <p className="text-gray-600">Feels like: {weather.current.feelslike_c}°C</p>
            <p className="text-gray-600">Humidity: {weather.current.humidity}%</p>
            <p className="text-gray-600">Wind: {weather.current.wind_kph} kph</p>
            <p className="text-gray-600">Pressure: {weather.current.pressure_mb} mb</p>
            <p className="text-gray-600">UV Index: {weather.current.uv}</p>
            <p className="text-gray-600">Visibility: {weather.current.vis_km} km</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;