export class UrlUtils {
  static generateUrl(paths: (string | number)[] | null, options?: { searchParams?: string[] }): string {
    const url = [];

    if (paths) {
      url.push(paths.join(""));
    }

    if (options?.searchParams && options.searchParams.length !== 0) {
      url.push(paths ? "/?" : "?");
      url.push(options.searchParams.join("&"));
    }

    return url.join("");
  }

  static getSearchParams(urlString: string): URLSearchParams {
    const url = new URL(urlString);
    return url.searchParams;
  }

  static createSlug(title: string) {
    const slug = title
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return slug;
  }
}
