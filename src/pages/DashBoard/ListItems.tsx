import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBox from "@material-ui/icons/AccountBox";
import PeopleIcon from "@material-ui/icons/People";
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
    </div>
  );
}
