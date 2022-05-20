import React,{useState,createContext} from 'react'
import {addTheme,themes} from './index'

export const ThemeContext:any = createContext(themes);

export const ThemeContextProvider = ({ children }) => {
  const [theme, changeTheme] = useState('default')
  return (
    <ThemeContext.Provider
      value={{ theme: themes[theme], themeName: theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}