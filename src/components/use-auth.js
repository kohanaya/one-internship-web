import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth () {
  const [user, setUser] = useState(null)

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (username, password) => {
    return axios.post('/api/login', { username, password })
      .then((response) => {
        const user = response.data
        setUser(user)
        return user
      })
  }

  const signup = (username, password) => {
    return axios.post('/api/signup', { username, password })
      .then((response) => {

      })
  }

  const logout = () => {
    return axios.post('/api/logout')
      .then((response) => {
        setUser(false)
        return user
      })
      .catch(() => {
        setUser(false)
      })
  }

  const isAuthenticated = () => {
    return !!user
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    return axios.get('/api/me')
      .then((response) => {
        const user = response.data
        setUser(user)
      })
      .catch(() => {
        setUser(false)
      })
    // Cleanup subscription on unmount
    // return () => unsubscribe()

  }, [])

  // Return the user object and auth methods
  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout
  }
}