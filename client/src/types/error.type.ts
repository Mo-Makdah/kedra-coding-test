import { AxiosError } from "axios";

export interface HttpError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export type AxiosHttpError = AxiosError<HttpError>;
