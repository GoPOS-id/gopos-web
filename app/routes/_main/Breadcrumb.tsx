import { HouseOutlined } from "@mui/icons-material";
import { Typography, Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "@remix-run/react";
import defaultTheme from "~/theme/theme";

export default function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;
  const getPath = pathname.split("/");
  getPath.shift();

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Typography fontSize="15px">
        <Link to="/" style={{ color: defaultTheme.palette.text.secondary, textDecoration: "none" }}>
          <HouseOutlined fontSize="small" />
        </Link>
      </Typography>
      {pathname != "/" ? (
        getPath.map((value, i) => (
          <Typography key={i} fontSize="15px" color={defaultTheme.palette.text.primary} sx={{ textTransform: "capitalize" }}>
            {i != getPath.length - 1 ? (
              <Link to={value} color={defaultTheme.palette.text.secondary} style={{ textDecoration: "none" }}>
                {value}
              </Link>
            ) : (
              value
            )}
          </Typography>
        ))
      ) : (
        <Typography fontSize="15px" color="text.primary" sx={{ textTransform: "capitalize" }}>
          Dashboard
        </Typography>
      )}
    </Breadcrumbs>
  );
}
