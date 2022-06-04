import React from 'react';
import { 
  View, 
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';


import styles from './styles';

// Android banner: ca-app-pub-2558632039230134/4708121338

const HomeScreen = ({ navigation }) => {
  //const bannerAdId = "ca-app-pub-2558632039230134/4708121338";

  return (
    <View>
      <ImageBackground source={ require('../../../assets/data/images/background.jpg') } style={styles.background} >
      
        <Text style={styles.title}>App Name</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.lostButton} activeOpacity={0.8} onPress={() => navigation.navigate("ReportMissingPet")}>
            <Text style={styles.buttonText}>Lost My Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.foundButton} activeOpacity={0.8} onPress={() => navigation.navigate("FoundMissingPet")}>
            <Text style={styles.buttonText}>Found A Pet</Text>
          </TouchableOpacity>
        </View>

        <AdMobBanner
            style={styles.banner}
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            servePersonalizedAds = {false}
        />
      </ImageBackground>
      
    </View>
  )
};

export default HomeScreen;
