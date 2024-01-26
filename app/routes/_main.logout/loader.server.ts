import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useHttpHandler } from "~/hooks/useHttpHandler..server";
import { AuthenticationServices } from "~/services/authenticationServices";
import { getSession } from "~/session.server";

export const loaderServer = async (args: LoaderFunctionArgs) => {
  const { handle } = useHttpHandler();

  try {
    const session = await getSession(args.request.headers.get("Cookie"));
    const token = session.data.__cred;
    await AuthenticationServices.SignOutAsync(token);
    return redirect("/auth");
  } catch (err) {
    return handle(err);
  }
};
