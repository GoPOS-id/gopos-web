import { LoaderFunctionArgs } from "@remix-run/node";
import { loaderServer } from "./loader.server";

export const loader = async (args: LoaderFunctionArgs) => {
  return loaderServer(args);
};
