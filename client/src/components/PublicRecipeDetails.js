import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"
import Reviews from './Reviews';
import swal from 'sweetalert';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const PublicRecipeDetails = ({ recipe }) => {
  const {dispatch } = useRecipesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    const userLike = recipe.likes.find(like => like.user_id === user._id)
    if (userLike) {
      swal("You have already liked this recipe.");
      return
    }
    recipe.likes.push({user_id: user._id})
    const response = await fetch(API_URL  + '/recipes/' + recipe._id, {
      method: 'PATCH',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_recipe', payload: json})
    }
  }
  return (
    <div className="recipe-details">
      <h4>{recipe.recipeName}</h4>
      {recipe.img && <img alt="Not found" height={"350px"} src={recipe.img}></img>}
      <div className="ingredients"><strong>Ingredients: </strong>{recipe.ingredients.map((ingredient, index) => (
        <div key={index}>
        <p>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</p></div>))}</div>
        <div className="instructions"><strong>Instructions:<br/></strong>{recipe.instructions}</div>
        <div className="dateposted">{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</div>
        <div className="likes"><strong><button onClick={handleClick}>{recipe.likes.length} likes</button></strong></div>
    </div>
  )
}

export default PublicRecipeDetails