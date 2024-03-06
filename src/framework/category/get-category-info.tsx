import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import http from "../utils/http";
import { Category } from "../types";

export const fetchCategoryInfo = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(`${API_ENDPOINTS.CATEGORY}/${_params}`);
  console.log("category data", data);
  return data;
};

export const useCategoryInfoQuery = (options: any) => {
  return useQuery<Category[], Error>(
    [API_ENDPOINTS.CATEGORY, options],
    fetchCategoryInfo
  );
};
