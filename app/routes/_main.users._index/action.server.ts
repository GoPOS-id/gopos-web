import { ActionFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { inCreateUserDto, outCreateUserDto } from "~/dtos/userDtos";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import UsersServices from "~/services/usersServices";
import { getSession } from "~/session.server";
import { FormDataUtils } from "~/utils/formconvertUtils";

export const actionServer = async (args: ActionFunctionArgs) => {
  const formData: outCreateUserDto = Object.fromEntries(await args.request.formData());
  const { handle } = useHttpHandler();
  try {
    const session = await getSession(args.request.headers.get("Cookie"));
    const token = session.data.__cred;
    const data = await UsersServices.CreateAsync(
      {
        username: formData.username,
        fullname: formData.fullname,
        password: formData.password,
        email: formData.email,
        role_id: FormDataUtils.convertToNumber(formData.role_id),
      },
      token
    );
    const response: DataResponse<inCreateUserDto> = { statusCode: 200, method: "POST", data: data };
    return json(response);
  } catch (err) {
    return handle(err);
  }
};
