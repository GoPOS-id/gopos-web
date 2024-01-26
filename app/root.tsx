import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "@remix-run/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ThemeProvider } from "@mui/material";
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
        />
        <Links />
      </head>
      <body style={{ padding: 0, margin: 0 }}>{children}</body>
    </html>
  );
});

const RootLayout = () => {
  return (
    <Document>
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
    } else if (navigation.state === "idle") {
      loading.hideLoading();
    }
  }, [navigation.state]);

  return <Outlet />;
};

export { links, RootLayout as default };
