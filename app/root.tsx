import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useNavigation, useRouteError } from "@remix-run/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Box, CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import { Children, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import theme from "./theme/theme";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { FeedbackProvider } from "./components/Feedback";
import { LoadingProvider, useLoading } from "./components/Loading";

const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://font.googleapis.com" },
  { rel: "icon", href: "./assets/favicon.png" },
];

interface IDocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: IDocumentProps, emotionCache) => {
  useEnhancedEffect(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
  }, []);
  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
        <Meta />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
});

const RootLayout = () => {
  return (
    <Document>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <LoadingProvider>
            <FeedbackProvider>
              <App />
            </FeedbackProvider>
          </LoadingProvider>
        </LocalizationProvider>
      </ThemeProvider>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
};

const App = () => {
  const navigation = useNavigation();
  const loading = useLoading();
  useEffect(() => {
    if (navigation.state === "loading") {
      loading.showLoading();
    } else if (navigation.state === "submitting") {
      loading.showSubmitting();
    } else if (navigation.state === "idle") {
      loading.hideLoading();
      loading.hideSubmitting();
    }
  }, [navigation.state]);

  return <Outlet />;
};

export { links, RootLayout as default };

interface IRouteError {
  data: string;
  internal: boolean;
  status: number;
  statusText: string;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <CssBaseline />
          <Box width="100%" height="100vh" display="flex" alignItems="center" sx={{ backgroundColor: theme.palette.primary.main }} justifyContent="center">
            <Stack>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Typography fontSize={60} color="white">
                  {error.status}
                </Typography>
              </Box>
              <Typography fontSize={30} color="white" fontWeight="light">
                {error.statusText}
              </Typography>
            </Stack>
          </Box>
          <Scripts />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <CssBaseline />
          <Box width="100%" height="100vh" display="flex" sx={{ backgroundColor: theme.palette.primary.main }} alignItems="center" justifyContent="center">
            <Stack>
              <Stack>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <Typography fontSize={60} color="white">
                    {error.message}
                  </Typography>
                </Box>
                <Typography fontSize={30} color="white" fontWeight="light">
                  {error.stack}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Scripts />
        </body>
      </html>
    );
  } else {
    return (
      <html>
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <CssBaseline />
          <Box width="100%" height="100vh" display="flex" sx={{ backgroundColor: theme.palette.primary.main }} alignItems="center" justifyContent="center">
            <Typography fontSize={30} color="white" fontWeight="light">
              Unknown Error
            </Typography>
          </Box>
          <Scripts />
        </body>
      </html>
    );
  }
}
