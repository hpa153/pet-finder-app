import { StyleSheet } from 'react-native';
import Colors from '../../../../constants/Colors';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    color: Colors.colors.dark,
    marginTop: '15%',
    marginHorizontal: '5%',
  },
  bodyContainer: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    width: "98%",
  },
  subtitle:{
    fontSize: 14,
    color: "black",
    paddingTop: 30,
  },
  textInput: {
    marginTop: 3,
    width: "92%",
    paddingVertical: 5,
    paddingLeft: 7,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.colors.dark,
    marginTop: 10,
  },
  multiTextInput: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  btnContainer: {
    display: "flex",
    marginTop: 10,
    width: "93%",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.colors.dark,
    padding: 15,
    marginBottom: 40,
    borderRadius: 10,
    width: "50%",
  },
  btnSubmit: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  feedbackText: {
    color: Colors.colors.theme,
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    color: "black",
    marginTop: 15,
    marginVertical: 10
    
  },
  lineStyle:{
    borderWidth: 1,
    borderColor:'black',
    marginRight: 20,
    
}
 
});

export default styles;
