import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
import {
  InputBase,
  Avatar
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles,fade } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));



export default function Header({getSearch,search,updateSearch, auth, title}) {
  const classes = useStyles();
  
  const { uid, photoURL,displayName } = auth.currentUser;
  

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Hello,{displayName} </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          React to Recipes 
        </Typography>
        <form onSubmit={getSearch}>
          <div  className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            
            <InputBase
              placeholder="Search Recipes..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={search} onChange={updateSearch}
              
            />
          </div>
        </form>
        
        <Avatar alt="Remy Sharp" src={photoURL} style={{marginRight:30,marginLeft:30}} />
        <Button onClick={() => auth.signOut()} variant="outlined" size="small">
          Sign Out
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
          <Link
            to="/"
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            Home
          </Link>
          <Link
            to = "/about"
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            About
          </Link>
          <Link
            to = "/share"
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            Share Recipes
          </Link>
          <Link
            to = "/read"
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            Read Recipes
          </Link>
          <Link
            to = "/myrecipes"
            color="inherit"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            My Recipes
          </Link>
      </Toolbar>
    </React.Fragment>
    
    
    
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
