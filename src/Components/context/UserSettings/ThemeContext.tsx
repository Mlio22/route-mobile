import React from 'react';
import {ChildrenProp} from '../../../types/Home';
import {ThemeType} from '../../../types/components/atoms/HomeMenuChildren/ThemeButton';
import {ThemeContextType} from '../../../types/components/context/UserSettings/ThemeContext';
import {getThemeFromAsyncStorage} from '../../../storages/Themestorage';

const contextDefaultValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext(contextDefaultValue);

async function load_saved_Theme_setting() {
  const Theme = (await getThemeFromAsyncStorage()) || 'light';
  return Theme;
}

export const ThemeContextProvider = (props: ChildrenProp) => {
  const [theme, setTheme] = React.useState<ThemeType>('light');

  const toggleTheme = () => {
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
