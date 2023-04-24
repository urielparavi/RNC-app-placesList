import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    // Means we don't know yet if we have access or not - if we have the permission to use the camera (for ios only)
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      // can be true or false
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app'
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissionawait = await verifyPermissions();

    if (!hasPermissionawait) {
      return;
    }

    const image = await launchCameraAsync({
      // allow the user edit the photo before he send it
      allowsEditing: true,
      aspect: [16, 9],
      // To make sure that we don't get super large images
      quality: 0.5,
    });

    setPickedImage(image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};
export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
