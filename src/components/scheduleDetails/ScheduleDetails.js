import "./ScheduleDetails.css";
function ScheduleDetails({ monthlySchedules, selDate, colors }) {
  return (
    <div className="detail-body">
      <div className="details-container">
        {monthlySchedules
          .filter(
            (e) =>
              new Date(e.startDate).getDate() <= selDate.getDate() &&
              new Date(e.endDate).getDate() >= selDate.getDate()
          )
          .map((e, index) => (
            <div key={e.id} className={"detail"}>
              <div className={`sign ${colors.at(index % 4)}`}></div>
              <span className={`schedule-name ${colors.at(index % 4)}`}>
                {e.name}
              </span>
              <div className="detail-like">
                <svg
                  className="heart-shape"
                  width="17"
                  height="14"
                  viewBox="0 0 17 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.93916 12.8733C8.69833 12.9533 8.30166 12.9533 8.06083 12.8733C6.00666 12.2133 1.41666 9.46 1.41666 4.79333C1.41666 2.73333 3.18041 1.06667 5.355 1.06667C6.64416 1.06667 7.78458 1.65333 8.5 2.56C9.21541 1.65333 10.3629 1.06667 11.645 1.06667C13.8196 1.06667 15.5833 2.73333 15.5833 4.79333C15.5833 9.46 10.9933 12.2133 8.93916 12.8733Z"
                    stroke="#8F9BB3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default ScheduleDetails;
