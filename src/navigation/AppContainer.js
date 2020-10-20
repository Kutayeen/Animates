import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import HomeScreen from '../screens/Home';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text, Button, Input, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const Stack = createStackNavigator();

const options = {
  gestureEnabled: true, // If you want to swipe back like iOS on Android
  ...TransitionPresets.SlideFromRightIOS
}

const AppNavigationContainer = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" >
          <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{ 'email': '', 'password': '' }} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={options} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default AppNavigationContainer;
