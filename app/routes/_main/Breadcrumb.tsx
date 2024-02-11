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
        <Link to="/" style={{ color: defaultTheme.palette.primary.main, textDecoration: "none" }}>
          <HouseOutlined fontSize="small" />
        </Link>
      </Typography>
      {pathname != "/" ? (
        getPath.map((value, i) => (
          <Typography key={i} fontSize="15px" sx={{ textTransform: "capitalize", textDecoration: "none", color: defaultTheme.palette.text.secondary }}>
            {i != getPath.length - 1 ? (
              <Link to={`/${getPath[0]}`} style={{ textDecoration: "none", color: defaultTheme.palette.primary.main }}>
                {value}
              </Link>
            ) : (
              value
            )}
          </Typography>
        ))
      ) : (
        <Typography fontSize="15px" sx={{ textTransform: "capitalize", color: defaultTheme.palette.text.secondary }}>
          Dashboard
        </Typography>
      )}
    </Breadcrumbs>
  );
}
