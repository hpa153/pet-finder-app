import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    Pressable,
    TextInput,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './styles';
import ReportItem from "../../../../components/ReportItem";
import { firestore } from "../../../../firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";

const FoundPetReports = ({ navigation }) => {
    let [foundpets, setFoundpets] = useState([]);

    const [petGender, setPetGender] = useState([
        { label: "All", value: "allgender" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ]);
      const [petspecies, setpetspecies] = useState([
        { label: "All", value: "allspecies" },
        { label: "Bird", value: "bird" },
        { label: "Cat", value: "cat" },
        { label: "Dog", value: "dog" },
        { label: "Guinea Pig", value: "guinea pig" },
        { label: "Rabbit", value: "rabbit" },
      ]);

  const [curGender, setCurGender] = useState("allgender");
  const [curSpecies, setCurSpecies] = useState("allspecies");

  const [genderOpen, setGenderOpen] = useState(false);
  const [speciesOpen, setSpeciesOpen] = useState(false);

  const ongenderOpen = useCallback(() => {
    setChipOpen(false);
    setSpeciesOpen(false);
  }, []);

  const onspeciesOpen = useCallback(() => {
    setGenderOpen(false);
    setChipOpen(false);
  }, []);


    useEffect(() => {
      const subscriber = async () => {
        try {
            let result = [];
            let data;

            if (curGender === "allgender") {
                data = await firestore.collection('reportFoundPet').get();
              } else {
                data = await firestore.collection('reportFoundPet').where('gender', '==', curGender).get();
              }
              data.forEach(e => {
      
                // if (e.id) {
                //     result.push({
                //         id: e.id,
                //         type: e.data().type,
                //         breed: e.data().breed,
                //         description: e.data().description,
                //     });
                // }
                if (e.id) {
                  result.push({
                    id: e.id,
                    petName: e.data().petName,
                    species: e.data().species,
                    address: e.data().address,
                    breed: e.data().breed,
                    contactName: e.data().contactName,
                    contactPhone: e.data().contactPhone,
                    dateFound: e.data().dateFound,
                    gender: e.data().gender,
                    isChip: e.data().isChip,
                    imageUri: e.data().imageUri,
                  });
                }
              })
      
              setFoundpets(result);
            } catch (err) {
              console.log(err);
            }
          }
          subscriber();
        }, [curGender]);
      
        useEffect(() => {
          const subscriber = async () => {
            try {
              const result = [];
              let data;
              if (curSpecies === "allspecies") {
                data = await firestore.collection('reportFoundPet').get();
              } else {
                data = await firestore.collection('reportFoundPet').where('species', '==', curSpecies).get();
              }
              data.forEach(e => {
      
                // if (e.id) {
                //     result.push({
                //         id: e.id,
                //         type: e.data().type,
                //         breed: e.data().breed,
                //         description: e.data().description,
                //     });
                // }
                if (e.id) {
                  result.push({
                    id: e.id,
                    petName: e.data().petName,
                    species: e.data().species,
                    address: e.data().address,
                    breed: e.data().breed,
                    contactName: e.data().contactName,
                    contactPhone: e.data().contactPhone,
                    dateFound: e.data().dateFound,
                    gender: e.data().gender,
                    isChip: e.data().isChip,
                    imageUri: e.data().imageUri,
                  });
                }
              })
              setFoundpets(result);
            } catch (err) {
              console.log(err);
            }
          }
          subscriber();
        }, [curSpecies]);


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/data/images/background.jpg')} style={styles.background} >
                <Text style={styles.title}>Report</Text>

                <Text style={styles.subTitle}>Found Pets List</Text>
                <View style={{ marginHorizontal: '5%'}}>
                    <Text>There are many homeless pets that need your help. You felt in love with our pets and want to give them a home?
                        <Text style={styles.adoptText} onPress={() => navigation.navigate("AdoptReports")}> Click here to adopt a pet!</Text>
                    </Text>
                </View>
              <View
                  style={{
                     paddingTop: 20,
                     paddingRight: 20,
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     }}>
                   <Text style={styles.cates}>Search By gender</Text>
                   <Text style={styles.cates}>Search By species</Text>
                </View>
                <View
                 style={{
                    width: "43%",
                    marginBottom: 7,
                    marginTop: 2,
                    marginLeft: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    }}>
                   <DropDownPicker
                    style={styles.dropdown}
                    zIndex={2000}
                    zIndexInverse={2000}
                    open={genderOpen}
                    onOpen={ongenderOpen}
                    value={curGender}
                    items={petGender}
                    setOpen={setGenderOpen}
                    setItems={setPetGender}
                    setValue={setCurGender}
                   />
                  <Text style={styles.text}>OR</Text>
                  <DropDownPicker
                     style={styles.dropdown}
                     zIndex={3000}
                     zIndexInverse={1000}
                     open={speciesOpen}
                     onOpen={onspeciesOpen}
                     value={curSpecies}
                     items={petspecies}
                     setOpen={setSpeciesOpen}
                     setItems={setpetspecies}
                     setValue={setCurSpecies}
                    />
               </View>
                <ScrollView>
                    {
                        foundpets.map((pet) =>
                            <ReportItem key={pet.id} pet={pet} />)
                    }
                </ScrollView>

            </ImageBackground>
        </View>
    )
};

export default FoundPetReports;
