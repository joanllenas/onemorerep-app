import { Color } from '@/constants/color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href, Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  color?: string;
  label?: string;
  onPress?: () => void;
  href?: Href;
  dismissTo?: boolean;
};

export default function IconButton({ icon, label, onPress, href, color, dismissTo }: Props) {
  if (href) {
    return (
      <Link style={styles.iconButton} href={href} dismissTo={dismissTo}>
        <MaterialIcons name={icon} size={24} color={color || Color.White} />
        {label && <Text style={styles.iconButtonLabel}>{label}</Text>}
      </Link>
    );
  }

  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={color || Color.White} />
      {label && <Text style={styles.iconButtonLabel}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: Color.White,
    marginTop: 12,
  },
});
