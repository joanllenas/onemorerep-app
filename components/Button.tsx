import { Color } from '@/utils/color';
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
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: Color.Primary, borderRadius: 18 },
          disabled && styles.buttonDisabled,
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: Color.ButtonBackground }]}
          onPress={onPress}
          disabled={disabled || loading}
        >
          {icon && <ButtonIcon icon={icon} loading={loading} />}
          <Text style={[styles.buttonLabel, { color: Color.ButtonText }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer, disabled && styles.buttonDisabled]}>
      <Pressable style={styles.button} onPress={onPress} disabled={disabled || loading}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

type IconProps = {
  icon: keyof (typeof FontAwesome)['glyphMap'];
  loading?: boolean;
};

function ButtonIcon({ loading, icon }: IconProps) {
  if (loading) {
    return <ActivityIndicator size={18} style={styles.buttonIcon} color={Color.ButtonText} />;
  }
  return <FontAwesome name={icon} size={18} color={Color.ButtonText} style={styles.buttonIcon} />;
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
  buttonLabel: {
    color: Color.White,
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
    borderColor: Color.ButtonDisabledBorder,
  },
});
