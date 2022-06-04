import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ImageBackground } from "react-native";
import { auth } from '../firebaseConfig';



const Registration = () => {

    const [Registeredemail , setRegisteredemail] = useState('');
    const [Registeredpassword , setRegisteredpassword] = useState('');

    const handleRegistration = ()=>{
      if (Registeredemail.length < 4) {
          Alert.alert('Please enter an valid email address.');
          return;
      }
      if (Registeredpassword.length < 4) {
            Alert.alert('Please enter a valid password.');
            return;
          }
          auth
          .createUserWithEmailAndPassword(Registeredemail, Registeredpassword)
          .then(userCredentials => {
              const user = userCredentials.user;
              user.sendEmailVerification();
              console.log("Registered with: " + user.email);
              Alert.alert(
                  "Welcome,", 
                  "Thank you for your registration. Enjoy our app!",
                  [{ text: "Okay" }] 
              );
          })
          .catch( error => {
            console.log(error);
            Alert.alert(
                "Wrong email and password format!",
                "Please enter valid email and password to complete registration",
                [{ text: "Okay" }] 
            );
            
          } )
      }

  return (
    <View style={styles.container}>
      <ImageBackground source={ require('../assets/data/images/loginBack.png') } 
      style={styles.background}>
       <View style={styles.container1}>
      <View style={styles.inputContainer} >
        <TextInput
        placeholder="Email"
        value={ Registeredemail }
        onChangeText={value => setRegisteredemail(value)}
         style={styles.input}
        />
         <TextInput
        placeholder="Password"
        value={ Registeredpassword }
        onChangeText={value => setRegisteredpassword(value)}
         style={styles.input}
         secureTextEntry
        />
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        </View>
        </ImageBackground>
    </View>
  )
}

export default Registration;

const styles = StyleSheet.create({
  container:{
    flex: 0.98,
    alignItems:"center",
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container1:{
    flex: 0.98,
    alignItems:"center",
    justifyContent:"center",
  },
  inputContainer:{
   width:"80%"
  },
  input:{
   backgroundColor:"white",
   paddingHorizontal: 15,
   paddingVertical: 10,
   borderRadius: 10,
   marginTop: 5
  },
  buttonContainer:{
    marginTop: 20,
    width: "60%"
  },
  button:{
    backgroundColor:"black",
    padding: 10,
    borderRadius: 10,
    alignItems:"center"
  },
  buttonText:{
   color:"white",
   fontWeight: "700",
   fontSize: 12
  },
});