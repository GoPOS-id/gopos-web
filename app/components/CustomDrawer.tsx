import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useHref } from "@remix-run/react";

import theme from "~/theme/theme";

const drawerWidth = 260;
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
        boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.1)",
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <Toolbar />
      <Box sx={{ paddingTop: "0.5rem", overflow: "auto" }}>{children}</Box>
    </Drawer>
  );
}

export function ListItems({
  text,
  href,
  children,
  selected = false,
}: {
  text: string;
  href: string;
  children: React.ReactNode;
  selected: boolean;
}) {
  const hreff = useHref(href);
  return (
    <ListItem disablePadding>
      <ListItemButton href={hreff} selected={selected}>
        <ListItemIcon sx={{ color: selected ? theme.palette.primary.main : "" }}>{children}</ListItemIcon>
        <ListItemText sx={{ color: selected ? theme.palette.primary.main : "", fontWeight: "700" }} primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
