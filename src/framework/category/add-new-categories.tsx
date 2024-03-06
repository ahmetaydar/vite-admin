import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/endpoints";
import http from "../utils/http";
import { Category } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";

export const addNewCategories = async (input: Category) => {
  const {
    data: { data },
  } = await http.post(API_ENDPOINTS.CATEGORY, input);
  return data;
};

export const useNewCategoriesMutation = (input: Category) => {
  const navigate = useNavigate();
  return useMutation(() => addNewCategories(input), {
    onSuccess(data) {
      console.log(data, "data");

      navigate("/category");
      toast.success(
        <CustomToast type="success" message="Kategori Başarıyla Kaydedildi." />,
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
    },
    onError(error) {
      console.log(error, "error");
      toast.error(
        <CustomToast
          type="error"
          message="Kategori Kaydedilirken Hata Meydana Geldi."
        />,
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
    },
  });
};
