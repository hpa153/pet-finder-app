import React, { useState, useCallback } from 'react';
import { 
  ImageBackground, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  SafeAreaView, 
  Alert,
  LogBox
} from 'react-native';
import { firestore } from "./../../../firebaseConfig";
import ImageSelector from '../../../components/ImageSelector/ImageSelector';
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-datepicker";
import styles from './styles';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import * as FileSystem from 'expo-file-system';

LogBox.ignoreAllLogs();
DropDownPicker.setListMode("SCROLLVIEW");

const FoundMissingPetScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState();
  const [petName, setPetName] = useState("");
  const [dateFound, setDateFound] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState('');
  const [isChip, setIsChip] = useState("");
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  //For gender dropdown box
  const [genderOpen, setGenderOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  // For species dropdown Box
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [itemSpecies, setItemSpecies] = useState([
    { label: "Bird", value: "bird" },
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Guinea Pig", value: "guinea pig" },
    { label: "Rabbit", value: "rabbit" },
  ]);

  // For mirochip or not
  const [chipOpen, setChipOpen] = useState(false);
  const [itemChip, setItemChip] = useState([
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ]);

  const [addressOpen, setaddressOpen] = useState(false);

  const onAddressOpen = useCallback(() => {
    setGenderOpen(false);
    setChipOpen(false);
    setSpeciesOpen(false);
  }, []);

  const onSpeciesOpen = useCallback(() => {
    setGenderOpen(false);
    setChipOpen(false);
  }, []);

  const onGenderOpen = useCallback(() => {
    setSpeciesOpen(false);
    setChipOpen(false);
  }, []);

  const onChipOpen = useCallback(() => {
    setSpeciesOpen(false);
    setGenderOpen(false);
  }, []);

  async function saveToDatabase() {
    const imageType = imageUri.split('.').slice(-1)[0];
    const fsRead = await FileSystem.readAsStringAsync(
        imageUri,
        {
          encoding: "base64",
        }
    );
    const uploadImageUri = 'data:image/'+imageType+';base64,'+fsRead;
    firestore
      .collection('reportFoundPet')
      .add({
        imageUri: uploadImageUri,
        petName: petName,
        dateFound: dateFound,
        species: species,
        gender: gender,
        breed: breed,
        isChip: isChip,
        address: address,
        contactName: contactName,
        contactPhone: contactPhone
      })
      .then(() => {
        Alert.alert('Thank you for your contribution to find pet of others!');
      })
      .catch(function(error) {
        Alert.alert("Something went wrong!");
        console.log("Error: ", error);
      });
    
    // remove the field's data
    setImageUri();
    setPetName("");
    setDateFound('');
    setSpecies(null);
    setGender(null);
    setBreed("");
    setIsChip("");
    setAddress("");
    setContactName("");
    setContactPhone("");
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <ImageBackground 
          blurRadius={10} 
          source={ require('../../../assets/data/images/background.jpg') } 
          style={styles.background} 
        >
          <Text style={styles.title}>Report Founding Pet</Text>

          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.noticeStart}>Before You Start...</Text>
              <Text style={styles.noticeTxt}>
                1. All fields below are required.{"\n"}
              </Text>
            </View>

            <Text style={styles.cates}>UPLOAD PET'S PHOTO</Text>
            <View style={styles.imageContainer}>
              <ImageSelector 
                imageUri={imageUri} 
                onChangeImage={ (uri) => setImageUri(uri) } 
              />
            </View>

            <Text style={styles.cates}>Pet's Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Founding pet's name"
              value={petName}
              onChangeText={(value) => setPetName(value)}
            />

            <Text style={styles.cates}>Date Found</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={dateFound} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Select the date"
              format="YYYY-MM-DD"
              minDate="2020-01-01"
              maxDate="2023-06-30"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  // display: "none",
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderColor: "white",
                },
              }}
              onDateChange={(value) => {
                setDateFound(value);
              }}
            />

            <Text style={styles.cates}>Species</Text>
            <View
              style={{
                width: "92%",
                marginBottom: 7,
                marginTop: 2,
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
                open={speciesOpen}
                onOpen={onSpeciesOpen}
                value={species}
                items={itemSpecies}
                setOpen={setSpeciesOpen}
                setItems={setItemSpecies}
                setValue={setSpecies}
              />
            </View>
            
            <Text style={styles.cates}>Gender</Text>
            <View
              style={{
                width: "92%",
                marginBottom: 7,
                marginTop: 2,
              }}
            >
              <DropDownPicker
                zIndex={2000}
                zIndexInverse={2000}
                placeholder="Select a gender"
                placeholderStyle={{
                  color: "grey",
                }}
                style={{
                  borderColor: "transparent",
                  height: 40,
                  borderRadius: 6,
                }}
                open={genderOpen}
                onOpen={onGenderOpen}
                value={gender}
                items={items}
                setOpen={setGenderOpen}
                setItems={setItems}
                setValue={setGender}
              />
            </View>

            <Text style={styles.cates}>Breed</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Akita, Beagle"
              value={breed}
              onChangeText={(value) => setBreed(value)}
            />

            <Text style={styles.cates}>Is there a microchip?</Text>
            <View
              style={{
                width: "92%",
                marginBottom: 7,
                marginTop: 2,
              }}
            >
              <DropDownPicker
                zIndex={1000}
                zIndexInverse={3000}
                placeholder="Select an item"
                placeholderStyle={{
                  color: "grey",
                }}
                style={{
                  borderColor: "transparent",
                  height: 40,
                  borderRadius: 6,
                }}
                open={chipOpen}
                onOpen={onChipOpen}
                value={isChip}
                items={itemChip}
                setOpen={setChipOpen}
                setItems={setItemChip}
                setValue={setIsChip}
              />
            </View>

            <Text style={styles.cates}>Address</Text>
            <View
            style={{
              width: "92%",
              marginBottom: 7,
              marginTop: 2,
            }}
            >
            <AutocompleteDropdown 
            style={styles.autocomplete}
            zIndex={1000}
            zIndexInverse={3000}
            multiline={true}
            textInputProps={{
              placeholder: "Where did you found the pet?",
              placeholderTextColor: "grey",
              style: {
              backgroundColor: "white",
              fontSize: 14,
              }
            }}
            value={address}
            open={addressOpen}
            onOpen={onAddressOpen}
            setOpen={setaddressOpen}
            onSelectItem={setAddress}
            dataSet={[
              { id: '1', title: '3345 Paul Drive, Ottawa, Ontario, K2F3S2' },
              { id: '2', title: '190 Clarence, London, Ontario, N6B2J7' },
              { id: '3', title: '4521 St. Paul Street, St Catharines, Ontario, L2S 3A1'},
              { id: '4', title: '2428 Rayborn Crescent, St Albert, Alberta, T8N 1C7'},
              { id: '5', title: '1030 rue de la Gauchetière, Montreal, Quebec, H3B 2M3'},
              { id: '6', title: '2511 Weir Crescent, Toronto, Ontario, M1E 3T8'},
            ]}
          />
        </View>
        
            <Text style={styles.cates}>Contact Info</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your name"
              value={contactName}
              onChangeText={(value) => setContactName(value)}
            />

            <Text style={styles.cates}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 416-456-7890"
              value={contactPhone}
              onChangeText={(value) => setContactPhone(value)}
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.navigate("HomeNavigator")}
              >
                <Text style={styles.btnSubmit}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={saveToDatabase}>
                <Text style={styles.btnSubmit}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
            
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
};

export default FoundMissingPetScreen;
