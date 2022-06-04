import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ImageSelector = ({ imageUri, onChangeImage }) => {
    useEffect(() => {
        verifyPermissions();
    }, [])

    const verifyPermissions = async () => {
        const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
        const libraryResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(cameraResult.status !== 'granted' && libraryResult.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    }

    const retrieveImageHandler = async () => {
        if (!imageUri) {
            selectImage();
        } 
        else {
            Alert.alert('Delete Photo?', 'This photo will be permanently deleted', [
                { text: 'Delete', onPress: () => onChangeImage(null) },
                { text: 'Cancel' }
            ]);
        }
    }

    const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.5,
          });
          if(!result.cancelled) onChangeImage(result.uri);
        } catch (error) {
          console.log('Error reading an image', error);
        }
    }

    return(
        <TouchableOpacity onPress={retrieveImageHandler}>
            <View style={styles.container}>
                {
                    !imageUri && 
                        <MaterialCommunityIcons color="#055c13" name="camera-plus" size={60} /> 
                }
                { 
                    imageUri && 
                        <Image source={{ uri: imageUri }} style={styles.image} /> 
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 10,
        //backgroundColor: '#ffffff',
        borderColor: '#055c13',
        borderWidth: 2,
        justifyContent: 'center',
        overflow: 'hidden',
        height: 160,
        width: 360
    },
    image: {
        width: '100%',
        height: '100%'
    }

});

export default ImageSelector;