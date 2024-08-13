import { useSearchParams } from "react-router-dom";

const DateRangeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const handleChange = (e) => {
    searchParams.set(e.target.name, e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-1"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-1"
      />
    </div>
  );
};

export default DateRangeFilter;
