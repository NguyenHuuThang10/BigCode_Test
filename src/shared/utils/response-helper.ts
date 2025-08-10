// src/shared/utils/response-helper.ts
import { ApiResponse } from '../../model/dto/api-response.dto';

export function Success(
  result: any,
  total: number = 1,
  message = 'Success',
): ApiResponse {
  return {
    status: 200,
    message,
    error: null,
    isBusinessError: false,
    errorDetail: null,
    resultApi: result,
    total
  };
}
export function BaseError(
  result: any,
  total: number = 1,
  message = 'Error',
  error?: string,
): ApiResponse {
  return {
    status: 500,
    message,
    error: error || "Internal Server Error",
    isBusinessError: true,
    errorDetail: '',
    resultApi: result,
    total
  };
}
export function Exception(
  result: any,
  total: number = 1,
  message = 'Error',
): ApiResponse {
  return {
    status: 500,
    message,
    error: "Exception Error",
    isBusinessError: false,
    errorDetail: '002',
    resultApi: result,
    total
  };
}