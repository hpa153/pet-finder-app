import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import call from 'react-native-phone-call';
import DropDownPicker from "react-native-dropdown-picker";

import styles from './styles';
import QuickContact from '../../../components/QuickContact';
import petcareCenters from '../../../assets/data/petcareCenters';
import { firestore } from '../../../firebaseConfig';

const InfoScreen = ({ navigation }) => {
  let [contacts, setContacts] = useState([]);
  const [canadaState, setCanadaState] = useState([
    { label: "All States", value: "all" },
    { label: "Alberta", value: "Alberta" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Manitoba", value: "Manitoba" },
    { label: "New Brunswick", value: "New Brunswick" },
    { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    { label: "Nova Scotia", value: "Nova Scotia" },
    { label: "Ontario", value: "Ontario" },
    { label: "Prince Edward Island", value: "Prince Edward Island" },
    { label: "Quebec", value: "Quebec" },
    { label: "Saskatchewan", value: "Saskatchewan" },
  ]);

  const [curState, setCurState] = useState("all");
  const [stateOpen, setStateOpen] = useState(false);

  useEffect(() => {
    const subscriber = async () => {
      try {
        const result = [];
        let data;

        if (curState === "all") {
          data = await firestore.collection('petcareCenters').get();
        } else {
          data = await firestore.collection('petcareCenters').where('state', '==' , curState).get();
        }

        data.forEach(e => {
          if (e.id) {
            result.push({
              id: e.id,
              name: e.data().name,
              image: e.data().image,
              address: e.data().address,
              openingHours: e.data().openingHours,
              state: e.data().state,
              phone: e.data().phone,
            });
          }
        });

        setContacts(result);
      } catch (err) {
        console.log(err);
      }
    }
    subscriber();
  }, [curState]);


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/data/images/background.jpg')} style={styles.background} >
        <Text style={styles.title}>Info</Text>
        <Text style={styles.subTitle}>About Us</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        <Text style={styles.subTitle}>Contacts</Text>

        <View
          style={{
            width: "90%",
            marginBottom: 7,
            marginTop: 2,
            marginLeft: '5%',
          }}
        >
          <DropDownPicker
            zIndex={3000}
            zIndexInverse={1000}
            placeholder="Select a species"
            placeholderStyle={{
              color: "grey",
            }}
            style={{
              borderColor: "transparent",
              height: 40,
              borderRadius: 6,
            }}
            open={stateOpen}
            value={curState}
            items={canadaState}
            setOpen={setStateOpen}
            setItems={setCanadaState}
            setValue={setCurState}
          />
        </View>

        <ScrollView>
          {
            contacts.map((contact) =>
              <QuickContact key={contact.id} contact={contact} />)
          }
        </ScrollView>
      </ImageBackground>
    </View>
  )
};

export default InfoScreen;