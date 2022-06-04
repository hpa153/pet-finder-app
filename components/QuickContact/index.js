import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import call from 'react-native-phone-call';

import styles from './styles';

const QuickContact = ({ contact }) => {
  const triggerCall = (phone) => {
    const args = {
      number: phone,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  return (
    <View style={styles.petCareItem}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={{ uri: contact.image }} />
      </View>
      <View>
        <Text style={styles.itemTitle}>{contact.name}</Text>
        <Text style={styles.state}>{contact.address}{"\n"}{contact.state}</Text>
        <Text style={styles.state}>Opening hours: {contact.openingHours}</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => triggerCall(contact.phone)}>
          <Text style={styles.buttonText}>Call now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default QuickContact;
