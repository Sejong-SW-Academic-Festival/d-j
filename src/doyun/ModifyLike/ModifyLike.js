import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ModifyLike.module.css";
import axiosInstance from "../../axiosInstance";
import Dropdown from 'react-dropdown'

export default function ModifyLike() {
    const history = useNavigate();
    const [userData, setUserData] = useState({});

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
    }, [axiosInstance]);
    const options = [
        'one', 'two', 'three'
      ];
      const defaultOption = options[0];
    return (
        <div className={styles.signuppage}>
            <div className={styles.profileimg}>
                <img className={styles.profile} src="img/profile.png" />
            </div>
            <div className={styles.backbutton}>
                <Link to="/mypage" style={{ textDecoration: "none" }}>
                    <img className={styles.backicon} src="img/backicon.png" />
                </Link>
            </div>
            <div className={styles.ModifyBox}>
                <img className={styles.ModifyBox} src="img/ModifyBox.png" />
            </div>
            <div className={styles.Modifycontent}>
                <div className={styles.Title}>이름</div>
                <div className={styles.Wrap}>
                    <input
                        className={styles.inputidpw}
                        placeholder="USERNAME"
                        value={userData.name}
                    />
                </div>
            </div>
        </div>
    );
}l