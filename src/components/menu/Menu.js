import React, { useEffect, useRef, useState } from "react";
import "./Menu.css";

function Menu({
  setShowMenu,
  menuCategories,
  menuUserInfo,
  onClickedSubCategory,
  defaultCategories,
}) {
  const wrapperRef = useRef();

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultCategories]); //[]안의 값이 바뀔때 실행 (빈 배열이면 처음 한번만)

  const up_vector = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5"
      width="30px"
    >
      <path
        fill-rule="evenodd"
        d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
        clip-rule="evenodd"
      />
    </svg>
  );
  const down_vector = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5"
      width="30px"
    >
      <path
        fill-rule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clip-rule="evenodd"
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 0C1.34315 0 0 1.34314 0 3V16.2C0 17.8569 1.34314 19.2 3 19.2H16.2C17.8569 19.2 19.2 17.8569 19.2 16.2V3C19.2 1.34315 17.8569 0 16.2 0H3ZM15.163 7.18432C15.5851 6.76291 15.5857 6.07909 15.1643 5.65697C14.7429 5.23486 14.059 5.23429 13.6369 5.65571L8.0294 11.2539L5.56301 8.79164C5.1409 8.37023 4.45708 8.3708 4.03566 8.79291C3.61425 9.21503 3.61481 9.89885 4.03693 10.3203L7.26635 13.5443C7.68798 13.9652 8.37082 13.9652 8.79244 13.5443L15.163 7.18432Z"
        fill="#EA6B6B"
      />
    </svg>
  );

  const initDownBar = menuCategories.map((e) => ({
    ...e,
    isActive: false,
  }));
  const [categoryDownBars, setCategoryDownBars] = useState(initDownBar);
  const onClickDownBarHandlar = (categoryHead) => {
    const prev = categoryDownBars;
    const findHead = prev.find((category) => category.name === categoryHead);
    const result = prev.map((c) => {
      return c === findHead
        ? c.isActive
          ? { ...c, isActive: false }
          : { ...c, isActive: true }
        : { ...c, isActive: false };
    });
    setCategoryDownBars(result);
  };

  const checkIsActive = (categoryHead) => {
    const find = categoryDownBars.find((e) => e.name === categoryHead);
    return find.isActive;
  };

  let maincategory_div_list = [];

  menuCategories.forEach((main_category) => {
    maincategory_div_list.push(
      <div className={`mainCategory`} key={main_category["name"]}>
        {
          <div
            className={`mainCategoryHead`}
            onClick={() => onClickDownBarHandlar(main_category["name"])}
          >
            <div className="flexText"> {main_category["name"]} </div>
            {checkIsActive(main_category["name"]) ? up_vector : down_vector}
          </div>
        }
        {checkIsActive(main_category["name"]) ? (
          <div className={`subCategoryContainer `}>
            {main_category["children"] != null ? (
              main_category["children"].map((sub_category, index) => (
                <div className="subCategory" key={sub_category["name"]}>
                  {
                    <div
                      className={`subCategoryHead`}
                      onClick={() => onClickedSubCategory(sub_category)}
                    >
                      {sub_category["subscribed"] ? checked_box : unchecked_box}
                      <div className="flexText"> {sub_category["name"]} </div>
                    </div>
                  }
                  {sub_category["children"] != null ? (
                    <div className={"departmentContainer"}>
                      {sub_category["children"].map((department, index_2) => (
                        <div
                          className={`department`}
                          onClick={() => onClickedSubCategory(department)}
                        >
                          {department["subscribed"]
                            ? checked_box
                            : unchecked_box}
                          <div className="flexText"> {department["name"]} </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  });

  const userInfo = (
    <div className="user-info">
      <svg
        className="user-img"
        width="40"
        height="40"
        viewBox="0 0 58 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="29" cy="30" rx="29" ry="30" fill="#EA6B6B" />
        <path
          d="M29 30C33.9403 30 37.9417 25.9725 37.9417 21C37.9417 16.0275 33.9403 12 29 12C24.0597 12 20.0583 16.0275 20.0583 21C20.0583 25.9725 24.0597 30 29 30ZM29 34.5C23.0314 34.5 11.1167 37.515 11.1167 43.5C11.1167 45.9853 13.1314 48 15.6167 48H42.3833C44.8686 48 46.8833 45.9853 46.8833 43.5C46.8833 37.515 34.9686 34.5 29 34.5Z"
          fill="white"
        />
      </svg>
      <div>
        <div className="user-name">{menuUserInfo.name}</div>
        <div className="user-dept">{menuUserInfo.department}</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="menuBackground">
        <div className="menuBoard" ref={wrapperRef}>
          {userInfo}
          { maincategory_div_list }
        </div>
      </div>
    </div>
  );
}

export default Menu;
