import Button from '@/components/Button';
import { Color } from '@/constants/color';
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
    padding: 16,
    backgroundColor: Color.Background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
