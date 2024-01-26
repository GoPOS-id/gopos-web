import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import axios from "axios";
import { DataResponse, isDataResponse } from "~/data-response";
import { InLoginDto } from "~/dtos/loginDtos";
import { useHttpHandler } from "~/hooks/useHttpHandler..server";
import { AuthenticationServices } from "~/services/authenticationServices";
import { getSession, setSession } from "~/session.server";

const actionServer = async (args: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await args.request.formData());
  const session = await getSession(args.request.headers.get("Cookie"));
  const { handle } = useHttpHandler();
  try {
    const data = await AuthenticationServices.SignInAsync(formData);
    session.set("__cred", data.token!);
    return redirect("/", {
      headers: {
        "Set-Cookie": await setSession(session),
      },
    });
  } catch (err) {
    return handle(err);
  }
};

export default actionServer;
