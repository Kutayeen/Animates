import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const renderIconaccount = (props) => (
  <Icon {...props} name={'person-outline'} />
);

const SignIn = props => {
  const { navigation } = props;
  const [user, setuser] = React.useState({ 'email': '', 'myanimelist': '', 'password': '', 'isLogged': false })
  const STORAGE_KEY = '@user'
  const [email, setEmail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const readData = async () => {
    try {
      const user_ = await AsyncStorage.getItem(STORAGE_KEY)
      if (user_ !== null) {
        setuser(user => (JSON.parse(user_)))
      }
    } catch (e) {
      alert(e)
    }
  };

  const forgotPassword = (Email) => {
    if (Email) {
      auth().sendPasswordResetEmail(Email)
        .then(function (user) {
          alert('Please check your email...')
        }).catch(function (e) {
          console.log(e.message)
        })
    } else {
      alert('Please type your email...')
    }
  }

  if (typeof (props.route.params) !== "undefined") {
    React.useEffect(() => {
      setEmail(email => (props.route.params.email));
      setpassword(password => (props.route.params.password));
    }, [props.route.params]);
  };

  React.useEffect(() => {
    if (user['isLogged']) {
      console.log(user);
      navigation.dispatch(StackActions.replace('Home'));
    }
  }, [user]);

  const saveData = async (myanimelist) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ 'email': email, 'myanimelist': myanimelist, 'password': password, 'isLogged': true }))
    } catch (e) {
      alert(e.message)
    }
  };

  React.useEffect(() => {
    readData();
  }, []);

  const signInfunction = async (email, password) => {
    if (user['myanimelist'] !== '') {
      auth().signInWithEmailAndPassword(email, password).then(() => {
        saveData(user['myanimelist']);
        navigation.dispatch(StackActions.replace('Home', { 'email': email, 'myanimelist': user['myanimelist'], 'password': password, 'isLogged': true }));
      }).catch(function (error) {
        alert(error.message);
      });
    } else {
      try {
        const myanimelist_ = await firestore()
          .collection('users')
          .where('email', '==', email)
          .get();
        auth().signInWithEmailAndPassword(email, password).then(() => {
          saveData(myanimelist_['myanimelist']);
          navigation.dispatch(StackActions.replace('Home', { 'email': email, 'myanimelist': myanimelist_['myanimelist'], 'password': password, 'isLogged': true }));
        }).catch(function (error) {
          console.log(error.message);
        });
      } catch (e) {
        alert(e.message);
      }
    }
  }

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  if (user['isLogged'] === false) {
    return (
      <Layout style={styles.container}>
        <StatusBar hidden={true} />
        <Layout style={styles.background}>
          <Text style={{ textAlign: 'center', fontSize: 25, color: 'white' }}>Welcome to Animates</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, color: 'white', marginTop: 40, margin: 20, }}>
            Sign in to converse with people who watched similar anime like you</Text>
        </Layout>
        <Layout style={styles.Form}>
          <Input style={{ alignItems: 'stretch', width: '90%' }}
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
          <Text onPress={() => forgotPassword(email)} style={{ textAlign: 'left', fontSize: 11, color: 'gray', margin: 10, marginLeft: 240 }}>Forgot your password?</Text>
        </Layout>
        <Layout style={styles.layout}>
          <Button onPress={() => signInfunction(email, password)} style={styles.button} appearance='filled'>
            SIGN IN
          </Button>
          <Text onPress={() => navigation.navigate('SignUp')} style={{ textAlign: 'center', fontSize: 13, color: 'gray', marginBottom: 20, }}>Don't you have an account? Create</Text>
        </Layout>
      </Layout>
    );

  } else {
    return (<Text ></Text>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  button: {
    marginBottom: 20,
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
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export default SignIn;
