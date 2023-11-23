import styles from "./Home.module.css";
import HeadBar from "../headbar/HeadBar";
import Days from "../days/Days";
import Body from "../body/Body";
import Menu from "../menu/Menu";
import React, { useState } from "react";
import { format, addMonths, subMonths, isSameMonth } from "date-fns";

function Home() {
  //날짜
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const todayMonth = () => {
    setCurrentMonth(new Date());
  };

  //캘린더 크기
  const [isBigCalendar, setBigCal] = useState(true);
  const toSmallCalendar = () => {
    setBigCal(false);
  };
  const toBigCalendar = () => {
    setBigCal(true);
  };

  //해당 날짜 클릭 시
  const onDateClick = (day) => {
    setSelectedDate(day);
    if (!isSameMonth(day, currentMonth)) {
      setCurrentMonth(day);
    }
    toSmallCalendar();
  };

  //메뉴
  const [showMenu, setShowMenu] = useState(false);
  const onMenuShowBtnClicked = () => {
    setShowMenu(true);
  };

  return (
    <div className={styles.body}>
      {showMenu ? (
        <Menu setShowMenu={setShowMenu} />
      ) : (
        <HeadBar
          year={format(currentMonth, "yyyy")}
          month={currentMonth.toLocaleString("en-US", { month: "long" })}
          todayMonth={todayMonth}
          openMenu={onMenuShowBtnClicked}
        />
      )}
      <Days />
      <Body
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        isBigCal={isBigCalendar}
        toBigCal={toBigCalendar}
        toSmallCal={toSmallCalendar}
        toNextMonth={nextMonth}
        toPrevMonth={prevMonth}
        onSetSelectedDate={setSelectedDate}
      />
    </div>
  );
}
export default Home;
