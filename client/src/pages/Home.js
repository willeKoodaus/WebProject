import { useEffect }from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

// components
import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'

const API_URL=process.env.REACT_APP_API_URL;

const Home = () => {
  const {recipes, dispatch} = useRecipesContext()
  const {user} = useAuthContext()
  const [publicity, setPublicity] = useState(false)

  useEffect(() => {
    const fetchrecipes = async () => {
      const response = await fetch(API_URL + '/recipes/', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_recipes', payload: json})
      }
    }

    const fetchPublicrecipes = async () => {
      const response = await fetch(API_URL + '/recipes/' + "public", {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_recipes', payload: json})
      }
    }

    if (user && (publicity===false)) {
      fetchrecipes()
    }else if(user && (publicity===true)){
      fetchPublicrecipes()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="recipes">
        <button onClick={() => setPublicity(true)}>Show public recipes</button>
        {recipes && recipes.map((recipe) => (
          <RecipeDetails key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <RecipeForm />
    </div>
  )
}

export default Home