import React, { useCallback, useEffect, useState } from "react";
import styles from "./DateRangePicker.module.scss";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import dayjs from "dayjs";

interface DateRangePickerProps {
  className?: string;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  dateFormat?: string;
  onChange: (start: Date, end: Date) => void;
}

let isLoaded = false;

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  className,
  defaultStartDate = new Date(),
  defaultEndDate = new Date(),
  dateFormat = "yyyy-MM-dd",
  onChange,
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const isValidDates = useCallback(() => {
    return dayjs(startDate).isValid() && dayjs(endDate).isValid();
  }, [startDate, endDate]);

  useEffect(() => {
    const isInit = !isLoaded;
    if (startDate === defaultStartDate && endDate === defaultEndDate) {
      isLoaded = true;
    }

    if (!isValidDates()) return;
    if (isInit) return;

    onChange(startDate, endDate);
  }, [
    startDate,
    endDate,
    defaultStartDate,
    defaultEndDate,
    onChange,
    isValidDates,
  ]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <ReactDatePicker
        className={styles.picker}
        selected={startDate}
        dateFormat={dateFormat}
        onChange={(date) => setStartDate(date ?? new Date())}
      ></ReactDatePicker>
      ~
      <ReactDatePicker
        className={styles.picker}
        selected={endDate}
        dateFormat={dateFormat}
        onChange={(date) => setEndDate(date ?? new Date())}
      ></ReactDatePicker>
    </div>
  );
};

export default DateRangePicker;
