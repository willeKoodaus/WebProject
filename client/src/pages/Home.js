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
  const [clicked, setClicked] = useState('clickedbutton')
  const [clicked2, setClicked2] = useState('notclicked2')
 
  
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
        <div className="homebuttons">
        <button className={clicked} onClick={() => {setPublicity(true); setClicked("clickedbutton"); setClicked2("notclicked2"); console.log("public")}}>Show public recipes</button>
        <button className={clicked2} onClick={() => {setPublicity(false); setClicked("notclicked"); setClicked2("clickedbutton2"); console.log("private")}}>Show my recipes</button>
        </div>
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