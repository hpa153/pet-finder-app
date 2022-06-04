import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  LogBox,
  Linking,
} from "react-native";
import { firestore, storage } from "./../../../firebaseConfig";
import ImageSelector from "../../../components/ImageSelector/ImageSelector";
import DropDownPicker from "react-native-dropdown-picker";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import DatePicker from "react-native-datepicker";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "./styles";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

LogBox.ignoreAllLogs();
DropDownPicker.setListMode("SCROLLVIEW");

const ReportMissingPetScreen = ({ navigation }) => {
  const [petImage, setPetImage] = useState(null);
  // const [image, setImage] = useState(null);
  const [petName, setPetName] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [isChip, setIsChip] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [isUpload, setIsUpload] = useState(false);

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

  async function uploadData() {
    const petImageType = petImage.split(".").slice(-1)[0];
    let fsRead = await FileSystem.readAsStringAsync(petImage, {
      encoding: "base64",
    });
    const uploadPetImage = "data:image/" + petImageType + ";base64," + fsRead;

    // const imageType = image.split(".").slice(-1)[0];
    // fsRead = await FileSystem.readAsStringAsync(image, {
    //   encoding: "base64",
    // });
    // const uploadImage = "data:image/" + imageType + ";base64," + fsRead;
    firestore
      .collection("reportLostPet")
      .add({
        petImage: uploadPetImage,
        // image: uploadImage,
        petName: petName,
        dateLost: dateLost,
        species: species,
        gender: gender,
        breed: breed,
        isChip: isChip,
        address: address,
        contactName: contactName,
        contactPhone: contactPhone,
      })
      .then(() => {
        Alert.alert("Thanks for reporting! Hope you will find your pet soon.");
        console.log("Data has been uploaded successfully!");
      })
      .catch(function (error) {
        Alert.alert("Something went wrong!");
        console.log("Error: ", error);
      });

    // remove the field's data
    setPetImage(null);
    // setImage(null);
    setPetName("");
    setDateLost("");
    setSpecies(null);
    setGender(null);
    setBreed("");
    setIsChip("");
    setAddress("");
    setContactName("");
    setContactPhone("");
    setIsUpload(false);
  }

  // Pick a single file
  async function uploadDoc() {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type === "success") {
      console.log(result);
      setIsUpload(true);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });
      const ref = storage.ref().child(new Date().toISOString());
      const snapshot = await ref.put(blob);
      blob.close();
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          blurRadius={10}
          source={require("../../../assets/data/images/background.jpg")}
          style={styles.background}
        >
          <Text style={styles.title}>Report Missing Pet</Text>

          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.noticeStart}>Before You Start...</Text>
              <Text style={styles.noticeTxt}>
                1. All fields below are required.{"\n"}2. To make sure we don't
                make mistake your pet in the future, please{" "}
                <Text style={{ color: "#FB9A44" }}>
                  upload the document of pet proof
                </Text>
                .
              </Text>
            </View>
            <Text style={{ color: "#055c13", fontSize: 16, width: "96%" }}>
              Furthermore, if you want to post this message to other social
              media:
            </Text>
            <View
              style={{
                width: "92%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
                marginTop: 5,
              }}
            >
              <TouchableOpacity>
                <FontAwesome
                  style={{ marginRight: 10 }}
                  name="facebook-square"
                  size={36}
                  color="#4267B2"
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/LostPetsOntario")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome
                  style={{ marginRight: 10, marginLeft: 10 }}
                  name="twitter-square"
                  size={36}
                  color="#00acee"
                  onPress={() =>
                    Linking.openURL("https://twitter.com/ontmissingpets")
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome5
                  style={{ marginLeft: 10 }}
                  name="instagram-square"
                  size={36}
                  color="#E1306C"
                  onPress={() =>
                    Linking.openURL("https://www.instagram.com/lostpetsontario")
                  }
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.cates}>YOUR PET'S PHOTO</Text>
            <View style={styles.imageContainer}>
              <ImageSelector
                imageUri={petImage}
                onChangeImage={(uri) => setPetImage(uri)}
              />
            </View>

            <Text style={styles.cates}>UPLOAD THE PROOF DOCUMENT</Text>
            <View style={styles.uploadDoc}>
              <TouchableOpacity>
                <FontAwesome5
                  style={{ display: isUpload ? "none" : "flex" }}
                  name="cloud-upload-alt"
                  size={48}
                  color="#055c13"
                  onPress={uploadDoc}
                />
                <FontAwesome5
                  style={{ display: isUpload ? "flex" : "none" }}
                  name="check-circle"
                  size={48}
                  color="#055c13"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.cates}>Pet's Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your pet's name"
              value={petName}
              onChangeText={(value) => setPetName(value)}
            />

            <Text style={styles.cates}>Date Lost</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={dateLost} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Select the date"
              format="YYYY-MM-DD"
              minDate="2020-01-01"
              maxDate="2023-06-30"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
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
                setDateLost(value);
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
                  placeholder: "Where did you lose the pet?",
                  placeholderTextColor: "grey",
                  style: {
                    backgroundColor: "white",
                    fontSize: 14,
                  },
                }}
                value={address}
                open={addressOpen}
                onOpen={onAddressOpen}
                setOpen={setaddressOpen}
                onSelectItem={setAddress}
                dataSet={[
                  {
                    id: "1",
                    title: "3345 Paul Drive, Ottawa, Ontario, K2F3S2",
                  },
                  { id: "2", title: "190 Clarence, London, Ontario, J2FGH2" },
                  {
                    id: "3",
                    title:
                      "4521 St. Paul Street, St Catharines, Ontario, L2S 3A1",
                  },
                  {
                    id: "4",
                    title: "2428 Rayborn Crescent, St Albert, Alberta, T8N 1C7",
                  },
                  {
                    id: "5",
                    title:
                      "1030 rue de la Gauchetière, Montreal, Quebec, H3B 2M3",
                  },
                  {
                    id: "6",
                    title: "2511 Weir Crescent, Toronto, Ontario, M1E 3T8",
                  },
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

              <TouchableOpacity style={styles.button} onPress={uploadData}>
                <Text style={styles.btnSubmit}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportMissingPetScreen;
