import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Card, Portal, Text, TextInput, Divider, Button } from 'react-native-paper';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';
import { styles } from '../../theme/styles';

interface FormRopa{
    id:string;
    marca:string;
    genero:string;
    precio:number;
}
interface ShowMessage{
    visible:boolean;
    message: string;
    color:string;

}



export const NuevoProductoScree = () => {
    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible:false,
        message:"",
        color:"#44D62C"
    })

    const navigation = useNavigation();
//funcioon para actualizar estado del formulario
const [formRopa, setFormRopa] = useState<FormRopa>({
    id:'',
    marca:'',
    genero:'',
    precio:0
})

//funcion para actulizar el estado del fomrulario 
const handleSetValues=(key:string, value:string)=>{
    setFormRopa({...formRopa, [key]:value});

}
// funsion para agregar la ropa
const handleSetRopa= async ()=>{
    if(
        !formRopa.id || 
        !formRopa.marca ||
         !formRopa.genero || 
         !formRopa.precio
    ){
        setShowMessage({
            visible: true,
            message: "Completa los campos!",
            color: "#CE0056",
          });
        return;
    }

    //1 cramos el path de la refrencia de la base de datso 
    const dbRef = ref(dbRealTime, 'ropa/');
///2.crear la coleccion q agregue los datos
const saveRopa = push(dbRef);
//3almacenar los datos en la base de datos
try{
    await set (saveRopa, formRopa);
    navigation.goBack()

}catch(e){
    console.log(e);
    setShowMessage({
        visible: true,
        message: "No se completo la transaccion, intnetalo mas tarde!",
        color: "#CE0056",
      });
}

}

   
  return (
    
    <Card style={styles.containernew}>
    
    <Card.Content>
        <Text variant="headlineSmall" style={styles.textStyle}>Nueva Prenda</Text>
        <TextInput label='Id' mode='outlined' style={styles.inputStyle}
      onChangeText={(value)=>handleSetValues('id',value)}/>
      <TextInput label='Marca' mode='outlined' style={styles.inputStyle}
      onChangeText={(value)=>handleSetValues('marca',value)}/>
      <Divider/>
      <TextInput label='Genero' mode='outlined' style={styles.inputStyle} 
      onChangeText={(value)=>handleSetValues('genero',value)}/>
      <TextInput label='Precio' mode='outlined' style={styles.inputStyle}
      onChangeText={(value)=>handleSetValues('precio', value)}
      keyboardType='numeric'/>

    </Card.Content>
    <Button mode='contained' style={styles.buttonStyle} onPress={handleSetRopa} icon='alert-circle'>Agregar</Button>
   
    
    
  
</Card>
 
  )
}


