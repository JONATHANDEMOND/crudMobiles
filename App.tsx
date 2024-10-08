import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { LoginScreen } from './src/screens/LoginScreen'
import { RegistgerScreen } from './src/screens/RegistgerScreen'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigator/StackNavigatore'

const App = () => {
  return (
    <NavigationContainer>
  <PaperProvider>
    <StackNavigator/>
  </PaperProvider>    
  </NavigationContainer>
  )
}

export default App
