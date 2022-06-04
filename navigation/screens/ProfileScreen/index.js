import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView, Alert,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth, firestore } from '../../../firebaseConfig';

import styles from './styles';
import alert from "react-native-web/dist/exports/Alert";


const ProfileScreen = ({navigation}) => {

   const [image, setImage] = useState(null);
   const [firstname, setFirstName] = useState('');
   const [lastname, setLastName] = useState('');
   const [address, setAddress] = useState('');
   const [contactnumber, setContact] = useState('');

   var userId = auth.currentUser.uid;

   firestore.collection("users").doc(userId).get()
   .then(function (doc) {
     if (doc.exists) {
       setImage(doc.data().image);
       setFirstName(doc.data().firstname);
       setLastName(doc.data().lastname);
       setAddress(doc.data().address);
       setContact(doc.data().contactnumber);
       console.log("Document data:", doc.data());
     } else {
       console.log("No such document!");
     }
   })
   .catch(function (error) {
     console.log("Error getting document:", error);
   });

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
        navigation.replace("Login")
    })
    .catch(error => alert(error.message))
}

    const handleDelete = () => {
        firestore.collection("users").doc(userId).delete()
        auth.currentUser.delete().then(() => {
            console.log('success')
            Alert.alert('SUCCESS', 'user has deleted')
            navigation.replace("Login")
        })
            .catch(error => {
                console.log(error)
                Alert.alert('ERROR', error.message)
                auth.signOut()
                    .then(() => {
                        navigation.replace("Login")
                    })
                    .catch(error => Alert.alert('ERROR', error.message))
            })

    }

  return (
    <View>
    <ImageBackground source={ require('../../../assets/data/images/background.jpg') } style={styles.background} >
      <Text style={styles.title}>Profile</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signout} activeOpacity={0.8} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editprofile} activeOpacity={0.8} onPress={() => navigation.navigate("Edit Profile")}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.editprofile} activeOpacity={0.8} onPress={() => navigation.navigate("ResetPassword")}>
              <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete} activeOpacity={0.8} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete This User</Text>
          </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}> 
       <Text>{"\n"}{"\n"}</Text>
       <View style={styles.inputContainer} >
        <Image style={styles.image} source={{ uri: image }}/>
        <Text style={styles.textInput}>First Name: {firstname}</Text>
        <Text style={styles.textInput}>Last Name: {lastname}</Text>
        <Text style={styles.textInput}>Address: {address}</Text>
        <Text style={styles.textInput}>Contact Number: {contactnumber}</Text>
     </View>
   </ScrollView>
    </ImageBackground>
  </View>
)
};

export default ProfileScreen;