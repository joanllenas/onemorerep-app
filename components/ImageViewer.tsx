import { Image } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  imgSource: string;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}
