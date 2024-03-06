import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import http from "../utils/http";
import { Category } from "../types";

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORY);

  return data;
};

export const useCategoriesQuery = (options: any) => {
  return useQuery<Category[], Error>(
    [API_ENDPOINTS.CATEGORY, options],
    fetchBrands
  );
};
