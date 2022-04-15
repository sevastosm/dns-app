import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountBox from "@mui/icons-material/AccountBox";
import PeopleIcon from "@mui/icons-material/People";
import useAuth from "../../hooks/UseAuth";

export default function MainListItems() {
  const params = useSearchParams();
  const { user } = useAuth();
  const superAdmin = user?.roles.includes("SuperAdmin");
  const pathname = "dashboard";
  return (
    <div>
      {superAdmin && (
        <ListItem button>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <Link to="admin">
            <ListItemText primary="Admin" />
          </Link>
        </ListItem>
      )}
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Link to="partners">
          <ListItemText primary="Partners" />
        </Link>
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Link to="partners-status">
          <ListItemText primary="Partners Status" />
        </Link>
      </ListItem> */}
    </div>
  );
}
