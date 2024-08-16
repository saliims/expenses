import {
  useQuery,
  useQueryClient,
  useMutation,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../utils/constant";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const useIncomes = (params) => {
  return useQuery({
    queryKey: ["incomes", params],
    queryFn: async () => {
      const { data } = await apiClient.get(`${API_URL}/incomes`, { params });
      return data;
    },
    keepPreviousData: true,
  });
};

export const useIncome = (incomeId) => {
  return useQuery({
    queryKey: ["incomes", incomeId],
    queryFn: async () => {
      const { data } = await apiClient.get(`${API_URL}/incomes/${incomeId}`);
      return data;
    },
    keepPreviousData: true,
  });
};

export const useCreateIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newIncome) => {
      const { data } = await axios.post(`${API_URL}/incomes`, newIncome);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });
};

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ incomeId, updatedIncome }) => {
      const { data } = await axios.put(
        `${API_URL}/incomes/${incomeId}`,
        updatedIncome
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};

export const useDeleteExpenseIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (incomeId) => {
      const { data } = await axios.delete(`${API_URL}/incomes/${incomeId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};
