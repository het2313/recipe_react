import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
		marginTop: theme.spacing(10),
	},
}));

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

export default function Share({ firestore, auth }) {
	const [title, setTitle] = useState('');
	const [abt, setAbt] = useState('');
	const [igt, setIgt] = useState('');
	const [how, setHow] = useState('');
	const [note, setNote] = useState('');
	const [url, setUrl] = useState('');
	const { uid, photoURL, email } = auth.currentUser;

	const tweetHandler = async (e) => {
		e.preventDefault();
		await firestore.collection('recipes').add({
			title: title,
			about: abt,
			ingredients: igt,
			how: how,
			notes: note,
			url: url,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			email: email,
		});
		setTitle('');
		setAbt('');
		setIgt('');
		setHow('');
		setNote('');
		setUrl('');
	};

	const classes = useStyles();
	return (
		<React.Fragment>
			<div className={classes.root}>
				<div>
					<h1 style={{ textAlign: 'center', color: 'Black' }}>Share your Love!!</h1>
					<TextField
						id="standard-full-width"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						label="Name of recipe"
						style={{ margin: 8, textAlign: 'center' }}
						placeholder="Badam Ki Phirni Recipe"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-full-width"
						onChange={(e) => {
							setAbt(e.target.value);
						}}
						label="About"
						style={{ margin: 8, textAlign: 'center' }}
						placeholder="A delectable, creamy dessert. Almonds, rice and milk blend together to make this delicious Indian dessert. The fragrant essence of gulabjal and a dash of cardamom powder adds the magic touch!"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-full-width"
						onChange={(e) => {
							setIgt(e.target.value);
						}}
						label="Ingredients"
						style={{ margin: 8 }}
						placeholder="1 Cup Almonds, peeled, 500 Ml Milk ,100 Gram Sugar ,2 Tbsp Rice ,1/2 tsp Cardamom powder ,1 Tbsp Gulabjal"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-full-width"
						label="Method"
						onChange={(e) => {
							setHow(e.target.value);
						}}
						style={{ margin: 8 }}
						placeholder="1.Chop the almonds finely and keep aside. Soak the rice for 15 mins. Now grind to a paste using little water. 2.Keep milk for boiling, add sugar and cardamom powder. 3.Once it boils, lower the heat and add almonds. Cook for 2 mins and then slowly add the rice paste. 4.Keep stirring on a slow flame till the entire milk thickens and coats thickly on the back of a spoon. 5.Remove from flame, add gulabjal and pour in small containers. 6.Refrigerate and serve cold."
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-full-width"
						onChange={(e) => {
							setNote(e.target.value);
						}}
						label="Importatnt notes"
						style={{ margin: 8 }}
						placeholder="To make a good Indian vegetable stock sauté some onion and garlic and whole garam masala and add carrots, coriander, ginger and mint and boil for 2 hours or pressure cook for 15 minutes with ample water, strain and keep for soups and gravies in your fridge."
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="standard-full-width"
						onChange={(e) => {
							setUrl(e.target.value);
						}}
						label="URL of image"
						style={{ margin: 8, textAlign: 'center' }}
						placeholder="https://c.ndtvimg.com/2018-11/09nl6rmg_soup_625x300_27_November_18.jpg"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<div style={{ textAlign: 'center', marginTop: '30px' }}>
						<Button
							onClick={tweetHandler}
							disabled={title === '' || url === '' ? true : false}
							variant="outlined"
						>
							Post
						</Button>
					</div>
				</div>
			</div>
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					React to Recipes
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Sharing is Caring!!
				</Typography>
				<Copyright />
			</footer>
		</React.Fragment>
	);
}
