import { redirect } from "@remix-run/node";
import { axiosInstance } from "~/axiosInstance";
import { InLoginDto, LoginDto } from "~/dtos/loginDtos";
import { responseDtos } from "~/dtos/responseDtos";
import { SessionData } from "~/session.server";
import { UrlUtils } from "~/utils/urlUtils";

class AuthenticationServices {
  static async SignInAsync(dto: LoginDto): Promise<InLoginDto> {
    const path = ["auth"];

    const response = await axiosInstance.post(UrlUtils.generateUrl(path), dto);

    return response.data?.data as InLoginDto;
  }

  static async SignOutAsync(token?: string): Promise<responseDtos> {
    const path = ["auth"];

    const response = await axiosInstance.delete(UrlUtils.generateUrl(path), {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    return response.data?.data as responseDtos;
  }
}

export { AuthenticationServices };
