import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MainFeaturedPost from './MainFeaturedPost';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import FeaturedPost from './FeaturedPost';
import Grid from '@material-ui/core/Grid';
import Header from './nav';
import Read from './read';
import Share from './share';
import Myrecipes from './Myrecipes';
import Main from './main';
import Album from './Album';
import './style.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';
import Readrecipes from './readrecipe';
import R from './r';
import { matchPath } from 'react-router';
import firebaseui from 'firebaseui';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyAcAq49IhFjCxF_QLb8h4oJhGQaR9YFfrk',
	authDomain: 'react-to-recipes.firebaseapp.com',
	projectId: 'react-to-recipes',
	storageBucket: 'react-to-recipes.appspot.com',
	messagingSenderId: '400843072703',
	appId: '1:400843072703:web:b3a206edf87f0baf71120a',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

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
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function App() {
	const [user] = useAuthState(auth);

	return <div>{user ? <Home /> : <SignIn />}</div>;
}

function Home() {
	const classes = useStyles();
	const mainFeaturedPost = {
		title: 'Title of a longer featured blog post',
		description:
			"Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
		image:
			'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		imgText: 'main image description',
		linkText: 'Continue reading…',
	};

	const [tweet, setTweet] = useState([]);

	const getTweets = () => {
		firestore.collection('recipes').onSnapshot((snapshot) => {
			setTweet(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					title: doc.data().title,
					about: doc.data().about,
					url: doc.data().url,
					time: doc.data().createdAt,
					email: doc.data().email,
				}))
			);
		});
	};
	useEffect(() => {
		getTweets();
		console.log('Current data: ', tweet);
	}, []);

	const featuredPosts = [
		{
			title: 'Featured post',
			date: 'Nov 12',
			description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
			image: 'https://source.unsplash.com/random',
			imageText: 'Image Text',
		},
		{
			title: 'Post title',
			date: 'Nov 11',
			description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
			image: 'https://source.unsplash.com/random',
			imageText: 'Image Text',
		},
	];

	const APP_ID = 'fa424ea5';
	const APP_KEY = '2338b17a40aa4a29937618c84f70d3f0';

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('banana');

	const getRecipes = async () => {
		const responses = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await responses.json();
		setRecipes(data.hits);
		console.log(data.hits);
	};
	const updateSearch = (e) => {
		setSearch(e.target.value);
		console.log(search);
	};

	useEffect(() => {
		getRecipes();
	}, [query]);

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	return (
		<Router>
			<Switch>
				<Route path="/share">
					<React.Fragment>
						<CssBaseline />
						<Container maxWidth="lg">
							<Header
								getSearch={getSearch}
								updateSearch={updateSearch}
								search={search}
								auth={auth}
								title="Blog"
							/>
							<Share auth={auth} firestore={firestore} />
						</Container>
					</React.Fragment>
				</Route>
				<Route path="/myrecipes">
					<React.Fragment>
						<CssBaseline />
						<Container maxWidth="lg">
							<Header
								getSearch={getSearch}
								updateSearch={updateSearch}
								search={search}
								auth={auth}
								title="Blog"
							/>
							<Myrecipes auth={auth} firestore={firestore} id={tweet.id} />
						</Container>
					</React.Fragment>
				</Route>
				<Route path="/readrecipe/:Id" component={Readrecipes} exact>
					<React.Fragment>
						<CssBaseline />
						<Container maxWidth="lg">
							<Header
								getSearch={getSearch}
								updateSearch={updateSearch}
								search={search}
								auth={auth}
								title="Blog"
							/>
							<Readrecipes auth={auth} firestore={firestore} />
						</Container>
					</React.Fragment>
				</Route>
				<Route path="/read">
					<React.Fragment>
						<CssBaseline />
						<Container maxWidth="lg">
							<Header
								getSearch={getSearch}
								updateSearch={updateSearch}
								search={search}
								auth={auth}
								title="Blog"
							/>
							<Read tweet={tweet} auth={auth} />
						</Container>
					</React.Fragment>
				</Route>

				<Route path="/">
					<React.Fragment>
						<CssBaseline />
						<Container maxWidth="lg">
							<Header
								getSearch={getSearch}
								updateSearch={updateSearch}
								search={search}
								auth={auth}
								title="Blog"
							/>
							<main>
								<MainFeaturedPost post={mainFeaturedPost} />
								<Grid container spacing={4}>
									<FeaturedPost tweet={tweet} />
								</Grid>
							</main>

							<R recipes={recipes} />

							<footer className={classes.footer}>
								<Typography variant="h6" align="center" gutterBottom>
									React to Recipes
								</Typography>
								<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
									Sharing is Caring!!
								</Typography>
								<Copyright />
							</footer>
						</Container>
					</React.Fragment>
				</Route>
			</Switch>
		</Router>
	);
}
function SignIn() {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [state, setState] = useState(false);

	const classes = useStyles();

	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	const signUpwithemail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, pass)
			.then((userCredential) => {
				// Signed in

				var user = userCredential.user;
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
				// ..
			});
	};
	const signInwithemail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, pass)
			.then((userCredential) => {
				// Signed in

				var user = userCredential.user;
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			});
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					{state ? (
						<Typography component="h1" variant="h5">
							Sign Up
						</Typography>
					) : (
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
					)}

					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required="true"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required="true"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={pass}
							onChange={(e) => setPass(e.target.value)}
						/>
						{state ? (
							<Button
								type="submit"
								fullWidth
								onClick={signUpwithemail}
								variant="contained"
								color="primary"
								disabled={pass === '' || email === '' ? true : false}
								className={classes.submit}
							>
								Sign Up
							</Button>
						) : (
							<Button
								type="submit"
								fullWidth
								onClick={signInwithemail}
								variant="contained"
								color="primary"
								disabled={pass === '' || email === '' ? true : false}
								className={classes.submit}
							>
								Sign In
							</Button>
						)}
						{state ? (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								className={classes.submit}
								onClick={signInWithGoogle}
							>
								Sign Up with Google
							</Button>
						) : (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								className={classes.submit}
								onClick={signInWithGoogle}
							>
								Sign in with Google
							</Button>
						)}

						<Grid container>
							<Grid item xs>
								<h3 style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setState(!state)}>
									{state ? 'Do you Have an account? SignIn' : "Don't have an account? SignUp "}
								</h3>
							</Grid>
						</Grid>
						<div>
							<Button
								variant="contained"
								color="secondary"
								fullWidth
								className={classes.submit}
								onClick={(e) => {
									e.preventDefault();
									firebase
										.auth()
										.signInWithEmailAndPassword('test@test.com', 'test1234')
										.then((userCredential) => {
											// Signed in

											var user = userCredential.user;
											// ...
										})
										.catch((error) => {
											var errorCode = error.code;
											var errorMessage = error.message;
											alert(errorMessage);
										});
								}}
							>
								Only for testing?
							</Button>
						</div>
					</form>
				</div>
			</Container>
		</>
	);
}

export default App;
