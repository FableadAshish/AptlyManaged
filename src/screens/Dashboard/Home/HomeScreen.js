import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './Styles/HomeScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../contexts/AuthContext';
import SecureStorage from 'react-native-secure-storage';
import {UserContext} from '../../../contexts/UserContext';
import {BASE_URL} from '../../../config';
import {Loading} from '../../../components/Loading';
import Moment from 'moment';
import messaging from '@react-native-firebase/messaging';
import {EmergencyAlarmModal} from '../../../components/EmergencyAlarmModal';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../../../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../themes/Images';

export function HomeScreen() {
  const {logout} = React.useContext(AuthContext);
  const {token} = React.useContext(UserContext);
  const [data, setData] = React.useState();
  const [appUser, setAppUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHomeDetails();
  }, []);
  function getHomeDetails() {
    setRefreshing(false);
    setLoading(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/home`,
            {
              company_id: userDetails.details.company_id,
              unit_id: userDetails.details.unit_id,
              user_id: userDetails.details.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(function (response) {
            setLoading(false);
            setData(response.data.data);
          })
          .catch(function () {
            setLoading(false);
          });
      }
    });
  }

  React.useEffect(
    function () {
      getHomeDetails();
    },
    [isFocused],
  );

  React.useEffect(function () {
    getHomeDetails();
    requestUserPermission();

    messaging().onTokenRefresh(fcmToken => {
      // Process your token as required
      console.log('fcmToken onTokenRefresh', fcmToken);
      saveUserDeviceToken(fcmToken);
      console.log('fcmToken onTokenRefresh after', fcmToken);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data.type === 'parcel') {
        navigation.navigate('Parcels');
      }
      if (remoteMessage.data.type === 'issue') {
        navigation.navigate('Issue');
      }
      if (remoteMessage.data.type === 'poll') {
        navigation.navigate('Polls');
      }
      if (remoteMessage.data.type === 'service') {
        navigation.navigate('Service');
      }
      if (remoteMessage.data.type === 'facility') {
        navigation.navigate('Facility');
      }
      if (remoteMessage.data.type === 'Notice') {
        navigation.navigate('Message Board');
      }
      if (remoteMessage.data.type === 'Store') {
        navigation.navigate('Loyalty Card Stores');
      }
      if (remoteMessage.data.type === 'visitor') {
        navigation.navigate('Visitors');
      }
    });
    // let echo = new Echo({
    //   broadcaster: 'socket.io',
    //   host: 'http://concierge:6007',
    //   client: Socketio,
    //   // authEndpoint: 'http://127.0.0.2/broadcasting/auth',
    //   // auth: {
    //   //   headers: {
    //   //     Authorization: 'Bearer ' + token,
    //   //   },
    //   // },
    // });
    // console.log(echo);
    // echo.channel('user-channel').listen('UserEvent', (event) => {
    //   console.log(event);
    // });
  }, []);

  function saveUserDeviceToken(deviceToken) {
    console.log('deviceToken', deviceToken);
    setLoading(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        axios
          .post(
            `${BASE_URL}/saveDeviceToken`,
            {
              company_id: userDetails.details.company_id,
              user_id: userDetails.details.id,
              deviceToken: deviceToken,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(function () {
            setLoading(false);
            // setData(response.data.data);
            // console.log(response.data.data);
          })
          .catch(function () {
            setLoading(false);
            // console.log(error.response.data);
          });
      }
    });
  }

  async function requestUserPermission() {
    const deviceToken = await messaging().getToken();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      saveUserDeviceToken(deviceToken);
    }
  }

  const Visitor = ({item}) => (
    <View style={styles.visitorsList}>
      <View style={{flex: 1}}>
        <Text style={styles.visitorName}>{item.visitor_name}</Text>
        <Text style={styles.visitorOcc}>{item.reason}</Text>
      </View>
      <View style={styles.timeText}>
        <Text style={styles.flatNumbr}>{item.unit}</Text>
        <Text style={styles.dateTime}>
          <Icon name="time-outline" style={styles.iconSize} />{' '}
          {Moment(item.check_in_date).format('Do MMM, yyyy')} |{' '}
          {Moment(item.check_in_time, ['HH.mm']).format('hh:mm')}
        </Text>
      </View>
    </View>
  );
  const Board = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Feeds');
      }}>
      <View style={styles.msgBoardWrap}>
        <Text style={styles.msgTitle}>{item.description}</Text>
        <Text style={styles.infoText}>
          {Moment(item.created_at).format('Do MMM, yyyy')}
        </Text>
        {/* <Text style={styles.detailText}>Details</Text> */}
      </View>
    </TouchableOpacity>
  );

  const renderVisitors = ({item}) => {
    const backgroundColor = '#04141A';
    return <Visitor item={item} style={{backgroundColor}} />;
  };
  const messageBoard = ({item}) => {
    console.log('message baord', item);
    const backgroundColor = '#04141A';
    return <Board item={item} style={{backgroundColor}} />;
  };

  function getGreetingTime(m) {
    var g = null; //return g

    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format('HH'));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = 'Afternoon';
    } else if (currentHour >= split_evening) {
      g = 'Evening';
    } else {
      g = 'Morning';
    }

    return g;
  }

  // function onSwipeLeft(direction) {
  //   navigation.navigate('Advertise');
  // }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      // style={styles.mainView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrap}>
          <Icon
            name={'menu'}
            onPress={() => navigation.openDrawer()}
            size={30}
            style={{left: 25, bottom: 40}}
          />

          <Text style={styles.greetText}>
            Good {getGreetingTime(Moment())},
          </Text>
          {appUser && (
            <Text style={styles.nameText}>
              {appUser.first_name} {appUser.last_name}
            </Text>
          )}
        </View>
        <View style={styles.roudedLayout}>
          <View style={styles.infoIcons}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Parcels')}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>Parcels</Text>
                <Image
                  style={{marginTop: 10, width: 57, height: 40}}
                  source={Images.OpenBox}
                  tintColor={Colors.primarColor}
                />
              </View>
            </TouchableOpacity>

            {data &&
              data.concierge !== '' &&
              data.concierge !== null &&
              data.concierge.length == 1 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      selectedFeed: data.concierge[0],
                    });
                  }}
                  // onPress={() =>
                  //   navigation.navigate('ConciergeDetails', {
                  //     concierge_id: data.concierge.id,
                  //   })}
                >
                  <View style={styles.icon}>
                    <Text style={styles.iconText}>Concierge</Text>
                    <Image
                      style={{marginTop: 5, width: 34, height: 40}}
                      source={Images.Guard}
                      tintColor={Colors.primarColor}
                    />
                    <Text style={styles.conciergeText}>
                      {data.concierge[0].first_name}{' '}
                      {data.concierge[0].last_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

            {data &&
              data.concierge !== '' &&
              data.concierge !== null &&
              data.concierge.length >= 2 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ChatListing')}>
                  <View style={styles.icon}>
                    <Text style={styles.iconText}>Concierge</Text>
                    <Image
                      style={{marginTop: 5, width: 34, height: 40}}
                      source={Images.Guard}
                      tintColor={Colors.primarColor}
                    />
                    <Text style={styles.conciergeText} />
                  </View>
                </TouchableOpacity>
              )}

            {data && data.concierge == null && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ChatListing')}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>Concierge</Text>
                  <Image
                    style={{marginTop: 5, width: 34, height: 40}}
                    source={Images.Guard}
                  />
                  <Text style={styles.conciergeText} />
                </View>
              </TouchableOpacity>
            )}
            {data && data.concierge.length == 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ChatListing')}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>Concierge</Text>
                  <Image
                    style={{marginTop: 5, width: 34, height: 40}}
                    source={Images.Guard}
                  />
                  <Text style={styles.conciergeText} />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ChatListing')}>
              <View style={styles.icon}>
                <Text style={styles.iconText}>Chat</Text>
                {data &&
                  data.messageBoard !== '' &&
                  data.messageBoard !== null && (
                    <Text style={styles.countMessage}>{data.messageCount}</Text>
                  )}
                <Image
                  style={{marginTop: 10, width: 40, height: 40}}
                  source={Images.MessageSquare}
                />
              </View>
            </TouchableOpacity>
          </View>
          {data && data.issue !== '' && data.issue !== null && (
            <View>
              <View style={styles.alertInfo}>
                <View style={styles.leftView}>
                  <Image
                    source={Images.MetroWarning}
                    style={{width: 51, height: 45}}
                  />
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.paymentText}>{data.issue.issue}</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Issue')}>
                <View style={styles.seeDetail}>
                  <View style={{width: '85%'}}>
                    <Text style={styles.seeDetailText}>See More Details</Text>
                  </View>
                  <View style={{width: 26, justifyContent: 'flex-end'}}>
                    <Image
                      source={Images.ArrowRight}
                      style={{width: 26, height: 26}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Visitors')}>
            <View style={styles.titleTextWrap}>
              <Text style={styles.titleText}>Latest Visitors</Text>
              <View
                activeOpacity={0.8}
                style={styles.viewallText}
                onPress={() => navigation.navigate('Visitors')}>
                <Image
                  source={Images.ArrowRight}
                  style={{width: 26, height: 26}}
                />
              </View>
            </View>
            {data && (
              <FlatList
                data={data.visitors}
                renderItem={renderVisitors}
                keyExtractor={item => 'VI' + item.id}
              />
            )}
          </TouchableOpacity>

          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Feeds')}>
              <View style={styles.titleTextWrap}>
                <Text style={styles.titleText}>Message Board</Text>
                <View
                  style={styles.viewallText}
                  onPress={() => navigation.navigate('Feeds')}>
                  <Image
                    source={Images.ArrowRight}
                    style={{width: 26, height: 26}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {data && (
              <FlatList
                horizontal={true}
                // numColumns='2'
                data={data.messageBoard}
                renderItem={messageBoard}
                keyExtractor={item => 'msg' + item.id}
              />
            )}
          </View>
          <View style={styles.discoverWrap}>
            <View style={styles.discoverImgWrap}>
              <Image
                source={Images.discoverImage}
                style={{
                  width: '100%',
                  height: 250,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Advertise')}>
              <View style={styles.discoverTitleWrap}>
                <Text style={styles.titleText}>Discover</Text>
                <View
                  style={styles.viewallText}
                  onPress={() => navigation.navigate('Visitors')}>
                  <Image
                    source={Images.ArrowRight}
                    style={{width: 26, height: 26}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.liveChat}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Advertise')}>
            <Image source={Images.socialMedia} style={styles.liveChatImage} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <EmergencyAlarmModal setLoading={setLoading} />
      <Loading loading={loading} />
    </ScrollView>
  );
}
