import "./index.css";
import ReactDOM from "react-dom/client";
import DateRangePicker from "./lib/components/DateRangePicker/DateRangePicker";
import dayjs from "dayjs";
import styles from "./main.module.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <DateRangePicker
      className={styles.picker}
      defaultStartDate={dayjs("2021-01-01").toDate()}
      defaultEndDate={new Date("2022-01-01")}
      onChange={(s, e) => {
        console.log(s, e);
      }}
    />
  </>
);
