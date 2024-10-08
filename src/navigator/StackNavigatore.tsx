import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistgerScreen } from '../screens/RegistgerScreen';
import { DetallesRopaScreen } from '../screens/HomeScreen/DetallesRopaScreen';
import { NuevoProductoScree } from '../screens/HomeScreen/NuevoProductoScree';

export const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistgerScreen} />
      <Stack.Screen name="Detalles" component={DetallesRopaScreen} />
      <Stack.Screen name="Nuevo" component={NuevoProductoScree} />
    </Stack.Navigator>
  );
}
export default StackNavigator;