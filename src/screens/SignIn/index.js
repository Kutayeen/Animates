import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';

const renderIconaccount = (props) => (
  <Icon {...props} name={'person-outline'} />
);

const SignIn = props => {
  const { navigation } = props;
  console.log(props.route.params)
  const [email, setEmail] = React.useState(props.route.params.email || '');
  const [password, setpassword] = React.useState(props.route.params.password || '');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  if (typeof (props.route.params) !== "undefined") {
    React.useEffect(() => {
      setEmail(email => (props.route.params.email));
      setpassword(password => (props.route.params.password));
    }, [props.route.params]);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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
        <Text style={{ textAlign: 'left', fontSize: 11, color: 'gray', margin: 10, marginLeft: 240 }}>Forgot your password?</Text>

      </Layout>
      <Layout style={styles.layout}>
        <Button style={styles.button} appearance='filled'>
          SIGN IN
        </Button>
        <Text onPress={() => navigation.navigate('SignUp')} style={{ textAlign: 'center', fontSize: 13, color: 'gray', marginBottom: 20, }}>Don't you have an account? Create</Text>
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
