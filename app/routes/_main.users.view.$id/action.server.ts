import { ActionFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { inUserDto, outUserDto } from "~/dtos/userDtos";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import UsersServices from "~/services/usersServices";
import { getSession } from "~/session.server";
import { FormDataUtils } from "~/utils/formconvertUtils";

export default async function actionServer(args: ActionFunctionArgs) {
  const formData: outUserDto = Object.fromEntries(await args.request.formData());
  const { handle } = useHttpHandler();
  try {
    const session = await getSession(args.request.headers.get("Cookie"));
    const token = session.data.__cred;
    const data = await UsersServices.UpdateAsync(
      {
        id: FormDataUtils.convertToNumber(formData.id),
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        role_id: FormDataUtils.convertToNumber(formData.role_id),
        password: formData.password,
      },
      token
    );
    const response: DataResponse<inUserDto> = { method: "PATCH", statusCode: 200, data: data };
    return json(response);
  } catch (err) {
    return handle(err);
  }
}
