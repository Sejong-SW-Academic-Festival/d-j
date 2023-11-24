import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";
import axiosInstance from "../../axiosInstance";

function Signup() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [dep, setDep] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectDepText, setSelectDepText] = useState("소속 학과 선택");
  const [useemail, setUseemail] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    setUseemail(false);
  };

  const handleDep = (e) => {
    setDep(e.target.value);
  };

  const showUseemail = () => {
    setUseemail(true);
  };

  const searchres = () => {
    const encodedDepartmentName = encodeURIComponent(dep);

    axiosInstance
      .get(`/category/find-department/${encodedDepartmentName}`, {
        headers: {
          Accept: "application/json",
        },
        params: {
          departmentName: encodedDepartmentName,
        },
      })
      .then((response) => {
        const responseData = response.data;
        console.log(response.data);
        if (responseData && responseData.isSuccess) {
          const result = responseData.result;

          if (result && result.length > 0) {
            // 요청 성공 및 데이터가 존재할 경우
            const department = result[0];

            console.log("학과 ID:", department.id);
            console.log("학과 이름:", department.name);
            console.log("카테고리 유형:", department.categoryType);

            setSearchResults(result);
          } else {
            console.log("해당 학과의 데이터가 없습니다.");
            setSearchResults([]);
          }
        } else {
          console.error(
            "데이터를 가져오는 중 오류 발생:",
            responseData.message
          );
        }
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error.message);
      });
  };

  const handleSignup = () => {
    const userData = {
      email,
      password: pw,
      name,
      department: selectDepText,
    };
    axiosInstance
      .post("/user/signup", userData)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);

        if (responseData.isSuccess) {
          console.log("회원가입 성공");
          navigate('/login');
        } else {
          console.log("회원가입 실패:", responseData.message);
          showUseemail();
        }
      })
      .catch((error) => {
        console.error("회원가입 중 오류 발생:", error.message);
      });
  };

  return (
    <div className={styles.signuppage}>
      <div className={styles.Signlogo}>
        <img
          className={styles.signlogo}
          src="img/Signlogo.png"
          alt="Sign Logo"
        />
      </div>

      <div className={styles.signBox}>
        <img className={styles.signBox} src="img/Signbox.png" alt="Sign Box" />
      </div>

      <div className={styles.content}>
        <div className={styles.Title}>사용할 아이디 (이메일 형태로 입력)</div>
        <div className={styles.Wrap}>
          <input
            type="email"
            className={styles.inputidpw}
            placeholder="ID"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div style={{ marginTop: "26px" }} className={styles.Title}>
          사용할 비밀번호
        </div>
        <div className={styles.Wrap}>
          <input
            type="password"
            className={styles.inputidpw}
            placeholder="PASSWORD"
            value={pw}
            onChange={handlePassword}
          />
        </div>

        <div style={{ marginTop: "26px" }} className={styles.Title}>
          이름
        </div>
        <div className={styles.Wrap}>
          <input
            type="username"
            className={styles.inputidpw}
            placeholder="USERNAME"
            value={name}
            onChange={handleName}
          />
        </div>
      </div>

      <div>
        <button onClick={handleSignup} className={styles.signupButton}>
          회원가입
        </button>
      </div>

      <div>
        <button onClick={showModal} className={styles.selectdep}>
          {selectDepText}
        </button>
        {modal && (
          <div className={styles.modal_background}>
            <div className={styles.modal}>
              <div className={styles.modalinputWrap}>
                <input
                  type="dep"
                  className={styles.inputdep}
                  placeholder="소속학과명"
                  value={dep}
                  onChange={handleDep}
                />
              </div>
              <img
                className={styles.modalbar}
                src="img/modalbar.png"
                alt="Modal Bar"
              />
              <p className={styles.bartext}> 소속 학과를 검색해보세요. </p>
              <img
                onClick={searchres}
                className={styles.search}
                src="img/search.png"
                alt="Search"
              />
              <img
                onClick={hideModal}
                className={styles.closeButton}
                src="img/close.png"
                alt="Close Button"
              />
              <img
                className={styles.searchresultbox}
                src="img/searchresultbox.png"
                alt="Search Result Box"
              />
                {searchResults.map((result) => (
                  <button
                    onClick={() => {
                      hideModal();
                      setSelectDepText(result.name);
                    }}
                    className={styles.depname}
                    key={result.id}
                  >
                    {result.name}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {useemail && (
        <div className={styles.modal_background}>
          <div className={styles.modal_useemail}>
            <div className={styles.modal_content}>
              <img
                className={styles.modalfooter}
                onClick={hideModal}
                src="img/modal_footer.png"
                alt="Modal Footer"
              />
              <img
                className={styles.failicon}
                src="img/failicon.png"
                alt="Fail Icon"
              />
              <p className={styles.failtext}> 이미 존재하는 ID 입니다. </p>
              <button className={styles.closemodal} onClick={hideModal}>
                확 인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
