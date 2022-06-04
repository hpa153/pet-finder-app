import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
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
   signout:{
    width: '20%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 5,
   },
   editprofile:{
    width: '20%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
   },
    delete:{
        width: '20%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
   buttonText:{
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
   },
   container: {
    width: '90%',
    height: '69%',
    borderColor: 'black',
    position: 'absolute',
    top: '30%',
    backgroundColor: "white",
    opacity: 0.90,
    marginLeft: 20,
  },
   inputContainer:{
    marginRight: 20,
    marginLeft: 20,
    },
  image: {
    width: 150,
    height: 150,
  },
  textInput: {
    borderColor: '#ccc',
    marginTop: 20,
    marginBottom: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    borderBottomWidth: 0.5, 
    color: '#808080',
    fontSize: 14
},
 
});

export default styles;