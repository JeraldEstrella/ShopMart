export interface APIResponse<Data> {
  success: boolean;
  data: Data;
}

export interface APIError {
  message: string;
}

export interface Pagination {
  page: number;
  limit: number;
  category?: string;
}
