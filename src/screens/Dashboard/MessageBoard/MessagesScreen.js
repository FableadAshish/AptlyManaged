import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './Styles/MessageBoardStyles';
import {HeaderIconButton} from '../../../components/HeaderIconButton';
import {AuthContext} from '../../../contexts/AuthContext';
import {HeaderIconsContainer} from '../../../components/HeaderIconsContainer';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {AuthContainer} from '../../../components/AuthContainer';
import {Heading} from '../../../components/Heading';
import SecureStorage from 'react-native-secure-storage';
import {UserContext} from '../../../contexts/UserContext';
import {BASE_URL} from '../../../config';
import {Loading} from '../../../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import {EmergencyAlarmModal} from '../../../components/EmergencyAlarmModal';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Images} from '../../../themes/Images';

export function MessagesScreen({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const {token} = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  const [appUser, setAppUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getServices();
  }, []);
  React.useLayoutEffect(() => {
    console.log(navigation);
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconsContainer>
          <HeaderIconButton
            name={'color-palette'}
            onPress={() => {
              switchTheme();
            }}
          />
          <HeaderIconButton
            name={'log-out'}
            onPress={() => {
              logout();
            }}
          />
        </HeaderIconsContainer>
      ),
    });
  }, [navigation, logout, switchTheme]);
  React.useEffect(function () {
    getServices();
  }, []);

  function getServices() {
    setRefreshing(false);
    setLoading(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/messages`,
            {
              company_id: userDetails.details.company_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(function (response) {
            setLoading(false);
            setData(response.data.data.data);
            if (
              response.data.data.last_page > response.data.data.current_page
            ) {
              setPageNumber(
                parseInt(response.data.data.current_page) + parseInt(1),
              );
              setIsLoadMore(true);
            }
          })
          .catch(function (error) {
            setLoading(false);
          });
      }
    });
  }
  function getMoreData() {
    setLoadMore(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/messages`,
            {
              company_id: userDetails.details.company_id,
              page: pageNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async function (response) {
            setLoading(false);
            setLoadMore(false);
            setData([...data, ...response.data.data.data]);
            if (
              response.data.data.last_page > response.data.data.current_page
            ) {
              setPageNumber(
                parseInt(response.data.data.current_page) + parseInt(1),
              );
              setIsLoadMore(true);
            } else {
              setIsLoadMore(false);
            }
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.data);
          });
      }
    });
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 40,
    gestureIsClickThreshold: 5,
  };
  function onSwipeLeft(direction) {
    navigation.navigate('Advertise');
  }
  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loadMore ? (
          <ActivityIndicator color="#FFF" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };
  function dialCall(number) {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }

  const Messages = ({item, onPress, style}) => (
    <View style={[styles.item, style]}>
      <View style={styles.leftView}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.provider}>{item.description}</Text>
      </View>
      <View style={styles.rightView}>
        {item.status === 1 && <Text style={styles.statusOpen}>Active</Text>}
        {item.status === 0 && <Text style={styles.statusClose}>In-Active</Text>}
      </View>
    </View>
  );

  const messages = ({item}) => {
    return <Messages item={item} style={styles.flatListBox} />;
  };
  return (
    <AuthContainer>
      <ScrollView>
        <SafeAreaView
          style={styles.mainView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.headerBG}>
            <Heading style={styles.titleText}>Message Board</Heading>
            <Image source={Images.Report} style={styles.headerImage} />
          </View>
          <View style={styles.roudedLayout}>
            <View style={styles.container}>
              <View style={styles.listWrap}>
                {data && (
                  <FlatList
                    data={data}
                    renderItem={messages}
                    keyExtractor={item => 'ses' + item.id}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                      if (isLoadMore) {
                        getMoreData();
                      }
                    }}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                )}
              </View>
            </View>
          </View>
          <EmergencyAlarmModal setLoading={setLoading} />
        </SafeAreaView>
      </ScrollView>
      <Loading loading={loading} />
    </AuthContainer>
  );
}
