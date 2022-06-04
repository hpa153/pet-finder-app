import React from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import * as SMS from 'expo-sms';

import styles from './styles';

const MissingPetDetails = ({ navigation, route }) => {
  const pet = route.params.pet;

  const triggerCall = (phone) => {
    let phoneNumber = phone.split("-").join("");

    const args = {
      number: phoneNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  const sendSMS = async (phone) => {
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      let phoneNumber = phone.split("-").join("");
      const { result } = await SMS.sendSMSAsync(
        phoneNumber,
        "I found your pet. Please reach back when you are available!"
      );
    } else {
      Alert.alert("SMS is not available on this device");
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground
        blurRadius={10}
        source={require('../../../../../assets/data/images/background.jpg')}
        style={styles.background}
      >
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={() => navigation.navigate("MissingPetReports")}>
          <Feather name={'chevron-left'} size={30} style={styles.back} />
        </TouchableOpacity>

        <View style={styles.bodyContainer}>
          <View>
            <Text style={styles.title}>{pet.petName}</Text>
            <Image style={styles.image} source={{ uri: pet.image }} />

            <Text style={styles.cates}>Species:</Text>
            <Text style={styles.info}>{pet.species}</Text>

            <Text style={styles.cates}>Breed:</Text>
            <Text style={styles.info}>{pet.breed}</Text>

            <Text style={styles.cates}>Gender:</Text>
            <Text style={styles.info}>{pet.gender}</Text>

            <Text style={styles.cates}>Date Lost:</Text>
            <Text style={styles.info}>{pet.dateLost}</Text>

            <Text style={styles.cates}>Owner:</Text>
            <Text style={styles.info}>{pet.contactName}</Text>

            <Text style={styles.cates}>Address:</Text>
            <Text style={styles.info}>{pet.address.title}</Text>

            <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.callBtn} activeOpacity={0.8} onPress={() => triggerCall(pet.contactPhone)}>
            <Text style={styles.btnSubmit}><Feather name={"phone"} size={30} style={styles.btnText} /></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8} onPress={() => sendSMS(pet.contactPhone)}>
            <Text style={styles.btnSubmit}><Feather name={"message-square"} size={30} style={styles.btnText} /></Text>
          </TouchableOpacity>
        </View>
          </View>

        </View>

      </ImageBackground>
    </SafeAreaView>
  )
};

export default MissingPetDetails;
