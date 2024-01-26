import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { json } from "react-router";
import { DataResponse } from "~/data-response";
import { inUserDto } from "~/dtos/userDtos";
import { useHttpHandler } from "~/hooks/useHttpHandler..server";
import UsersServices from "~/services/usersServices";
import { SessionData, destroySession, getSession } from "~/session.server";

export const loaderServer = async (args: LoaderFunctionArgs) => {
  const { handle } = useHttpHandler();

  try {
    const session = await getSession(args.request.headers.get("Cookie"));
    const token = session.data.__cred;
    const data = await UsersServices.GetProfileAsync(token);
    const response: DataResponse<inUserDto> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (err) {
    return handle(err);
  }
};
