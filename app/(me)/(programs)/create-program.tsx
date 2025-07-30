import { Color } from '@/constants/color';
import { StyleSheet, Text, View } from 'react-native';

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

export default function NewProgramsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Program page!</Text>
    </View>
  );
}
