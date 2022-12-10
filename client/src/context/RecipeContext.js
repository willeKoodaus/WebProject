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
        recipes: state.recipes.filter((r) => r._id !== action.payload._id)
      }
    case 'UPDATE_recipe':
      const foundIndex = state.recipes.findIndex((r) => r._id === action.payload._id)
      return {
        recipes: state.recipes[foundIndex] = action.payload
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