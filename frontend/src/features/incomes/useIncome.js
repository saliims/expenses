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
