import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';

const renderIconaccount = (props) => (
  <Icon {...props} name={'person-outline'} />
);

const Home = props => {
  const { navigation } = props;
  return (
    <Layout style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{ textAlign: 'center', fontSize: 50, color: 'gray', marginBottom: 20, }}>Home</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Home;
