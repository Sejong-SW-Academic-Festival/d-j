import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Mypage.module.css";
import axiosInstance from "../../axiosInstance";

export default function Mypage() {
  const history = useNavigate();
  const [userData, setUserData] = useState({});
  const [modal, setModal] = useState(false);
  const [schedulename, setSchedulname] = useState("");
  const [scheduleplace, setSchedulplace] = useState("");

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleSchedulname = (e) => {
    setSchedulname(e.target.value);
  };

  const handleSchedulplace = (e) => {
    setSchedulplace(e.target.value);
  };

  useEffect(() => {
    // 사용자 정보를 가져오는 API 호출
    const token = localStorage.getItem("Authorization");

    if (token) {
      axiosInstance
        .get("/user/mypage", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // API에서 받아온 사용자 정보를 상태 변수에 저장
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className={styles.page}>
      <div className={styles.profileimg}>
        <img className={styles.profile} src="img/profile.png" alt="Profile" />
      </div>
      <p className={styles.username}>{userData.username}</p>
      <p className={styles.userdep}>{userData.department}</p>
      <p className={styles.userid}>{userData.email}</p>

      <div className={styles.homeimg}>
        <Link to="/mainpage" style={{ textDecoration: "none" }}>
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
                  className={styles.schedulename}
                  placeholder="제목"
                  value={schedulename}
                  onChange={handleSchedulname}
                />
              </div>
              <div className={styles.addmodalinputWrap2}>
                <input
                  className={styles.scheduleplace}
                  placeholder="장소"
                  value={scheduleplace}
                  onChange={handleSchedulplace}
                />
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
        <button onClick={handleLogout} className={styles.logoutButton}>
          로그아웃
        </button>
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
