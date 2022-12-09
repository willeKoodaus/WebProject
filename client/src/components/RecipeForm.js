import { useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const API_URL=process.env.REACT_APP_API_URL;

const RecipeForm = () => {
  const { dispatch } = useRecipesContext()
  const { user } = useAuthContext()

  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState('')
  const [instructions, setInstructions] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [publicity, setPublicity] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const recipe = {recipeName, ingredients, instructions, publicity}

    const response = await fetch(API_URL + '/recipes/', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setRecipeName('')
      setIngredients([])
      setInstructions('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_recipe', payload: json})
    }
  }

  const handleAddIngredient = (event) => {
    event.preventDefault();
      // Ingredient is valid, add it to the list of ingredients
      setIngredients((prev) => [...prev, { ingredient, amount, unit }]);
      setIngredient('');
      setAmount(0);
      setUnit('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <label>
        Recipe Name:
        <input
          type="text"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
          className={emptyFields.includes('recipeName') ? 'error' : ''}
        />
      </label>
      <h3>Ingredients:</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <p>
            {ingredient.amount} {ingredient.unit} {ingredient.ingredient}

            <button onClick={() => setIngredients((prev) => prev.filter((_, i) => i !== index))}>
            Remove
            </button>
            </p>
            </div>
            ))}
            <label>
            Ingredient:
            <input
            type="text"
            value={ingredient}
            onChange={(event) => setIngredient(event.target.value)}
            />
            </label>
            <label>
            Amount:
            <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            />
            </label>
            <label>
            Unit:
            <input
            type="text"
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
            />
            </label>
            <button onClick={handleAddIngredient}>Add Ingredient</button>
            <label>
            Instructions:
            <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            className={emptyFields.includes('instructions') ? 'error' : ''}
            />
            </label>
            <label>
              Make recipe public?
              <input 
              type="checkbox" 
              id="public"
              onChange={(event) => setPublicity(event.target.value)}
              />
            </label>
            <button type="submit">Submit Recipe</button>
            </form>
            );
            };
export default RecipeForm