import React, { useState, useCallback, useEffect }  from "react";
import { 
  View, 
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { firestore } from "../../../../firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './styles';
import FeedbackItem from '../../../../components/FeedbackItem';

const FeedbackScreen = ({ navigation }) => {

    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [recommend, setRecommend] = useState("");
    const [message, setMessage] = useState("");

    const[ratingOpen, setratingOpen] = useState(false);
    const[recommendOpen, setRecommendOpen] = useState(false);

    const[itemRating, setItemRating] = useState([
        { label: "Excellent", value: "excellent" },
        { label: "Very Good", value: "very good" },
        { label: "Good", value: "good" },
        { label: "Average", value: "average" },
        { label: "Bad", value: "bad" },
    ]);

    const[itemRecommend, setItemRecommend] = useState([
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ])

    const onRatingOpen = useCallback(() => {
        setRecommendOpen(false);
    }, []);

    const onRecommendOpen = useCallback(() => {
        setratingOpen(false);
    }, []);

    async function uploadData() {
        
        firestore
          .collection("feedback")
          .add({
            message: message,
            rating: rating,
            recommend: recommend,
            name: name,
          })
          .then(() => {
            Alert.alert("Thanks for your valuable feedback!");
            console.log("Data has been uploaded successfully!");
          })
          .catch(function (error) {
            Alert.alert("Something went wrong!");
            console.log("Error: ", error);
          });
    
        setName("");
        setRating(null);
        setRecommend(null);
        setMessage(null);
      }

      let [feedbackList, setFeedbackList] = useState([]);

      useEffect(() => {
        const subscriber = async () => {
          try {
              let result = [];
              let data = await firestore.collection('feedback').get();
  
                  data.forEach(e => {
  
                      if (e.id) {
                          result.push({
                              id: e.id,
                              name: e.data().name,
                              rating: e.data().rating,
                              message: e.data().message,
                              
                          });
                      }
                  })
  
                  setFeedbackList(result);
              } catch (err) {
                  console.log(err);
              }
          }
          subscriber();
      }, []);
        
    

  return (
   <ScrollView>
      <ImageBackground 
      source={ require('../../../../assets/data/images/background.jpg') }
      blurRadius={10} 
      style={styles.background} 
      >
      <Text style={styles.title}>Feedback</Text>
      <View style={styles.bodyContainer}>
        <View>
           <Text style={styles.subtitle}>
            We'd appreciate your valuable feedback so that we can improve our app.
           </Text>
         </View>
         <View
           style={{
            width: "92%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            marginTop: 10,
          }}
         >
            <Text style={styles.text}>Your Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={(value) => setName(value)}
            />
            <Text style={styles.text}>How satisfied are you with our app?</Text>
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
                placeholder=""
                style={{
                  borderColor: "transparent",
                  height: 40,
                  borderRadius: 6,
                }}
                open={ratingOpen}
                onOpen={onRatingOpen}
                value={rating}
                items={itemRating}
                setOpen={setratingOpen}
                setItems={setItemRating}
                setValue={setRating}
              />
            </View>
            <Text style={styles.text}>Is this app helpful?</Text>
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
                placeholder=""
                style={{
                  borderColor: "transparent",
                  height: 40,
                  borderRadius: 6,
                }}
                open={recommendOpen}
                onOpen={onRecommendOpen}
                value={recommend}
                items={itemRecommend}
                setOpen={setRecommendOpen}
                setItems={setItemRecommend}
                setValue={setRecommend}
              />
            <Text style={styles.text}>Additional Comment</Text>
            <TextInput
              style={styles.multiTextInput}
              multiline
              numberOfLines={10}
              value={message}
              onChangeText={(value) => setMessage(value)}
            />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.button} onPress={uploadData}>
                <Text style={styles.btnSubmit}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
           </View>
           <View style = {styles.lineStyle} />
           <View>
                <Text style={styles.subTitle}>Others Feedback</Text>
                <ScrollView>
                    {
                        feedbackList.map((feedback) =>
                            <FeedbackItem key={feedback.id} feedback={feedback} />)
                    }
                </ScrollView>
        </View>
         </View> 
      </ImageBackground>
   </ScrollView>
    
  )
};

export default FeedbackScreen;
