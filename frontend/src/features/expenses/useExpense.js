import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../utils/constant";

export const useExpenses = () => {
  return useQuery(
    ["expenses", params],
    async () => {
      const { data } = await axios.get(`${API_URL}/expenses`, { params });
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useExpense = () => {
  return useQuery(
    ["expenses", expenseId],
    async () => {
      const { data } = await axios.get(`${API_URL}/expenses/${expenseId}`);
      return data;
    },
    {
      enabled: !!expenseId, // run only when expenseId is truthy
    }
  );
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newExpense) => {
      const { data } = await axios.post(`${API_URL}/expenses`, newExpense);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses");
      },
    }
  );
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ expenseId, updatedExpense }) => {
      const { data } = await axios.put(
        `${API_URL}/expenses/${expenseId}`,
        updatedExpense
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses");
      },
    }
  );
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (expenseId) => {
      const { data } = await axios.delete(`${API_URL}/expenses/${expenseId}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses");
      },
    }
  );
};
