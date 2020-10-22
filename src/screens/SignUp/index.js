import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage'
import firestore from '@react-native-firebase/firestore';
const renderIconaccount = (props) => (
  <Icon {...props} name={'person-outline'} />
);

const SignUp = props => {
  const STORAGE_KEY = '@user'
  const { navigation } = props;
  const [email, setEmail] = React.useState('');
  const [myanimelist, setmyanimelist] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const saveData = async (user) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ 'email': email, 'myanimelist': myanimelist, 'password': password, 'isLogged': false })).then(() => {
        adduser(user);
      })
    } catch (e) {
    }
  };

  const adduser = async (user) => {
    await firestore()
      .collection('users')
      .doc(user)
      .set({
        email: email,
        myanimelist: myanimelist,
      },{ merge: false });
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const register = () => {
    if (email && password && myanimelist) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          saveData(auth().currentUser.uid);
          navigation.navigate('SignIn', {
            email: email,
            password: password,
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
          alert(error);
        });
    } else {
      alert("Fill all fields.");
    }
  };

  return (
    <Layout style={styles.container}>
      <StatusBar hidden={true} />
      <Layout style={styles.background}>
        <Text style={{ textAlign: 'center', fontSize: 50, marginTop: 40, color: 'white' }}>Animates</Text>
        <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', marginTop: 20, margin: 20, }}>
          Please use your own Myanimelist's Account to sign up. Be sure your animelist is public accessible.</Text>
      </Layout>
      <Layout style={styles.Form}>
        <Input style={{ alignItems: 'stretch', width: '90%' }}
          placeholder='Myanimelist Username'
          value={myanimelist}
          accessoryRight={renderIconaccount}
          onChangeText={nextValue => setmyanimelist(nextValue)}
        />
        <Input style={{ alignItems: 'stretch', width: '90%', marginTop: 20 }}
          placeholder='Email'
          value={email}
          accessoryRight={renderIconaccount}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input style={{ alignItems: 'stretch', width: '90%', marginTop: 20 }}
          placeholder='Password'
          value={password}
          onChangeText={nextValue => setpassword(nextValue)}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
        />

      </Layout>
      <Layout style={styles.layout}>
        <Button style={styles.button} appearance='filled'
          onPress={() => register()}>
          SIGN UP
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  button: {
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#4064f6',
  },
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  background: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#4064f6',
  },
  Form: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default SignUp;
