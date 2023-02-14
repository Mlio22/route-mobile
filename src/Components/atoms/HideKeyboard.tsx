import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export const HideKeyboard = ({children}: any): JSX.Element => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);
