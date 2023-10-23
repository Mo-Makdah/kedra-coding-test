import { sendAxiosRequest } from "@/api/clients/axios";
import { envVars } from "@/envVars";
import { ApiResponse } from "@/types/api.type";
import { AxiosHttpError } from "@/types/error.type";
import { Unit, UnitFormType } from "@/types/unit";

type CreateUnitInput = UnitFormType;
type CreateUnitResponse = Unit;

export const createUnit = async (
  input: CreateUnitInput
): Promise<ApiResponse<CreateUnitResponse>> => {
  const baseURL = envVars.BASE_API_URL;
  const url = `${baseURL}/units}`;
  try {
    const response = await sendAxiosRequest<
      CreateUnitResponse,
      CreateUnitInput
    >({
      method: "post",
      url,
      data: input,
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
      console.log("message", axiosError.response.data);
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
