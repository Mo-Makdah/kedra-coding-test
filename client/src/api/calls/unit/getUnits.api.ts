import { Unit } from "@/types/unit";
import { ApiResponse } from "@/types/api.type";
import { envVars } from "@/envVars";
import { AxiosHttpError } from "@/types/error.type";
import { sendAxiosRequest } from "@/api/clients/axios";

type GetUnitsResponse = Unit[];

export const getUnits = async (): Promise<ApiResponse<GetUnitsResponse>> => {
  const baseURL = envVars.BASE_API_URL;
  const url = `${baseURL}/units`;
  try {
    const response = await sendAxiosRequest<GetUnitsResponse>({
      method: "get",
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