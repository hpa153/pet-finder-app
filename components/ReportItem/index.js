import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions
} from 'react-native';
import call from 'react-native-phone-call';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import MapView, { Marker } from 'react-native-maps';
import * as SMS from 'expo-sms';

import styles from './styles';

const ReportItem = ({ pet }) => {
  //console.log(pet.type);
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  
  // For Map feature
  const [modalVisible, setModalVisible] = useState(false);
  let coordLatd = 45.34986;
  let coordLongt = -75.67426;

  if(pet.address.id === '1') {
    coordLatd = 45.34986;
    coordLongt = -75.67426;
  }
  else if (pet.address.id === '2') {
    coordLatd = 42.97809;
    coordLongt = -81.24402;
  }
  else if (pet.address.id === '3') {
    coordLatd = 43.15887;
    coordLongt = -79.24311;
  }
  else if (pet.address.id === '4') {
    coordLatd = 53.62207;
    coordLongt = -113.64370;
  }
  else if (pet.address.id === '5') {
    coordLatd = 45.49826;
    coordLongt = -73.56731;
  }
  else if (pet.address.id === '6') {
    coordLatd = 43.77311;
    coordLongt = -79.19666;
  }

  // Print format
  const html = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: bold;">
            FOUND PET
            </h1>
            <img
            src="${pet.imageUri}"
            style="width: 80vw;" />
            <div style="font-size: 16px; font-family: Helvetica Neue; font-weight: normal;">${pet.petName}</div>
            <div style="font-size: 16px; font-family: Helvetica Neue; font-weight: normal;">Breed: ${pet.breed}, ${pet.gender}</div>
            <div style="font-size: 16px; font-family: Helvetica Neue; font-weight: normal;">Date Found: ${pet.dateFound}</div>
            <div style="font-size: 16px; font-family: Helvetica Neue; font-weight: normal;">Address: ${pet.address.title}</div>
            <h2 style="font-size: 50px; font-family: Helvetica Neue; font-weight: bold;">${pet.contactPhone}</h2>
        </body>
    </html>
    `;
  
    const print = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
      });
    }
  
    const shareFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({
        html
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    const sendMessageWithSMS = async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          [pet.contactPhone],
          ' '
        );
        console.log(result);
      } else {
        console.log("SMS is not available on this device");
      }
    }

  return (
    <View style={styles.petCareItem}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={{ uri: pet.imageUri }} />
      </View>
      <View>
      <Text style={styles.itemTitle}>Pet Name:{pet.petName}</Text>
      <Text style={styles.itemTitle}>Date Found:{pet.dateFound}</Text>
      <Text style={styles.itemTitle}>Species:{pet.species}</Text>
      <Text style={styles.itemTitle}>Gender:{pet.gender}</Text>
      <Text style={styles.itemTitle}>Breed:{pet.breed}</Text>
      <Text style={styles.itemTitle}>Is there a microchip:{pet.isChip}</Text>
      <Text style={styles.itemTitle}>Address:{pet.address.title}</Text>
      <Text style={styles.itemTitle}>Contact Info:{pet.contactName}</Text>
      <Text style={styles.itemTitle}>Phone Number:{pet.contactPhone}</Text>
      
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.icons}>
            <MaterialCommunityIcons color="#055c13" name="map-search" size={35} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={print}>
          <View style={styles.icons}>
            <MaterialCommunityIcons color="#055c13" name="printer" size={35} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareFile}>
          <View style={styles.icons}>
            <MaterialCommunityIcons color="#055c13" name="share" size={35} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessageWithSMS}>
          <View style={styles.icons}>
            <MaterialCommunityIcons color="#055c13" name="email-outline" size={35} />
          </View>
        </TouchableOpacity>
      </View>

      <Modal 
        animationType="slide"
        visible={modalVisible}
      >
        <MaterialCommunityIcons
          name="close"
          size={24}
          onPress={() => setModalVisible(false)}
        />
        <View style={stylesMap.container}>
          <MapView 
            style={stylesMap.map} 
            initialRegion={{
              latitude: coordLatd,
              longitude: coordLongt,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker 
              coordinate={{
                latitude: coordLatd,
                longitude: coordLongt
              }} 
            />
          </MapView>
        </View>
      </Modal>

      </View>
    </View>
  )
};

const stylesMap = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/1.05,
  },
});

export default ReportItem;