import "./ScheduleIndication.css";
function ScheduleIndication({ monthlySchedules, todayDate, isBigCal, colors }) {
  return (
    <div
      className={
        isBigCal ? "big_indication_outLine" : "small_indication_outLine"
      }
    >
      {monthlySchedules
        .filter(
          (e) =>
            new Date(e.startDate).getDate() <= todayDate.getDate() &&
            new Date(e.endDate).getDate() >= todayDate.getDate()
        )
        .map((e, index) =>
          isBigCal ? (
            <div
              key={e.id}
              className={`big_indication ${colors.at(index % 4)}`}
            >
              {e.name}
            </div>
          ) : (
            <div
              key={e.id}
              className={`small_indication ${colors.at(index % 4)}`}
            ></div>
          )
        )}
    </div>
  );
}
export default ScheduleIndication;
