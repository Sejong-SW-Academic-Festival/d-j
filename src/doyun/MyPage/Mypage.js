import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Mypage.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import axiosInstance from "../../axiosInstance";

export default function Mypage() {
  const history = useNavigate();
  const [userData, setUserData] = useState({});
  const [modal, setModal] = useState(false);
  const [schedulename, setSchedulename] = useState("");
  const [scheduleplace, setScheduleplace] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const filterPassedDate = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
  
    // currentDate가 selectedDate보다 이후 또는 같은 경우 true를 반환하여 선택 가능하도록 설정
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChangeStartDate = (date) => {
    setStartDate(date);
    // 여기에 시작 날짜가 변경될 때 수행할 작업 추가
  };

  const handleChangeEndDate = (date) => {
    setEndDate(date);
    // 여기에 종료 날짜가 변경될 때 수행할 작업 추가
  };

    const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    setStartDate(null);
    setEndDate(null);
    setSchedulename("");
    setScheduleplace("");
  };

  const handleSchedulename = (e) => {
    setSchedulename(e.target.value);
  };

  const handleScheduleplace = (e) => {
    setScheduleplace(e.target.value);
  };

  const handleSaveSchedule = () => {
    // Check if all required fields are filled
    if (!schedulename || !scheduleplace || !startDate || !endDate) {
      alert("모든 필수 항목을 입력하세요.");
      return;
    }

    // Prepare data for the API request
    const scheduleData = {
      name: schedulename,
      location: scheduleplace,
      startDate: startDate,
      endDate: endDate,
      categoryName: '개인일정',
      description: '개인일정'
      // Add any other necessary data
    };

    // Make an API request to save the schedule
    axiosInstance
      .post("/user/add-personal-schedule", scheduleData)
      .then((response) => {
        // Handle the response from the server
        console.log("Schedule saved successfully:", response.data);

        // Close the modal and reset the form
        hideModal();
      })
      .catch((error) => {
        console.error("Error saving schedule:", error);
        // Handle the error, e.g., show an error message
      });
    };

  useEffect(() => {
    // 사용자 정보를 가져오는 API 호출
    const token = localStorage.getItem("Authorization");

    if (token) {
      axiosInstance
        .get("/user/mypage")
        .then((response) => {
          // API에서 받아온 사용자 정보를 상태 변수에 저장
          setUserData(response.data.result);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
  };

  return (
    <div className={styles.page}>
      <div className={styles.profileimg}>
        <img className={styles.profile} src="img/profile.png" alt="Profile" />
      </div>
      <p className={styles.username}>{userData.name}</p>
      <p className={styles.userdep}>{userData.department}</p>
      <p className={styles.userid}>{userData.email}</p>
      <div className={styles.homeimg}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className={styles.home} src="img/home.png" alt="Home" />
        </Link>
      </div>
      <div className={styles.mypagel}>
        <img
          className={styles.mypageline}
          src="img/mypageline.png"
          alt="Mypage Line"
        />
      </div>
      <div className={styles.mypagel2}>
        <img
          className={styles.mypageline2}
          src="img/mypageline2.png"
          alt="Mypage Line 2"
        />
      </div>
      <div className={styles.first}>
        <Link to="/modifyinfo" style={{ textDecoration: "none" }}>
          <button className={styles.firstButton}>개인정보 수정</button>
        </Link>
      </div>
      <div className={styles.second}>
        <Link to="/modifylike" style={{ textDecoration: "none" }}>
          <button className={styles.secondButton}>관심 항목 수정</button>
        </Link>
      </div>
      <div className={styles.third}>
        <button onClick={showModal} className={styles.thirdButton}>
          개인 일정 추가
        </button>
        {modal && (
          <div className={styles.modal_background}>
            <div className={styles.addschedulemodal}>
              <div className={styles.addmodalinputWrap}>
                <input
                  type = "text"
                  className={styles.inputschedulename}
                  placeholder="제목"
                  value={schedulename}
                  onChange={handleSchedulename}
                />
              </div>
              <div className={styles.addmodalinputWrap2}>
                <input
                  type = "text"
                  className={styles.inputscheduleplace}
                  placeholder="장소"
                  value={scheduleplace}
                  onChange={handleScheduleplace}
                />
              </div>
              </div>
              <img
                className={styles.addschedulebar}
                src="img/addschedulebar.png"
                alt="Add Schedule Bar"
              />
              <p className={styles.addtext}> 개인 일정 추가 </p>
              <img
                onClick={hideModal}
                className={styles.modalcloseButton}
                src="img/close.png"
                alt="Close"
              />
                   <DatePicker
                    className={styles.startdatePicker}
                    selected={startDate}
                    placeholderText="시작 날짜를 선택하세요"
                    dateFormat="yyyy년 MM월 dd일 HH시 mm분"
                    onChange={handleChangeStartDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    locale={ko}
                    filterDate={filterPassedDate}
                    popperPlacement="auto"
                    calendarClassName={styles.calenderWrapper}
                    dayClassName={(d) => {
                      const isSelected = d.getDate() === (startDate && startDate.getDate());
                      return isSelected ? styles.selectedDay : styles.unselectedDay;
                    }}
                  />
                  <DatePicker
                    className={styles.startdatePicker}
                    selected={endDate}
                    placeholderText="종료 날짜를 선택하세요"
                    dateFormat="yyyy년 MM월 dd일 HH시 mm분"
                    onChange={handleChangeEndDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    locale={ko}
                    filterDate={filterPassedDate}
                    popperPlacement="auto" 
                    calendarClassName={styles.calenderWrapper}
                    dayClassName={(d) => {
                      const isSelected = d.getDate() === (endDate && endDate.getDate());
                      return isSelected ? styles.selectedDay : styles.unselectedDay;
                    }}
                  />
                 <div>
                  <button onClick={handleSaveSchedule} className={styles.schedulesave}>
                    저장하기
                  </button>
                </div>
          </div>
        )}
      </div>
      <div className={styles.mypagel3}>
        <img
          className={styles.mypageline3}
          src="img/mypageline2.png"
          alt="Mypage Line 3"
        />
      </div>
      <div>
        <Link to="/login" style={{ textDecoration: "none" }}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          로그아웃
        </button>
        </Link>
      </div>
      <div>
        <Link to="/unregister" style={{ textDecoration: "none" }}>
          <button className={styles.unregisterButton}>회원탈퇴</button>
        </Link>
      </div>
      <div className={styles.logoutline}>
        <img
          className={styles.outline}
          src="img/logoutline.png"
          alt="Logout Line"
        />
      </div>
    </div>
  );
}
