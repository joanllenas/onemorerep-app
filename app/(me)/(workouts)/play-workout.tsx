import { Palette } from '@/constants/color';
import { StyleSheet, Text, View } from 'react-native';

export default function PlayWorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Workout!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Palette.textPrimary,
  },
});
