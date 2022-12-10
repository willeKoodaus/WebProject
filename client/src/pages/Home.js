import { useEffect }from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
// components
import RecipeDetails from '../components/RecipeDetails'
import PublicRecipeDetails from '../components/PublicRecipeDetails'
import RecipeForm from '../components/RecipeForm'

const API_URL=process.env.REACT_APP_API_URL;

const Home = () => {
  const {recipes, dispatch} = useRecipesContext()
  const {user} = useAuthContext()
  const [publicity, setPublicity] = useState(true)
  
  useEffect(() => {
    
    const fetchrecipes = async () => {
      if(publicity === false){
      const response = await fetch(API_URL + '/recipes/', {
        headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_recipes', payload: json})
      }
    }else{
        const response = await fetch(API_URL + '/recipes/' + 'public', {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_recipes', payload: json})
      }
      }
    }
    
    if (user) {
      console.log("fetching recipes")
      fetchrecipes()
    }
  }, [dispatch, user, publicity])

  return (
    <div className="home">
      <div className="recipes">
        <button onClick={() => {setPublicity(true)}}>Show public recipes</button>
        <button onClick={() => {setPublicity(false)}}>Show my recipes</button>
        {recipes && recipes.map((recipe) => {
          if(publicity){
        return (<PublicRecipeDetails key={recipe._id} recipe={recipe} />)
          }else{
            return (<RecipeDetails key={recipe._id} recipe={recipe} />)
          }
      }
          )}
      </div>
      <div className="rightcolumn">
      <RecipeForm />
      </div>
    </div>
  )
}

export default Home