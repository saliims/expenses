import { useForm } from "react-hook-form";
import { useCreateIncome } from "./useIncome";

const currencyOptions = [
  { value: "DZD", label: "DZD" },
  { value: "EUR", label: "EUR" },
];

const typeOptions = [
  { value: "Food", label: "Food" },
  { value: "Fun", label: "Fun" },
  { value: "Salary", label: "Salary" },
  { value: "Clothes", label: "Clothes" },
  { value: "Tech", label: "Tech" },
];

export default function AddIncomeForm({ onClose, isOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: addIncome } = useCreateIncome();

  const onSubmit = (data) => {
    addIncome(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">
      <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Add Income
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <input
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", { required: "Amount is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Currency
            </label>
            <select
              id="currency"
              {...register("currency", { required: "Currency is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
            >
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.currency && (
              <p className="text-red-500 text-xs">{errors.currency.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs">{errors.type.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-300 dark:bg-gray-400 dark:text-white text-gray-950 rounded-md hover:bg-gray-500 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-800"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
