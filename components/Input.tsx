import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
  const { style, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const onFocusHandler = (evt: any) => {
    setIsFocused(true);
    if (rest.onFocus) {
      rest.onFocus(evt);
    }
  };
  const onBlurHandler = (evt: any) => {
    setIsFocused(false);
    if (rest.onBlur) {
      rest.onBlur(evt);
    }
  };
  return (
    <TextInput
      {...rest}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      autoCapitalize="none"
      autoCorrect={!!rest.autoCorrect}
      style={StyleSheet.flatten([
        {
          padding: 18,
          fontSize: 16,
          borderRadius: 10,
          backgroundColor: '#1F2937',
          color: '#fff',
          borderWidth: 2,
        },
        isFocused ? styles.focused : styles.blurred,
        style,
      ])}
    />
  );
}

const styles = StyleSheet.create({
  blurred: {
    borderColor: '#9CA3AF',
  },
  focused: {
    borderColor: '#ffd33d',
  },
});
