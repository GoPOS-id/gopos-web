import { Backdrop, Box, CircularProgress, LinearProgress } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface IContext {
  showLoading: () => void;
  hideLoading: () => void;
  showSubmitting: () => void;
  hideSubmitting: () => void;
}

const LoadingCtx = createContext<IContext | undefined>(undefined);

export const useLoading = () => {
  return useContext(LoadingCtx)!;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [isShowLoading, setShowLoading] = useState<boolean>(false);
  const [isShowSubmiting, setShowSubmitting] = useState<boolean>(false);

  return (
    <LoadingCtx.Provider
      value={{
        showLoading: () => {
          setShowLoading(true);
        },
        hideLoading: () => {
          setShowLoading(false);
        },
        showSubmitting: () => {
          setShowSubmitting(true);
        },
        hideSubmitting: () => {
          setShowSubmitting(false);
        },
      }}
    >
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isShowSubmiting}>
        <CircularProgress color="secondary" />
      </Backdrop>

      {isShowLoading && (
        <LinearProgress
          color="secondary"
          sx={{ zIndex: "400", position: "absolute", top: "0", left: "0", width: "100%", maxHeight: "3px" }}
        />
      )}
      {children}
    </LoadingCtx.Provider>
  );
};
