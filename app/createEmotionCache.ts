import createCache from "@emotion/cache";

export function createEmotionCache(): any {
  return createCache({ key: "css" });
}
