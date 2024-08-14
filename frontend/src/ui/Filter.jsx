import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-gray-200 bg-zinc-100 dark:bg-zinc-700 dark:border-gray-600 shadow-sm rounded-sm p-1 flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`${
            option.value === currentFilter
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-200"
          } rounded-sm font-medium text-sm px-3 py-1 transition-colors hover:bg-blue-600 hover:text-white`}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
