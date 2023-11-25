import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Unregister.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

function Unregister() {
    const [pw, setPw] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPw(newPassword);
    };

    const handleUnregister = () => {
        // 비밀번호 검사를 여기서 수행
        axiosInstance
          .post("/user/withdraw", {password: pw})
          .then((response) => {
            const isPasswordCorrect = response.data.code;

            if (isPasswordCorrect == 200) {
                navigate('/login');
                console.log("회원탈퇴 ~ 성공!");
            } else {
                console.log("비밀번호 땡!");
            }
          })
          .catch((error) => {
            console.error("비밀번호 확인 중 오류 발생:", error);
          });
      };

    return (
        <div className={styles.signuppage}>
            <p className={styles.unregisterText}>회원탈퇴</p>
            <div className={styles.backbutton}>
                <Link to="/mypage" style={{ textDecoration: "none" }}>
                    <img className={styles.backicon} src="img/backicon.png" />
                </Link>
            </div>
            <div className={styles.unregisterbox}>
                <img className={styles.Unregisterbox} src="img/Unregisterbox.png" />
                <p className={styles.unregisterText2}>회원탈퇴 유의사항</p>
                <p className={styles.unregisterText3}>회원탈퇴 전에 꼭 확인하세요.</p>
                <p className={styles.unregisterText4}>
                    - 회원탈퇴 시 저장되어 있던 개인 일정들은 모두 삭제 <br />됩니다. 
                </p>
                <p className={styles.unregisterText5}>
                - 회원탈퇴 후 재가입하더라도 탈퇴 전의 회원 정보 및 <br /> 개인 일정들은 복구가 불가능합니다. 
                </p>
            </div>
            <div className={styles.contentWrap}>
                <div className={styles.inputTitle}>
                    탈퇴를 위해 비밀번호를 입력해주세요.
                </div>
                <div style={{ marginTop: "5px" }} className={styles.inputWrap}>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="PASSWORD"
                        value={pw}
                        onChange={handlePassword}
                    />
                </div>
            </div>
            <button
                className={styles.unregisterButton}
                onClick={handleUnregister}
                disabled={!isPasswordValid} // 비밀번호 유효하지 않으면 버튼 비활성화
            >
                탈퇴하기
            </button>
        </div>
        );
} 

export default Unregister;