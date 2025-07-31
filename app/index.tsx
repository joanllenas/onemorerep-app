import Button from '@/components/Button';
import Input from '@/components/Input';
import { Color, Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { useAuth } from '@/providers/AuthProvider';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const { signIn, verifyOtp, resetAll, loading } = useAuth();
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
    resetAll();
    setStep('login');
  }

  function isLoginValid() {
    return email && email.length > 3 && email.includes('@');
  }

  function isOtpValid() {
    return otp && otp.length === 6;
  }

  if (step === 'login') {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} contentFit="contain" />
          <Input
            placeholder="Email"
            autoComplete="email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <Button
            onPress={onSignIn}
            theme="primary"
            label="Sign In"
            icon="sign-in"
            loading={loading}
            disabled={!isLoginValid()}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} contentFit="contain" />
          <Input
            placeholder="OTP Code"
            autoComplete="off"
            onChangeText={setOtp}
            style={otp.length > 0 ? styles.otpInput : undefined}
            maxLength={6}
            keyboardType="numeric"
          />
          <Text style={styles.otpText}>Enter the 6-digit code sent to {email}</Text>
          <Button
            onPress={onVerifyOtp}
            theme="primary"
            label="Verify Code"
            icon="shield"
            loading={loading}
            disabled={!isOtpValid()}
          />
          <Button onPress={onReset} label="Return to Login" disabled={loading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.background,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Size.Padding.Screen,
  },
  form: {
    gap: Size.Gap.Medium,
    flex: 1,
  },
  logo: {
    height: 200,
    width: '100%',
  },
  otpInput: {
    letterSpacing: 16,
    textAlign: 'center',
  },
  otpText: {
    fontSize: 10,
    paddingHorizontal: 4,
    color: Color.TextMuted,
  },
});
