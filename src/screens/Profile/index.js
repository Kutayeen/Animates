import React from 'react';
import { StyleSheet, StatusBar,WebView  } from 'react-native';
import { BottomNavigation, Text, Avatar, Layout, Icon } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import HTMLView from 'react-native-htmlview';
const Profile = props => {
    const { navigation, route } = props;
    const [user, setuser] = React.useState('');

    React.useEffect(() => {
        (async () => {
            try {
                await firestore()
                    .collection('users')
                    .where('email', '==', route.params.email)
                    .get().then(result => {setuser(result._docs[0]._data) })
            } catch (error) {
            }
        })()
    }, []);

    React.useEffect(() => {
        console.log(user)
    }, [user]);
    

    return (
        <Layout style={styles.layout}>
            <StatusBar hidden={true} />
            <Avatar style={styles.avatar} size='giant' source={{ uri: user['image_url']}} />
            <Text style={{ textAlign: 'center', fontSize: 30, color: 'gray', marginTop: 40, margin: 20, }}>{user['username']}</Text>
            <HTMLView
        value={user['description']}
        stylesheet={styles}
      />

        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bottomNavigation: {
        marginVertical: 8,
    },
    navigator: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
    }, avatar: {
        margin: 8,
        marginTop: 50,
        height: 200,
        width: 200,
    }, a: {
        fontWeight: '100',
        color: '#FF3366', // make links coloured pink
      },
      br:{
        marginBottom: -50,
      }
});

export default Profile;
