import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Layout, Button, List, ListItem, Icon } from '@ui-kitten/components';

const data = new Array(10).fill({
    title: 'Fucking Weeb',
    description: 'Description for Item',
});

const renderItemIcon = (props) => (
    <Icon {...props} name='person' />
);

const renderItem = ({ item, index }) => (
    <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
        accessoryLeft={renderItemIcon}
    />
);

const Matches = props => {
    const { navigation } = props;
    

    return (
        <Layout style={styles.layout}>
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'flex-start',
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
