import React, { useState } from 'react'
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

// interface - logono
interface FormLogin{
    email:string;
    password:string;
}



export const LoginScreen = () => {
    const navigation =useNavigation()
    //hookks cambiar el estado del fomrulario 
const [formLogin, setFormLogin] = useState<FormLogin>({
    email:"",
    password:""
})

//cambiar el estado del formulario
const handleSetValues =(key: string, value:string)=>{
    setFormLogin({...formLogin,[key]:value});

}

//funcion para hacer visible el password 
const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

const handleSignIn = async ()=>{
    try{
    const response= await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
    );
    navigation.dispatch(CommonActions.navigate({name:'Home'}))
}catch(e){
    console.log(e);
    
}
}





  return (
   <View style={styles.container}>
    <Text style={styles.text}>INICIAR SESION</Text>
    <TextInput label="Correo"
    mode='outlined'
    placeholder='Escriba el Correo'
    onChangeText={(value)=>handleSetValues('email',value)}
    />
    
    <TextInput label='Contraseña'
    mode='outlined'
    placeholder='Escriba  la contraseña'
    secureTextEntry={hiddenPassword}
    onChangeText={(value)=>handleSetValues('password',value)}
    right={<TextInput.Icon icon='eye' onPress={()=>sethiddenPassword(!hiddenPassword)}/>}
    />
    <Button
    icon="account" mode='contained' onPress={handleSignIn}>Inciar Sesion</Button>
    <Text onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Registro'}))}>
                     No tienes una cuenta? Registrate Ahora
    </Text>
   </View>
  )
}
