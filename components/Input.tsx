import { Palette } from '@/constants/color';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function Input(props: TextInputProps) {
  const { style, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandler = (evt: any) => {
    setIsFocused(true);
    rest.onFocus?.(evt);
  };

  const onBlurHandler = (evt: any) => {
    setIsFocused(false);
    rest.onBlur?.(evt);
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
          backgroundColor: Palette.surface,
          color: Palette.textPrimary,
          borderWidth: 2,
          letterSpacing: 0,
        },
        isFocused ? styles.focused : styles.blurred,
        style,
      ])}
      placeholderTextColor={Palette.textMuted}
    />
  );
}

const styles = StyleSheet.create({
  blurred: {
    borderColor: Palette.border,
  },
  focused: {
    borderColor: Palette.accent,
  },
});
