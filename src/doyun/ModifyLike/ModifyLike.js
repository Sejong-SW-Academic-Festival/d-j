import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./ModifyLike.module.css";
import axiosInstance from "../../axiosInstance";

export default function ModifyLike() {
    const history = useNavigate();
    const [userSubscribedCategory, setUserSubscribedCategory] = useState([]);
    let [categoryDownBars, setCategoryDownBars] = useState([]);
    const [reload, setReload] = useState(1);
    const [userData, setUserData] = useState({});
    let subscribedCategory = [];

    const up_vector = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            width="30px"
        >
            <path
                fillRule="evenodd"
                d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                clipRule="evenodd"
            />
        </svg>
    );

    const down_vector = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            width="30px"
        >
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
            />
        </svg>
    );

    const unchecked_box = (
        <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="2"
                fill="white"
                stroke="#D9D9D9"
            />
        </svg>
    );

    const checked_box = (
        <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 0C1.34315 0 0 1.34314 0 3V16.2C0 17.8569 1.34314 19.2 3 19.2H16.2C17.8569 19.2 19.2 17.8569 19.2 16.2V3C19.2 1.34315 17.8569 0 16.2 0H3ZM15.163 7.18432C15.5851 6.76291 15.5857 6.07909 15.1643 5.65697C14.7429 5.23486 14.059 5.23429 13.6369 5.65571L8.0294 11.2539L5.56301 8.79164C5.1409 8.37023 4.45708 8.3708 4.03566 8.79291C3.61425 9.21503 3.61481 9.89885 4.03693 10.3203L7.26635 13.5443C7.68798 13.9652 8.37082 13.9652 8.79244 13.5443L15.163 7.18432Z"
                fill="#EA6B6B"
            />
        </svg>
    );

    const isActive = (categoryHead) => {
        const find = categoryDownBars.find((e) => e.name === categoryHead['name']);
        return find.isActive;
    };

    const onClickDownBarHandlar = (categoryHead) => {
        const prev = categoryDownBars;
        const findHead = prev.find((category) => category['name'] === categoryHead['name']);
        const result = prev.map((c) => {
            return c === findHead
                ? c.isActive
                    ? { ...c, isActive: false }
                    : { ...c, isActive: true }
                : { ...c, isActive: false };
        });

        setCategoryDownBars(result);
    };

    const unregister = (category) => {
        if (category.subscribed) {
            axiosInstance.put('/user/unsubscribe-category/' + category.name)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                });
            console.log("subscribe!");
        }

        else {
            axiosInstance.put('/user/subscribe-category/' + category.name)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                });
            console.log("subscribe!");
        }
    }

    useEffect(() => {
        axiosInstance
            .get("/user/get-all-category-list")
            .then((response) => {
                // API에서 받아온 사용자 정보를 상태 변수에 저장
                setUserSubscribedCategory(response.data.result);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    }, []);

    useEffect(() => {

    }, [reload]);

    useEffect(() => {
        if (userSubscribedCategory.length === 0)
            return;

        let subscribedCategoryDiv = [];

        userSubscribedCategory.map((category) => {
            subscribedCategoryDiv.push(category);
        });

        subscribedCategory = [...subscribedCategoryDiv];

        if (subscribedCategory.length === 0)
            return;

        const initDownBar = subscribedCategory.map((e) => ({
            ...e,
            isActive: false,
        }));

        if (initDownBar.length !== 0) {
            categoryDownBars = initDownBar;
            console.log("ASDF")
        }

        console.log(initDownBar);

    }, [userSubscribedCategory]);

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
        <div className={styles.modifylikepage}>
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
            <div className={styles.wrapper}>
                {
                    userSubscribedCategory.map((mainCategory) =>
                    (
                        <div className={styles.mainCategory} key={mainCategory['id']}>
                            {
                                <div
                                    className={`${styles.mainCategoryHead}`}
                                    onClick={() => onClickDownBarHandlar(mainCategory)}
                                >
                                    <div className={styles.flextext}> {mainCategory["name"]} </div>
                                    {
                                        categoryDownBars.length !== 0 &&
                                            isActive(mainCategory) ? up_vector: down_vector
                                    }
                                </div>
                            }

                            {
                                mainCategory['children'].map((subCategory) => (
                                    <div className={`${styles.subCategory}  ${categoryDownBars.length !== 0 && isActive(mainCategory) ? styles.opened : styles.closed}`} key={subCategory['id']}>
                                        {
                                            subCategory.subscribed ? <div className={`${categoryDownBars.length !== 0 && isActive(mainCategory) ? 'opened' : 'closed'}`}> { checked_box } </div> : <div className={`${categoryDownBars.length !== 0 && isActive(mainCategory) ? 'opened' : 'closed'}`}> { unchecked_box } </div>
                                        }
                                        <div className={styles.flexText} onClick={() => { unregister(subCategory); subCategory.subscribed = !subCategory.subscribed; setReload(reload + 1); }}>
                                            {
                                                subCategory['name']
                                            }
                                        </div>
                                        {
                                            subCategory['children'] ?
                                                subCategory['children'].map((department) => (
                                                    <div className={`${styles.department}`} key={department['id']}>
                                                        {
                                                            department.subscribed ? <div className={`${categoryDownBars.length !== 0 && isActive(mainCategory) ? 'opened' : 'closed'}`}> { checked_box } </div> : <div className={`${categoryDownBars.length !== 0 && isActive(mainCategory) ? 'opened' : 'closed'}`}> { unchecked_box } </div>
                                                        }
                                                        <div className={styles.flexText} onClick={() => { unregister(department); department.subscribed = !department.subscribed; setReload(reload + 1); }}>
                                                            {
                                                                department['name']
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                <></>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }</div>
        </div>
    );
}