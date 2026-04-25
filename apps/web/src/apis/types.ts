export type ApiResponseT<T> = {
  status: number;
  data: T;
  detail: string;
};

export type ApiErrorT = {
  status: number;
  data: null;
  detail: string;
  code: string;
};
