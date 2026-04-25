export interface ApiResponse<T> {
  status: number;
  data: T;
  detail: string;
}

export interface ApiError {
  status: number;
  data: null;
  detail: string;
  code: string;
}
