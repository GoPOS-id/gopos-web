import { Box, Card, Stack, SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/system/createTheme/createTheme";
import React, { ReactElement } from "react";

interface ICardWidgetProps {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}

export const CardWidget: React.FC<ICardWidgetProps> = ({ children, sx }) => {
  const cardStyles: React.CSSProperties = {
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0px 6px 9px -5px rgba(0, 0, 0, 0.1)",
    ...sx,
  };

  return (
    <Card elevation={0} sx={cardStyles}>
      {children}
    </Card>
  );
};

interface IInformationWidget {
  backgroundColor: string;
  iconBackgroundColor: string;
  icon: React.ElementType;
  title: string;
  value: string;
}

export const InformationWidget: React.FC<IInformationWidget> = ({ backgroundColor, iconBackgroundColor, icon, title, value }): ReactElement => {
  const IconComponent = icon;
  return (
    <Card elevation={0} sx={{ padding: "10px", backgroundColor: backgroundColor, borderRadius: "8px" }}>
      <Stack direction="row" spacing={2}>
        <Box
          padding="7px"
          sx={{ color: "text.primary", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", backgroundColor: iconBackgroundColor }}
        >
          <IconComponent fontSize="large" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack>
            <Typography fontSize={15} fontFamily="poppins" color="text.primary" fontWeight="medium">
              {title}
            </Typography>
            <Typography fontSize={12} fontFamily="poppins" color="text.secondary">
              {value}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};
