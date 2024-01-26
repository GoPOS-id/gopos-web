import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  __cred: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: "__cred",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    secrets: ["w1;57%urF3Lt2Y})FA-9T!5.,n{o-G^TjPQ$F.;IDk$w@G~6QW"],
  },
});

export type { SessionData, SessionFlashData };
export { getSession, commitSession as setSession, destroySession };
