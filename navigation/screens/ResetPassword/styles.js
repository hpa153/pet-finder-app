import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 0.98,
        alignItems:"center",
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container1:{
        flex: 0.98,
        alignItems:"center",
        justifyContent:"center",
    },
    inputContainer:{
        width:"80%"
    },
    input:{
        backgroundColor:"white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer:{
        marginTop: 20,
        width: "60%"
    },
    button:{
        backgroundColor:"black",
        padding: 10,
        borderRadius: 10,
        alignItems:"center"
    },
    buttonText:{
        color:"white",
        fontWeight: "700",
        fontSize: 12
    },
});

export default styles;