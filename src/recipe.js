import React from 'react';
import './css/bootstrap.css';

const Recipes = (props)=>{

    return(
        <div className="d-flex justify-content-center flex-column align-items-center">
            <h1 className="text-center text-uppercase">{props.title} </h1>
            <p className="lead"><mark>{props.calories}</mark></p>
            <img className="img-rounded w-200 h-200" src={props.img} alt=""/>
            <ol className="list">
                {props.ingredients.map(ing =>(
                    <li>{ing.text}</li> 
                ))}
            </ol>
            
        </div>
    );
}

export default Recipes;