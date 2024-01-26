import { Box, LinearProgress } from "@mui/material";
import { createContext, useContext, useState } from "react";

export interface ILoadingCtx {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingCtx = createContext<ILoadingCtx | undefined>(undefined);

export const useLoading = () => {
  return useContext(LoadingCtx)!;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <LoadingCtx.Provider
      value={{
        isLoading: isLoading,
        showLoading: () => {
          setLoading(true);
        },
        hideLoading: () => {
          setLoading(false);
        },
      }}
    >
      {isLoading && <LinearProgress sx={{ zIndex: "400", position: "absolute", top: "0", left: "0", width: "100%" }} />}
      {children}
    </LoadingCtx.Provider>
  );
};
