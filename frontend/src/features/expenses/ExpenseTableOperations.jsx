import React from "react";
import Filter from "../../ui/Filter";
import DateRangeFilter from "../../ui/DateRange";
import SortBy from "../../ui/SortBy";

export default function ExpenseTableOperations() {
  return (
    <div className="flex sm:flex-row flex-col gap-4 sm:items-center items-start mb-4">
      <Filter
        filterField="type"
        options={[
          { value: "", label: "All Types" },
          { value: "Food", label: "Food" },
          { value: "Fun", label: "Fun" },
          { value: "Salary", label: "Salary" },
          { value: "Clothes", label: "Clothes" },
          { value: "Tech", label: "Tech" },
        ]}
        type="button"
      />
      <Filter
        filterField="currency"
        options={[
          { value: "", label: "All Currencies" },
          { value: "DZD", label: "DZD" },
          { value: "EUR", label: "EUR" },
        ]}
        type="select"
      />
      <Filter
        filterField="amount"
        options={[
          { value: "asc", label: "ASC" },
          { value: "desc", label: "DESC" },
        ]}
      />
      <DateRangeFilter />
    </div>
  );
}
