import { useAuthContext } from './useAuthContext'
import { useRecipesContext } from './useRecipesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchrecipes } = useRecipesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchrecipes({ type: 'SET_recipeS', payload: null })
  }

  return { logout }
}