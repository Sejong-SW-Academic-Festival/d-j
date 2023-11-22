import "./ScheduleIndication.css";
function ScheduleIndication({ monthlySchedules, todayDate, isBigCal, colors }) {
  const toShowSchedules = monthlySchedules.filter(
    (e) =>
      new Date(e.startDate).getDate() <= todayDate.getDate() &&
      new Date(e.endDate).getDate() >= todayDate.getDate()
  );

  function canShowSchedules(index) {
    if (index <= 2) return true;
    if (index == 3) return toShowSchedules.length <= 4;
    return false;
  }

  return (
    <div
      className={
        isBigCal ? "big_indication_outLine" : "small_indication_outLine"
      }
    >
      {toShowSchedules.map((e, index) =>
        isBigCal ? (
          canShowSchedules(index) ? (
            <div
              key={e.id}
              className={`big_indication ${colors[e.category_id]}`}
            >
              {e.name}
            </div>
          ) : index == 3 ? (
            <div className="big_plus_cnt">
              +{toShowSchedules.length - index}
            </div>
          ) : null
        ) : canShowSchedules(index) ? (
          <div
            key={e.id}
            className={`small_indication ${colors[e.category_id]}`}
          ></div>
        ) : index == 3 ? (
          <div className="small_plus_cnt">
            +{toShowSchedules.length - index}
          </div>
        ) : null
      )}
    </div>
  );
}
export default ScheduleIndication;
