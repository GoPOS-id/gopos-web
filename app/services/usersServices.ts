import { axiosInstance } from "~/axiosInstance";
import { inCreateUserDto, inUserAllDto, inUserDto, outCreateUserDto, outUserDto } from "~/dtos/userDtos";
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

  static async GetAllAsync(token?: string, page?: number, category?: string): Promise<inUserAllDto> {
    const path = ["user/all?category=" + category + "&page=" + page];

    const response = await axiosInstance.get(UrlUtils.generateUrl(path), {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    return response.data?.data as inUserAllDto;
  }

  static async CreateAsync(dto?: outCreateUserDto, token?: string): Promise<inCreateUserDto> {
    const path = ["user"];
    const response = await axiosInstance.post(UrlUtils.generateUrl(path), dto, {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response.data?.data as inCreateUserDto;
  }

  static async GetProfileByIdAsync(id?: string, token?: string): Promise<inUserDto> {
    const path = ["user/view/" + id];
    const response = await axiosInstance.get(UrlUtils.generateUrl(path), {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response.data?.data as inUserDto;
  }

  static async UpdateAsync(dto?: outUserDto, token?: string): Promise<inUserDto> {
    const path = ["user"];
    const response = await axiosInstance.patch(UrlUtils.generateUrl(path), dto, {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    return response.data?.data as inUserDto;
  }
}

export default UsersServices;
