import Button from '@/components/Button';
import { useAuth } from '@/providers/AuthProvider';
import { StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  function onLogout() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Button onPress={onLogout} theme="primary" label="Sign Out" icon="sign-out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
