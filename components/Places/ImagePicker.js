import { Alert, Button, View } from 'react-native';
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';

const ImagePicker = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    // Means we don't know yet if we have access or not - if we have the permission to use the camera
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
