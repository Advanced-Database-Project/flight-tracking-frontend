//

import {
  getFlightDuration,
  getTimeFormat,
  isNextDayArrival,
} from "../../../utils/timeFormatter";

// ----------------------------------------

export default function FlightConnection({ flightRoutes }) {
  return (
    <div style={{ maxWidth: 600 }}>
      {flightRoutes?.routes?.map((routes) => {
        return (
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              border: "1px solid black",
              borderRadius: 8,
            }}
            key={`${routes?.source}-${routes?.destination}`}
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
  const segment = routes?.segments[0];

  return (
    <div style={{ alignItems: "center" }}>
      <div>
        <small>Direct Flight</small>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        <div>
          <div style={{ color: "black", fontWeight: "bold" }}>
            {getTimeFormat(segment.departure.scheduled)}
          </div>
          <div>{segment.from}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 260,
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
          <div style={{ color: "black", fontWeight: "bold" }}>
            {getTimeFormat(segment.arrival.scheduled)}
            {isNextDayArrival(
              segment?.departure?.scheduled,
              segment?.arrival?.scheduled,
            ) && (
              <small style={{ color: "orange", marginLeft: 6 }}>+1 Day</small>
            )}
          </div>
          <div>{segment.to}</div>
        </div>
      </div>
    </div>
  );
};

const SingleLayover = ({ routes }) => {
  return (
    <div
      style={{ alignItems: "center" }}
      key={`${routes?.source}-${routes?.destination}`}
    >
      <div>
        <small>One Layover</small>
      </div>

      {routes?.segments?.map((seg, i) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "10px",
              paddingBottom: "10px",
            }}
            key={`${seg?.flight?.icao}-${i}`}
          >
            <div>
              <div style={{ color: "black", fontWeight: "bold" }}>
                {getTimeFormat(seg.departure.scheduled)}
              </div>
              <div>{seg.from}</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 260,
              }}
            >
              <small style={{ color: "gray" }}>
                {getFlightDuration(
                  seg.departure.scheduled,
                  seg.arrival.scheduled,
                )}
              </small>
              <hr style={{ margin: 0, width: "100%" }} />
              <small style={{ color: "gray" }}>{seg?.airline?.name}</small>
            </div>

            <div>
              <div style={{ color: "black", fontWeight: "bold" }}>
                {getTimeFormat(seg.arrival.scheduled)}
                {isNextDayArrival(
                  seg?.departure?.scheduled,
                  seg?.arrival?.scheduled,
                ) && (
                  <small style={{ color: "orange", marginLeft: 6 }}>
                    +1 Day
                  </small>
                )}
              </div>
              <div>{seg.to}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
