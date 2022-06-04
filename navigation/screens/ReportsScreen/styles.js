import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 15,
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
  lostButton: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: Colors.colors.red,
    borderRadius: 15,
  },
  foundButton: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.colors.dark,
    borderRadius: 15,
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    color: Colors.colors.theme,
    marginTop: 15,
    marginHorizontal: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default styles;
