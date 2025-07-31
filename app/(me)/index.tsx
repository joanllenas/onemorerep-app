import Button from '@/components/Button';
import { Palette } from '@/constants/color';

import { StyleSheet, View } from 'react-native';

export default function IndexScreen() {
  function onSomething() {}
  return (
    <View style={styles.container}>
      <Button theme="primary" label="Choose a photo" onPress={onSomething} icon="address-book-o" />
      <Button theme="primary" label="Choose a photo" onPress={onSomething} icon="address-book" loading={true} />
      <Button theme="primary" label="Choose a photo" onPress={onSomething} icon="address-book" disabled={true} />
      <Button label="Use this photo" onPress={onSomething} icon="address-book" />
      <Button label="Use this photo" onPress={onSomething} icon="address-book" loading={true} />
      <Button label="Use this photo" onPress={onSomething} icon="address-book" disabled={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
