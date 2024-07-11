import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Image } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function App(): JSX.Element {
  const [cameraPhoto, setCamerPhoto] = useState<string | null>(null);
  const [galleryPhoto, setGalleryPhoto] = useState()

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };


  // open Camera
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      console.log(result); // Log the result to see what is returned
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else {
        setCamerPhoto(result.assets[0].uri);
      }
    }
  }

  // open Gallery
  const openGallery = async () => {
    const result = await launchImageLibrary(options)
    setGalleryPhoto(result.assets[0].uri)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style= {styles.button}>
        <Text style={styles.text}>Open Camera</Text>
      </TouchableOpacity>
      {cameraPhoto && (
        <Image style={styles.image} source={{uri: cameraPhoto}} />
      )}
      <TouchableOpacity onPress={openGallery} style= {styles.button}>
        <Text style={styles.text}>Open Gallery</Text>
      </TouchableOpacity>
      <Image style={styles.image} source={{uri: galleryPhoto}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 111,
    borderWidth: 1,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 11,
    borderRadius: 11,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 211,
    width: 211,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
});
