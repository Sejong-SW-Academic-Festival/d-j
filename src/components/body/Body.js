import React, { useState, useEffect } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import {
  isSameMonth,
  isSameDay,
  addDays,
  format,
  isAfter,
  isBefore,
} from "date-fns";
import { differenceInWeeks } from "date-fns";
import ScheduleIndication from "../scheduleIndication/ScheduleIndication";
import ScheduleDetails from "../scheduleDetails/ScheduleDetails";
import axiosInstance from "../../axiosInstance";
import "./Body.css";
import temp_data from "../temp_data/schedule_list.json";

function Body({
  currentMonth,
  selectedDate,
  onDateClick,
  isBigCal,
  toBigCal,
  toSmallCal,
  toNextMonth,
  toPrevMonth,
  onSetSelectedDate,
}) {
  //월별 날짜 셋팅
  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateOfCal = startOfWeek(monthStart);
  const endDateOfCal = endOfWeek(monthEnd);
  const diff = differenceInWeeks(endDateOfCal, startDateOfCal);
  const rows = [];
  let days = [];
  let day = startDateOfCal;
  let formattedDate = "";

  //드래깅
  const [dragStartYCoord, setYCoord] = useState(1);
  const [dragStartXCoord, setXCoord] = useState(1);

  //월별 스케줄 셋팅
  //이걸 지금 업데이트 될 때마다 호출하는데 너무 비효율적이지 않나?? 월 바뀔 때만 호출할 수는 없나??
  const [schedules, setSchedules] = useState([]);
  const addSchedules = (e) => {
    setSchedules(e);
  };
  const getSchedules = async () => {
    // const tempToken =
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJoYWlsY3J5cHRpY0BnbWFpbC5jb20iLCJ1c2VyTmFtZSI6Ildvb2ppbiIsImV4cCI6MTcwMTUzNDc1Mn0.MWRNWdk9m1KDuYvuzK3tXoOV9xtLFKf9WUMAIV0UYK0";
    // const res = await axiosInstance.get("/schedule/get-list", {
    //   headers: { Authorization: tempToken },
    // });
    // const myResult = res.data.result;

    //임시데이터
    const myResult = temp_data.result;
    const thisMonthSchedule = myResult.filter(
      (schedule) =>
        !(
          isBefore(new Date(schedule.endDate), startDateOfCal) ||
          isAfter(new Date(schedule.startDate), endDateOfCal)
        )
    );
    addSchedules(thisMonthSchedule);
  };

  useEffect(() => {
    getSchedules();
    console.log("끼얏호");
    if (!isSameMonth(currentMonth, selectedDate)) {
      if (isSameMonth(currentMonth, today)) onSetSelectedDate(today);
      else onSetSelectedDate(monthStart);
    }
  }, [currentMonth]); //[]안의 값이 바뀔때 실행 (빈 배열이면 처음 한번만)

  const categoryColor = {
    학사일정: "green",
    단과대학: "blue",
    두드림: "pink",
    동아리: "mint",
    등록일정: "orange",
  };

  while (day <= endDateOfCal) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            isSameDay(day, selectedDate)
              ? "selected"
              : !isSameMonth(day, monthStart)
              ? "disabled"
              : format(currentMonth, "M") !== format(day, "M")
              ? "invalid"
              : "valid"
          } ${diff > 4 ? "long" : "short"}
          ${isBigCal ? "big" : "small"}
          ${isSameDay(day, today) ? "today" : ""}`}
          onClick={() => {
            onDateClick(cloneDay);
          }}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text invalid"
                : ""
            }
          >
            {("0" + formattedDate).slice(-2)}
          </span>
          <ScheduleIndication
            monthlySchedules={schedules}
            todayDate={day}
            isBigCal={isBigCal}
            colors={categoryColor}
            isSameMonth={isSameMonth(day, monthStart)}
          />
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="row">{days}</div>);
    days = [];
  }

  const touchStart = (e) => {
    setXCoord(e.touches[0].clientX);
    setYCoord(e.touches[0].clientY);
  };

  const touchMove = (e) => {
    if (dragStartYCoord === undefined || dragStartXCoord === undefined) return;
    const threshold = 80;
    const nowX = e.touches[0].clientX;
    const nowY = e.touches[0].clientY;

    const Xdiff = dragStartXCoord - nowX;
    const Ydiff = dragStartYCoord - nowY;

    if (Ydiff < -threshold && !isBigCal && Math.abs(Xdiff) <= Math.abs(Ydiff)) {
      toBigCal();
      setYCoord(undefined);
    } else if (
      Ydiff > threshold &&
      isBigCal &&
      Math.abs(Xdiff) <= Math.abs(Ydiff)
    ) {
      toSmallCal();
      setYCoord(undefined);
    } else if (Xdiff < -threshold && Math.abs(Xdiff) > Math.abs(Ydiff)) {
      toPrevMonth();
      setXCoord(undefined);
    } else if (Xdiff > threshold && Math.abs(Xdiff) > Math.abs(Ydiff)) {
      toNextMonth();
      setXCoord(undefined);
    }
  };

  const touchEnd = () => {
    setYCoord(undefined);
    setXCoord(undefined);
  };

  return (
    <div>
      <div
        className="body"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div className={`jiho-content ${isBigCal ? "big" : "small"}`}>
          {rows}
        </div>
      </div>
      {isBigCal ? (
        <></>
      ) : (
        <ScheduleDetails
          monthlySchedules={schedules}
          selDate={selectedDate}
          colors={categoryColor}
        />
      )}
    </div>
  );
}

export default Body;
