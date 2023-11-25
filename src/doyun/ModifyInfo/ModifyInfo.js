import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ModifyInfo.module.css";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

function ModifyInfo() {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState({});
  const [modal, setModal] = useState(false);
  const [dep, setDep] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectDepText, setSelectDepText] = useState("소속 학과 재선택");

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleDep = (e) => {
    setDep(e.target.value);
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

  const handleModify = () => {
    const userData = {
      name,
      department: selectDepText,
    };
    axiosInstance
      .patch("/user/update", userData)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);

        if (responseData.isSuccess) {
          console.log("개인 정보 수정 성공");
          navigate('/');
        } else {
          console.log("개인 정보 수정 실패:", responseData.message);
        }
      })
      .catch((error) => {
        alert("개인 정보 수정 실패");
        console.error("개인 정보 수정 중 오류 발생:", error.message);
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

  return (
    <div className={styles.signuppage}>
      <div className={styles.profileimg}>
        <img className={styles.profile} src="img/profile.png" />
      </div>
      <p className={styles.username}>{userData.name}</p>
      <p className={styles.userdep}>{userData.department}</p>
      <p className={styles.userid}>{userData.email}</p>
      <div className={styles.backbutton}>
        <Link to="/mypage" style={{ textDecoration: "none" }}>
          <img className={styles.backicon} src="img/backIcon.png" />
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
            value={name}
            onChange={handleName}
          />
        </div>
      </div>
      <div>
        <button onClick={handleModify} className={styles.modifyButton}>
          수정하기
        </button>
      </div>

      <div>
        <button onClick={showModal} className={styles.modifydep}>
          {selectDepText}
        </button>
        {modal && (
          <div className={styles.modal_background}>
            <div className={styles.modal}>
              <div className={styles.modalinputWrap}>
                <input
                  className={styles.inputdep}
                  placeholder="소속학과명"
                  value={dep}
                  onChange={handleDep}
                />
              </div>
              <img className={styles.modalbar} src="img/modalbar.png" />
              <p className={styles.bartext}> 소속 학과를 검색해보세요. </p>
              <img
                onClick={searchres}
                className={styles.search}
                src="img/search.png"
              />
              <img
                onClick={hideModal}
                className={styles.closeButton}
                src="img/close.png"
              />
              <div className={styles.searchResultContainer}>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ModifyInfo;
