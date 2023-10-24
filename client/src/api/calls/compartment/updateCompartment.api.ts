import { sendAxiosRequest } from "@/api/clients/axios";
import { envVars } from "@/envVars";
import { ApiResponse } from "@/types/api.type";
import { AxiosHttpError } from "@/types/error.type";
import { Compartment, UpdateCompartmentInputType } from "@/types/compartment";

type UpdateCompartmentInput = UpdateCompartmentInputType;
type UpdateCompartmentResponse = Compartment;

export const updateCompartment = async (
  id: number,
  input: UpdateCompartmentInput
): Promise<ApiResponse<UpdateCompartmentResponse>> => {
  const baseURL = envVars.BASE_API_URL;
  const url = `${baseURL}/compartments/${id}`;
  try {
    const response = await sendAxiosRequest<
      UpdateCompartmentResponse,
      UpdateCompartmentInput
    >({
      method: "put",
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
