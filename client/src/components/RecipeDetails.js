import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(API_URL  + '/recipes/' + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_recipe', payload: json})
    }
  }

  return (
    <div className="recipe-details">
      <h4>{recipe.recipeName}</h4>
      <p><strong>Ingredients: </strong>{recipe.ingredients.map((ingredient, index) => (
        <div key={index}>
          <p>
            {ingredient.amount} {ingredient.unit} {ingredient.ingredient}</p></div>))}</p>
      <p><strong>Instructions: </strong><br/>{recipe.instructions}</p>
      <div className="dateposted">{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</div>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default RecipeDetails