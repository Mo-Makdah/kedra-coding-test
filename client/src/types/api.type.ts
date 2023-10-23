export type ApiResponse<T> =
  | {
      data: T;
      status: 200 | 201;
      errorMessage: undefined;
    }
  | {
      data: undefined;
      errorMessage: string;
      status: number;
    };
