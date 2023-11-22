import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

/* test 아이디
    hailcryptic@gmail.com
    test123
    */

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [failid, setFailid] = useState(false);
  const [failpw, setFailpw] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 토큰을 확인하여 로그인 상태를 설정
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
  };

  const handleLogin = () => {
    axios
      .post(`http://43.202.250.219:8080/user/login`, {
        email: email,
        password: pw,
      })
      .then((response) => {
        console.log(response.data);
        const code = response.data.code;
        // 특정 코드에 따라 모달 띄우기
        if (code === 404) {
          // 잘못된 아이디
          setFailid(true);
        } else if (code === 400) {
          // 잘못된 비밀번호
          setFailpw(true);
        } else if (code === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setFailid(false);
    setFailpw(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginlogo}>
        <img className={styles.callogo} src="img/logo.png" />
      </div>
      <div classname={styles.Box}>
        <img className={styles.loginBox} src="img/loginBox.png" />
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.contentWrap}>
          <div className={styles.inputTitle}>아이디</div>
          <div className={styles.inputWrap}>
            <input
              type="text"
              className={styles.input}
              placeholder="ID"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div style={{ marginTop: "26px" }} className={styles.inputTitle}>
            비밀번호
          </div>
          <div className={styles.inputWrap}>
            <input
              type="password"
              className={styles.input}
              placeholder="PASSWORD"
              value={pw}
              onChange={handlePassword}
            />
          </div>
        </div>
      </div>
      <div className={styles.signupbutton}>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <button className={styles.signButton}>회원가입</button>
        </Link>
      </div>
      <div className={styles.loginbutton}>
        <button onClick={handleLogin} className={styles.bottomButton}>
          로그인
        </button>
        {failid && (
          <div className={styles.modal_background_login}>
            <div className={styles.modal_login}>
              <div className={styles.modal_content}>
                <img
                  className={styles.modalfooter}
                  onClick={closeModal}
                  src="img/modal_footer.png"
                />
                <img className={styles.failicon} src="img/failicon.png" />
                <p className={styles.failtext}> 존재하지 않는 ID 입니다. </p>
                <button className={styles.closemodal} onClick={closeModal}>
                  확 인
                </button>
              </div>
            </div>
          </div>
        )}
        {failpw && (
          <div className={styles.modal_background_login}>
            <div className={styles.modal_login}>
              <div className={styles.modal_content}>
                <img
                  className={styles.modalfooter}
                  onClick={closeModal}
                  src="img/modal_footer.png"
                />
                <img className={styles.failicon} src="img/failicon.png" />
                <p className={styles.failtext}> 잘못된 PW입니다. </p>
                <button className={styles.closemodal} onClick={closeModal}>
                  확 인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
