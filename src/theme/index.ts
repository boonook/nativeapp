import defaultThemes from './default';
import dark from './dark';

export const themes={
  default:defaultThemes,
  dark
}

export const addTheme = (key, value) => (themes[key] = value);