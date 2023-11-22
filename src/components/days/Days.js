import "./Days.css";

function Days() {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className={`col ${i === 0 ? "Sun" : ""} ${i === 6 ? "Sat" : ""}`}
        key={i}
      >
        {date[i]}
      </div>
    );
  }

  return (
    <div className="days-parent">
      <div className="days">{days}</div>
    </div>
  );
}

export default Days;
