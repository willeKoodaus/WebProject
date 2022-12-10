import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Reviews from './Reviews';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const PublicRecipeDetails = ({ recipe }) => {
  const {dispatch } = useRecipesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    console.log("Inside likes handleClick and likes legth is: " + recipe.likes.length)
    if (recipe.likes.includes(user._id)) {
      return
    }
    recipe.likes.push(user._id)
    console.log("Inside likes handleClick and likes legth is: " + recipe.likes.length)
    const response = await fetch(API_URL  + '/recipes/' + recipe._id, {
      method: 'UPDATE',
      body: JSON.stringify(recipe),
      headers: {
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
      <p><strong>Ingredients: </strong>{recipe.ingredients.map((ingredient, index) => (
        <div key={index}>
        <p>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</p></div>))}</p>
        <div className="instructions"><strong>Instructions: </strong>{recipe.instructions}</div>
        <div className="dateposted">{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</div>
        <div className="likes"><strong><button onClick={handleClick}>likes:{recipe.likes.length}</button></strong></div>
    </div>
  )
}

export default PublicRecipeDetails