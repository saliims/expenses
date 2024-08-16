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
  return useMutation({
    mutationFn: async (newExpense) => {
      const { data } = await axios.post(`${API_URL}/expenses`, newExpense);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ expenseId, updatedExpense }) => {
      const { data } = await axios.put(
        `${API_URL}/expenses/${expenseId}`,
        updatedExpense
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expenseId) => {
      const { data } = await axios.put(`${API_URL}/expenses/${expenseId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
    },
  });
};
