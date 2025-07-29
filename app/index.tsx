import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/providers/AuthProvider';
import { Color } from '@/utils/color';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const { signIn, verifyOtp, otpUserId, loading } = useAuth();
  const [email, setEmail] = useState('joan.llenas.maso@gmail.com');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');

  async function onSignIn() {
    await signIn(email);
    setStep('otp');
  }

  function onVerifyOtp() {
    verifyOtp(otp);
  }

  function onReset() {
    setOtp('');
    setStep('login');
  }

  if (step === 'login') {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} contentFit="contain" />
          <Input placeholder="Email" autoComplete="email" onChangeText={setEmail} value={email} />
          <Button onPress={onSignIn} theme="primary" label="Sign In" icon="sign-in" loading={loading} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} contentFit="contain" />
          <Input placeholder="OTP Code" autoComplete="off" onChangeText={setOtp} />
          <Text style={styles.otpText}>Enter the 6-digit code sent to {email}</Text>
          <Button onPress={onVerifyOtp} theme="primary" label="Verify Code" icon="shield" loading={loading} />
          <Button onPress={onReset} label="Return to Login" disabled={loading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Background,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    gap: 16,
    flex: 1,
    paddingHorizontal: 32,
  },
  logo: {
    height: 200,
    width: '100%',
  },
  otpText: {
    fontSize: 10,
    paddingHorizontal: 4,
    color: Color.TextMuted,
  },
});
