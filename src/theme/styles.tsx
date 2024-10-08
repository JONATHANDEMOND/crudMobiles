
import { StyleSheet } from 'react-native'

export const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        gap:10
      },
      text :{
        fontSize:20,
        fontWeight:'bold',
        textAlign: 'center'
      },
      containernew: {
        padding: 20,
        margin: 15,
        borderRadius: 10,
        backgroundColor: '#f5f5f5', // Color suave de fondo
        shadowColor: '#000', // Sombra para dar profundidad
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra en Android
      },
      textStyle: {
        marginBottom: 10,
        fontWeight: 'bold',
      },
      inputStyle: {
        marginVertical: 10, // Espaciado entre los TextInput
      },
      buttonStyle: {
        marginTop: 20, // Espaciado sobre el botón
      },
    });



