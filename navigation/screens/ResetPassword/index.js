import React, { useEffect, useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Button, Alert,
    ImageBackground, Text , ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, firestore, storage } from '../../../firebaseConfig';
import styles from './styles';



const ResetPassword = ({navigation}) => {

    const [Registeredemail , setRegisteredemail] = useState('');
    const [Registeredpassword , setRegisteredpassword] = useState('');

    const handleGetVerificationCode = () => {
        auth.sendPasswordResetEmail(Registeredemail).then(() => {
            console.log('success')
            Alert.alert('SUCESS', 'The reset password email has send to your email. Check your email to reset password.')
        })
            .catch(error => {
                console.log(error)
                Alert.alert('ERROR', error.message)
            })
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={ require('../../../assets/data/images/loginBack.png') }
                             style={styles.background}>
                <View style={styles.container1}>
                    <View style={styles.inputContainer} >
                        <Text>
                            The reset password email will send to your email.
                        </Text>
                        <TextInput
                            placeholder="Email"
                            value={ Registeredemail }
                            onChangeText={value => setRegisteredemail(value)}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleGetVerificationCode}>
                            <Text style={styles.buttonText}>Send Reset Password Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}


export default ResetPassword;