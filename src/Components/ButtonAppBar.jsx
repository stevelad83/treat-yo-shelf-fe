import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { HelpOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "#FAF9F4" }}>
            <Typography variant="h6" className={classes.title}>
              Treat Yo' Shelf
            </Typography>
          </Link>
          {/* <div style={{ "align-content": "absolute", "margin-right": "-10px" }}> */}
          <div
            id="account-button"
            className="account-button"
            style={{
              margin: "-110px",
              marginLeft: "auto",
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              color="inherit"
              component={Link}
              to="/account"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div
            id="help-button"
            className="help-button"
            style={{ marginLeft: "auto" }}
          >
            <IconButton
              aria-label="help"
              aria-controls="menu-appbar"
              color="inherit"
              component={Link}
              to="/help"
            >
              <HelpOutline></HelpOutline>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
