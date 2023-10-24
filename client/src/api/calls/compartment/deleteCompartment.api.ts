import { ApiResponse } from "@/types/api.type";
import { envVars } from "@/envVars";
import { AxiosHttpError } from "@/types/error.type";
import { sendAxiosRequest } from "@/api/clients/axios";
import { Unit } from "@/types/unit";

type DeleteCompartmentResponse = Unit;

export const deleteCompartment = async (
  id: number
): Promise<ApiResponse<DeleteCompartmentResponse>> => {
  const baseURL = envVars.BASE_API_URL;
  const url = `${baseURL}/compartments/${id}`;
  try {
    const response = await sendAxiosRequest<DeleteCompartmentResponse>({
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
