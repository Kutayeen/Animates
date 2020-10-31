import React from 'react';
import { StyleSheet, StatusBar, WebView } from 'react-native';
import { BottomNavigation, Button, Text, Avatar, Layout, Icon } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import HTMLView from 'react-native-htmlview';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth';

const Profile = props => {
    const { navigation, route } = props;
    const STORAGE_KEY = '@user'
    const [user, setuser] = React.useState({ description: 'Loading...' });

    const delete_ = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        }
        catch (exception) {
        }
    }

    const fetchData = async (myanimelist,pages) => {
        let response = await fetch(`https://api.jikan.moe/v3/user/${myanimelist}/animelist/all/${pages}`);
        let data = await response.json();
        return data.anime;
    }
    const update = async (user_) => {
        try {
          fetch(`https://api.jikan.moe/v3/user/${user_}`)
            .then(response => response.json())
            .then(myanime => {
              (async () => {
                await firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    myanimelist: user_,
                    description: myanime.about,
                    gender: myanime.gender,
                    birthday: myanime.birthday,
                    image_url: myanime.image_url.split('?')[0],
                    location: myanime.location,
                    url: myanime.url,
                    user_id: myanime.user_id,
                    username: myanime.username
                  }, { merge: false }).then(() => {
                    (async () => {
                      var pages = 1;
                      var animelist = []
                      while (true) {
                        const abc = await fetchData(user_,pages++);
                        if (Array.isArray(abc) && abc.length) {
                          animelist.push(...abc)
                        } else {
                          break;
                        }
                      };
                      const finished = new Promise((resolve, reject) => {
                        animelist.forEach((element, index, array) => {
                          (async () => {
                            const anime_data = await firestore().collection('AnimeList').doc(element.title);
                            const doc = await anime_data.get();
                            if (doc.exists) {
                              await anime_data.collection('Users').doc(auth().currentUser.uid).set({
                                score: element.score,
                                is_rewatching: element.is_rewatching,
                                watched_episodes: element.watched_episodes,
                                watching_status: element.watching_status
                              })
                            } else {
                              await anime_data.set({
                                id: element.mal_id,
                                image_url: element.image_url.split('?')[0],
                                added_to_list: element.added_to_list,
                                airing_status: element.airing_status,
                                end_date: element.end_date,
                                has_episode_video: element.has_episode_video,
                                has_promo_video: element.has_promo_video,
                                has_video: element.has_video,
                                licensors: element.licensors,
                                priority: element.priority,
                                rating: element.rating,
                                start_date: element.start_date,
                                studios: element.studios,
                                title: element.title,
                                total_episodes: element.total_episodes,
                                type: element.type,
                                url: element.url,
                                video_url: element.video_url
                              }
                              )
                              await anime_data.collection('Users').doc(auth().currentUser.uid).set({
                                score: element.score,
                                is_rewatching: element.is_rewatching,
                                watched_episodes: element.watched_episodes,
                                watching_status: element.watching_status
                              })
                            }
                          })().catch(e => { })
                          if (index === array.length - 1) resolve();
                        }).catch(e => { })
                      });
                      finished.then(() => {
                        (async () => {
                            try {
                                await firestore()
                                    .collection('users')
                                    .where('email', '==', route.params.email)
                                    .get().then(result => { setuser(result._docs[0]._data)})
                            } catch (error) {
                                alert(error)
                            }
                        })()
                        alert('Your profile is updated')
                      });
                    })().catch(e => { })
                  })().catch(e => { });
              })().catch(e => { });
            })
        } catch (error) {
          console.error(error);
        }
      }

    const settingsbutton = () => {
        delete_();
        RNRestart.Restart();
    };

    const refreshbutton = () => {
        update(user['myanimelist'])
    };

    React.useEffect(() => {
        (async () => {
            try {
                await firestore()
                    .collection('users')
                    .where('email', '==', route.params.email)
                    .get().then(result => { setuser(result._docs[0]._data) })
            } catch (error) {
                alert(error)
            }
        })()
    }, []);

    React.useEffect(() => {
        console.log(user)
    }, [user]);


    return (
        <Layout style={styles.container}>
              <StatusBar hidden={true} />
             <Layout style={{flexDirection: 'row', justifyContent: 'space-between',backgroundColor: '#4064f6',}}>
                    <Icon
                        style={styles.refresh}
                        fill='white'
                        name='refresh-outline'
                        onPress={refreshbutton}
                    />
                       <Icon
                        style={styles.icon}
                        fill='white'
                        name='log-out-outline'
                        onPress={settingsbutton}
                    />
                </Layout>
          
            <Layout style={styles.layout}>
               
                <Avatar style={styles.avatar} size='giant' source={{ uri: user['image_url'] }} />
                <Layout style={styles.about}>
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'gray', marginTop: 20, margin: 20, }}>{user['username']}</Text>
                    <HTMLView
                        value={user['description']}
                        stylesheet={styles}
                    />
                </Layout>
            </Layout >
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#4064f6',
    },
    layout: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#4064f6'
    },  
    bottomNavigation: {
        marginVertical: 8,
    },
    icon: {
        alignSelf: 'flex-end',
        marginTop: 15,
        marginRight: 15,
        width: 32,
        height: 32,
    },
    refresh: {
        alignSelf: 'flex-start',
        marginTop: 15,
        marginLeft: 15,
        width: 32,
        height: 32,
    },
    navigator: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
    },
    avatar: {
        margin: 20,
        marginRight: 5,
        marginBottom: 50,
        height: 200,
        width: 200,
    },
    a: {
        fontWeight: '100',
        color: '#FF3366', // make links coloured pink
    },
    br: {
        marginBottom: -50,
    },
    about: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }
});

export default Profile;
