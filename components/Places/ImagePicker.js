import { Button, View } from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';

const ImagePicker = () => {
  const takeImageHandler = async () => {
    const image = await launchCameraAsync({
      // allow the user edit the photo before he send it
      allowsEditing: true,
      aspect: [16, 9],
      // To make sure that we don't get super large images
      quality: 0.5,
    });
    console.log(image);
  };

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};
export default ImagePicker;
