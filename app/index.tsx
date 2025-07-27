import Button from '@/components/Button';
import { useAuth } from '@/providers/AuthProvider';
import { StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const { signIn } = useAuth();
  function onLogin() {
    signIn();
  }
  return (
    <View style={styles.container}>
      <Button onPress={onLogin} theme="primary" label="Sign In" icon="sign-in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
