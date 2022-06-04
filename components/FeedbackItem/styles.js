import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  feedbackItem: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    marginRight: 20
  },
  itemTitle: {
    fontSize: 18,
    color: Colors.colors.dark,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  itemsubTitle: {
    fontSize: 13,
    color: "black",
    fontWeight: 'bold',
  },
 
});

export default styles;