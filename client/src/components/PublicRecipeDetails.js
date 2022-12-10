import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Reviews from './Reviews';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const PublicRecipeDetails = ({ recipe }) => {
  
  return (
    <div className="recipe-details">
      <h4>{recipe.recipeName}</h4>
      <div className="ingredients"><strong>Ingredients: </strong>{recipe.ingredients.map((ingredient, index) => (
        <div key={index}>
        <p>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</p></div>))}</div>
        <div className="instructions"><strong>Instructions:<br/></strong>{recipe.instructions}</div>
        <div className="dateposted">{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</div>
    </div>
  )
}

export default PublicRecipeDetails