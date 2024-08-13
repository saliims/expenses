import React from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { enGB } from "date-fns/locale"; // Import locale

export default function DateRangeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("start_date")
    ? new Date(searchParams.get("start_date"))
    : null;
  const endDate = searchParams.get("end_date")
    ? new Date(searchParams.get("end_date"))
    : null;

  function handleStartDateChange(date) {
    if (date) {
      searchParams.set("start_date", format(date, "yyyy-MM-dd"));
    } else {
      searchParams.delete("start_date");
    }
    setSearchParams(searchParams);
  }

  function handleEndDateChange(date) {
    if (date) {
      searchParams.set("end_date", format(date, "yyyy-MM-dd"));
    } else {
      searchParams.delete("end_date");
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateFormat="dd/MM/yyyy" // European format
        placeholderText="Start Date"
        className="border rounded px-2 py-1"
        locale={enGB} // Set locale for European formatting
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        dateFormat="dd/MM/yyyy" // European format
        placeholderText="End Date"
        className="border rounded px-2 py-1"
        locale={enGB} // Set locale for European formatting
      />
    </div>
  );
}
