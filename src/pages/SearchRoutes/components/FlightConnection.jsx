//

import { getFlightDuration, getTimeFormat } from "../../../utils/timeFormatter";

// ----------------------------------------

export default function FlightConnection({ flightRoutes }) {
  return (
    <div>
      {flightRoutes?.routes?.map((routes) => {
        return (
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              border: "1px solid black",
              borderRadius: 8,
            }}
          >
            {routes?.layovers === 0 ? <DirectFlights routes={routes} /> : null}
            {routes?.layovers === 1 ? <SingleLayover routes={routes} /> : null}
          </div>
        );
      })}
    </div>
  );
}

const DirectFlights = ({ routes }) => {
  console.log(routes);

  const segment = routes?.segments[0];

  const departure = new Date(segment?.departure?.scheduled);
  const arrival = new Date(segment?.arrival?.scheduled);

  const isNextDay = departure.getUTCDate() !== arrival.getUTCDate();

  return (
    <div>
      <div>
        <small>Direct Flight</small>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <div>
          <div>{getTimeFormat(segment.departure.scheduled)}</div>
          <div>{segment.from}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <small style={{ color: "gray" }}>
            {getFlightDuration(
              segment.departure.scheduled,
              segment.arrival.scheduled,
            )}
          </small>
          <hr style={{ margin: 0, width: "100%" }} />
          <small style={{ color: "gray" }}>{segment?.airline?.name}</small>
        </div>

        <div>
          <div>
            <div>
              {getTimeFormat(segment.arrival.scheduled)}
              {isNextDay && (
                <small style={{ color: "orange", marginLeft: 6 }}>+1 Day</small>
              )}
            </div>
            <div>{segment.to}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleLayover = ({ routes }) => {
  return (
    <div>
      <div>direct flight</div>
      single layover
    </div>
  );
};
