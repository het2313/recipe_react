import React, { useRef, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

export default function Read({ tweet, auth }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{tweet.map((tweets) => (
							<Grid item key={tweets.id} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia className={classes.cardMedia} image={tweets.url} title="Image title" />
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{tweets.title}
										</Typography>
										<Typography>{tweets.about}</Typography>
									</CardContent>
									<CardActions>
										<Link
											to={{
												pathname: `/readrecipe/${tweets.id}`,
												state: {
													id: `${tweets.id}`,
												},
											}}
											noWrap
										>
											<Button size="small" color="primary">
												View
											</Button>
										</Link>
										<Typography color="primary" style={{ marginLeft: '40%' }}>
											From: {tweets.email ? tweets.email.split('@')[0] : 'unknow'}
										</Typography>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>

			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					React to Recipes
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Sharing is Caring!!
				</Typography>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}
