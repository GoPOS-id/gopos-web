import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type color = "primary" | "success" | "warning" | "error";

const colors = {
  primary: {
    color: "#078FFF",
    background: "#078FFF38",
  },
  success: {
    color: "#00B200",
    background: "#00B20036",
  },
  warning: {
    color: "#FF8C00",
    background: "#FF8C0031",
  },
  error: {
    color: "#FF0000",
    background: "#FF000028",
  },
};

export default function Badge({
  color,
  px = "1rem",
  py = "0.5rem",
  borderRadius = 100,
  children,
}: {
  color: color;
  px?: string;
  py?: string;
  borderRadius?: number;
  children: React.ReactNode;
}) {
  const [isColor, setColor] = useState<string>("");
  const [isBackground, setBackground] = useState<string>("");
  useEffect(() => {
    if (color == "primary") {
      setColor(colors.primary.color);
      setBackground(colors.primary.background);
    }
    if (color == "warning") {
      setColor(colors.warning.color);
      setBackground(colors.warning.background);
    }
    if (color == "success") {
      setColor(colors.success.color);
      setBackground(colors.success.background);
    }
    if (color == "error") {
      setColor(colors.error.color);
      setBackground(colors.error.background);
    }
  }, [color]);
  return <Box sx={{ fontSize: "small", py: py, px: px, backgroundColor: isBackground, borderRadius: borderRadius, color: isColor, textAlign: "center" }}>{children}</Box>;
}
