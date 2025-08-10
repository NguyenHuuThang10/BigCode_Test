// src/shared/dto/api-response.dto.ts
export interface ApiResponse {
  status: number;
  message: string;
  error: string | null;
  isBusinessError: boolean;
  errorDetail: string | null;
  resultApi: any;
  total: number;
}
