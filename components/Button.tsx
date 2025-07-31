import { Palette } from '@/constants/color';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  icon?: keyof (typeof FontAwesome)['glyphMap'];
  theme?: 'primary';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export default function Button({ label, theme, onPress, icon, loading, disabled }: Props) {
  const isPrimary = theme === 'primary';

  const buttonBackground = disabled ? Palette.disabled : isPrimary ? Palette.accent : Palette.surface;

  const textColor = isPrimary ? (disabled ? Palette.textMuted : Palette.background) : Palette.textPrimary;
  const iconColor = textColor;

  return (
    <View
      style={[
        styles.buttonContainer,
        isPrimary && { borderWidth: 4, borderColor: Palette.accent, borderRadius: 18 },
        disabled && styles.buttonDisabled,
      ]}
    >
      <Pressable
        style={[styles.button, { backgroundColor: buttonBackground }, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <View style={styles.buttonContent}>
          <ButtonIcon icon={icon} loading={loading} color={iconColor} />
          <Text style={{ ...styles.buttonLabel, color: textColor }}>{label}</Text>
          <View style={{ width: 18 }} />
        </View>
      </Pressable>
    </View>
  );
}

type IconProps = {
  icon?: keyof (typeof FontAwesome)['glyphMap'];
  loading?: boolean;
  color?: string;
};

function ButtonIcon({ loading, icon, color }: IconProps) {
  if (loading) {
    return <ActivityIndicator size={18} style={styles.buttonIcon} color={color} />;
  } else if (icon) {
    return <FontAwesome name={icon} size={18} color={color} style={styles.buttonIcon} />;
  }
  return <View style={{ width: 18 }} />;
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  buttonLabel: {
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
