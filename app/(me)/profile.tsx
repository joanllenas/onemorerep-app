import Button from '@/components/Button';
import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { useAuth } from '@/providers/AuthProvider';
import { StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const { signOut, loading } = useAuth();
  async function onLogout() {
    await signOut();
  }

  return (
    <View style={styles.container}>
      <Button onPress={onLogout} theme="primary" label="Sign Out" icon="sign-out" loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.Padding.Screen,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
