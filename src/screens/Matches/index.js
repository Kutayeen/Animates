import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Layout, Button, List, ListItem, Icon } from '@ui-kitten/components';

const data = new Array(20).fill({
    title: 'Fucking Weeb',
    description: 'Description for Item',
});

const Matches = props => {
    const { navigation } = props;
    const renderItemAccessory = (props) => (
        <Button size='tiny'>FOLLOW</Button>
    );

    const renderItemIcon = (props) => (
        <Icon {...props} name='person' />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderItemAccessory}
        />
    );

    return (
        <Layout >
            <StatusBar hidden={true} />
            <List
                style={styles.container}
                data={data}
                renderItem={renderItem}
            />
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

export default Matches;
