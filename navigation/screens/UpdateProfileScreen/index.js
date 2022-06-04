import React, { useEffect, useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Button, Alert,  
ImageBackground, Text , ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, firestore, storage } from '../../../firebaseConfig';
import styles from './styles';



const UpdateProfile = ({navigation}) => {

    const [image, setImage] = useState(null);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [contactnumber, setContact] = useState('');
    const [saveButton, setSaveButton] = useState(false);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, need camera permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
      const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const ChooseImage = () => {
        Alert.alert('Choose option', 'Which way do you want to choose photo?', [
            { text: "Choose From Gallery", onPress: (pickImage) },
            { text: "Take new photo", onPress: (takeImage) },
            ],
            { cancelable: true });
        }

    function updateuserInfo() {
        storage.ref(image.split("/").pop()).put(setImage).then(() => {
            console.log(`${image} has been succussfully uploaded`);
          })
          .catch((e) => console.log('uploading image error => ', e));

    var userId = auth.currentUser.uid;
    firestore.collection('users').doc(userId).set(
        {
          image: image,
          firstname: firstname,
          lastname: lastname,
          address: address,
          contactnumber: contactnumber,
        },
        {
          merge: true 
        }
      )
        .then(function () {
          Alert.alert('Information has been updated successfully!');
        })
        .catch(function (error) {
          Alert.alert('Something went wrong');
          console.log('Error: ', error);
        });
    }

    const Reset = () => {
        setImage(null);
        setFirstName(null);
        setLastName(null);
        setAddress(null);
        setContact(null);
        setSaveButton(false);
      }

      const userProfile = () => {
        navigation.replace("ProfileNavigator")
    }

      return (
        <View>
         <ImageBackground source={ require('../../../assets/data/images/background.jpg') } 
          style={styles.background} >
          <Text style={styles.title}>Profile</Text>
          <ScrollView style={styles.container}> 
           <View style={styles.inputContainer} >
           <TouchableOpacity onPress={ChooseImage}>
           {! image &&
             <Image style={styles.image} 
             source={require('..//../../assets/data/images/profile.png')} /> 
           }
           { image &&
            <Image style={styles.image} source={{ uri: image }}/>
           }
        <Text>{"\n"}</Text>
        </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              numberOfLines={3}
              onChangeText={(value) => setFirstName(value) }
              value={firstname}
            />
           <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              numberOfLines={3}
              onChangeText={(value) => setLastName(value) }
              value={lastname}
            />
           <TextInput
             style={styles.textInput}
             placeholder="Present Address"
             numberOfLines={3}
             onChangeText={(value) => setAddress(value) }
             value={address}
            />
           <TextInput
             style={styles.textInput}
             placeholder="Contact Number"
             numberOfLines={3}
             onChangeText={(value) => setContact(value) }
             value={contactnumber}
           />
         </View>
         {!saveButton &&
         <View style={styles.buttonContainer}>
         <Button style={styles.button} title="Update" color="#2F4F4F" onPress={updateuserInfo} />
         <Button style={styles.button} title="Go back to Profile" color="#800000" 
         onPress={userProfile} />
         </View>
        }
         {saveButton &&
         <View style={styles.buttonContainer}>
         <Button style={styles.button} title="Reset" onPress={Reset} />
       </View>
        }
       </ScrollView>
     </ImageBackground>
     </View> 
      )
}


export default UpdateProfile;