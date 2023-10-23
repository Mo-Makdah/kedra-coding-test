import { Unit } from "@/types/unit";
import { ApiResponse } from "@/types/api.type";
import { envVars } from "@/envVars";
import { AxiosHttpError } from "@/types/error.type";
import { sendAxiosRequest } from "@/api/clients/axios";

type DeleteUnitResponse = Unit;

export const deleteUnit = async (
  id: number
): Promise<ApiResponse<DeleteUnitResponse>> => {
  const baseURL = envVars.BASE_API_URL;
  const url = `${baseURL}/units/${id}`;
  try {
    const response = await sendAxiosRequest<DeleteUnitResponse>({
      method: "delete",
      url,
    });
    return {
      data: response.data,
      status: 200,
      errorMessage: undefined,
    };
  } catch (err) {
    const axiosError = err as AxiosHttpError;

    if (axiosError.response?.data) {
      const { message } = axiosError.response.data;
      return {
        errorMessage:
          typeof message === "string" ? message : message.join(", "),
        status: axiosError.response.status,
        data: undefined,
      };
    }
    return {
      errorMessage: axiosError.message ?? "Something went wrong",
      status: axiosError.status ?? 500,
      data: undefined,
    };
  }
};
