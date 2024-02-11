import { inUserDto } from "~/dtos/userDtos";
import { DataResponse } from "~/data-response";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import UsersServices from "~/services/usersServices";
import { getSession } from "~/session.server";
import { json } from "react-router";

export default async function loaderServer(args: LoaderFunctionArgs) {
  const { handle } = useHttpHandler();
  const id = args.params.id;
  try {
    const session = await getSession(args.request.headers.get("Cookie"));
    const token = session.data.__cred;
    const data = await UsersServices.GetProfileByIdAsync(id, token);
    const response: DataResponse<inUserDto> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (err) {
    return handle(err);
  }
}
