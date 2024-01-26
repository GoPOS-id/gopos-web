import { TypedResponse, redirect, json } from "@remix-run/node";
import axios from "axios";
import { DataResponse } from "~/data-response";

export function useHttpHandler() {
  function handle(error: any): TypedResponse<never> | TypedResponse<DataResponse<any>> | null {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return redirect("/auth");
        }

        const isIn400 = error.response.status >= 400 && error.response.status <= 499 && error.response.status !== 404;
        const method = error.response.config.method!.toUpperCase();

        const body = error.response.data;
        if (!body.errors) {
          return makeResponse(isIn400, method, error.response.status, body.message ?? error.response.statusText);
        }

        var errorMessage = Object.values(body.errors)[0] as string;
        return makeResponse(isIn400, method, error.response.status, errorMessage ?? error.response.statusText);
      }

      if (error.request) {
        throw new Response("Server under maintenance", { status: 503 });
      }
    }

    throw new Response("Server error", { status: 500 });
  }

  return { handle };
}

export function makeResponse(isSuccess: boolean, method: string, statusCode: number, data: any) {
  if (isSuccess) {
    return json({ method: method, statusCode: statusCode, data: data });
  }

  throw new Response(data, { status: statusCode });
}
