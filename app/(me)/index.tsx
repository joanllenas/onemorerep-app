import Button from '@/components/Button';
import CircleButton from '@/components/Circle';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';

import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

const PlaceholderImage = require('../../assets/images/icon.png');

export default function IndexScreen() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  const pickImageAsync = async () => {
    setShowAppOptions(true);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = () => {};

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton onPress={onReset} icon="refresh" label="Refresh" />
            <CircleButton onPress={onAddSticker} />
            <IconButton onPress={onSaveImageAsync} icon="save-alt" label="Save" />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
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
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
