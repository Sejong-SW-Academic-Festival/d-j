import React, { useState, useEffect } from "react";
import { isAfter, isBefore, format, isSameDay } from "date-fns";
import "./ScheduleDetails.css";
import axiosInstance from "../../axiosInstance";
function ScheduleDetails({
  monthlySchedules,
  selDate,
  colors,
  getSchedulesMothod,
}) {
  const toShowSchedules = monthlySchedules.filter(
    (e) =>
      isSameDay(new Date(e.startDate), selDate) ||
      isSameDay(new Date(e.endDate), selDate) ||
      !(
        isBefore(new Date(e.endDate), selDate) ||
        isAfter(new Date(e.startDate), selDate)
      )
  );
  console.log("seldate:", selDate);

  const toggleHeartSchedules = async (isliked, scheduleName) => {
    if (isliked) {
      const unbookResult = await axiosInstance.put(
        `/user/unbook-schedule/${scheduleName}`
      );
      getSchedulesMothod();
    } else {
      const bookResult = await axiosInstance.put(
        `/user/book-schedule/${scheduleName}`
      );
      getSchedulesMothod();
    }
  };

  return (
    <div className="detail-body">
      <div className="details-container">
        {toShowSchedules.map((e) => (
          <div key={e.id} className={"detail"}>
            <div className={`sign ${colors[e.categoryType]}`}></div>
            <div
              className="detail-like"
              onClick={() => toggleHeartSchedules(e.liked, e.name)}
            >
              <svg
                className={`heart-shape ${e.liked ? "filled" : "unfilled"}`}
                width="17"
                height="14"
                viewBox="0 0 17 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.93916 12.8733C8.69833 12.9533 8.30166 12.9533 8.06083 12.8733C6.00666 12.2133 1.41666 9.46 1.41666 4.79333C1.41666 2.73333 3.18041 1.06667 5.355 1.06667C6.64416 1.06667 7.78458 1.65333 8.5 2.56C9.21541 1.65333 10.3629 1.06667 11.645 1.06667C13.8196 1.06667 15.5833 2.73333 15.5833 4.79333C15.5833 9.46 10.9933 12.2133 8.93916 12.8733Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="schedule-info">
              <div className={`schedule-name ${colors[e.categoryType]}`}>
                {e.name}
              </div>
              <div className="time-and-location">
                <div className="time">
                  {e.startDate.slice(11, 16)}-{e.endDate.slice(11, 16)}
                </div>
                <div className="location">{e.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ScheduleDetails;