import { LoaderFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { inUserAllDto } from "~/dtos/userDtos";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import UsersServices from "~/services/usersServices";
import { getSession } from "~/session.server";
import { FormDataUtils } from "~/utils/formconvertUtils";

export default async function loaderServer(args: LoaderFunctionArgs) {
  const { handle } = useHttpHandler();
  const url = new URL(args.request.url);
  const pageParams = url.searchParams.get("page");
  const categoryParams = url.searchParams.get("category");
  var pages: number = 1;
  if (pageParams != "") {
    pages = FormDataUtils.convertToNumber(pageParams);
  }
  try {
    const session = await getSession(args.request.headers.get("Cookie"));
    const token = session.data.__cred;
    const data = await UsersServices.GetAllAsync(token, pages, categoryParams!);
    const response: DataResponse<inUserAllDto> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (err) {
    return handle(err);
  }
}
