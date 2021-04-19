import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase, Avatar, Popover } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0,
	},
}));

export default function Header({ getSearch, search, updateSearch, auth, title }) {
	const classes = useStyles();

	const { uid, photoURL, displayName, email } = auth.currentUser;
	const matches = useMediaQuery('(max-width:600px)');

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<React.Fragment>
			{matches ? (
				<div>
					<Toolbar className={classes.toolbar}>
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
					</Toolbar>
					<Toolbar className={classes.toolbar}>
						<div style={{ display: 'flex' }}>
							<form onSubmit={getSearch}>
								<div style={{ display: 'flex', marginTop: '10px' }}>
									<div>
										<SearchIcon />
									</div>

									<InputBase
										placeholder="Search Recipes..."
										inputProps={{ 'aria-label': 'search' }}
										value={search}
										onChange={updateSearch}
									/>
								</div>
							</form>
							<div style={{ marginLeft: '70px' }}>
								<Button aria-describedby={id} onClick={handleClick}>
									{photoURL ? (
										<Avatar alt="Remy Sharp" src={photoURL} />
									) : (
										<Avatar alt="Remy Sharp" src={photoURL}>
											{email.split('@')[0][0]}
										</Avatar>
									)}
									<ArrowDownwardIcon color="black" />
								</Button>
							</div>

							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<div style={{ padding: '15px' }}>
									<Typography component="h2" variant="h5" color="inherit" align="center">
										Hello,{displayName ? displayName : email.split('@')[0]}
									</Typography>

									<Button
										onClick={() => auth.signOut()}
										variant="outlined"
										size="medium"
										align="center"
										style={{ marginTop: '10px' }}
									>
										Sign Out
									</Button>
								</div>
							</Popover>
						</div>
					</Toolbar>
				</div>
			) : (
				<Toolbar className={classes.toolbar}>
					<Button size="small">Hello,{displayName ? displayName : email.split('@')[0]} </Button>
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
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>

							<InputBase
								placeholder="Search Recipes..."
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
								value={search}
								onChange={updateSearch}
							/>
						</div>
					</form>
					{photoURL ? (
						<Avatar alt="Remy Sharp" src={photoURL} style={{ marginRight: 30, marginLeft: 30 }} />
					) : (
						<Avatar alt="Remy Sharp" src={photoURL} style={{ marginRight: 30, marginLeft: 30 }}>
							{email.split('@')[0][0]}
						</Avatar>
					)}

					<Button onClick={() => auth.signOut()} variant="outlined" size="small">
						Sign Out
					</Button>
				</Toolbar>
			)}
			<Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
				<Link to="/" color="inherit" noWrap variant="body2" className={classes.toolbarLink}>
					Home
				</Link>
				<Link to="/share" color="inherit" noWrap variant="body2" className={classes.toolbarLink}>
					Share Recipes
				</Link>
				<Link to="/read" color="inherit" noWrap variant="body2" className={classes.toolbarLink}>
					Read Recipes
				</Link>
				<Link to="/myrecipes" color="inherit" noWrap variant="body2" className={classes.toolbarLink}>
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
