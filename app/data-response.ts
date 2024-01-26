export type DataResponse<T> = {
  method: string;
  statusCode: number;
  data: T;
};

export function isDataResponse(obj: DataResponse<any>): obj is DataResponse<any> {
  return "statusCode" in obj && "data" in obj;
}
