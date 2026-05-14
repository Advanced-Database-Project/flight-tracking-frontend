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

// check if the arrival is on the next day compared to departure
export const isNextDayArrival = (dep, arr) => {
  const departure = new Date(dep);
  const arrival = new Date(arr);

  return departure.getUTCDate() !== arrival.getUTCDate();
};

// get formatted date ...
export const formatDate = (date) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
};
