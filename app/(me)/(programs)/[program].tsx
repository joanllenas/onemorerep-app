import { Color } from '@/constants/color';
import { StyleSheet, Text, View } from 'react-native';

export default function ProgramScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Program page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.Text,
  },
});
