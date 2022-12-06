import { createContext, useReducer } from 'react'

export const RecipesContext = createContext()

export const RecipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_recipes': 
      return {
        recipes: action.payload
      }
    case 'CREATE_recipe':
      return {
        recipes: [action.payload, ...state.recipes]
      }
    case 'DELETE_recipe':
      return {
        recipes: state.recipes.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipesReducer, {
    recipes: null
  })

  return (
    <RecipesContext.Provider value={{...state, dispatch}}>
      { children }
    </RecipesContext.Provider>
  )
}