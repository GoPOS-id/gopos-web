import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Toolbar } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React, { ReactElement } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link, useLocation } from "@remix-run/react";

import theme from "~/theme/theme";

const drawerWidth = 280;
export function CustomDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Drawer
      variant="permanent"
      component="nav"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 100,
        border: "none",
        boxShadow: "0px 6px 9px -5px rgba(0, 0, 0, 0.1)",
        [`& .MuiDrawer-paper`]: { width: drawerWidth, border: "none" },
      }}
    >
      <Toolbar />
      <Box sx={{ paddingTop: "0.2rem", overflow: "auto" }}>{children}</Box>
    </Drawer>
  );
}

interface IconProps {
  icon: React.ElementType; // Type for Material-UI icon component
  text: string;
  href: string;
}

export const ListItems: React.FC<IconProps> = ({ text, href, icon }): ReactElement => {
  const IconComponent = icon;
  const location = useLocation();
  const pathname = location.pathname;
  const getpath = pathname.split("/");
  const parseHref = href.split("/");
  const getActive = parseHref[1];
  return (
    <ListItem disablePadding>
      <Link to={href} style={{ width: "100%", textDecoration: "none", color: "GrayText" }}>
        <ListItemButton selected={getpath[1] == getActive ? true : false}>
          <ListItemIcon sx={{ color: getpath[1] == getActive ? theme.palette.primary.main : "" }}>
            <IconComponent />
          </ListItemIcon>
          <ListItemText sx={{ color: getpath[1] == getActive ? theme.palette.primary.main : "grayText" }} primary={text} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
