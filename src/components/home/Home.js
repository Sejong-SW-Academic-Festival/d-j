import styles from "./Home.module.css";
import HeadBar from "../headbar/HeadBar";
import Days from "../days/Days";
import Body from "../body/Body";
import Menu from "../menu/Menu";
import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, isSameMonth } from "date-fns";
import axiosInstance from "../../axiosInstance";

function Home() {
  //날짜
  const [loading, setloading] = useState(true);
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

  //메뉴창 - 사용자 정보
  const [userInfo, setUserInfo] = useState([]);
  const initUserInfo = (e) => {
    setUserInfo(e);
  };

  //메뉴창 - 카테고리 정보 (메뉴창과 연동용으로 일시적임)
  const [categories, setCategories] = useState([]);
  const addCategories = (e) => {
    setCategories(e);
  };

  const tempGetOpposite = (temp) => !temp;
  const setCategorySubscribe = (elem) => {
    const updatedCategoriesMine = categories.map((main_category) => ({
      ...main_category,
      children: main_category.children.map((sub_category) => {
        return sub_category.id === elem.id
          ? {
              ...sub_category,
              subscribed: tempGetOpposite(elem.subscribed),
              children: sub_category.children.map((last_child) => {
                return {
                  ...last_child,
                  subscribed: tempGetOpposite(elem.subscribed),
                };
              }),
            }
          : {
              ...sub_category,
              children: sub_category.children.map((last_child) => {
                return last_child.id === elem.id
                  ? {
                      ...last_child,
                      subscribed: tempGetOpposite(elem.subscribed),
                    }
                  : { ...last_child };
              }),
            };
      }),
    }));
    setCategories(updatedCategoriesMine);
  };

  const getMenuSources = async () => {
    const categoryResult = await axiosInstance.get(
      "/user/get-all-category-list");
    const userInfoResult = await axiosInstance.get("/user/mypage");
    addCategories(categoryResult.data.result);
    initUserInfo(userInfoResult.data.result);
    setloading(false);
  };

  useEffect(() => {
    getMenuSources();
  }, []);

  if(loading )
  return (
<div> </div>)
  return (
    <div className={styles.body}>
      {showMenu ? (
        <Menu
          setShowMenu={setShowMenu}
          menuCategories={categories}
          menuUserInfo={userInfo}
          onClickedSubCategory={setCategorySubscribe}
          defaultCategories={categories}
        />
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
        defaultCategories={categories}
      />
    </div>
  );
}
export default Home;
