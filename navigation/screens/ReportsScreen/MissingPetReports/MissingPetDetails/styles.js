import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../../../constants/Colors";

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: Dimensions.get("screen").height,
    resizeMode: "cover",
  },
  backBtn: {
    marginLeft: '5%',
    marginTop: '10%',
  },
  back: {
    color: Colors.colors.dark,
  },
  title: {
    fontSize: 30,
    fontFamily: "notoserif",
    fontWeight: "bold",
    color: Colors.colors.dark,
    textAlign: "center",
  },
  bodyContainer: {
    marginHorizontal: 20,
    width: "98%",
  },
  image: {
    width: "90%",
    height: "30%",
    padding: "5%",
    borderRadius: 35,
    marginVertical: '5%',
    borderWidth: 2,
    borderColor: Colors.colors.dark,
  },
  cates: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.colors.dark,
  },
  info: {
    fontSize: 18,
    color: Colors.colors.theme,
    marginLeft: '5%',
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: '10%',
    marginTop: 20,
  },
  messageBtn: {
    alignItems: "center",
    backgroundColor: Colors.colors.dark,
    padding: 10,
    borderRadius: 15,
    width: "40%",
  },
  callBtn: {
    alignItems: "center",
    backgroundColor: Colors.colors.theme,
    padding: 10,
    borderRadius: 15,
    width: "40%",
  },
  btnText: {
    color: "white",
  },
});

export default styles;
