import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { BottomNavigation,Text, BottomNavigationTab, Layout, Icon } from '@ui-kitten/components';

const Profile = props => {
    const { navigation } = props;
 
    return (
        <Layout >
            <StatusBar hidden={true} />  
            <Text style={{ textAlign: 'center', fontSize: 15, color: 'black', marginTop: 40, margin: 20, }}>Profile</Text>          
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

export default Profile;
