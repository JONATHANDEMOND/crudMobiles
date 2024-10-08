import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface FormRegister{
    email:string;
    password:string;
}

export const RegistgerScreen = () => {
///////////////HOOOKS///////////
///navegacion///
const navigation =useNavigation()
    const [formRegister, setFormRegister] = useState<FormRegister>({
        email:"",
        password:""
    })
    //pásword de visible a no visible
    const [visblePass, setVisblePass] = useState<boolean>(true)


    ///FNCION PARA ACTUALIZAR O SETEAR EL FOMRULARIO 
    const handleSetValues=(key:string,value:string)=>{
        setFormRegister({...formRegister,[key]:value});
    }

    //FUNCIION PARA REGISTAR AL USUARIO
    const handleRegistger = async ()=>{
        if(!formRegister.email || !formRegister.password){
            return;
        }
        console.log(formRegister);
        try{
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            )
        }catch(e){
            console.log(e);
            
        }
        
    }

  return (
    <View style={styles.container}>
    <Text style={styles.text}>Registrarse</Text>
    <TextInput label="Correo"
    mode='outlined'
    placeholder='Escriba el Correo'
    onChangeText={(value)=>handleSetValues('email',value)}/>
    <TextInput label='Contraseña'
    mode='outlined'
    placeholder='Escriba  la contraseña'
    onChangeText={(value)=>handleSetValues('password',value)}
    secureTextEntry={visblePass}
    />
    <Button
    icon="account" mode='contained' onPress={handleRegistger}>Registrar</Button>
    <Text onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}
    >Ya tines cuenta incia sesion ahora..!</Text>
   </View>
  )
}



