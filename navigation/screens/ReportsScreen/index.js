import React from 'react';
import { 
  View, 
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';


import styles from './styles';

const ReportsScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={ require('../../../assets/data/images/background.jpg') } style={styles.background} >
        <Text style={styles.title}>Reports</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.lostButton} activeOpacity={0.8} onPress={() => navigation.navigate("MissingPetReports")}>
            <Text style={styles.buttonText}>Missing Pets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.foundButton} activeOpacity={0.8} onPress={() => navigation.navigate("FoundPetReports")}>
            <Text style={styles.buttonText}>Found Pets</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
};

export default ReportsScreen;
