//

import { useState } from "react";
// @dataset
import { airportsDataset } from "../../../../dataset/airports";

// ----------------------------------------

export default function SearchComponent({
  getSelectedAirport,
  placeHolder,
  ident,
}) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const lowerValue = value.toLowerCase();

    const filtered = airportsDataset
      .filter((airport) => {
        return (
          airport?.name?.toLowerCase().includes(lowerValue) ||
          airport?.country?.toLowerCase().includes(lowerValue) ||
          airport?.iata?.toLowerCase().includes(lowerValue) ||
          airport?.icao?.toLowerCase().includes(lowerValue)
        );
      })
      .slice(0, 10);

    setSuggestions(filtered);
  };

  return (
    <div style={{ width: "400px", position: "relative" }}>
      <input
        type="text"
        placeholder={placeHolder}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "8px",
          color: "black",
        }}
      />

      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((airport, index) => (
            <div
              key={`${ident}-${index}`}
              onClick={() => {
                setSearch(airport.name);
                getSelectedAirport(airport, ident);
                setSuggestions([]);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>
                  {airport.name} ({airport.iata || airport.icao})
                </strong>
              </div>

              <div style={{ fontSize: "14px", color: "#666" }}>
                {airport.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
