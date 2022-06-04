import React, {useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, ImageBackground, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/core';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigation = useNavigation();

    useEffect(() => {
        const isLoggedIn = auth.onAuthStateChanged( user => {
            if( user ) {
                navigation.replace('Main Container');
            }
        });

        return isLoggedIn;
    }, [])

    const handleLogin = () => {
        if (email.length < 4) {
            Alert.alert('Please enter an valid email address.');
            return;
          }
        
          if (password.length < 4) {
            Alert.alert('Please enter a valid password.');
            return;
          }
            auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: " + user.email);
            })
            .catch( error => {
                console.log(error);
                Alert.alert(
                    "Something went wrong!", 
                    "Please enter valid email and password to login!",
                    [{ text: "Okay" }] 
                );
            } )
        }

    
    return (
        <View style={styles.container}>
        <ImageBackground source={ require('../assets/data/images/loginBack.png') } 
        style={styles.background}>
        <Text style={styles.maintitle}>App Name</Text>
            <View style={styles.container1}>
              <View style={styles.inputContainer} >
            <TextInput
                placeholder="Email"
                value={ email }
                onChangeText={value => setEmail(value)}
                 style={styles.input}
                />
            <TextInput
                placeholder="Password"
                value={password }
                onChangeText={value => setPassword(value)}
                 style={styles.input}
                 secureTextEntry
                />
              </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                  </TouchableOpacity>
                  <Text style={styles.Ortext}>OR</Text>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registration')}>
                   <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                  </TouchableOpacity>
                    <Text style={styles.Ortext}>OR</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={styles.buttonText}>RESET PASSWORD</Text>
                    </TouchableOpacity>
                </View>
           </View>
         </ImageBackground>
    </View>
 )
};
        
export default Login;
        
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
      text:{
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
       },
      maintitle: {
        marginTop: 50,
        marginLeft: 30,
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
      },
      inputContainer:{
       width:"80%"
      },
      input:{
       backgroundColor:"white",
       paddingHorizontal: 15,
       paddingVertical: 10,
       borderRadius: 10,
       marginTop: 5,
       width: 300
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
      Ortext:{
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: "center",
        fontWeight: "bold",
        opacity: 0.4,
        fontSize: 12
      }
    });