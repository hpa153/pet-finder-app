import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

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
  subTitle: {
    fontSize: 24,
    fontFamily: 'notoserif',
    fontWeight: 'bold',
    color: Colors.colors.theme,
    marginTop: 15,
    marginHorizontal: '5%',
  },
  text: {
    color: Colors.colors.dark,
    marginHorizontal: '5%',
  },
});

export default styles;
