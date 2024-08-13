import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../utils/constant";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const useExpenses = (params) => {
  return useQuery({
    queryKey: ["expenses", params],
    queryFn: async () => {
      console.log("Fetching with params:", params);
      const { data } = await apiClient.get(`/expenses`, { params });
      return data;
    },
    keepPreviousData: true,
  });
};

export const useExpense = (expenseId) => {
  return useQuery({
    queryKey: ["expenses", expenseId],
    queryFn: async () => {
      const { data } = await apiClient.get(`${API_URL}/expenses/${expenseId}`);
      return data;
    },
    keepPreviousData: true,
  });
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
