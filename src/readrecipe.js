import React,{ useRef, useState ,useEffect} from 'react';
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
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { useParams } from "react-router";
import { withRouter } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";


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


function Readrecipes({firestore,auth}) {
  const classes = useStyles();
  let { Id } = useParams();
  const [tweet, setTweet] = useState([]);

  const getTweets = () => {
    firestore
      .collection("recipes")
      .onSnapshot((snapshot) => {
        setTweet(snapshot.docs.map(doc =>({id: doc.id,title: doc.data().title, about: doc.data().about,url: doc.data().url,time:doc.data().createdAt,ing:doc.data().ingredients,how:doc.data().how,note:doc.data().notes})));
      });
  };
  useEffect(()=>{
    getTweets();
  },[])

  return (
    <div>
      {tweet.map((tweets)=>{
        if(tweets.id == Id){
          return(
            <div>
              <h1>
                {tweets.title}
              </h1>
              <img src={tweets.url} alt=""/>
              <h1>
                About
              </h1>
              <p>
                {tweets.about}
              </p>
              <h1>
                Ingredients
              </h1>
              <p>
                {tweets.ing}
              </p>
              <h1>
                Method
              </h1>
              <p>
                {tweets.how}
              </p>
              <h1>
                Notes
              </h1>
              <p>
                {tweets.note}
              </p>
            </div>
          )
        }
        
      })}
    </div>
  );
}
export default withRouter(Readrecipes);