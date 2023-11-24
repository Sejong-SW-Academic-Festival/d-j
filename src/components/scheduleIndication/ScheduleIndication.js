import { isAfter, isBefore } from "date-fns";
import "./ScheduleIndication.css";
function ScheduleIndication({
  monthlySchedules,
  todayDate,
  isBigCal,
  colors,
  isSameMonth,
}) {
  const toShowSchedules = monthlySchedules.filter(
    (e) =>
      !(
        isBefore(new Date(e.endDate), todayDate) ||
        isAfter(new Date(e.startDate), todayDate)
      )
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
              className={`big_indication ${colors[e.categoryType]} ${
                isSameMonth ? "" : "blur"
              }`}
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
            className={`small_indication ${colors[e.categoryType]} ${
              isSameMonth ? "" : "blur"
            }`}
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
