export class AvatarUtils {
  static stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  static stringAvatar(name: string) {
    const data = name.toUpperCase();
    const value = data.split(" ");
    const init = value.length > 1 ? value[0][0] + value[1][0] : value[0][0];
    return {
      sx: {
        bgcolor: AvatarUtils.stringToColor(init),
      },
      children: `${init}`,
    };
  }
}
