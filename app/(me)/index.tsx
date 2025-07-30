import Button from '@/components/Button';
import { Color } from '@/constants/color';

import { StyleSheet, View } from 'react-native';

export default function IndexScreen() {
  function onSomething() {}
  return (
    <View style={styles.container}>
      <Button theme="primary" label="Choose a photo" onPress={onSomething} icon="address-book-o" />
      <Button theme="primary" icon="address-book" label="Choose a photo" onPress={onSomething} />
      <Button label="Use this photo" onPress={onSomething} icon="address-book" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: Color.Background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
