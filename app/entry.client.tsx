/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { CacheProvider, ThemeProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useMemo, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import createCache from "@emotion/cache";
import clientStyleContext from "./clientStyleContext";
import defaultTheme from "./theme/theme";
import { createEmotionCache } from "./createEmotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    []
  );

  return (
    <clientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </clientStyleContext.Provider>
  );
}

startTransition(() => {
  hydrateRoot(
    document,
    <ClientCacheProvider>
      <ThemeProvider theme={defaultTheme}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </ThemeProvider>
    </ClientCacheProvider>
  );
});
