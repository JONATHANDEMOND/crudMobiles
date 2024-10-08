import React from 'react'
import { Ropa } from './HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

interface Props{
    ropa:Ropa;
}


 export const RopaCardComponent = ({ropa}:Props) => {
const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text variant="labelLarge">Marca del Vehiculo: {ropa.marca}</Text>
        <Text variant="labelLarge">Marca del Vehiculo: {ropa.genero}</Text>
        <Text variant="bodyMedium">Precio: ${ropa.precio} </Text>
      </View>
     <IconButton icon="arrow-right-bold-circle"
    size={20}
    onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detalles', params:{ropa}}))} />
    </View>
  );

}
