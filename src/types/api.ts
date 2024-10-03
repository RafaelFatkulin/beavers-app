export type SuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: boolean;
  message: string | Record<string, string>;
  data: null;
};
