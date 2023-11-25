import styles from "./HeadBar.module.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function HeadBar({ year, month, todayMonth, openMenu }) {
  const day = new Date();
  const formattedDate = format(day, "d");
  return (
    <div className={styles.head}>
      <div onClick={openMenu}>
        <svg
          className={styles.sidebtn}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 6H31.5V9H4.5V6ZM4.5 16.5H22.5V19.5H4.5V16.5ZM4.5 27H31.5V30H4.5V27Z"
            fill="#EA6B6B"
          />
        </svg>
      </div>

      <div className={styles.monthYearInfo}>
        <div>
          <div className={`${styles.monthYearText} ${styles.yearText}`}>
            {year}
          </div>
          <div className={`${styles.monthYearText} ${styles.monthText}`}>
            {month}
          </div>
        </div>
      </div>
      <div onClick={todayMonth} className={styles.backToday}>
        {("0" + formattedDate).slice(-2)}
      </div>
      <Link to="/mypage" style={{ textDecoration: "none" }}>
        <svg className={styles.personIcon} xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_16_1435)">
          <g clipPath="url(#clip1_16_1435)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.9248 21.4075C22.8238 20.8799 22.3484 20.5412 21.8629 20.651C21.3774 20.7609 21.0659 21.2777 21.167 21.8053C21.2252 22.1093 21.1558 22.4208 20.9768 22.6601C20.8731 22.7988 20.6419 23.0313 20.2586 23.0313H2.72442C2.34116 23.0313 2.10994 22.7987 2.00624 22.6601C1.82718 22.4208 1.75787 22.1093 1.81609 21.8053C2.74781 16.9407 6.6951 13.3871 11.2535 13.2673C11.3325 13.2706 11.4118 13.2723 11.4915 13.2723C11.5715 13.2723 11.6512 13.2705 11.7304 13.2672C14.9414 13.351 17.9093 15.1189 19.7066 18.0326C19.9827 18.4803 20.5404 18.5998 20.9523 18.2997C21.3641 17.9995 21.4741 17.3933 21.1979 16.9457C19.7248 14.5574 17.5857 12.8208 15.1467 11.9482C16.633 10.7367 17.5964 8.80639 17.5964 6.63614C17.5964 2.97699 14.8578 0 11.4915 0C8.12527 0 5.38665 2.97699 5.38665 6.63614C5.38665 8.80772 6.35123 10.739 7.83907 11.9505C6.47588 12.4383 5.19678 13.1974 4.07724 14.1984C2.02438 16.0339 0.597049 18.5942 0.0582486 21.4075C-0.110625 22.2891 0.0916943 23.1945 0.613208 23.8916C1.13217 24.5853 1.9017 24.9831 2.72442 24.9831H20.2586C21.0814 24.9831 21.8509 24.5853 22.3698 23.8916C22.8914 23.1945 23.0937 22.2891 22.9248 21.4075ZM7.18218 6.63614C7.18218 4.05316 9.11532 1.95181 11.4915 1.95181C13.8677 1.95181 15.8008 4.05316 15.8008 6.63614C15.8008 9.13957 13.9849 11.1906 11.7096 11.3145C11.637 11.3131 11.5643 11.3123 11.4915 11.3123C11.4191 11.3123 11.3466 11.3131 11.2743 11.3146C8.99861 11.1912 7.18218 9.13991 7.18218 6.63614Z"
              fill="#EA6B6B"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_16_1435">
            <rect width="23" height="25" fill="white" />
          </clipPath>
          <clipPath id="clip1_16_1435">
            <rect width="22.9831" height="24.9831" fill="white" />
          </clipPath>
        </defs>
      </svg>
      </Link>
    </div>
  );
}

export default HeadBar;
