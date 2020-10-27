import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/Profile';
import MatchesScreen from '../../screens/Matches';
import AnimelistScreen from '../../screens/Animelist';


import { Layout, Text, Icon, BottomNavigation, BottomNavigationTab, } from '@ui-kitten/components';


const Home = props => {
  const { navigation } = props;
  const Tabs = ['AnimeList', 'Matches', 'Profile']
  const { Navigator, Screen } = createBottomTabNavigator();

  const PersonIcon = (props) => (
    <Icon {...props} name='person-outline' />
  );

  const listIcon = (props) => (
    <Icon {...props} name='list-outline' />
  );

  const EmailIcon = (props) => (
    <Icon {...props} name='email-outline' />
  );

  const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(Tabs[index],props.route.params)}>
      <BottomNavigationTab title='Anime List' icon={listIcon} />
      <BottomNavigationTab title='Matches' icon={EmailIcon} />
      <BottomNavigationTab title='Profile' icon={PersonIcon} />
    </BottomNavigation>
  );

  const TabNavigator = () => (
    <Navigator initialRouteName="Matches" tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='AnimeList' component={AnimelistScreen} />
      <Screen name='Matches' component={MatchesScreen} />
      <Screen name='Profile' component={ProfileScreen} />
    </Navigator>
  );
  return (
    <Layout >
      <StatusBar hidden={true} />
      <Layout style={styles.navigator}>
        <NavigationContainer independent={true}>
          <TabNavigator />
        </NavigationContainer>
      </Layout>
    </Layout>

  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomNavigation: {
    marginVertical: 8,
  },
  navigator: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
});

export default Home;
