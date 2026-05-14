//

// calculate flight duration in hours and minutes
export const getFlightDuration = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const durationMs = arrival - departure;

  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}hrs ${minutes}mins`;
};

// convert time into HH:MM format
export const getTimeFormat = (timestamp) => {
  const date = new Date(timestamp);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
