import React from 'react';
import {ThemeType} from '../../atoms/HomeMenu/ThemeButton';
import {ChildrenProp} from '../../../types/Home';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const contextDefaultValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext(contextDefaultValue);

export const ThemeContextProvider = (props: ChildrenProp) => {
  const [theme, setTheme] = React.useState<ThemeType>('light');

  const toggleTheme = () => {
    console.log('toggle');

    if (theme === 'light') setTheme('dark');
    if (theme === 'dark') setTheme('light');
  };

  const themeContextObj: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextObj}>
      {props.children}
    </ThemeContext.Provider>
  );
};
