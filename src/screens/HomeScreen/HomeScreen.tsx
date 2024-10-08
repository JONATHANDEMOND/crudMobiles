import { CommonActions, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { onValue, ref, push } from 'firebase/database';
import { FlatList, View } from 'react-native'
import { RopaCardComponent } from './RopaCardComponent';
import { styles } from '../../theme/styles';

////intefrace
export interface Ropa{
    id:string;
    marca:string;
    genero:string;
    precio:number;
}




export const HomeScreen = () => {
    const navigation = useNavigation();


    //hook apra ver productos
    const [ropa, setRopa] = useState<Ropa[]>([

    ]);
    //hook UseEfect // obtenr los prodcutos y  listarlos
    useEffect(()=>{
        getAllRopa();
    },[])


    //funcion
const NuevoNav=()=>{
    navigation.dispatch(CommonActions.navigate({name:'Nuevo'}))
}
/// funcoin para traer los productos
const getAllRopa=()=>{
    const dbRef=ref(dbRealTime, 'ropa/')
    onValue(dbRef,(snapshot)=>{
        const data=snapshot.val();
        if(!data)return;
        const getKeys=Object.keys(data);
        const listRopa: Ropa[]=[];
        getKeys.forEach((key)=>{
            const value={...data[key], id:key}
            listRopa.push(value);
        });
        setRopa(listRopa);
        
    })
}

//

/// funcioon Cerrar Sesion
    const handleSignOut = async () => {
        try{
        await signOut(auth);
        navigation.dispatch(CommonActions.reset({index:0, routes:[{name:'Login'}]}))
      }catch(e){
        console.log(e);
        
      }
      }
  return (

      <View style={styles.containernew}>
        <FlatList
        data={ropa}
        renderItem={({item})=> <RopaCardComponent ropa={item}/>}
        keyExtractor={(item)=> item.id}
        />
        <Button 
        style={styles.buttonStyle}
        mode='contained'
        onPress={NuevoNav}>Agregar</Button>
         <Button 
        style={styles.buttonStyle}
        mode='contained'
        onPress={handleSignOut}>Cerrar Sesion</Button>

        </View>
    
      
   
   
  )
}


