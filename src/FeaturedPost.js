import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost({tweet}) {
  const classes = useStyles();

  return (
    <div>
      {tweet.map((tweets)=>{
        <Grid item key={tweets.id} xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {tweets.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {tweets.about}
                </Typography>
                <Link to="/readrecipe">
                  <Typography variant="subtitle1" color="primary">
                    
                    Continue reading...
                  </Typography>
                </Link>
                
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia} image={tweets.image} title={tweets.title} />
            </Hidden>
          </Card>
      </Grid>
      })}
  </div>   
  );
};