import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  petCareItem: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemTitle: {
    fontSize: 18,
    color: Colors.colors.dark,
    fontWeight: 'bold',
  },
  state: {
    color: Colors.colors.theme,
  },
  button: {
    paddingVertical: 5,
    width: 120,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colors.dark,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default styles;
