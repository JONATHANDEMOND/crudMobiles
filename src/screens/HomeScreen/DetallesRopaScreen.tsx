import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, remove, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, Text, TextInput } from 'react-native-paper'
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { styles } from '../../theme/styles';
import { View } from 'react-native';

////intefrace
export interface Ropa{
    id:string;
    marca:string;
    genero:string;
    precio:string;
}


export const DetallesRopaScreen = () => {
//hook accede a toda la infomracion de navegacion
const route = useRoute();
//@ts-ignore
const{ropa}=route.params;

//hook state apr acambiar el esra del fomrulario de eduitar y eliminar
const [fomrEdit, setFomrEdit] = useState<Ropa>({
    id:'',
    marca:'',
    genero:'',
    precio:''
})
//hook usenavigation:permite navegar de u n screen a otro
const navigation = useNavigation();
//hook Useefect cargar y mostrar la data en el formulario detalle
useEffect(()=>{
    setFomrEdit(ropa);
},[]
)

//funcione q nos permite actulizar los fomrularios
const handleSetValues=(key:string,value:string)=>{
    setFomrEdit({...fomrEdit,[key]:value})
}
//funcion para actulizar la data
const handleUpdateRopa=async()=>{
    const dbRef=ref(dbRealTime,'ropa/'+auth.currentUser?.uid + '/' + fomrEdit.id)
try{
    await update(dbRef,{
        id:fomrEdit.id,
        marca:fomrEdit.marca,
        genro:fomrEdit.genero,
        precio:fomrEdit.precio
    });
    navigation.goBack();
}catch(e){
    console.log(e);
    
}

}
//funcion para eliminar el producto
const handleDelteRopa = async()=>{
    const dbRef=ref(dbRealTime,'ropa/'+ fomrEdit.id)
    try{
        await remove(dbRef);
        navigation.goBack();
    }catch(e){
        console.log(e);
        
    }
 }


  return (
    <View>
    <Card style={styles.containernew}>
    
    <Card.Content>
        <Text variant="headlineSmall" style={styles.textStyle}>Detalles Prenda</Text>
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
    </Card>
   
    <Button 
            mode='contained' 
            style={styles.buttonStyle}
            icon='motorbike'
            onPress={handleUpdateRopa}>
                Actualizar
                </Button>

              <Button 
            mode='contained'
            style={styles.buttonStyle}
             icon="delete-empty"
             onPress={handleDelteRopa}
             >Eliminar
             </Button>  
    </View>

  )


}
