export interface SuccessResponse {
  statusCode: string;
  message: string | string[];
  data: unknown | any;
}

export type ErrorResponse = {
  statusCode: string;
  message: string | string[];
  error: unknown | any;
};
