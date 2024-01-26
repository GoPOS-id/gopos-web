import { axiosInstance } from "~/axiosInstance";
import { inUserDto } from "~/dtos/userDtos";
import { SessionData } from "~/session.server";
import { UrlUtils } from "~/utils/urlUtils";

class UsersServices {
  static async GetProfileAsync(token?: string): Promise<inUserDto> {
    const path = ["user"];

    const response = await axiosInstance.get(UrlUtils.generateUrl(path), {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    return response.data?.data as inUserDto;
  }
}

export default UsersServices;
