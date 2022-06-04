import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    color: Colors.colors.theme,
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  container: {
    width: '90%',
    height: '100%',
    borderColor: 'black',
    position: 'absolute',
    top: '20%',
    backgroundColor: "white",
    opacity: 0.90,
    marginLeft: 20,
  },
  inputContainer:{
    width:"90%",
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    },
   image:{
    width: 150,
    height: 150,
    marginLeft: '25%',
    marginTop: '10%',
   },
  textInput: {
  borderColor: '#ccc',
  textAlignVertical: 'top',
  borderBottomWidth: 0.5, 
  color: '#808080',
  fontSize: 14
},
buttonContainer:{
  paddingLeft: 40,
  paddingRight: 40,
  marginTop: 8,
  flexDirection: 'row',
  justifyContent: 'space-between'
   },

   button:{
    padding: 15,

  },
});

export default styles;